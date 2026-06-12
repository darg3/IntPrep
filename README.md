# IntPrep — Junior Developer Interview Flashcards

A vanilla HTML/CSS/JavaScript web app (works on desktop and mobile) with ~600 flashcards to prepare for junior software engineer interviews in 2026.

## Run it

No build step and no server needed — open `index.html` in any browser.

Optionally serve it (nicer on mobile via your LAN):

```
npx http-server .
```

## What's inside

| Category | Focus |
|---|---|
| HTML | Semantics, forms, accessibility, meta tags, script loading |
| CSS | Box model, specificity, flexbox, grid, responsive design |
| JavaScript | Basics (types, scope, arrays, DOM) + advanced (closures, event loop, promises, `this`, prototypes) |
| CS50 | C, pointers, memory, data structures (incl. tries), algorithms, Big-O, SQL, Python |
| AI Prompts | Prompt engineering from basic to advanced + using AI assistants responsibly as a junior |
| Interview | The most-asked cross-cutting questions (debugging method, OOP, REST/HTTP, git, testing…) |

Three card types: **multiple choice** (a–d, instant feedback), **open questions** (answer aloud like in an interview, then self-assess), and **code snippets** (predict the output / spot the bug / fill in the blank). Every card has a **Show solution** button with the answer and an explanation.

Progress (answers, self-assessments, filters, position) is saved in `localStorage`. Keyboard: `←`/`→` navigate, `S` toggles the solution, `A`–`D` answer multiple choice.

## Project structure

```
index.html              page skeleton
css/
  base.css              design tokens, reset, typography
  layout.css            page structure
  components.css        cards, chips, buttons, options, solution panel
  media-queries.css     ALL responsive + dark-mode rules (kept separate on purpose)
js/
  utils.js              helpers (escaping, formatting, shuffle)
  storage.js            localStorage persistence
  state.js              filters, deck order, progress
  quiz.js               multiple-choice logic
  flashcards.js         card rendering + solution panel
  filters.js            filter bar UI
  app.js                bootstrap + keyboard shortcuts
  data/                 one question-bank file per topic + index.js aggregator
tools/
  validate-data.js      schema validator — node tools/validate-data.js
```

## Adding questions

Append objects to any file in `js/data/` (or add a new bank file plus a `<script>` tag in `index.html` — `data/index.js` picks up new banks automatically). Schema:

```js
{
  id: "jsb-026",                  // unique
  category: "javascript",         // html | css | javascript | cs50 | ai | interview
  difficulty: "basic",            // basic | medium | advanced
  type: "mcq",                    // mcq | open | code
  question: "Text, `inline code` allowed",
  code: null,                     // or a snippet string with \n newlines
  options: { a: "...", b: "...", c: "...", d: "..." },  // mcq only, else null
  answer: "b",                    // mcq only, else null
  solution: "Answer + explanation shown by the Show solution button"
}
```

Then run `node tools/validate-data.js` to check the schema.
