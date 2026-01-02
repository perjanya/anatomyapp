(function(){
  // Topic tools: TTS, heuristic MCQs, clinical case generator, exam question box, external links.
  const contentEl = document.getElementById('content') || document.body;
  if (!contentEl) return;

  function createUI(){
    const container = document.createElement('div');
    container.className = 'topic-tools';
    container.innerHTML = `
      <div class="tt-controls">
        <button id="tts-play">🔊 Read Aloud</button>
        <button id="tts-stop">⏹ Stop</button>
      </div>
      <div class="gen-controls">
        <button id="mcqs">MCQs</button>
        <button id="clinical-case">Clinical Case</button>
        <button id="gen-exam">Exam Question</button>
      </div>
      <div class="results" id="tools-results"></div>
      <div class="external-links">
        <h4>External links</h4>
        <ul id="links-list"></ul>
        <input id="link-title" placeholder="Title" />
        <input id="link-url" placeholder="https://example.com" />
        <button id="add-link">Add link</button>
      </div>
    `;

    // insert at end of content
    contentEl.appendChild(container);

    // attach handlers
    document.getElementById('tts-play').addEventListener('click', startTTS);
    document.getElementById('tts-stop').addEventListener('click', stopTTS);
    document.getElementById('mcqs').addEventListener('click', requestMCQs);
    document.getElementById('clinical-case').addEventListener('click', requestClinicalCase);
    document.getElementById('gen-exam').addEventListener('click', generateExamQuestion);
    document.getElementById('add-link').addEventListener('click', addExternalLink);

    loadLinks();
  }

  function getTopicKey(){
    // derive key from location pathname or document title
    const p = (location.pathname || '').replace(/\W+/g,'-').replace(/^-+|-+$/g,'');
    if (p) return 'topic-tools:' + p;
    return 'topic-tools:' + (document.title || 'topic').replace(/\W+/g,'-');
  }

  function saveLinks(list){ localStorage.setItem(getTopicKey() + ':links', JSON.stringify(list)); }
  function loadLinks(){
    const list = JSON.parse(localStorage.getItem(getTopicKey() + ':links') || '[]');
    const ul = document.getElementById('links-list'); if (!ul) return;
    ul.innerHTML = '';
    list.forEach((l,i) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${l.url}" target="_blank" rel="noopener">${l.title}</a> <button data-i="${i}" class="del-link">Delete</button>`;
      ul.appendChild(li);
    });
    Array.from(document.querySelectorAll('.del-link')).forEach(b => b.addEventListener('click', e => {
      const idx = Number(e.target.dataset.i);
      list.splice(idx,1); saveLinks(list); loadLinks();
    }));
  }

  function addExternalLink(){
    const title = document.getElementById('link-title').value.trim();
    const url = document.getElementById('link-url').value.trim();
    if (!title || !url) return alert('Provide title and url');
    const list = JSON.parse(localStorage.getItem(getTopicKey() + ':links') || '[]');
    list.push({title,url}); saveLinks(list); loadLinks();
    document.getElementById('link-title').value=''; document.getElementById('link-url').value='';
  }

  // Text-to-speech
  let synth = window.speechSynthesis;
  let utter; 
  function startTTS(){
    if (!synth) return alert('Speech synthesis not supported in this browser');
    stopTTS();
    const text = extractReadableText();
    utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    synth.speak(utter);
  }
  function stopTTS(){ if (synth && synth.speaking) synth.cancel(); }

  function extractReadableText(){
    // take main headings + paragraphs
    const nodes = Array.from(contentEl.querySelectorAll('h1,h2,h3,p'));
    const txt = nodes.map(n => n.textContent.trim()).filter(Boolean).join('\n\n');
    return txt || document.body.textContent || document.title;
  }

  // Heuristic MCQ generator
  function generateMCQs(){
    const sentences = extractSentences();
    const pool = gatherKeyWords(sentences);
    const qcount = Math.min(5, Math.max(3, Math.floor(sentences.length/4)));
    const results = [];
    for (let i=0, attempts=0; results.length<qcount && attempts<sentences.length*2; attempts++){
      const s = sentences[(i+attempts)%sentences.length];
      const key = chooseKeyWord(s);
      if (!key) continue;
      const stem = s.replace(new RegExp('\\b'+escapeRegExp(key)+'\\b','i'), '____');
      const correct = key;
      const choices = [correct];
      // pick distractors from pool
      const poolChoices = pool.filter(p=>p.toLowerCase()!==correct.toLowerCase());
      shuffle(poolChoices);
      for (let j=0;j<3 && j<poolChoices.length;j++) choices.push(poolChoices[j]);
      if (choices.length<4) continue;
      shuffle(choices);
      results.push({stem,choices,answer:correct});
      i++;
    }
    renderMCQs(results);
  }

  // Request high-quality MCQs from server-side LLM endpoint, fallback to local heuristic
  async function requestMCQs(){
    const endpoint = window.LLM_ENDPOINT || 'http://localhost:3456/generate';
    const text = extractReadableText();
    const payload = { type: 'mcq', text, count: 5 };
    const out = document.getElementById('tools-results');
    out.innerHTML = '<h3>MCQs</h3><p>Requesting high-quality MCQs...</p>';
    try{
      const headers = { 'Content-Type':'application/json' };
      if (window.LLM_CLIENT_KEY) headers['x-api-key'] = window.LLM_CLIENT_KEY;
      const res = await fetch(endpoint, {
        method: 'POST', headers, body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('LLM endpoint error');
      const data = await res.json();
      const items = data.items || [];
      if (!items.length) throw new Error('No items returned');
      // Normalize items: expect { title, choices, answer } or raw text
      const normalized = items.map(it => {
        if (typeof it === 'string') return { stem: it, choices: [], answer: '' };
        if (it.stem || it.question) return { stem: it.stem || it.question, choices: it.choices || [], answer: it.answer || it.correct };
        if (it.title && it.choices) return { stem: it.title, choices: it.choices, answer: it.answer };
        return { stem: JSON.stringify(it), choices: [], answer: '' };
      });
      renderMCQs(normalized);
    }catch(err){
      console.warn('LLM MCQ request failed, falling back to local generator', err);
      // fallback: heuristic generator
      generateMCQs();
      // add note
      const out2 = document.getElementById('tools-results');
      const note = document.createElement('p'); note.className='note'; note.textContent='(Fell back to local MCQ generator)';
      out2.appendChild(note);
    }
  }

  function extractSentences(){
    const text = extractReadableText();
    const raw = text.replace(/\s+/g,' ').trim();
    const sents = raw.split(/(?<=[\.\?\!])\s+/).map(s=>s.trim()).filter(s=>s.length>20);
    return sents;
  }

  function gatherKeyWords(sentences){
    const words = {};
    sentences.forEach(s => {
      s.split(/\W+/).forEach(w => {
        if (w.length>5 && !/\d/.test(w)) words[w] = (words[w]||0)+1;
      });
    });
    const list = Object.keys(words).sort((a,b)=> words[b]-words[a]);
    return list.slice(0,50);
  }

  function chooseKeyWord(sentence){
    const words = sentence.split(/\W+/).filter(w=>w.length>5 && !/\d/.test(w));
    if (!words.length) return null;
    // prefer longest
    words.sort((a,b)=>b.length-a.length);
    return words[0];
  }

  function renderMCQs(list){
    const out = document.getElementById('tools-results');
    out.innerHTML = '<h3>MCQs</h3>' + list.map((q,idx)=>{
      return `<div class="mcq"><div class="stem">${idx+1}. ${q.stem}</div><ul>` + q.choices.map(c=>`<li>${c}</li>`).join('') + `</ul></div>`;
    }).join('') + '<p class="note">Note: Review these questions before use.</p>';
  }

  function generateCase(){
    const sents = extractSentences();
    const title = document.title || '';
    const intro = sents[0] || '';
    const fact = sents.find(s=>/lymph|node|drain|breast|axilla|internal/i.test(s)) || sents[1] || '';
    const age = 35 + Math.floor(Math.random()*30);
    const side = Math.random()>0.5 ? 'right' : 'left';
    const vignette = `A ${age}-year-old patient presents with a mass in the ${side} breast. ${intro} ${fact}`;
    // produce two MCQs using same heuristic
    const sentences = [intro,fact].filter(Boolean);
    const qlist = [];
    sentences.forEach(s => {
      const key = chooseKeyWord(s);
      if (!key) return;
      const stem = s.replace(new RegExp('\\b'+escapeRegExp(key)+'\\b','i'), '____');
      const pool = gatherKeyWords(sentences.concat([intro,fact])); shuffle(pool);
      const choices = [key].concat(pool.filter(p=>p.toLowerCase()!==key.toLowerCase()).slice(0,3)); shuffle(choices);
      qlist.push({stem,choices,answer:key});
    });
    const out = document.getElementById('tools-results');
    out.innerHTML = `<h3>Clinical case</h3><p class="case">${vignette}</p>` + qlist.map((q,idx)=>`<div class="mcq"><div class="stem">${idx+1}. ${q.stem}</div><ul>` + q.choices.map(c=>`<li>${c}</li>`).join('') + `</ul></div>`).join('');
  }

  // Request clinical case + MCQs from LLM endpoint (fallback to local)
  async function requestClinicalCase(){
    const endpoint = window.LLM_ENDPOINT || 'http://localhost:3456/generate';
    const text = extractReadableText();
    const payload = { type: 'case', text, count: 2 };
    const out = document.getElementById('tools-results');
    out.innerHTML = '<h3>Clinical case</h3><p>Requesting clinical case...</p>';
    try{
      const headers = { 'Content-Type':'application/json' };
      if (window.LLM_CLIENT_KEY) headers['x-api-key'] = window.LLM_CLIENT_KEY;
      const res = await fetch(endpoint, { method:'POST', headers, body:JSON.stringify(payload)});
      if (!res.ok) throw new Error('LLM error');
      const data = await res.json();
      const items = data.items || [];
      if (!items.length) throw new Error('No items');
      // display raw or structured
      out.innerHTML = '<h3>Clinical case</h3>' + items.map(it => {
        if (typeof it === 'string') return `<div class="case">${it}</div>`;
        if (it.case) return `<div class="case">${it.case}</div>` + (it.qs? '<div>'+JSON.stringify(it.qs)+'</div>':'');
        return `<pre>${JSON.stringify(it,null,2)}</pre>`;
      }).join('');
    }catch(e){
      console.warn('LLM clinical case request failed, falling back');
      generateCase();
      const out2 = document.getElementById('tools-results');
      const note = document.createElement('p'); note.className='note'; note.textContent='(Fell back to local clinical case generator)';
      out2.appendChild(note);
    }
  }

  function generateExamQuestion(){
    const sents = extractSentences();
    const candidate = sents.find(s=>s.length>60) || sents[0] || document.title;
    const out = document.getElementById('tools-results');
    out.innerHTML = `<h3>Potential Exam Question</h3><div class="exam-box">Describe: ${candidate}</div>`;
  }

  // small utils
  function shuffle(a){ for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

  // Initialize UI and styles
  function injectStyles(){
    const css = `
    .topic-tools{border-top:1px dashed #e5e7eb;padding:12px 0;margin-top:18px}
    .topic-tools button{margin-right:8px;padding:8px 10px;border-radius:6px;border:1px solid #e6edf8;background:#fff}
    .topic-tools .results{margin-top:12px}
    .mcq{background:#fff;padding:8px;border-radius:6px;margin-bottom:8px;border:1px solid #eef2f6}
    .exam-box{background:#fffbeb;border-left:4px solid #f59e0b;padding:10px;border-radius:4px}
    .case{background:#f0f9ff;padding:10px;border-radius:6px;border:1px solid #e6f2ff}
    `;
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  }

  // Start
  injectStyles();
  createUI();
})();
