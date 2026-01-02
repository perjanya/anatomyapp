(function(){
  // Default topics (used as fallback if remote JSON isn't available)
  let topics = [ 'Upper limb', 'Lower limb', 'Thorax', 'Abdomen', 'Head and neck', 'Embryology', 'Histology' ];
  let subtopics = {
    'Upper limb': [ 'Clavipectoral fascia', "Surgical anatomy of breast", 'Lymphatic drainage of breast', 'Shoulder joint' ],
    'Lower limb': ['Hip joint','Thigh compartments'],
    'Thorax': ['Mediastinum','Pleura'],
    'Abdomen': ['Peritoneum','Inguinal canal'],
    'Head and neck': ['Facial nerve','Scalp'],
    'Embryology': ['Pharyngeal arches','Limb development'],
    'Histology': ['Epithelia','Connective tissue']
  };

  // Try to load remote JSON index so topics can be updated without rebuilding the app.
  // Expected JSON formats supported (flexible):
  // 1) { "topics": ["Upper limb", ...], "subtopics": { "Upper limb": ["a","b"] } }
  // 2) [ { "section":"Upper limb", "items": [ {"title":"Lymphatic...","url":"content/upper-limb/.."}, ... ] }, ... ]
  async function loadRemoteTopics(){
    const urls = [ '../data/toc-mobile.json', '../data/toc.json', '../data/toc-topics.json' ];
    for (const u of urls){
      try{
        const res = await fetch(u, {cache: 'no-store'});
        if (!res.ok) continue;
        const data = await res.json();
        // Format 1
        if (data && data.topics && Array.isArray(data.topics)){
          topics = data.topics;
          subtopics = Object.assign({}, subtopics, data.subtopics || {});
          console.info('Loaded topics from', u);
          buildTopicCards();
          return;
        }
        // Format 2
        if (Array.isArray(data)){
          topics = data.map(s => s.section || s.title).filter(Boolean);
          // convert into subtopics map
          const map = {};
          data.forEach(s => {
            const name = s.section || s.title;
            if (!name) return;
            map[name] = (s.items || []).map(it => (typeof it === 'string' ? { title: it } : it));
          });
          // convert items to simple titles for compatibility
          Object.keys(map).forEach(k => {
            subtopics[k] = map[k].map(it => (it && it.title) ? it.title : String(it));
          });
          console.info('Loaded structured topics from', u);
          buildTopicCards();
          return;
        }
      }catch(e){
        // ignore, try next
      }
    }
    console.info('No remote topics found, using bundled defaults');
    buildTopicCards();
  }

  const grid = document.querySelector('.grid');
  const homeScreen = document.getElementById('home');
  const topicScreen = document.getElementById('topic');
  const topicTitle = document.getElementById('topic-title');
  const sublist = document.getElementById('sublist');
  const backBtn = document.getElementById('backBtn');
  const toast = document.getElementById('toast');

  function showToast(msg, t=1800){
    toast.textContent = msg; toast.classList.remove('hidden');
    setTimeout(()=> toast.classList.add('hidden'), t);
  }

  // build topic cards
  function buildTopicCards(){
    grid.innerHTML = '';
    topics.forEach(t => {
      const el = document.createElement('button');
      el.className = 'card'; el.textContent = t;
      el.onclick = () => openTopic(t);
      grid.appendChild(el);
    });
  }

  function openTopic(name){
    topicTitle.textContent = name;
    // populate subtopics
    sublist.innerHTML = '';
    const items = subtopics[name] || [];
    items.forEach(s => {
      const li = document.createElement('li');
      li.textContent = (typeof s === 'string') ? s : (s.title || s.name || JSON.stringify(s));
      li.onclick = () => openSubtopic(name, s);
      sublist.appendChild(li);
    });
    homeScreen.classList.add('hidden');
    topicScreen.classList.remove('hidden');
  }

  function openSubtopic(topic, sub){
    // If a site page exists linking to local index, try to open it.
    // For known mapping, open 'index.html' and let its TOC or headings handle navigation.
    const name = (typeof sub === 'string') ? sub : (sub.title || sub.name);
    // If sub has url property, open it directly
    if (sub && typeof sub === 'object' && sub.url){
      const url = sub.url.startsWith('http') ? sub.url : (sub.url.startsWith('/') ? sub.url : ('../' + sub.url));
      window.open(url, '_blank');
      showToast('Opening ' + name);
      return;
    }

    // Try to find a generated site page by slug mapping
    // naive slug: lowercase, replace spaces with hyphens
    const slug = String(name).toLowerCase().replace(/[\s\/]+/g,'-').replace(/[^a-z0-9\-]/g,'');
    // try content folders
    const candidate = `../content/${topic.toLowerCase().replace(/\s+/g,'-')}/${slug}.html`;
    fetch(candidate, {method:'HEAD'}).then(r => {
      if (r.ok){ window.open(candidate, '_blank'); showToast('Opening ' + name); }
      else {
        // fallback to main index or show coming soon
        showToast(name + ' — content coming soon');
      }
    }).catch(()=> showToast(name + ' — content coming soon'));
  }

  backBtn.onclick = () => {
    topicScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
  };

  // start: try to load remote topics, then build UI
  loadRemoteTopics();

  // register service worker (optional, used later for push/offline)
  if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then(()=> console.info('SW registered')).catch(()=>{});
  }

})();
