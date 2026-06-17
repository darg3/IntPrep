# IntPrep — Junior Developer Interview Flashcards

A vanilla HTML/CSS/JavaScript web app with ~600 flashcards to prepare for junior software engineer interviews. Optimized for desktop, tablet, and mobile with a responsive design, dark mode, and persistent progress tracking.

## Quick Start

### Option 1: Open locally (instant, no server needed)
```bash
# Open index.html in your browser
# On macOS: open index.html
# On Windows: start index.html
# On Linux: xdg-open index.html
```

### Option 2: Serve locally (recommended for mobile testing)
```bash
# Requires Node.js
npx http-server .

# Then open http://localhost:8080 in your browser
# On mobile: http://<YOUR_IP>:8080 (find YOUR_IP with `ipconfig` or `ifconfig`)
```

### Option 3: Add to home screen (iOS/Android)
1. Open in Safari (iOS) or Chrome (Android)
2. Tap **Share** → **Add to Home Screen**
3. Launch the app from your home screen for full-screen experience

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

Progress (answers, self-assessments, filters, position) is saved in `localStorage`.

## Controls

### Keyboard (desktop)
- **←** / **→**: Navigate between cards
- **S**: Show/hide solution
- **A**–**D**: Answer multiple choice questions

### Touch (mobile/tablet)
- **Swipe left/right**: Navigate between cards (or use Previous/Next buttons)
- **Tap "Show solution"**: Toggle solution visibility
- **Tap option**: Select answer (instant feedback)

## Features

- **Responsive design**: Optimized for phones (320px+), tablets, and desktops
- **Dark mode**: Automatically follows system preference
- **Category filters**: Choose specific topics or mixed sets
- **Difficulty levels**: Basic, Medium, Advanced
- **Question types**: Multiple choice, open questions, code snippets
- **Search**: Find questions by keyword
- **Progress tracking**: Keeps track of mastered, reviewed, and unseen cards
- **Dashboard**: Training time (active study time) and accuracy stats in one panel
- **Shuffle mode**: Randomize card order for varied practice
- **Reset option**: Clear progress and start fresh
- **Keyboard navigation**: Efficient desktop workflow
- **Touch-optimized**: 44px+ tap targets on mobile devices

## Project Structure

```
index.html              Page skeleton with meta tags for mobile
css/
  base.css              Design tokens, reset, typography, focus states
  layout.css            Page structure (header, main, nav, footer)
  components.css        Cards, chips, buttons, filters, solution panel
  media-queries.css     All responsive rules + dark mode + safe areas
js/
  utils.js              Helpers (escaping, formatting, shuffle)
  storage.js            localStorage persistence
  state.js              Filters, deck order, progress tracking
  quiz.js               Multiple-choice logic
  flashcards.js         Card rendering + solution panel
  filters.js            Filter bar UI and search
  sets.js               Predefined question set combinations
  sets-ui.js            Set selector UI
  timer.js              Active study-time tracking (idle-paused)
  dashboard.js          Dashboard modal: training time + accuracy
  app.js                Bootstrap + keyboard shortcuts
  data/                 One question-bank file per topic
    index.js            Aggregates all question banks
    [topic]-questions.js Question data for each category
tools/
  validate-data.js      Schema validator (run: node tools/validate-data.js)
```

## Browser Support

| Browser | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Chrome/Edge | ✅ | ✅ | ✅ |
| Safari | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ |
| Samsung Internet | ✅ | — | — |

All modern browsers supporting ES6+, CSS Grid, and CSS Custom Properties.

## Adding Questions

Append objects to any file in `js/data/` (or create a new one and add a `<script>` tag in `index.html` — `data/index.js` picks up new banks automatically).

Schema:
```js
{
  id: "jsb-026",                  // unique identifier
  category: "javascript",         // html | css | javascript | cs50 | ai | interview
  difficulty: "basic",            // basic | medium | advanced
  type: "mcq",                    // mcq | open | code
  question: "Text, `inline code` allowed",
  code: null,                     // or a code snippet string with \n for newlines
  options: { a: "...", b: "...", c: "...", d: "..." },  // mcq only, else null
  answer: "b",                    // mcq only, else null
  solution: "Answer + explanation shown by the Show solution button"
}
```

Validate your changes:
```bash
node tools/validate-data.js
```

## Performance Tips

- **Keyboard shortcuts**: Use arrow keys instead of clicking for faster navigation
- **Shuffle mode**: Mix up card order to avoid memorization
- **Filtered sets**: Practice specific categories to build deeper knowledge
- **Search**: Find weak areas quickly
- **Dark mode**: Easier on eyes during late study sessions

## Privacy

All data is stored locally in your browser (`localStorage`). No data is sent to any server or external service. Progress, settings, and answers are yours alone.
