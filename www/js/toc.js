const tocList = document.getElementById("toc-list");
const content = document.getElementById("content");

// Optional whitelist: if `window.TOC_WHITELIST` is set to an array of strings,
// only headings matching those strings (case-insensitive, substring) will be shown.
const whitelist = (window.TOC_WHITELIST || []).map(s => String(s).toLowerCase().trim()).filter(Boolean);

function isCandidateHeading(p){
  if(!p || p.nodeType !== 1 || p.tagName !== 'P') return false;
  if (p.querySelector('img')) return false;
  const txt = p.textContent.trim();
  if (!txt) return false;
  if (txt.length > 80) return false;
  if (txt.split(/\s+/).length > 8) return false;
  if (/[\.\?\!]$/.test(txt)) return false;
  return true;
}

let tocIndex = 0;
const tocItems = [];

// Walk content child nodes and convert short <p> headings into generated headings
// Only do this if content element exists (i.e., on topic pages, not TOC pages)
if (content) {
const children = Array.from(content.childNodes);
for(let i=0;i<children.length;i++){
  const node = children[i];
  if (node.nodeType === 1 && node.tagName === 'P' && isCandidateHeading(node)){
    const heading = document.createElement('h2');
    heading.className = 'generated-heading';
    const id = 'sec-' + (tocIndex++);
    heading.id = id;
    heading.innerHTML = node.innerHTML;
    if (node.querySelector && node.querySelector('strong')){
      heading.classList.add('important-heading');
    }
    node.replaceWith(heading);

    // collect following nodes into a collapsible div until the next candidate heading
    const section = document.createElement('div');
    section.className = 'collapsible';

    let next = heading.nextSibling;
    while(next && !(next.nodeType===1 && next.tagName==='P' && isCandidateHeading(next))){
      const toMove = next;
      next = next.nextSibling;
      section.appendChild(toMove);
    }

    // If section has children, insert it after the heading
    if (section.childNodes.length){
      heading.parentNode.insertBefore(section, heading.nextSibling);
    }

    // add TOC entry (respect whitelist if provided)
    const textLower = heading.textContent.toLowerCase();
    const allowed = whitelist.length === 0 || whitelist.some(w => textLower.includes(w));
    if (allowed){
      const li = document.createElement('li');
      li.textContent = heading.textContent;
      li.dataset.target = id;
      li.onclick = () => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      tocList.appendChild(li);
      tocItems.push({id, heading, li, section});
    }
  }
}

// Make headings clickable to toggle collapsible section
tocItems.forEach(item => {
  const {heading, section, li} = item;
  if (section){
    // start collapsed (open by default is fine for first item)
    section.style.maxHeight = section.scrollHeight + 'px';
    let open = true;
    heading.style.cursor = 'pointer';
    heading.onclick = () => {
      open = !open;
      if (open){
        section.style.maxHeight = section.scrollHeight + 'px';
      } else {
        section.style.maxHeight = '0px';
      }
    };
  }
});

// Highlight active TOC entry while scrolling
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const found = tocItems.find(t=>t.id===id);
    if (!found) return;
    if (entry.isIntersecting){
      tocItems.forEach(t=> t.li.classList.remove('active'));
      found.li.classList.add('active');
    }
  });
}, { root: content, rootMargin: '0px 0px -40% 0px', threshold: 0 });

tocItems.forEach(t=> observer.observe(t.heading));

// If there were no detected headings, fallback to original h1/h2 behavior
if (tocItems.length === 0){
  if (whitelist.length > 0){
    // No matching headings found — show placeholders that scroll to the top of content.
    whitelist.forEach(w => {
      const li = document.createElement('li');
      li.classList.add('placeholder');
      li.textContent = w.replace(/(^|\s)\w/g, c => c.toUpperCase());
      li.onclick = () => content.scrollIntoView({ behavior: 'smooth' });
      tocList.appendChild(li);
    });
  } else {
    const headers = document.querySelectorAll('#content h1, #content h2');
    headers.forEach((header, index) => {
      const id = 'sec-fallback-' + index;
      header.id = id;
      const li = document.createElement('li');
      li.textContent = header.textContent;
      li.onclick = () => document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
      tocList.appendChild(li);
    });
  }
}
} // end if (content)

// Additionally, try to load pre-generated TOC JSON for Upper limb
async function loadGeneratedUpperLimb(){
  try{
    console.log('Loading TOC from data/toc.json...');
    const res = await fetch('data/toc.json', {cache: 'no-store'});
    console.log('Fetch response:', res.ok, res.status);
    if (!res.ok) return;
    const data = await res.json();
    console.log('TOC data loaded:', data);
    
    // Handle both old array format and new object format
    let list = [];
    if (Array.isArray(data)) {
      list = data;
    } else if (data && typeof data === 'object') {
      // New format: { "upper-limb": [...], "thorax": [...], ... }
      // Get the region from the page URL or default to 'upper-limb'
      const region = window.location.pathname.match(/\/([^\/]+)\.html$/)?.[1] || 'upper-limb';
      list = data[region] || [];
    }
    
    if (!list || list.length === 0) return;

    // Clear existing TOC and load topics from JSON instead
    tocList.innerHTML = '';

    list.forEach(item => {
      const li = document.createElement('li');
      li.className = 'toc-item';
      
      const link = document.createElement('a');
      link.className = 'toc-link';
      // Add a cache-busting query param to ensure fresh HTML loads in production
      const versionParam = `v=${new Date().toISOString().slice(0,10).replace(/-/g,'')}`; // e.g., 20260111
      link.href = `${item.url}?${versionParam}`;
      
      // Clean up HTML tags from title
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = item.title;
      const cleanTitle = tempDiv.textContent || tempDiv.innerText || item.title;
      link.textContent = cleanTitle;
      
      li.appendChild(link);
      tocList.appendChild(li);
    });
  }catch(e){
    // ignore fetch errors
  }
}

loadGeneratedUpperLimb();

// If a structured TOC is provided, render it and wire items to generated headings when possible.
function renderTOCStructure(){
  if (!content) return; // Only for topic pages with content
  const structure = window.TOC_STRUCTURE;
  if (!structure || typeof structure !== 'object') return;
  // clear existing list
  tocList.innerHTML = '';

  Object.keys(structure).forEach(sectionName => {
    const headerLi = document.createElement('li');
    headerLi.textContent = sectionName;
    headerLi.classList.add('toc-section-header');
    tocList.appendChild(headerLi);

    const subitems = Array.isArray(structure[sectionName]) ? structure[sectionName] : [];
    subitems.forEach(sub => {
      const li = document.createElement('li');
      li.textContent = sub;
      li.classList.add('toc-subitem');

      // try to find a matching generated heading to scroll to
      const match = tocItems.find(t => t.heading.textContent.toLowerCase().includes(sub.toLowerCase()));
      if (match){
        li.onclick = () => document.getElementById(match.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // fallback: scroll to main content
        li.onclick = () => content.scrollIntoView({ behavior: 'smooth' });
      }

      tocList.appendChild(li);
    });
  });
}

renderTOCStructure();
