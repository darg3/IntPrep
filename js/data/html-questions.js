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
  }
];
