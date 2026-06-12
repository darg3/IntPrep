window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["html"] = [
  {
    id: "html-001",
    category: "html",
    difficulty: "basic",
    type: "mcq",
    question: "Which HTML5 element should wrap the unique, primary content of a page — the content that is not repeated across pages such as the site header, navigation, or footer?",
    code: null,
    options: {
      a: "`<section>`",
      b: "`<main>`",
      c: "`<article>`",
      d: "`<body>`"
    },
    answer: "b",
    solution: "Correct: b. `<main>` represents the dominant, page-specific content; there should be only one visible `<main>` per page, and it must not include repeated chrome like headers, nav, or footers. Screen readers and browser reader modes use it as a 'skip to content' landmark.\n\nWhy the others are wrong:\n- a: `<section>` groups a thematic chunk of content, but a page can have many sections and it says nothing about being the primary content.\n- c: `<article>` is for self-contained, independently distributable content (a blog post, a comment), not the page's overall content area.\n- d: `<body>` wraps everything, including the header, nav, and footer — exactly the repeated parts `<main>` excludes."
  },
  {
    id: "html-002",
    category: "html",
    difficulty: "basic",
    type: "open",
    question: "What is semantic HTML and why does it matter? Name some of the main semantic elements.",
    code: null,
    options: null,
    answer: null,
    solution: "Semantic HTML means choosing elements that describe the meaning of the content rather than just its appearance — for example `<nav>` for navigation instead of `<div class=\"nav\">`. The main HTML5 semantic elements are `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`, plus things like `<figure>`, `<time>`, and proper headings. It matters for three big reasons. First, accessibility: screen readers expose these elements as landmarks, so users can jump straight to navigation or main content instead of tabbing through everything. Second, SEO: search engines use the structure to understand what a page is about and which content is primary. Third, maintainability: other developers can read the document outline and immediately understand the page structure, whereas a wall of nested `<div>`s tells them nothing. Semantic elements also give you sensible default behavior — a `<button>` is keyboard-focusable and clickable for free. Interview tip: a concrete before/after example ('I replaced a div-soup layout with header/nav/main/footer') lands much better than the definition alone."
  },
  {
    id: "html-003",
    category: "html",
    difficulty: "basic",
    type: "code",
    question: "This signup form looks fine visually, but a screen-reader user hears no label when focusing the email field, and clicking the word 'Email' does nothing. What is the bug and how do you fix it?",
    code: "<form>\n  <label>Email</label>\n  <input type=\"email\" name=\"email\">\n  <button type=\"submit\">Sign up</button>\n</form>",
    options: null,
    answer: null,
    solution: "The bug: the `<label>` is not associated with the `<input>`. Sitting next to each other in the markup is not enough — there is no programmatic link between them.\n\nFix option 1 (explicit association, usually preferred):\n\n<label for=\"email\">Email</label>\n<input type=\"email\" id=\"email\" name=\"email\">\n\nThe label's `for` must match the input's `id`.\n\nFix option 2 (implicit association): wrap the input inside the label:\n\n<label>Email <input type=\"email\" name=\"email\"></label>\n\nOnce associated, screen readers announce 'Email' when the field gets focus, and clicking the label text focuses the input — a bigger click target that helps everyone, especially on mobile. This label/for question is one of the most common accessibility checks in junior interviews."
  },
  {
    id: "html-004",
    category: "html",
    difficulty: "basic",
    type: "mcq",
    question: "Which of the following elements is an inline element by default?",
    code: null,
    options: {
      a: "`<div>`",
      b: "`<p>`",
      c: "`<span>`",
      d: "`<ul>`"
    },
    answer: "c",
    solution: "Correct: c. `<span>` is the classic inline element: it flows within a line of text, does not start on a new line, and by default width/height do not apply to it. Other common inline elements: `<a>`, `<strong>`, `<em>`, `<img>`, `<code>`.\n\nWhy the others are wrong:\n- a: `<div>` is the generic block-level container — it starts on a new line and stretches to fill its parent's width.\n- b: `<p>` is block-level; paragraphs stack vertically.\n- d: `<ul>` is block-level, as are its `<li>` children.\n\nThe key distinction: block elements start on a new line and take full available width; inline elements sit within the text flow and only take the space their content needs."
  },
  {
    id: "html-005",
    category: "html",
    difficulty: "basic",
    type: "open",
    question: "What does `<!DOCTYPE html>` do, and what happens if you leave it out?",
    code: null,
    options: null,
    answer: null,
    solution: "`<!DOCTYPE html>` is a declaration at the very top of the document that tells the browser to render the page in standards mode. It is not an HTML tag and it is not case-sensitive; in HTML5 it was simplified from the long, URL-laden doctypes of HTML 4 and XHTML to just those 15 characters. If you omit it, browsers fall back to quirks mode, a compatibility mode that emulates the buggy behavior of 1990s browsers so ancient pages don't break. In quirks mode you get things like the old broken box model where width includes padding and border, different handling of line heights and image gaps in tables, so your CSS can behave unpredictably and inconsistently across browsers. There is also limited-quirks mode in between, but the practical takeaway is the same: always put `<!DOCTYPE html>` on line one so layout is predictable. Interview tip: the phrase interviewers listen for is 'quirks mode vs standards mode' — say it explicitly."
  },
  {
    id: "html-006",
    category: "html",
    difficulty: "medium",
    type: "mcq",
    question: "Which statement about the `async` and `defer` attributes on `<script src=\"...\">` tags is correct?",
    code: null,
    options: {
      a: "`defer` downloads the script in parallel with HTML parsing and executes it after parsing finishes, preserving the order of multiple deferred scripts",
      b: "`async` guarantees scripts execute in the order they appear in the document",
      c: "A `defer` script executes immediately, the moment its download completes",
      d: "`async` blocks HTML parsing for the entire duration of the script download"
    },
    answer: "a",
    solution: "Correct: a. With `defer`, the browser fetches the script in parallel while it keeps parsing HTML, then executes all deferred scripts in document order after parsing completes (just before `DOMContentLoaded`). That makes `defer` the default best choice for app scripts that need the DOM.\n\nWhy the others are wrong:\n- b: `async` scripts execute whenever each one finishes downloading — order is NOT guaranteed, which is why it suits independent scripts like analytics.\n- c: executing immediately on download-complete describes `async`, not `defer`.\n- d: `async` downloads in parallel without blocking; parsing only pauses during the script's execution. A plain `<script>` with no attribute is the one that blocks parsing for both download and execution."
  },
  {
    id: "html-007",
    category: "html",
    difficulty: "medium",
    type: "code",
    question: "For each of the three scripts below, describe when it executes relative to HTML parsing. Which one can block rendering of the `<p>`, which is guaranteed to run after the document is fully parsed, and which has unpredictable timing?",
    code: "<head>\n  <script src=\"a.js\" defer></script>\n  <script src=\"b.js\" async></script>\n</head>\n<body>\n  <p>Hello</p>\n  <script src=\"c.js\"></script>\n</body>",
    options: null,
    answer: null,
    solution: "Answer:\n- `a.js` (defer): downloads in parallel, guaranteed to execute only after the whole document is parsed, right before `DOMContentLoaded`. It never blocks the `<p>`.\n- `b.js` (async): downloads in parallel and executes the moment it arrives — its timing is unpredictable. It could run before or after the `<p>` is parsed, so it must not rely on the DOM or on other scripts.\n- `c.js` (no attribute): a classic blocking script. The parser stops when it reaches the tag, downloads and executes the script, then resumes. Here the `<p>` is already parsed, but anything after the tag would wait.\n\nThis is also why the old advice was 'put scripts at the end of `<body>`': a plain script in `<head>` blocks parsing of the entire page. Today the cleaner pattern is `<script defer>` in the `<head>` — early download, no blocking, DOM ready at execution, order preserved."
  },
  {
    id: "html-008",
    category: "html",
    difficulty: "basic",
    type: "open",
    question: "What are meta tags? Walk me through what `<meta charset=\"utf-8\">`, `<meta name=\"description\">`, and the viewport meta tag do.",
    code: null,
    options: null,
    answer: null,
    solution: "Meta tags live in the `<head>` and provide machine-readable metadata about the page — information for the browser, search engines, and social platforms rather than visible content. `<meta charset=\"utf-8\">` declares the character encoding so the browser decodes bytes into the right characters; it should be the first thing in the head, and without it accented letters, emoji, or non-Latin text can render as garbage. `<meta name=\"description\" content=\"...\">` gives search engines a short summary that is often shown as the snippet under your link in results — it doesn't directly boost ranking, but a good one improves click-through rate. The viewport tag, `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`, tells mobile browsers to set the layout width to the device's width at 1x zoom instead of pretending to be a ~980px desktop screen and shrinking the page; without it, responsive CSS media queries effectively don't work on phones. Other common ones include Open Graph tags for link previews and `meta name=\"robots\"` for indexing control. Interview tip: the viewport tag is the most-asked of the three — be ready to recite its exact content value."
  },
  {
    id: "html-009",
    category: "html",
    difficulty: "basic",
    type: "mcq",
    question: "Which meta tag is the standard way to make a page render properly on mobile devices (responsive design)?",
    code: null,
    options: {
      a: "`<meta name=\"viewport\" content=\"width=1024\">`",
      b: "`<meta name=\"screen\" content=\"responsive\">`",
      c: "`<meta name=\"viewport\" content=\"initial-scale=device-width\">`",
      d: "`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`"
    },
    answer: "d",
    solution: "Correct: d. `width=device-width` sets the layout viewport to the device's actual CSS width, and `initial-scale=1` sets the starting zoom to 100%. Together they stop mobile browsers from rendering the page at a fake ~980px width and zooming out, which is what makes media queries and responsive layouts actually take effect on phones.\n\nWhy the others are wrong:\n- a: a fixed `width=1024` forces a desktop-style layout on every device — the opposite of responsive.\n- b: there is no `name=\"screen\"` meta tag; this is made up.\n- c: `initial-scale` takes a number like 1, not `device-width` — the values are swapped into the wrong properties.\n\nBonus point in interviews: avoid adding `user-scalable=no` or `maximum-scale=1`, because disabling pinch-zoom is an accessibility failure."
  },
  {
    id: "html-010",
    category: "html",
    difficulty: "medium",
    type: "code",
    question: "Fill in the four blanks so the browser's own built-in validation (no JavaScript) rejects submission when the email is empty or malformed, and when the age is outside 18-99.",
    code: "<form>\n  <label for=\"email\">Email</label>\n  <input type=\"____\" id=\"email\" name=\"email\" ____>\n\n  <label for=\"age\">Age (18-99)</label>\n  <input type=\"number\" id=\"age\" name=\"age\" ____=\"18\" ____=\"99\">\n\n  <button>Submit</button>\n</form>",
    options: null,
    answer: null,
    solution: "Answer: `type=\"email\"`, `required`, `min=\"18\"`, `max=\"99\"`.\n\n<input type=\"email\" id=\"email\" name=\"email\" required>\n<input type=\"number\" id=\"age\" name=\"age\" min=\"18\" max=\"99\">\n\nExplanation: `type=\"email\"` makes the browser check the value looks like an email address (and shows an email keyboard on mobile). `required` blocks submission while the field is empty. On numeric inputs, `min` and `max` define the allowed range; the browser blocks out-of-range values and shows a native error bubble.\n\nThe full native-validation toolkit worth memorizing: `required`, `min`/`max` (numbers, dates), `minlength`/`maxlength` (text length), `pattern` (regex), and the validating input types `email` and `url`. CSS can style state via `:valid`/`:invalid`, and JS can hook in through the Constraint Validation API (`checkValidity()`, `setCustomValidity()`), but the point interviewers want: you get all this for free, before writing any JavaScript."
  },
  {
    id: "html-011",
    category: "html",
    difficulty: "medium",
    type: "open",
    question: "How do you make an HTML form accessible? What specific elements and attributes do you reach for?",
    code: null,
    options: null,
    answer: null,
    solution: "First, every input gets a real `<label>` associated via matching `for` and `id` (or by wrapping the input), so screen readers announce the field's purpose and clicking the label focuses the control — placeholder text is not a substitute, since it vanishes on typing and has poor contrast. Second, related controls get grouped with `<fieldset>` and a `<legend>`, which is essential for radio groups and checkbox sets so the group's question is announced along with each option. Third, use the right input types (`email`, `tel`, `date`, `number`) — they bring correct mobile keyboards and built-in validation. Fourth, errors must be more than red borders: write descriptive text messages, link them to the field with `aria-describedby`, and mark the field `aria-invalid=\"true\"` so the failure is announced, never communicated by color alone. Fifth, keep everything keyboard-operable: use native form elements (they're focusable and operable for free), keep a logical tab order, and use a real `<button type=\"submit\">` so Enter submits the form. Marking required fields with the `required` attribute (and visibly in the label) also helps. Interview tip: lead with label/for and fieldset/legend — those two are what the interviewer is fishing for."
  },
  {
    id: "html-012",
    category: "html",
    difficulty: "medium",
    type: "mcq",
    question: "A purely decorative flourish image sits between two sections of an article and conveys no information. What is the correct way to handle its `alt` attribute?",
    code: null,
    options: {
      a: "Omit the `alt` attribute entirely so screen readers skip it",
      b: "Use an empty value: `alt=\"\"`",
      c: "Describe it anyway: `alt=\"decorative flourish divider graphic\"`",
      d: "Use `alt=\"image\"` as a minimal placeholder"
    },
    answer: "b",
    solution: "Correct: b. An explicitly empty `alt=\"\"` tells assistive technology the image is decorative, so screen readers skip it entirely instead of cluttering the experience.\n\nWhy the others are wrong:\n- a: omitting `alt` is NOT the same as `alt=\"\"`. With no alt attribute at all, many screen readers fall back to announcing the file name ('flourish-v2-final.png'), which is worse than nothing. It also fails validation.\n- c: describing decoration forces users to listen to noise that carries no information — alt text should describe content and function, and decoration has neither.\n- d: `alt=\"image\"` is redundant (the screen reader already announces it as an image) and tells the user nothing.\n\nRule of thumb: informative images get alt text describing their content or purpose; functional images (a logo that links home) describe the destination; decorative images get `alt=\"\"`."
  },
  {
    id: "html-013",
    category: "html",
    difficulty: "medium",
    type: "open",
    question: "What is ARIA? When should you use `aria-*` attributes versus native HTML, and what do `aria-label`, `aria-labelledby`, `aria-live`, and `role` do?",
    code: null,
    options: null,
    answer: null,
    solution: "ARIA (Accessible Rich Internet Applications) is a set of attributes that add accessibility semantics — roles, names, states — to elements when the markup alone can't express them, mainly for screen readers. The 'first rule of ARIA' is: don't use ARIA if a native element already does the job. A real `<button>` beats `<div role=\"button\">` every time, because the native element gives you keyboard focus, Enter/Space activation, and the correct role for free, while the div needs `tabindex`, key handlers, and the role bolted on by hand — ARIA only changes what's announced, never behavior. As for the specific attributes: `role` declares what an element is (`role=\"dialog\"`, `role=\"alert\"`) when no native element fits. `aria-label` gives an element an accessible name directly as a string — classic case is an icon-only button: `<button aria-label=\"Close\">×</button>`. `aria-labelledby` does the same but points to the `id` of existing visible text, which is preferred when the label already exists on screen. `aria-live` marks a region whose dynamic updates should be announced without focus moving — `polite` waits for a pause, `assertive` interrupts — used for toasts, validation summaries, or live search-result counts. Interview tip: quoting the first rule of ARIA and giving the icon-button example signals real-world experience."
  },
  {
    id: "html-014",
    category: "html",
    difficulty: "basic",
    type: "mcq",
    question: "What is the difference between the `id` and `class` attributes?",
    code: null,
    options: {
      a: "An `id` must be unique within the page, while a `class` can be shared by many elements (and one element can have several classes)",
      b: "A `class` must be unique within the page, while an `id` can be reused freely",
      c: "`id` is only usable from JavaScript and `class` is only usable from CSS",
      d: "An element may have multiple `id`s but only one `class`"
    },
    answer: "a",
    solution: "Correct: a. An `id` is a unique identifier — exactly one element per page should carry a given id — while classes exist to be reused, and an element can list several in a space-separated `class` attribute.\n\nWhy the others are wrong:\n- b: it's exactly backwards.\n- c: both are usable from both worlds — CSS targets `#id` and `.class`; JS has `getElementById` and `querySelectorAll(\".class\")` among others.\n- d: also backwards — one `id` per element, but as many classes as you like.\n\nWorth adding in an interview: ids also serve as anchor targets (`#section` in URLs) and as the hook for `<label for>`; in CSS an id selector has higher specificity than a class, which is one reason styling is usually done with classes and ids are reserved for unique hooks."
  },
  {
    id: "html-015",
    category: "html",
    difficulty: "medium",
    type: "code",
    question: "What does this print to the console, and why? Pay attention to the attribute names.",
    code: "<button id=\"buy\" data-product-id=\"42\" data-price=\"19.99\">Buy</button>\n<script>\n  const btn = document.getElementById(\"buy\");\n  console.log(btn.dataset.productId);\n  console.log(typeof btn.dataset.price);\n</script>",
    options: null,
    answer: null,
    solution: "Output:\n\n42\nstring\n\nExplanation: `data-*` attributes are the standard way to embed custom data in HTML, and they are exposed to JavaScript through the element's `dataset` property. Two rules explain the output. First, the naming convention: the `data-` prefix is stripped and the remaining kebab-case name is converted to camelCase, so `data-product-id` becomes `dataset.productId` (writing `dataset[\"product-id\"]` would be undefined). Second, every value read from `dataset` is always a string, regardless of how numeric it looks — so `typeof btn.dataset.price` is `\"string\"`, and you must convert with `Number(...)` before doing math. You can also target these attributes from CSS with attribute selectors like `[data-price]`. Use `data-*` for small bits of element-specific state (an id for a click handler, a configuration flag) — not for large data, sensitive data, or anything a semantic attribute already covers."
  },
  {
    id: "html-016",
    category: "html",
    difficulty: "medium",
    type: "open",
    question: "When should you use an `<a>` tag versus a `<button>`? Why is `<a href=\"#\" onclick=\"...\">` considered bad practice?",
    code: null,
    options: null,
    answer: null,
    solution: "The rule of thumb: links navigate, buttons act. Use `<a href>` when activating it takes the user somewhere — another page, another section via a fragment, a file download. Use `<button>` when it performs an action on the current page: submitting a form, opening a modal, toggling a menu. The distinction matters because the two elements have different built-in behavior: links support open-in-new-tab, copy-link-address, and Ctrl/Cmd+click; buttons are activated by both Enter and Space (links only Enter) and integrate with forms via `type=\"submit\"`. Screen readers also announce them differently — 'link' versus 'button' — so users form different expectations about what will happen. `<a href=\"#\" onclick=\"...\">` is bad because it lies about being a link: it offers a meaningless URL to copy or open in a new tab, it can scroll the page to the top when the `#` isn't cancelled, and it tells assistive tech 'navigation' when the truth is 'action'. The fix is simply `<button type=\"button\">` styled however you like. Interview tip: mentioning that a styled `<div onclick>` is even worse — no keyboard focus, no role, no Enter/Space handling — shows you understand why native elements win."
  },
  {
    id: "html-017",
    category: "html",
    difficulty: "medium",
    type: "mcq",
    question: "Why is it recommended to add `rel=\"noopener noreferrer\"` to links that use `target=\"_blank\"`?",
    code: null,
    options: {
      a: "It makes the new tab open faster by preloading the destination page",
      b: "It tells search engines not to follow or index the link",
      c: "It prevents the opened page from accessing `window.opener` to redirect your page (tabnabbing), and stops the `Referer` header from leaking your URL",
      d: "It forces the link to open in the same tab when JavaScript is disabled"
    },
    answer: "c",
    solution: "Correct: c. Without `noopener`, a page opened via `target=\"_blank\"` historically received a `window.opener` reference to your tab and could run `window.opener.location = \"https://evil-phishing-clone.com\"`, silently swapping out the original tab — the 'reverse tabnabbing' attack. `noopener` severs that reference; `noreferrer` additionally suppresses the `Referer` header so the destination doesn't learn which URL the visitor came from (and implies noopener in browsers that lack it).\n\nWhy the others are wrong:\n- a: nothing is preloaded; if anything there's a tiny perf benefit because the new page can't run in your page's process group, but speed is not the purpose.\n- b: that's `rel=\"nofollow\"` — a different rel value for SEO.\n- d: rel values never change where a link opens.\n\nNote: modern browsers now imply `noopener` on `target=\"_blank\"` by default, but stating it explicitly is still best practice — and interviewers still expect you to know the attack."
  },
  {
    id: "html-018",
    category: "html",
    difficulty: "advanced",
    type: "open",
    question: "What is an `<iframe>`, when would you actually use one, and what are its downsides? How do you mitigate the risks?",
    code: null,
    options: null,
    answer: null,
    solution: "An `<iframe>` embeds another HTML document — often from another origin — inside the current page, with its own browsing context, DOM, and scripts. Legitimate uses are mostly third-party embeds you can't or shouldn't rebuild: YouTube/Vimeo players, maps, payment fields (Stripe isolates card inputs in an iframe so card data never touches your DOM), and sandboxed previews of user content. The downsides are significant. Security: iframes are central to clickjacking, where an attacker overlays your site in an invisible frame and tricks users into clicking; embedded third-party content can also try to navigate or phish. Performance: each iframe is a separate document with its own network requests and memory, often loading heavy third-party scripts, and it can block the parent's `load` event. UX and accessibility: keyboard focus can get trapped, screen-reader navigation across frame boundaries is clunky (always give iframes a `title`), and responsive sizing is awkward. Mitigations: the `sandbox` attribute applies a deny-by-default policy, re-enabling only what's needed (`allow-scripts`, `allow-same-origin` — never both blindly); the `allow` attribute gates features like camera or autoplay; `loading=\"lazy\"` defers offscreen iframes; and to stop others framing YOUR site, send `X-Frame-Options: DENY` or a `Content-Security-Policy: frame-ancestors` header. The same-origin policy already prevents script access across origins, but cross-frame communication is possible via `postMessage` when both sides cooperate. Interview tip: the `sandbox` attribute plus `frame-ancestors` is the pairing that marks a strong answer."
  },
  {
    id: "html-019",
    category: "html",
    difficulty: "advanced",
    type: "mcq",
    question: "Given the image below, on a phone with a 400px-wide CSS viewport and a 2x device pixel ratio (retina screen), which file will the browser most likely download?",
    code: "<img src=\"photo-800.jpg\"\n  srcset=\"photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w\"\n  sizes=\"(max-width: 600px) 100vw, 600px\"\n  alt=\"A harbor at dusk\">",
    options: {
      a: "photo-400.jpg, because the viewport is 400 CSS pixels wide",
      b: "photo-800.jpg, but only because it is listed in `src` and `src` always wins",
      c: "photo-1600.jpg, because browsers always pick the largest available source",
      d: "photo-800.jpg, because the image renders at 400 CSS px and the 2x screen needs about 800 device pixels"
    },
    answer: "d",
    solution: "Correct: d. The browser first evaluates `sizes`: the viewport is 400px wide, so `(max-width: 600px)` matches and the slot size is `100vw` = 400 CSS pixels. It then multiplies by the device pixel ratio: 400 × 2 = 800 device pixels needed. From the `srcset` width descriptors (`400w`, `800w`, `1600w`) it picks the smallest candidate that covers 800 — photo-800.jpg — getting a sharp image without wasting bandwidth.\n\nWhy the others are wrong:\n- a: ignores the 2x DPR; photo-400.jpg would look blurry on a retina screen.\n- b: `src` is only the fallback for browsers without srcset support (or when no candidate fits); it doesn't 'win'.\n- c: browsers optimize for the needed size, not the maximum — that would defeat the entire purpose of responsive images.\n\nRelated: `srcset`/`sizes` lets the browser choose by resolution; use `<picture>` with `<source media>` instead when you need art direction (different crops) or format fallbacks (AVIF/WebP to JPEG)."
  },
  {
    id: "html-020",
    category: "html",
    difficulty: "advanced",
    type: "code",
    question: "Fill in the two blanks so that wide screens get the AVIF file and the image only loads when it nears the viewport. Bonus: why are `width` and `height` set explicitly even though CSS controls the final size?",
    code: "<picture>\n  <source media=\"(min-width: 800px)\" ____=\"hero-wide.avif\" type=\"image/avif\">\n  <img src=\"hero.jpg\" alt=\"Mountain sunrise\" ____=\"lazy\"\n    width=\"800\" height=\"450\">\n</picture>",
    options: null,
    answer: null,
    solution: "Answer: the first blank is `srcset` and the second is `loading`.\n\n<source media=\"(min-width: 800px)\" srcset=\"hero-wide.avif\" type=\"image/avif\">\n<img src=\"hero.jpg\" alt=\"Mountain sunrise\" loading=\"lazy\" width=\"800\" height=\"450\">\n\nKey trap: `<source>` inside `<picture>` uses `srcset`, never `src` — a `<source src=\"...\">` is silently ignored, which is a classic real-world bug. The browser walks the sources top-down, takes the first whose `media` and `type` match (skipping AVIF entirely if unsupported), and feeds that URL to the `<img>`, which remains the element that actually renders and carries the `alt`.\n\n`loading=\"lazy\"` defers the fetch until the image approaches the viewport, saving bandwidth on below-the-fold content. Never lazy-load the LCP/hero image at the top of the page, though — it delays the largest contentful paint.\n\nBonus answer: explicit `width` and `height` let the browser compute the aspect ratio and reserve the correct space before the file arrives, preventing layout shift (CLS) when the image pops in."
  },
  {
    id: "html-021",
    category: "html",
    difficulty: "basic",
    type: "open",
    question: "What new features did HTML5 introduce compared to older HTML?",
    code: null,
    options: null,
    answer: null,
    solution: "HTML5 was a major modernization across several fronts. Structure: semantic elements like `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>` replaced div-soup. Media: native `<audio>` and `<video>` elements removed the need for Flash plugins, and `<canvas>` (plus first-class SVG support) enabled drawing and games directly in the browser. Forms: new input types like `email`, `date`, `number`, `range`, `tel`, `url`, and `search`, along with built-in validation attributes such as `required`, `pattern`, `min`/`max`, and `placeholder`. Data: `data-*` custom attributes for attaching metadata to elements, and the Web Storage APIs (`localStorage`/`sessionStorage`) as a saner alternative to cookies for client-side data. It also simplified the basics — the doctype became just `<!DOCTYPE html>` and charset just `<meta charset=\"utf-8\">` — and HTML5 parsing rules are more forgiving than XHTML, which demanded strict XML syntax (every tag closed, lowercase, attributes quoted) and failed hard on errors. Plus it shipped alongside APIs like geolocation, drag-and-drop, and web workers. Interview tip: group your answer (semantics, media, forms, storage) instead of reciting a flat list — it sounds far more organized."
  },
  {
    id: "html-022",
    category: "html",
    difficulty: "basic",
    type: "mcq",
    question: "Which of the following is a void (empty) element — one that cannot have any content or a closing tag?",
    code: null,
    options: {
      a: "`<input>`",
      b: "`<textarea>`",
      c: "`<select>`",
      d: "`<label>`"
    },
    answer: "a",
    solution: "Correct: a. `<input>` is a void element: it has no content model and no closing tag — everything is configured through attributes (`type`, `value`, `name`, ...). The full void list worth knowing: `<img>`, `<br>`, `<hr>`, `<input>`, `<meta>`, `<link>`, `<source>`, `<area>`, `<base>`, `<col>`, `<embed>`, `<track>`, `<wbr>`.\n\nWhy the others are wrong:\n- b: `<textarea>` requires a closing tag — its initial text lives BETWEEN the tags, not in a value attribute (a common point of confusion with `<input>`).\n- c: `<select>` wraps its `<option>` children, so it must close.\n- d: `<label>` contains its label text (and often the input itself).\n\nNote: in HTML5 the XHTML-style trailing slash (`<br/>`) is allowed but meaningless — the parser ignores it. Writing `<input>` with no slash is perfectly valid."
  },
  {
    id: "html-023",
    category: "html",
    difficulty: "advanced",
    type: "code",
    question: "This data table renders fine visually but fails an accessibility audit: a screen reader cannot tell users which column a cell belongs to. What is wrong, and how would you rewrite it?",
    code: "<table>\n  <tr>\n    <td><b>Name</b></td>\n    <td><b>Score</b></td>\n  </tr>\n  <tr>\n    <td>Ada</td>\n    <td>97</td>\n  </tr>\n</table>",
    options: null,
    answer: null,
    solution: "The bug: the header row uses `<td><b>` — bold styling, zero semantics. Screen readers see four anonymous data cells, so when a user navigates to '97' nothing announces 'Score'. Headers must be `<th>` elements so assistive tech can associate each data cell with its header.\n\nRewrite:\n\n<table>\n  <caption>Exam results</caption>\n  <thead>\n    <tr>\n      <th scope=\"col\">Name</th>\n      <th scope=\"col\">Score</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Ada</td>\n      <td>97</td>\n    </tr>\n  </tbody>\n</table>\n\nWhat each piece adds: `<th scope=\"col\">` marks real column headers (use `scope=\"row\"` for row headers in the first column), so the reader announces 'Score: 97'. `<caption>` names the whole table — announced when the user enters it. `<thead>`/`<tbody>` group the structure and let headers repeat when printing long tables. Two closing points interviewers like: tables are for tabular data only, never layout; and `<b>` is purely visual, with no semantic weight."
  },
  {
    id: "html-024",
    category: "html",
    difficulty: "medium",
    type: "mcq",
    question: "You want the literal text `<script>` to appear on the page inside a paragraph. Which markup is correct?",
    code: null,
    options: {
      a: "`<p><script></p>` — the browser shows unknown tags as text",
      b: "`<p>&lt;script&gt;</p>`",
      c: "`<p>\\<script\\></p>` — backslashes escape characters in HTML",
      d: "`<p>&amp;lt;script&amp;gt;</p>`"
    },
    answer: "b",
    solution: "Correct: b. HTML entities are how you display characters that HTML reserves for its own syntax. `&lt;` renders as `<` and `&gt;` renders as `>`, so the paragraph displays `<script>` as plain text instead of being parsed as a tag.\n\nWhy the others are wrong:\n- a: the parser treats `<script>` as a real opening tag — it would start a script block and swallow the following markup, not display the text.\n- c: backslashes mean nothing in HTML (that's string escaping in programming languages); the literal backslashes would break the tags in an unintended way.\n- d: `&amp;` renders as a literal `&`, so the user would see the text `&lt;script&gt;` on screen — double-escaped.\n\nThe core entities to know: `&lt;` (<), `&gt;` (>), `&amp;` (&), `&quot;` (\"), and `&nbsp;` (non-breaking space). This is also the foundation of XSS prevention: user-supplied text must be entity-encoded before being inserted into HTML so it can never be parsed as markup."
  },
  {
    id: "html-025",
    category: "html",
    difficulty: "advanced",
    type: "open",
    question: "How does the way you write your HTML affect SEO? Cover headings, semantic structure, and the specific tags search engines care about.",
    code: null,
    options: null,
    answer: null,
    solution: "Search engines parse your HTML structure to understand what the page is about, so markup quality directly affects how well you're indexed. The `<title>` tag is the single most important on-page element — it's the clickable headline in results — and `<meta name=\"description\">` supplies the snippet beneath it, influencing click-through rate even though it isn't a direct ranking factor. Heading hierarchy matters doubly: one `<h1>` stating the page topic, then `<h2>`-`<h6>` nested logically without skipping levels — crawlers use it to build a content outline, and screen-reader users navigate by the exact same structure, so good SEO and accessibility reinforce each other here. Semantic elements (`<main>`, `<article>`, `<nav>`, `<footer>`) help crawlers separate primary content from boilerplate. Images contribute through `alt` text, which is how image search understands them. Links matter too: descriptive anchor text ('see the pricing page', never 'click here') tells crawlers what the target is about, and crawlable `<a href>` links are essential — content reachable only through JavaScript click handlers may never be discovered. Finally, `<link rel=\"canonical\">` prevents duplicate-content penalties when the same content lives at multiple URLs, and the viewport meta tag matters because Google indexes mobile-first. Interview tip: explicitly connecting heading order to both SEO and accessibility in one sentence is a strong-junior signal."
  },
  {
    id: "html-026",
    category: "html",
    difficulty: "basic",
    type: "mcq",
    question: "You want a collapsible FAQ item — a heading the user can click to reveal the answer — with no JavaScript at all. Which native HTML elements do this out of the box?",
    code: null,
    options: {
      a: "`<details>` containing a `<summary>`",
      b: "`<dialog>` containing a `<caption>`",
      c: "`<section>` with the `collapsed` attribute",
      d: "`<div>` with `aria-expanded=\"true\"`"
    },
    answer: "a",
    solution: "Correct: a. `<details>` is a native disclosure widget: it renders its `<summary>` child as the always-visible, clickable heading, and shows or hides the rest of its content when toggled. Add the `open` attribute to start expanded. Keyboard support and screen-reader announcements come for free, and the `toggle` event fires if you do want to hook in JavaScript later.\n\nWhy the others are wrong:\n- b: `<dialog>` is for modal/non-modal dialog boxes, and `<caption>` belongs to `<table>` — neither creates a disclosure widget.\n- c: there is no `collapsed` attribute on `<section>` — that's made up.\n- d: `aria-expanded` only *announces* a state to assistive tech; it doesn't implement any show/hide behavior. You'd still have to write all the JavaScript yourself, which is exactly what `<details>` saves you from."
  },
  {
    id: "html-027",
    category: "html",
    difficulty: "basic",
    type: "open",
    question: "What belongs in the `<head>` of an HTML document versus the `<body>`? Name the main things you'd expect to find in a well-formed `<head>`.",
    code: null,
    options: null,
    answer: null,
    solution: "The `<head>` holds metadata — information *about* the document that is not rendered as page content — while the `<body>` holds everything the user actually sees and interacts with. A well-formed `<head>` typically contains: `<meta charset=\"utf-8\">` (first, so the parser decodes the rest correctly), the `<title>` (required — shown in the tab, bookmarks, and search results), the viewport meta tag for responsive rendering, `<meta name=\"description\">` for search snippets, `<link rel=\"stylesheet\">` for CSS, `<link rel=\"icon\">` for the favicon, and possibly `<script>` tags (usually with `defer`) plus social/Open Graph meta tags and `<link rel=\"canonical\">`. CSS goes in the head on purpose: the browser blocks rendering until stylesheets load, which prevents a flash of unstyled content. One subtlety worth knowing: browsers are forgiving, so a `<div>` accidentally placed in the head gets moved into the body by the parser's error recovery — the page 'works' but your document is malformed. Interview tip: mentioning *why* CSS belongs in the head (render blocking prevents FOUC) shows you understand the loading pipeline, not just the convention."
  },
  {
    id: "html-028",
    category: "html",
    difficulty: "basic",
    type: "mcq",
    question: "Inside a `<form>`, what is the default `type` of a `<button>` element if you don't specify one?",
    code: null,
    options: {
      a: "`type=\"button\"` — it does nothing until you attach JavaScript",
      b: "`type=\"submit\"` — clicking it submits the form",
      c: "`type=\"reset\"` — clicking it clears the form",
      d: "It has no behavior at all until a `type` is set"
    },
    answer: "b",
    solution: "Correct: b. A `<button>` inside a form defaults to `type=\"submit\"`. This is one of the most common sources of mystery bugs for juniors: you add a 'Toggle password visibility' or 'Add another row' button, click it, and the whole form submits and the page reloads. The fix is to write `type=\"button\"` explicitly on every button that should not submit.\n\nWhy the others are wrong:\n- a: `type=\"button\"` is the inert variant, but it's *not* the default — you must opt into it.\n- c: `type=\"reset\"` exists but is never a default (and is rarely a good idea — users hit it by accident and lose their input).\n- d: buttons always have a type; in a form context the missing-attribute default is submit, which is precisely the surprising behavior.\n\nRule of thumb: always write the `type` attribute on `<button>` so the behavior is explicit."
  },
  {
    id: "html-029",
    category: "html",
    difficulty: "basic",
    type: "code",
    question: "Clicking 'Cancel' on this form unexpectedly submits it and reloads the page. Why, and what is the one-attribute fix?",
    code: "<form action=\"/save\" method=\"post\">\n  <label for=\"name\">Name</label>\n  <input id=\"name\" name=\"name\">\n  <button onclick=\"closeEditor()\">Cancel</button>\n  <button>Save</button>\n</form>",
    options: null,
    answer: null,
    solution: "The bug: inside a form, a `<button>` with no `type` attribute defaults to `type=\"submit\"`. So 'Cancel' runs `closeEditor()` *and then* submits the form, causing the POST and the reload.\n\nThe fix — make Cancel an explicit non-submitting button:\n\n<button type=\"button\" onclick=\"closeEditor()\">Cancel</button>\n<button type=\"submit\">Save</button>\n\nMarking 'Save' as `type=\"submit\"` isn't strictly required (it's the default) but makes intent obvious.\n\nRelated trap: the same default bites you in single-input forms where pressing Enter triggers the first submit button — if that first button happens to be 'Delete', Enter deletes. Ordering your buttons and typing them explicitly avoids both problems. This 'why does my button reload the page?' question is a classic junior interview check because nearly everyone has hit it in real code."
  },
  {
    id: "html-030",
    category: "html",
    difficulty: "basic",
    type: "mcq",
    question: "What does the `lang` attribute on the `<html>` element do, e.g. `<html lang=\"en\">`?",
    code: null,
    options: {
      a: "It restricts which scripting languages the page may run",
      b: "It tells search engines, screen readers, and the browser the natural language of the content — affecting pronunciation, translation offers, hyphenation, and spellcheck",
      c: "It is purely decorative metadata with no functional effect",
      d: "It sets the character encoding of the document"
    },
    answer: "b",
    solution: "Correct: b. `lang` declares the human language of the document. Screen readers use it to pick the right speech synthesizer and pronunciation rules — an English screen reader voice trying to read French text without the hint is nearly unintelligible. Browsers use it to offer translation, choose hyphenation dictionaries, render language-specific typography, and spellcheck form fields. Search engines use it for language targeting. You can also override it on any element for inline foreign phrases: `<p>She said <span lang=\"fr\">bonjour</span>.</p>`.\n\nWhy the others are wrong:\n- a: scripting is unrelated; `lang` is about natural (human) language.\n- c: it has several concrete functional effects listed above — missing `lang` is a WCAG accessibility failure (criterion 3.1.1).\n- d: encoding is set by `<meta charset=\"utf-8\">`, a completely separate concern."
  },
  {
    id: "html-031",
    category: "html",
    difficulty: "basic",
    type: "open",
    question: "In a form, what is the difference between `method=\"get\"` and `method=\"post\"`? When would you choose each?",
    code: null,
    options: null,
    answer: null,
    solution: "With `method=\"get\"`, the form data is serialized into the URL as query parameters (`/search?q=cats&page=2`); with `method=\"post\"`, it travels in the request body. That single difference drives all the practical consequences. GET requests should be safe and idempotent — they read data without changing server state — so GET is right for searches and filters: the resulting URL can be bookmarked, shared, retried, and cached, and the back button works naturally. POST is for actions that change state — creating an account, placing an order, logging in — and for anything sensitive: data in a URL ends up in browser history, server access logs, and Referer headers, so credentials must never travel via GET. POST also has no practical size limit (URLs do) and is required for file uploads (with `enctype=\"multipart/form-data\"`). Browsers reinforce the semantics: refreshing after a POST triggers a 'resubmit form?' warning because repeating the action might charge a card twice, which is why servers commonly respond to a POST with a redirect (the POST/Redirect/GET pattern). Interview tip: the phrase 'GET for reads, POST for writes — and never secrets in a URL' covers the core; mentioning POST/Redirect/GET is a nice bonus."
  },
  {
    id: "html-032",
    category: "html",
    difficulty: "basic",
    type: "mcq",
    question: "Why is using `placeholder` text as the only label for a form field considered an accessibility problem?",
    code: null,
    options: {
      a: "Placeholders are not allowed on `type=\"email\"` inputs",
      b: "The placeholder disappears once the user types, its default contrast is too low, and some assistive technologies don't reliably announce it — so it cannot replace a real `<label>`",
      c: "Placeholder text is invisible to all screen readers in every browser",
      d: "Using both a placeholder and a label is invalid HTML"
    },
    answer: "b",
    solution: "Correct: b. The placeholder vanishes the moment the user types, so they lose the prompt exactly when they might need to double-check what the field was for ('was this username or email?'). Its default gray styling usually fails WCAG contrast requirements, users can mistake it for pre-filled content, and assistive-tech support for announcing it is inconsistent. The right pattern is a visible `<label for=\"...\">` for the field's *name*, with `placeholder` reserved for a format *example* (`placeholder=\"name@example.com\"`).\n\nWhy the others are wrong:\n- a: `placeholder` is valid on email inputs and most other text-like types.\n- c: too absolute — many screen readers do read placeholders; the problem is that support is *inconsistent*, not nonexistent.\n- d: label + placeholder together is not only valid, it's exactly the recommended combination."
  },
  {
    id: "html-033",
    category: "html",
    difficulty: "basic",
    type: "open",
    question: "How do in-page anchor links work, e.g. a table of contents that jumps to a section? What markup is involved and what happens to the URL?",
    code: null,
    options: null,
    answer: null,
    solution: "You give the target element an `id` (`<h2 id=\"pricing\">Pricing</h2>`) and link to it with a fragment: `<a href=\"#pricing\">Pricing</a>`. Clicking the link scrolls the element into view and appends the fragment to the URL (`/page#pricing`) without reloading the page — the fragment is purely client-side and is never sent to the server. Because it's in the URL, the position is bookmarkable and shareable, and each jump creates a history entry so the back button returns to the previous position. `<a href=\"#\">` (empty fragment) scrolls to the top, which is why it was historically abused as a JavaScript hook — bad practice, use a `<button>` instead. Useful related details: `href=\"#top\"` falls back to the top of the page if no such id exists; CSS `scroll-behavior: smooth` animates the jump; CSS `scroll-margin-top` on targets stops sticky headers from covering the heading you jumped to; and the `:target` pseudo-class lets you style the element currently linked to. For accessibility, the classic 'skip to main content' link is exactly this mechanism: `<a href=\"#main\">` pointing at `<main id=\"main\">`. Interview tip: mentioning `scroll-margin-top` for sticky headers is a small detail that signals real-world experience."
  },
  {
    id: "html-034",
    category: "html",
    difficulty: "medium",
    type: "mcq",
    question: "What is the difference between `dialog.show()` and `dialog.showModal()` for a `<dialog>` element?",
    code: null,
    options: {
      a: "`show()` is asynchronous while `showModal()` is synchronous",
      b: "They are aliases — both open the dialog the same way",
      c: "`showModal()` opens it as a true modal: the rest of the page becomes inert and unfocusable, the dialog sits in the top layer above everything, the `::backdrop` is shown, and Esc closes it; `show()` opens a non-modal dialog without any of that",
      d: "`show()` works only on mobile and `showModal()` only on desktop"
    },
    answer: "c",
    solution: "Correct: c. `showModal()` gives you, natively, everything custom modal libraries used to hand-roll: the page behind becomes inert (no clicking or tabbing into it — focus is trapped in the dialog), the dialog renders in the browser's *top layer* so no `z-index` war can cover it, the `::backdrop` pseudo-element is stylable for the dimmed overlay, and Esc fires a `cancel` event and closes it. `show()` opens the same element as a floating non-modal panel: the page stays interactive and there's no backdrop or focus trap — fine for a toast-like panel, wrong for a confirmation that must be answered. Both set the `open` attribute; closing is `dialog.close(returnValue)`.\n\nWhy the others are wrong:\n- a: both are synchronous calls.\n- b: the modal behavior (inertness, top layer, backdrop, Esc) is a major difference, not an alias.\n- d: both work everywhere `<dialog>` is supported, which is all modern browsers."
  },
  {
    id: "html-035",
    category: "html",
    difficulty: "medium",
    type: "open",
    question: "What does the `<template>` element do, and how is it different from just hiding markup with `display: none`?",
    code: null,
    options: null,
    answer: null,
    solution: "`<template>` holds HTML that the browser parses but does not render or activate — it's a stamp for content you'll clone with JavaScript later. The crucial word is *inert*: nothing inside a template runs or loads. Images don't download, `<script>` tags don't execute, videos don't buffer, form controls inside it don't get validated or submitted, and `document.getElementById` won't find elements inside it, because the content lives in a separate `DocumentFragment` hanging off `template.content` rather than in the document proper. To use it: `const clone = template.content.cloneNode(true)`, fill in the dynamic bits, and append the clone. Compare that to hiding markup with `display: none`: hidden content is still fully live — images fetch, scripts run, ids collide, and screen-reader/SEO edge cases lurk. So a list rendered from server data, repeated card markup, or the internal markup of a web component are all natural `<template>` use cases. A related newcomer is `<slot>`, which works with templates inside shadow DOM for web components. Interview tip: the one-word answer interviewers want is 'inert' — parsed but not loaded, executed, or rendered, unlike `display: none` which merely hides live content."
  },
  {
    id: "html-036",
    category: "html",
    difficulty: "medium",
    type: "code",
    question: "Fill in the two blanks so the text input offers native autocomplete suggestions ('Berlin', 'Bern', 'Boston') as the user types — no JavaScript involved.",
    code: "<label for=\"city\">City</label>\n<input id=\"city\" name=\"city\" ____=\"city-options\">\n\n<____ id=\"city-options\">\n  <option value=\"Berlin\"></option>\n  <option value=\"Bern\"></option>\n  <option value=\"Boston\"></option>\n</____>",
    options: null,
    answer: null,
    solution: "The blanks are `list` and `datalist`:\n\n<input id=\"city\" name=\"city\" list=\"city-options\">\n\n<datalist id=\"city-options\">\n  <option value=\"Berlin\"></option>\n  ...\n</datalist>\n\nThe input's `list` attribute must match the `<datalist>`'s `id` — the same linking pattern as `label for`/`id`. The browser then shows the matching options in a native dropdown as the user types.\n\nThe key conceptual point: `<datalist>` provides *suggestions*, not constraints. Unlike `<select>`, the user can ignore every option and type anything — so if only listed values are valid, you still need validation. `<select>` = closed set of choices; `<datalist>` = free text with hints. It also works with other input types, e.g. suggested values on `type=\"color\"` or tick marks on `type=\"range\"`. For huge or server-driven suggestion lists you'd reach for a JavaScript autocomplete component, but for a static handful of suggestions, `<datalist>` is free and accessible out of the box."
  },
  {
    id: "html-037",
    category: "html",
    difficulty: "medium",
    type: "mcq",
    question: "Which statement about the `tabindex` attribute is correct?",
    code: null,
    options: {
      a: "`tabindex=\"0\"` puts an element into the natural keyboard tab order; `tabindex=\"-1\"` makes it focusable only programmatically; positive values like `tabindex=\"5\"` create a custom order and are an anti-pattern",
      b: "`tabindex=\"-1\"` removes the element from the DOM",
      c: "Positive `tabindex` values are the recommended way to fix focus order",
      d: "`tabindex` works only on `<input>` and `<button>` elements"
    },
    answer: "a",
    solution: "Correct: a. The three values do three different jobs. `tabindex=\"0\"` makes a normally-unfocusable element (like a `<div>` you've turned into a custom widget) reachable with the Tab key, in normal document order. `tabindex=\"-1\"` means 'focusable via `element.focus()` but skipped when tabbing' — exactly what you want for a modal container or an error-summary heading you move focus to after a failed submit. Positive values (`1`, `2`, `5`...) hijack the tab order ahead of everything else on the page and create a maintenance and accessibility nightmare; the fix for bad focus order is fixing the DOM order, not numbering your way around it.\n\nWhy the others are wrong:\n- b: it affects focusability only; the element stays in the DOM and remains visible.\n- c: positive values are widely considered an anti-pattern, the opposite of recommended.\n- d: `tabindex` is a global attribute — usable on any element, which is precisely how custom interactive widgets become keyboard-accessible."
  },
  {
    id: "html-038",
    category: "html",
    difficulty: "medium",
    type: "open",
    question: "What are `<fieldset>` and `<legend>` for? Why do they matter especially for groups of radio buttons?",
    code: null,
    options: null,
    answer: null,
    solution: "`<fieldset>` groups related form controls and `<legend>` gives that group a caption — together they provide a *group label* on top of each control's individual label. Radio buttons are the textbook case. Each radio gets its own label ('Standard', 'Express', 'Overnight'), but those words are meaningless without the question they answer. Sighted users see a nearby heading; a screen-reader user tabbing straight into the group would only hear 'Standard, radio button, 1 of 3'. Wrap the group in a fieldset with `<legend>Shipping speed</legend>` and the screen reader announces the legend along with the radio — restoring the context. The same pattern fits checkbox groups ('Toppings') and grouped sections of long forms ('Billing address' vs 'Shipping address'). Two bonus behaviors: `<fieldset disabled>` disables every control inside it at once — handy for greying out a whole section while saving — and the radios in a group are connected by sharing the same `name` attribute, which is what makes them mutually exclusive; the fieldset adds the accessible labeling, not the exclusivity. Interview tip: the crisp formulation is 'labels name the option, the legend names the question'."
  },
  {
    id: "html-039",
    category: "html",
    difficulty: "medium",
    type: "mcq",
    question: "What is the difference between `<link rel=\"preload\">`, `<link rel=\"prefetch\">`, and `<link rel=\"preconnect\">`?",
    code: null,
    options: {
      a: "They are interchangeable ways of saying 'download this early'",
      b: "`preload` fetches a resource needed for the *current* page at high priority; `prefetch` fetches a likely *future-page* resource at low priority; `preconnect` only performs the DNS/TCP/TLS handshake to an origin without fetching anything",
      c: "`prefetch` blocks rendering until the resource arrives",
      d: "`preconnect` downloads and caches the entire target page"
    },
    answer: "b",
    solution: "Correct: b. Three hints, three time horizons. `preload` says 'this page needs this soon and the parser won't discover it in time' — the classic case is a web font referenced deep inside CSS, or a hero image; it fetches at high priority, and you must include `as=\"font\"`/`as=\"image\"` (fonts also need `crossorigin`). `prefetch` says 'the *next* page will probably need this' — fetched at idle/low priority into the cache, e.g. the JS bundle of the checkout page while the user is still on the cart. `preconnect` does no fetching at all: it just pays the DNS + TCP + TLS handshake cost to a third-party origin (your API, a fonts CDN) ahead of time, shaving that latency off the first real request.\n\nWhy the others are wrong:\n- a: priority, timing, and what's transferred all differ — misusing `preload` for everything can actually hurt performance by stealing bandwidth.\n- c: prefetch is the lowest-priority hint and never blocks rendering.\n- d: preconnect transfers no resource bytes; it only warms up the connection."
  },
  {
    id: "html-040",
    category: "html",
    difficulty: "medium",
    type: "code",
    question: "Fill in the three blanks so the video shows native player controls, displays English captions, and shows a poster frame before playback starts.",
    code: "<video ____ poster=\"____\" width=\"640\" height=\"360\">\n  <source src=\"talk.webm\" type=\"video/webm\">\n  <source src=\"talk.mp4\" type=\"video/mp4\">\n  <track src=\"captions-en.vtt\" kind=\"____\" srclang=\"en\" label=\"English\" default>\n  Sorry, your browser doesn't support embedded videos.\n</video>",
    options: null,
    answer: null,
    solution: "The blanks: `controls`, an image URL such as `preview.jpg`, and `captions`.\n\n<video controls poster=\"preview.jpg\" width=\"640\" height=\"360\">\n  ...\n  <track src=\"captions-en.vtt\" kind=\"captions\" srclang=\"en\" label=\"English\" default>\n</video>\n\nWhat each piece does:\n- `controls` (a boolean attribute) renders the browser's native play/pause/volume/fullscreen UI; without it the video has no controls and can only be driven from JavaScript.\n- `poster` is the placeholder image shown before the first frame plays.\n- Multiple `<source>` elements are tried top to bottom; the browser plays the first format it supports, so put the more efficient codec (WebM) first.\n- `<track kind=\"captions\">` attaches a WebVTT subtitle file; `default` turns it on initially. `captions` includes dialogue *plus* meaningful sounds for deaf/hard-of-hearing users, whereas `kind=\"subtitles\"` assumes the user can hear and only translates dialogue — knowing that distinction is an accessibility plus.\n- The text inside `<video>` is fallback for ancient browsers only.\n\nAlso worth saying in an interview: autoplaying with sound is blocked by modern browsers — autoplay generally requires `muted`."
  },
  {
    id: "html-041",
    category: "html",
    difficulty: "medium",
    type: "open",
    question: "Canvas versus SVG: how do they differ, and when would you choose each for graphics in the browser?",
    code: null,
    options: null,
    answer: null,
    solution: "`<canvas>` is a raster bitmap you paint with JavaScript: you issue draw calls (`ctx.fillRect`, `drawImage`...) and the result is just pixels — the browser retains no knowledge of the shapes, so to change anything you redraw. SVG is retained-mode vector markup: every circle and path is a DOM element that stays addressable, styleable with CSS, and able to receive its own click handlers. That single difference drives all the trade-offs. SVG scales infinitely without pixelation (it's vector), is accessible (elements can carry `<title>` and ARIA, text stays real text), and is great for icons, logos, charts with interactive data points, and diagrams. But because every shape is a DOM node, tens of thousands of elements get slow. Canvas has flat per-frame cost regardless of scene complexity, making it the choice for games, particle effects, freehand drawing apps, and visualizations with 100k+ points — but it's a black box for accessibility (you must provide fallback content/ARIA yourself), it pixelates when scaled, and hit-testing ('which dot did the user click?') is on you. Rule of thumb: few hundred interactive, scalable shapes → SVG; thousands of fast-changing pixels → canvas. WebGL/WebGPU sit on canvas for 3D and GPU-heavy work. Interview tip: 'SVG is a DOM you describe, canvas is pixels you paint' is the memorable one-liner."
  },
  {
    id: "html-042",
    category: "html",
    difficulty: "medium",
    type: "mcq",
    question: "What is the main benefit of filling in the `autocomplete` attribute properly (e.g. `autocomplete=\"email\"`, `autocomplete=\"new-password\"`, `autocomplete=\"postal-code\"`) on form fields?",
    code: null,
    options: {
      a: "It validates the field's format before submission",
      b: "It encrypts the field's value when the form is submitted",
      c: "It lets browsers and password managers reliably autofill the right value into the right field — faster checkout, correct saved-password behavior, and an accessibility win for users with motor or cognitive impairments",
      d: "It is only relevant for `<textarea>` elements"
    },
    answer: "c",
    solution: "Correct: c. Browsers *guess* what a field is from its name and label, but `autocomplete` tokens remove the guessing: `given-name`, `family-name`, `email`, `street-address`, `postal-code`, `cc-number`, `tel`, `one-time-code` (autofills SMS codes on mobile!) and friends map fields precisely. The password-manager pair matters most: `autocomplete=\"current-password\"` on login tells the manager to fill the saved password, while `autocomplete=\"new-password\"` on signup/change forms tells it to *offer a generated password* and not to autofill the old one. Proper autofill is also a WCAG success criterion (1.3.5 Identify Input Purpose) because retyping is a real barrier for users with motor or cognitive impairments. Note `autocomplete=\"off\"` is largely ignored for login fields by modern browsers — they refuse to let sites break password managers.\n\nWhy the others are wrong:\n- a: validation comes from `required`, `pattern`, `type`, etc. — autocomplete doesn't validate anything.\n- b: it has nothing to do with encryption; that's HTTPS.\n- d: it applies to inputs and selects across the whole form, not textareas specifically."
  },
  {
    id: "html-043",
    category: "html",
    difficulty: "medium",
    type: "open",
    question: "What are Open Graph meta tags (`og:*`) and Twitter card tags? Why would a marketing team file a bug asking you to add them?",
    code: null,
    options: null,
    answer: null,
    solution: "They control the rich preview card that appears when someone shares your URL in a chat or social feed — Slack, WhatsApp, LinkedIn, Facebook, X, iMessage all read them. The Open Graph protocol (originally from Facebook, now the de-facto standard) uses meta tags with a `property` attribute: `og:title`, `og:description`, `og:image` (the big preview picture — typically 1200×630), `og:url` (the canonical share URL), and `og:type`. Twitter/X reads OG tags too but has its own refinements, most importantly `twitter:card` with `summary_large_image` for the full-width image layout. Without these tags, the scraper falls back to guessing from your `<title>` and grabbing a random image — which is exactly the bug the marketing team is seeing: links shared to the new landing page show the wrong picture and a truncated description, and link click-through rates measurably drop with bad cards. Implementation notes that matter in practice: the `og:image` URL must be absolute and publicly reachable (scrapers don't log in), the tags must be in the server-rendered HTML because most scrapers don't execute JavaScript (an SPA pitfall), and platforms cache the card — use their debugger/validator tools to force a re-scrape after fixing. Interview tip: the JavaScript-rendering pitfall is the detail that shows production experience."
  },
  {
    id: "html-044",
    category: "html",
    difficulty: "medium",
    type: "mcq",
    question: "What is the difference between the HTML `hidden` attribute, CSS `display: none`, and CSS `visibility: hidden`?",
    code: null,
    options: {
      a: "All three are identical in effect",
      b: "`hidden` and `display: none` remove the element from layout and from the accessibility tree, with `hidden` expressing it semantically in markup; `visibility: hidden` keeps the element's space reserved in layout while making it invisible and unfocusable",
      c: "`visibility: hidden` removes the element's space; `display: none` keeps it",
      d: "The `hidden` attribute only works on form elements"
    },
    answer: "b",
    solution: "Correct: b. The `hidden` attribute is the markup-level way to say 'this content is not relevant right now'; browsers implement it as `display: none` in the user-agent stylesheet, so the element takes no space, is unfocusable, and is removed from the accessibility tree (screen readers skip it). Putting the semantics in HTML also means JavaScript can toggle it cleanly (`el.hidden = true`). `visibility: hidden` is the odd one out: the element becomes invisible and non-interactive, but its box *still occupies space* — the layout doesn't reflow, leaving a hole. That's occasionally what you want (reserving space to avoid layout shift) but usually surprises people.\n\nWhy the others are wrong:\n- a: the space-reservation difference alone separates `visibility: hidden` from the other two.\n- c: it's exactly backwards.\n- d: `hidden` is a global attribute, valid on any element.\n\nGotcha worth knowing: any author CSS that sets `display` on the element (e.g. `.row { display: flex }`) overrides the UA's `display: none` and silently breaks the `hidden` attribute — a classic debugging story."
  },
  {
    id: "html-045",
    category: "html",
    difficulty: "medium",
    type: "code",
    question: "Using the new popover API (no JavaScript at all), fill in the two blanks so the button toggles the help bubble open and closed, with light-dismiss (clicking outside or pressing Esc closes it).",
    code: "<button ____=\"help-bubble\">Help</button>\n\n<div id=\"help-bubble\" ____>\n  Prices include VAT. Shipping is calculated at checkout.\n</div>",
    options: null,
    answer: null,
    solution: "The blanks are `popovertarget` and `popover`:\n\n<button popovertarget=\"help-bubble\">Help</button>\n\n<div id=\"help-bubble\" popover>\n  Prices include VAT. ...\n</div>\n\nHow it works: the `popover` attribute makes the div hidden by default and renders it in the browser's *top layer* when shown — above every stacking context, immune to `z-index` and `overflow: hidden` clipping from ancestors. The button's `popovertarget` points at the popover's `id` and toggles it on click. The default mode (`popover=\"auto\"`) gives you light-dismiss for free: clicking outside or pressing Esc closes it, and opening one auto popover closes others. `popover=\"manual\"` opts out of light-dismiss for things like persistent toasts. JavaScript hooks exist too (`showPopover()`, `hidePopover()`, the `toggle` event), but the point of the API is that tooltips, menus, and hint bubbles no longer require a positioning library or global click listeners.\n\nHow it differs from `<dialog showModal()>`: popovers are non-modal — the rest of the page stays interactive and nothing is made inert. Modal = dialog; non-modal floating UI = popover."
  },
  {
    id: "html-046",
    category: "html",
    difficulty: "advanced",
    type: "open",
    question: "What are web components? Explain custom elements, shadow DOM, and where `<template>`/`<slot>` fit in.",
    code: null,
    options: null,
    answer: null,
    solution: "Web components are a set of native browser APIs for building reusable, encapsulated UI elements without a framework — three pieces that combine. (1) **Custom elements**: you define a class extending `HTMLElement` and register it with `customElements.define('user-card', UserCard)` — the name must contain a hyphen. The browser then instantiates your class wherever `<user-card>` appears and calls lifecycle callbacks: `connectedCallback` (added to DOM), `disconnectedCallback`, and `attributeChangedCallback` for attributes listed in `observedAttributes`. (2) **Shadow DOM**: `this.attachShadow({ mode: 'open' })` gives the element a private subtree with style encapsulation — outside CSS doesn't leak in, inside styles don't leak out, and outside `querySelector` can't see in. This is real, native scoping, the thing CSS-in-JS libraries simulate. (3) **`<template>` and `<slot>`**: the template holds the component's inert internal markup to clone into the shadow root, and `<slot>` marks where the user's child content gets projected — `<user-card><span slot=\"name\">Ada</span></user-card>` fills a named slot. Strengths: framework-agnostic (works in React, Vue, or plain HTML — design systems like Adobe's and Microsoft's ship this way), truly encapsulated, future-proof. Costs: more boilerplate than a framework component, and server-side rendering is awkward (declarative shadow DOM helps). Interview tip: name a real-world sighting — e.g. GitHub's relative time element on every commit page is a custom element."
  },
  {
    id: "html-047",
    category: "html",
    difficulty: "advanced",
    type: "mcq",
    question: "What does the `inert` attribute do when applied to an element?",
    code: null,
    options: {
      a: "It freezes all CSS animations inside the element",
      b: "It makes the element and its entire subtree completely non-interactive: unclickable, unfocusable, removed from tab order and the accessibility tree — as if that part of the page were temporarily 'switched off'",
      c: "It is equivalent to `disabled` and only works on form controls",
      d: "It prevents the element's content from being selected, but everything remains clickable and focusable"
    },
    answer: "b",
    solution: "Correct: b. `inert` switches off an entire subtree: pointer events don't reach it, nothing inside can take focus, it's skipped by Tab and by screen readers, and in-page find won't land there. Its killer use case is custom modals and off-screen UI: when a custom overlay opens, you mark the rest of the app `inert` so keyboard and screen-reader users can't wander 'behind' the modal — the focus trap that libraries used to fake with JavaScript focus juggling. Same for a mobile nav drawer's hidden state or content under a loading overlay. Note that `<dialog>.showModal()` applies this behavior to the rest of the page automatically; `inert` is how you get it for *custom* overlays.\n\nWhy the others are wrong:\n- a: CSS animations keep running; `inert` is about interaction and accessibility exposure, not rendering.\n- c: `disabled` exists only on form controls; `inert` works on any element and covers its whole subtree, including links and custom widgets.\n- d: it does far more than block selection — interaction and focusability are entirely removed."
  },
  {
    id: "html-048",
    category: "html",
    difficulty: "advanced",
    type: "code",
    question: "An accessibility audit flags this page's heading structure. List every problem you can find and rewrite the outline correctly. (The visual design must not change — the 'small text' look of the date is styled with CSS.)",
    code: "<body>\n  <h1>TechBlog</h1>\n  <main>\n    <h1>Why We Migrated to TypeScript</h1>\n    <h4>March 12, 2026</h4>\n    <h3>The problems we had</h3>\n    <p>...</p>\n    <h3>The migration plan</h3>\n    <p>...</p>\n    <b>Results</b>\n    <p>...</p>\n  </main>\n</body>",
    options: null,
    answer: null,
    solution: "Problems:\n1. **Two `<h1>`s** — the site name and the article title compete for 'page topic'. The article title should be the single `<h1>`; the site name in a header is branding, not a heading (or at minimum only one of them can be h1).\n2. **`<h4>` used for its looks** — the date isn't a section heading at all; it's metadata. Choosing h4 because it renders small is the classic 'styling with headings' mistake. Use `<p>` or better `<time>`.\n3. **Skipped levels** — h1 jumps to h4, then h3. Screen-reader users navigating by headings hear a broken outline and wonder what they missed.\n4. **`<b>Results</b>` as a fake heading** — bold text is invisible to heading navigation. It must be a real heading element.\n\nCorrect version:\n\n<body>\n  <header><p>TechBlog</p></header>\n  <main>\n    <article>\n      <h1>Why We Migrated to TypeScript</h1>\n      <p><time datetime=\"2026-03-12\">March 12, 2026</time></p>\n      <h2>The problems we had</h2>\n      <p>...</p>\n      <h2>The migration plan</h2>\n      <p>...</p>\n      <h2>Results</h2>\n      <p>...</p>\n    </article>\n  </main>\n</body>\n\nThe rule: headings express *document structure*, never font size — CSS handles the looks. One h1, no skipped levels going down, and anything that functions as a section title must be a real `<hN>`."
  },
  {
    id: "html-049",
    category: "html",
    difficulty: "advanced",
    type: "open",
    question: "From the moment the browser receives your HTML, what determines how quickly the user sees content? Explain render-blocking resources and what you can do in your markup to speed up first paint.",
    code: null,
    options: null,
    answer: null,
    solution: "The browser parses HTML top to bottom into the DOM, but it cannot paint until it also has the CSSOM — so every stylesheet in the head is *render-blocking*: nothing appears until all CSS has downloaded and parsed. Classic synchronous `<script>` tags are worse: they block *parsing* itself, because the script might `document.write` or read styles. So the markup-level levers are: (1) Scripts — use `defer` (or `type=\"module\"`, which defers by default) so parsing never stops, and reserve `async` for independent scripts like analytics. (2) CSS — keep it lean, inline the small amount of *critical* CSS for above-the-fold content directly in a `<style>` tag so first paint needs zero CSS network round-trips, and load non-critical styles with `media` tricks or split files (e.g. `media=\"print\"`). (3) Resource hints — `preconnect` to third-party origins, `preload` late-discovered resources like web fonts (with `crossorigin`), and `font-display: swap` so text isn't invisible while fonts load. (4) Images — explicit `width`/`height` (or `aspect-ratio`) prevent layout shift, `loading=\"lazy\"` keeps below-the-fold images off the critical path, and `fetchpriority=\"high\"` boosts the hero image that drives LCP. (5) Order matters: meta charset and viewport early, CSS before any blocking script. These map directly onto Core Web Vitals — FCP/LCP for paint speed, CLS for stability. Interview tip: the crisp model is 'CSS blocks rendering, sync JS blocks parsing' — say that sentence and then hang the fixes off it."
  },
  {
    id: "html-050",
    category: "html",
    difficulty: "advanced",
    type: "mcq",
    question: "A form lets users attach a profile photo with `<input type=\"file\">`, but on the server the uploaded file never arrives — only the filename as text. What is the most likely missing piece?",
    code: null,
    options: {
      a: "The form is missing `enctype=\"multipart/form-data\"` (and must use `method=\"post\"`), so the file's contents are not encoded into the request",
      b: "File inputs require `target=\"_blank\"` on the form",
      c: "The input is missing the `accept` attribute, which is required for uploads to work",
      d: "Files can only be uploaded with JavaScript, never with a plain HTML form"
    },
    answer: "a",
    solution: "Correct: a. The default form encoding is `application/x-www-form-urlencoded`, which serializes fields as `name=value` text pairs — for a file input, that means *just the filename string*, exactly the symptom described. Setting `enctype=\"multipart/form-data\"` switches to an encoding that splits the body into parts, one per field, with the file's raw bytes (plus its filename and content type) in its own part. It only makes sense with `method=\"post\"` — you can't put file bytes in a URL.\n\nWhy the others are wrong:\n- b: `target` controls where the response is displayed; it has nothing to do with encoding.\n- c: `accept=\"image/*\"` is a useful UX filter for the file picker, but it's optional — and note it's advisory only, *not* security: users can pick anything, so the server must validate the real file type itself.\n- d: plain HTML forms have uploaded files since the 1990s; JavaScript (`FormData`, `fetch`) is the modern alternative for in-page uploads, not a requirement.\n\nBonus: add `multiple` to let users select several files."
  }
];
