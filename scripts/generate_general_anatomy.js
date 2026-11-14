const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');
const JSZip = require('jszip');
const mammoth = require('mammoth');
const cheerio = require('cheerio');

const bookFile = 'General Anatomy Kindle.docx';
const word = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const math = 'http://schemas.openxmlformats.org/officeDocument/2006/math';
const xml = 'http://www.w3.org/XML/1998/namespace';
const chapterMarker = 'ANATOMY_BOOK_CHAPTER_';
const boxStart = 'ANATOMY_BOOK_BOX_START_';
const boxEnd = 'ANATOMY_BOOK_BOX_END';

function descendants(node, namespace, name) {
  return Array.from(node.getElementsByTagNameNS(namespace, name));
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function wordRun(doc, value, alignment) {
  const run = doc.createElementNS(word, 'w:r');
  if (alignment) {
    const properties = doc.createElementNS(word, 'w:rPr');
    const vertical = doc.createElementNS(word, 'w:vertAlign');
    vertical.setAttributeNS(word, 'w:val', alignment);
    properties.appendChild(vertical);
    run.appendChild(properties);
  }
  const text = doc.createElementNS(word, 'w:t');
  text.setAttributeNS(xml, 'xml:space', 'preserve');
  text.appendChild(doc.createTextNode(value));
  run.appendChild(text);
  return run;
}

function marker(doc, value) {
  const paragraph = doc.createElementNS(word, 'w:p');
  paragraph.appendChild(wordRun(doc, value));
  return paragraph;
}

// Keep the book's inline math text and its super/subscripts through conversion.
function mathRuns(doc, node, alignment) {
  if (node.namespaceURI !== math) throw new Error('Unsupported equation content');
  if (node.localName === 'r') {
    return [wordRun(doc, descendants(node, math, 't').map(el => el.textContent).join(''), alignment)];
  }
  const children = Array.from(node.childNodes).filter(child => child.nodeType === 1);
  switch (node.localName) {
    case 'oMath':
    case 'e':
      return children.flatMap(child => mathRuns(doc, child, alignment));
    case 'sSub':
    case 'sSup':
    case 'sSubSup':
      return children.filter(child => ['e', 'sub', 'sup'].includes(child.localName))
        .flatMap(child => mathRuns(doc, child, alignment));
    case 'sub':
    case 'sup':
      return children.flatMap(child => mathRuns(doc, child,
        node.localName === 'sub' ? 'subscript' : 'superscript'));
    default:
      throw new Error(`Unsupported Word equation element: ${node.localName}`);
  }
}

function prepareBook(doc) {
  const body = descendants(doc, word, 'body')[0];
  const contents = Array.from(body.childNodes).find(node =>
    node.namespaceURI === word && node.localName === 'sdt' &&
    descendants(node, word, 'instrText').some(field => /^TOC\b/.test(field.textContent.trim()))
  );
  if (!contents) throw new Error('The General Anatomy book needs a Word table of contents');

  const chapters = [{ title: 'About this book', file: 'about-the-book.html' }];
  const bookmarks = new Map(descendants(body, word, 'bookmarkStart')
    .map(node => [node.getAttributeNS(word, 'name'), node]));
  const seenFiles = new Set(chapters.map(chapter => chapter.file));
  let previousBlock = -1;
  const blocks = Array.from(body.childNodes);

  for (const paragraph of descendants(contents, word, 'p')) {
    const style = descendants(paragraph, word, 'pStyle')[0];
    if (style?.getAttributeNS(word, 'val').toLowerCase() !== 'toc1') continue;
    const link = descendants(paragraph, word, 'hyperlink')[0];
    if (!link) continue;
    const anchor = link.getAttributeNS(word, 'anchor');
    const titleRuns = [];
    for (const run of descendants(link, word, 'r')) {
      if (descendants(run, word, 'tab').length || descendants(run, word, 'fldChar').length) break;
      titleRuns.push(...descendants(run, word, 't').map(node => node.textContent));
    }
    const title = titleRuns.join('').replace(/\s+/g, ' ').trim();
    const file = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.html';
    let block = bookmarks.get(anchor);
    while (block?.parentNode && block.parentNode !== body) block = block.parentNode;
    const position = blocks.indexOf(block);
    if (file === '.html' || file === 'index.html' || seenFiles.has(file) || position <= previousBlock) {
      throw new Error(`Invalid or out-of-order General Anatomy TOC entry: ${title} (${anchor})`);
    }
    body.insertBefore(marker(doc, chapterMarker + chapters.length), block);
    chapters.push({ title, file, anchor });
    seenFiles.add(file);
    previousBlock = position;
  }
  if (chapters.length < 2) throw new Error('No chapter links found in the Word table of contents');
  body.removeChild(contents);

  for (const equation of descendants(body, math, 'oMath')) {
    const parent = equation.parentNode;
    for (const run of mathRuns(doc, equation)) parent.insertBefore(run, equation);
    parent.removeChild(equation);
  }

  // Mammoth extracts floating text boxes after their anchor paragraph. Mark
  // their ranges so the website can keep each box together as one block.
  for (const box of descendants(body, word, 'txbxContent')) {
    const label = descendants(box, word, 't').map(node => node.textContent).join('').trim();
    const kind = /^case based questions\b/i.test(label) ? 'clinical-box' : 'note-box';
    box.insertBefore(marker(doc, boxStart + kind), box.firstChild);
    box.appendChild(marker(doc, boxEnd));
  }
  return chapters;
}

function wrapPage(title, content, breadcrumb) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | Anatomy Learning Hub</title>
  <link rel="stylesheet" href="../../css/anatomy-modern.css">
  <link rel="stylesheet" href="../../css/reading-section.css">
</head>
<body class="reading-section">
  <main class="reading-panel">
    <nav aria-label="Breadcrumb">${breadcrumb}</nav>
    ${content}
  </main>
</body>
</html>
`;
}

function chapterLink(chapter, prefix = '', suffix = '') {
  return `<a href="${chapter.file}">${prefix}${escapeHtml(chapter.title)}${suffix}</a>`;
}

function buildPages(html, chapters) {
  const $ = cheerio.load(html);
  const body = $('body');
  body.find('p').each((_, element) => {
    const start = $(element);
    const label = start.text();
    if (!label.startsWith(boxStart)) return;
    const siblings = start.nextAll().toArray();
    const end = siblings.findIndex(node => $(node).text() === boxEnd);
    if (end < 0) throw new Error('A text box lost its closing marker during conversion');
    const box = $('<aside></aside>').addClass(label.slice(boxStart.length));
    start.replaceWith(box);
    box.append(siblings.slice(0, end));
    $(siblings[end]).remove();
    if (box.find('aside').length) throw new Error('Unexpected nested text box');
  });
  body.find('table').wrap('<div class="reading-table"></div>');
  body.find('img').attr({ loading: 'lazy', decoding: 'async' });

  const sections = chapters.map(() => $('<div></div>'));
  let index = 0;
  for (const element of body.contents().toArray()) {
    const label = $(element).text();
    if (element.name === 'p' && label.startsWith(chapterMarker)) {
      if (label !== chapterMarker + (index + 1)) throw new Error('Unexpected chapter boundary');
      index++;
    } else {
      sections[index].append(element);
    }
  }
  if (index !== chapters.length - 1) throw new Error('A chapter boundary was lost during conversion');

  const anchorFiles = new Map();
  sections.forEach((section, i) => section.find('[id]').each((_, el) =>
    anchorFiles.set($(el).attr('id'), chapters[i].file)));

  const home = '<a href="../../index.html">← Home</a>';
  const book = '<a href="index.html">General Anatomy</a>';
  const pages = new Map();
  const contents = [
    ...chapters.slice(1),
    { title: 'Clinical Reasoning Questions', file: 'clinical-reasoning-questions.html' }
  ];
  const list = contents.map(chapter => `<li>${chapterLink(chapter)}</li>`).join('\n');
  pages.set('index.html', wrapPage('General Anatomy',
    `<h1>General Anatomy</h1>
    <p>Foundations of anatomy by Dr. Viveka S. ${chapterLink(chapters[0])}</p>
    <h2>Contents</h2>
    <ol class="reading-index">${list}</ol>`, home));

  chapters.forEach((chapter, i) => {
    const section = sections[i];
    if (chapter.anchor) {
      const heading = section.children().first();
      if (heading.text().trim().replace(/\s+/g, ' ') !== chapter.title ||
          !heading.find('a').toArray().some(el => $(el).attr('id') === chapter.anchor)) {
        throw new Error(`Could not verify the first heading in ${chapter.title}`);
      }
      if (!heading.is('h1')) heading.replaceWith($('<h1></h1>').append(heading.contents()));
    } else {
      section.prepend($('<h1></h1>').text(chapter.title));
    }

    section.find('a[href^="#"]').each((_, el) => {
      const href = $(el).attr('href');
      const target = anchorFiles.get(href.slice(1));
      if (!target) throw new Error(`Unresolved bookmark: ${href}`);
      if (target !== chapter.file) $(el).attr('href', target + href);
    });

    const previous = chapters[i - 1];
    const next = chapters[i + 1];
    const neighbors = `<nav class="reading-neighbors" aria-label="Chapter navigation">
    ${previous ? chapterLink(previous, '← ') : book}
    ${next ? chapterLink(next, '', ' →') : book}
    </nav>`;
    pages.set(chapter.file, wrapPage(chapter.title, section.html() + neighbors, `${home} / ${book}`));
  });
  return pages;
}

async function generateGeneralAnatomy(folder) {
  const zip = await JSZip.loadAsync(await fs.readFile(path.join(folder, bookFile)));
  const doc = new DOMParser().parseFromString(await zip.file('word/document.xml').async('string'), 'text/xml');
  const chapters = prepareBook(doc);
  zip.file('word/document.xml', new XMLSerializer().serializeToString(doc));

  const images = new Map();
  const { value, messages } = await mammoth.convertToHtml({ buffer: await zip.generateAsync({ type: 'nodebuffer' }) }, {
    styleMap: ['note-box', 'clinical-box'].map(name => `p[style-name='${name}'] => div.${name}:fresh`),
    convertImage: mammoth.images.imgElement(async image => {
      const extension = { 'image/png': 'png', 'image/jpeg': 'jpg' }[image.contentType];
      if (!extension) throw new Error(`Unsupported book image type: ${image.contentType}`);
      const bytes = await image.read();
      const file = createHash('sha256').update(bytes).digest('hex').slice(0, 20) + '.' + extension;
      images.set(file, bytes);
      return { src: 'images/' + file };
    })
  });
  const failures = messages.filter(message => message.type === 'error');
  if (failures.length) throw new Error(failures.map(message => message.message).join('\n'));
  const pages = buildPages(value, chapters);
  const imageFolder = path.join(folder, 'images');
  await fs.mkdir(imageFolder, { recursive: true });
  for (const [file, bytes] of images) await fs.writeFile(path.join(imageFolder, file), bytes);
  for (const [file, html] of pages) await fs.writeFile(path.join(folder, file), html);
  console.log(`Generated General Anatomy: ${chapters.length - 1} sections and ${images.size} image assets`);
  return chapters.map(chapter => ({ title: chapter.title, url: `content/general-anatomy/${chapter.file}` }));
}

module.exports = { bookFile, generateGeneralAnatomy };
