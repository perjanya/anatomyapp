Overview

This small toolchain helps keep the TOC in the site up-to-date from a directory of topic files (Word `.docx`, Markdown `.md`, or `.html`).

How it works

- Put topic files into `content/upper-limb/`.
- Run `npm run gen-toc` to generate HTML pages (for `.docx`/`.md`) and a JSON index at `data/toc-upper-limb.json`.
- The front-end `js/toc.js` will attempt to fetch `data/toc-upper-limb.json` and add those items under the "Upper limb" group in the TOC.

Quick start

1. Install Node.js (v16+ recommended).
2. From the site folder run:

```bash
npm install
npm run gen-toc
```

3. Open `index.html` in your browser. The TOC will include the generated topics.

Notes

- The generator produces `.html` copies of `.docx` and `.md` files in `content/upper-limb/` next to the source files.
- You can re-run `npm run gen-toc` whenever you add or modify topic files. For an automatic watcher, add a file watcher (not included here).

