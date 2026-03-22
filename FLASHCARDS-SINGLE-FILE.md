# Single-File Flashcards

This project supports keeping all flashcards in one file.

## 1. Flashcard Format

Edit:

`www/data/flashcards-data.js`

Each topic is stored under a slug key:

```js
var flashcardsData = {
  "topic-slug": [
    {
      q: "Question text",
      a: "Answer text. HTML is allowed: <strong>bold</strong>, <ul><li>lists</li></ul>",
      svg: null
    },
    {
      q: "Another question",
      a: "Another answer",
      svg: "artery"
    }
  ]
};
```

Allowed `svg` values:

- `null`
- `"artery"`
- `"nerve"`
- `"bone"`
- `"muscle"`
- `"heart"`

## 2. Where To Place The File

Use this single file:

`www/data/flashcards-data.js`

Do not put flashcards inside the `.docx` if you want the current system to pick them up.

## 3. Slug Rule

Take the topic HTML filename and convert it as follows:

1. Remove `.html`
2. Convert to lowercase
3. Replace `&` with `and`
4. Remove apostrophes
5. Replace spaces and punctuation runs with `-`
6. Remove leading/trailing `-`

Examples:

- `Inguinal canal.html` -> `inguinal-canal`
- `Surgical anatomy of stomach.html` -> `surgical-anatomy-of-stomach`
- `Gall bladder and cystic duct.html` -> `gall-bladder-and-cystic-duct`

## 4. Step By Step

1. Open `www/data/flashcards-data.js`
2. Find or create the topic slug
3. Add an array of cards under that slug
4. Save the file
5. Open the topic HTML page
6. Click the `Flashcards` button

No HTML regeneration is needed if you are only editing flashcard content.

## 5. Example

```js
"parts-of-duodenum": [
  {
    q: "Name the four parts of the duodenum.",
    a: "Superior, descending, horizontal, and ascending parts.",
    svg: null
  },
  {
    q: "Which part of the duodenum is the longest?",
    a: "The second (descending) part is the longest part.",
    svg: null
  }
]
```
