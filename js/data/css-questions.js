window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["css"] = [
  {
    id: "css-001",
    category: "css",
    difficulty: "basic",
    type: "open",
    question: "Walk me through the CSS box model. What are its four parts and how do they affect an element's rendered size?",
    code: null,
    options: null,
    answer: null,
    solution: "Every element is rendered as a rectangular box made of four layers, from the inside out: content, padding, border, and margin. The content area holds the text or child elements and is what `width` and `height` size by default. Padding is transparent space between the content and the border, and it takes the element's background color. The border wraps the padding and content and can have its own width, style, and color. Margin is transparent space outside the border that pushes neighboring elements away; it never takes the background color. With the default `box-sizing: content-box`, padding and border are added on top of the declared width, so a 200px-wide element with 20px padding and a 5px border actually paints 250px wide. Margins add spacing around that box but are not part of the element's own size. Interview tip: mention that most teams set `box-sizing: border-box` globally so declared widths include padding and border, which makes layout math predictable."
  },
  {
    id: "css-002",
    category: "css",
    difficulty: "basic",
    type: "mcq",
    question: "An element has `width: 200px; padding: 20px; border: 5px solid; box-sizing: border-box;`. How wide is its visible box (content + padding + border)?",
    code: null,
    options: {
      a: "250px, because padding and border are always added to the width",
      b: "200px, because border-box makes the declared width include padding and border",
      c: "150px, because border-box subtracts padding and border from the visible box",
      d: "240px, because border-box includes padding but not the border"
    },
    answer: "b",
    solution: "Correct answer: b. With `box-sizing: border-box`, the declared `width` is the outer edge-to-edge size of content + padding + border, so the visible box is exactly 200px and the browser shrinks the content area to 150px to make room. (a) describes the default `content-box` behavior, where the box would be 200 + 40 + 10 = 250px. (c) confuses the visible box with the content area: 150px is the inner content width, not the rendered box. (d) is wrong because border-box includes both padding and border, not just padding. This is why developers apply `*, *::before, *::after { box-sizing: border-box; }` globally: a declared width is the real on-screen width."
  },
  {
    id: "css-003",
    category: "css",
    difficulty: "basic",
    type: "code",
    question: "With the default `box-sizing`, how many pixels wide is this element's visible box on screen? And how much horizontal space does it occupy including margin?",
    code: ".card {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid #333;\n  margin: 10px;\n}",
    options: null,
    answer: null,
    solution: "Visible box: 250px. Total horizontal footprint including margin: 270px. The default `box-sizing` is `content-box`, so `width: 200px` sizes only the content area. The browser then adds 20px padding on each side (+40) and a 5px border on each side (+10), giving 200 + 40 + 10 = 250px of painted box. The 10px margin on each side adds 20px of transparent spacing, so the element claims 270px of horizontal space, but margin is not part of the element itself and never shows a background. If you added `box-sizing: border-box` to this rule, the visible box would shrink to exactly 200px and the content area would become 150px."
  },
  {
    id: "css-004",
    category: "css",
    difficulty: "basic",
    type: "mcq",
    question: "Which statement about the difference between `margin` and `padding` is true?",
    code: null,
    options: {
      a: "Margin can be negative or `auto`; padding can be neither",
      b: "Padding sits outside the border, while margin sits inside it",
      c: "The element's background color fills the margin but not the padding",
      d: "Padding between adjacent elements collapses; margins never collapse"
    },
    answer: "a",
    solution: "Correct answer: a. Margin accepts negative values (to pull elements closer or overlap them) and `auto` (famously used for horizontal centering with `margin: 0 auto`), while padding must be zero or positive and has no `auto` value. (b) is reversed: padding is inside the border, margin is outside. (c) is also reversed: the background fills the content and padding areas, but margin is always transparent. (d) is backwards too: it is vertical margins that can collapse between adjacent elements, while padding never collapses. A tidy one-liner for interviews: padding is space inside the box, margin is space between boxes."
  },
  {
    id: "css-005",
    category: "css",
    difficulty: "basic",
    type: "open",
    question: "What are the three ways to add CSS to a page, and which one do you prefer in production? Why?",
    code: null,
    options: null,
    answer: null,
    solution: "The three ways are inline styles, internal styles, and external stylesheets. Inline styles go directly on an element via the `style` attribute; they have the highest specificity, apply to one element only, and are hard to maintain, so they are mostly reserved for quick tests or dynamically computed values. Internal styles live in a `<style>` block in the document head and apply to that one page; they can be handy for a single-page demo or critical above-the-fold CSS. External stylesheets are separate `.css` files referenced with a `<link>` tag, and they are the standard for production. External CSS keeps content and presentation separated, lets many pages share one stylesheet, keeps HTML small, and most importantly lets the browser cache the file so repeat page loads are faster. It also plays nicely with build tools, minification, and team workflows. Interview tip: mention browser caching as the concrete performance reason external stylesheets win."
  },
  {
    id: "css-006",
    category: "css",
    difficulty: "basic",
    type: "mcq",
    question: "You need to hide an element visually but keep it occupying its space in the layout, and it must not receive clicks. Which declaration does that?",
    code: null,
    options: {
      a: "display: none",
      b: "position: absolute",
      c: "visibility: hidden",
      d: "opacity: 0"
    },
    answer: "c",
    solution: "Correct answer: c. `visibility: hidden` makes the element invisible and unclickable while its box still reserves space in the layout. (a) `display: none` removes the element from layout entirely, so surrounding content reflows as if it never existed, which fails the keep-its-space requirement. (b) `position: absolute` does not hide anything; it only takes the element out of normal flow. (d) `opacity: 0` keeps the space and makes the element fully transparent, but it still receives pointer events and keyboard focus, so users could click an invisible button. The classic interview trio: `display: none` = gone from layout, `visibility: hidden` = invisible but space kept, `opacity: 0` = invisible, space kept, and still interactive."
  },
  {
    id: "css-007",
    category: "css",
    difficulty: "medium",
    type: "code",
    question: "A paragraph element has `id=\"intro\"` and `class=\"text\"`. Given these rules, what color does its text render, and why?",
    code: "#intro { color: blue; }\n.text { color: green; }\np.text { color: orange; }\np { color: red; }",
    options: null,
    answer: null,
    solution: "The text renders blue. Specificity is compared as a three-part value (IDs, classes/attributes/pseudo-classes, type selectors). `#intro` scores (1,0,0); `p.text` scores (0,1,1); `.text` scores (0,1,0); `p` scores (0,0,1). The ID selector's (1,0,0) beats any number of classes and elements because each tier outranks everything in the tiers below it; specificity is not a simple sum where ten classes could beat one ID. Source order only breaks ties between equal specificity, so the fact that `p` comes last is irrelevant here. Only an inline `style` attribute or an `!important` declaration could override the ID selector in this example. Interview tip: be ready to say the tuple out loud, e.g. \"that selector is one-zero-zero, so it wins.\""
  },
  {
    id: "css-008",
    category: "css",
    difficulty: "medium",
    type: "open",
    question: "When two CSS rules target the same element with conflicting declarations, how does the browser decide which one wins? Walk me through the cascade.",
    code: null,
    options: null,
    answer: null,
    solution: "The cascade resolves conflicts in a fixed sequence of tie-breakers. First, origin and importance: normal author styles beat user and browser default styles, but `!important` declarations flip that order, which is why `!important` is so disruptive. Next, modern browsers consider cascade layers declared with `@layer`: later layers beat earlier ones, and unlayered styles beat layered ones. Then specificity is compared as the (IDs, classes, elements) tuple, with inline `style` attributes sitting above all selectors. Finally, if two rules are still tied, source order wins: the rule declared last in the stylesheet (or the last stylesheet loaded) applies. Inherited values sit at the bottom; any directly targeted rule beats inheritance. A strong answer also notes that `!important` should be a last resort because it breaks the natural cascade and forces escalating specificity wars. Interview tip: summarize it as origin, layers, specificity, then source order."
  },
  {
    id: "css-009",
    category: "css",
    difficulty: "basic",
    type: "mcq",
    question: "Which selector targets only `li` elements that are direct children of a `ul` (not grandchildren in nested lists)?",
    code: null,
    options: {
      a: "ul li",
      b: "ul + li",
      c: "ul ~ li",
      d: "ul > li"
    },
    answer: "d",
    solution: "Correct answer: d. The child combinator `>` matches only direct children, so `ul > li` skips `li` elements nested deeper inside a child `ol` or `ul`. (a) `ul li` uses the descendant combinator (a space), which matches `li` at any depth, including grandchildren, which is exactly what the question rules out. (b) `ul + li` is the adjacent sibling combinator: it would match an `li` that immediately follows a `ul` at the same level, not children. (c) `ul ~ li` is the general sibling combinator, matching any later `li` sibling of the `ul`. Knowing all four combinators (descendant space, child `>`, adjacent sibling `+`, general sibling `~`) is a frequent screening question."
  },
  {
    id: "css-010",
    category: "css",
    difficulty: "basic",
    type: "open",
    question: "What is the difference between pseudo-classes and pseudo-elements? Give a couple of examples of each.",
    code: null,
    options: null,
    answer: null,
    solution: "A pseudo-class selects an element when it is in a particular state or position, while a pseudo-element lets you style a specific part of an element or insert generated content, effectively creating a virtual element. Pseudo-classes use a single colon: `:hover` for mouse-over, `:focus` for keyboard or input focus, `:nth-child(2n)` for position among siblings, and `:checked` for toggled inputs. Pseudo-elements use a double colon: `::before` and `::after` inject generated content (they require the `content` property to render), `::first-line` styles just the first line of text, and `::placeholder` styles input placeholder text. The mental model: pseudo-classes answer \"is this element currently X?\", pseudo-elements answer \"style this piece of the element that has no tag of its own.\" Browsers still accept single-colon `:before` and `:after` for legacy reasons, but the modern convention is the double colon to visually distinguish the two. Interview tip: mentioning that `::before`/`::after` do nothing without `content: \"\"` shows hands-on experience."
  },
  {
    id: "css-011",
    category: "css",
    difficulty: "medium",
    type: "mcq",
    question: "What is the difference between the `em` and `rem` units?",
    code: null,
    options: {
      a: "`em` is relative to the viewport width; `rem` is relative to the root element",
      b: "`em` is relative to the current (inherited) font-size; `rem` is always relative to the root element's font-size",
      c: "`rem` compounds when elements are nested; `em` does not",
      d: "They are identical except that `em` only works on the font-size property"
    },
    answer: "b",
    solution: "Correct answer: b. `1em` equals the element's own computed font-size (which for font-size itself means the parent's), so nested `em` values multiply: 1.2em inside 1.2em yields 1.44 times the base. `1rem` always equals the root (`html`) font-size, typically 16px, so it stays stable no matter how deeply nested the element is, which makes `rem` the safer default for font sizes and spacing. (a) confuses `em` with viewport units; `vw`/`vh` are the ones tied to viewport width and height. (c) is reversed: it is `em` that compounds, which is precisely the bug `rem` avoids. (d) is false: both units work anywhere a length is accepted, like padding, margin, and width. Quick unit guide for interviews: `px` for fixed details like borders, `rem` for type and spacing so user font preferences scale the UI, `em` for spacing that should track the local font-size, `%` for sizes relative to the parent, and `vw`/`vh` for viewport-relative hero sections."
  },
  {
    id: "css-012",
    category: "css",
    difficulty: "medium",
    type: "code",
    question: "Fill in the blank so the toolbar's items are vertically centered within its height.",
    code: ".toolbar {\n  display: flex;\n  flex-direction: row;\n  height: 64px;\n  justify-content: space-between;\n  ____: center;\n}",
    options: null,
    answer: null,
    solution: "The blank is `align-items`. In flexbox, `justify-content` distributes items along the main axis and `align-items` aligns them along the cross axis. With `flex-direction: row`, the main axis is horizontal, so `justify-content: space-between` spreads items left to right, and the cross axis is vertical, so `align-items: center` centers them within the 64px height. The key insight interviewers probe: these properties are tied to the axes, not to horizontal and vertical. If you switched to `flex-direction: column`, the axes would swap and `justify-content` would control vertical distribution while `align-items` controlled horizontal alignment. Related properties worth naming: `align-self` overrides cross-axis alignment for one item, and `align-content` spaces multiple wrapped lines."
  },
  {
    id: "css-013",
    category: "css",
    difficulty: "medium",
    type: "open",
    question: "Flexbox versus CSS Grid: how do you decide which one to use for a given layout?",
    code: null,
    options: null,
    answer: null,
    solution: "The standard rule of thumb is that flexbox is one-dimensional and grid is two-dimensional. Flexbox lays content out along a single axis, a row or a column, and excels when the content's own size should drive the layout: navbars, toolbars, button groups, centering a single item, or spacing tags that wrap naturally. Grid lets you define rows and columns together and place items into that structure, so it excels when the layout comes first: full page scaffolding with header, sidebar, main, and footer, card galleries, dashboards, and forms with aligned label and input columns. A useful framing is content-out versus layout-in: flexbox sizes tracks from the content, grid imposes a track structure onto the content. Grid also offers `grid-template-areas` for naming regions, which makes page layouts very readable, plus `repeat()`, `minmax()`, and the `fr` unit for responsive tracks without media queries. They are not rivals: a typical page uses grid for the macro layout and flexbox inside individual components like a card's header row. Interview tip: answering \"grid for the page, flexbox for the components\" with one concrete example of each reads as practical experience."
  },
  {
    id: "css-014",
    category: "css",
    difficulty: "advanced",
    type: "mcq",
    question: "What does the shorthand `flex: 1` on a flex item expand to?",
    code: null,
    options: {
      a: "flex-grow: 1; flex-shrink: 1; flex-basis: 0%",
      b: "flex-grow: 1; flex-shrink: 0; flex-basis: auto",
      c: "flex-grow: 1; flex-shrink: 1; flex-basis: auto",
      d: "flex-grow: 1; order: 1; flex-basis: 100%"
    },
    answer: "a",
    solution: "Correct answer: a. `flex: 1` means `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`. The crucial detail is the `0%` basis: every item starts from zero and all free space is distributed by grow factor, so sibling items with `flex: 1` end up with equal widths regardless of their content. (c) actually describes `flex: auto` (`1 1 auto`), where items start from their content size and only the leftover space is shared, producing unequal, content-proportional widths. (b) corresponds to `flex: 1 0 auto`, which no single-keyword shorthand produces; with `shrink: 0` items would refuse to shrink and could overflow their container. (d) is invalid: `order` is a separate property and is never part of the `flex` shorthand. This `0%` versus `auto` distinction is a favorite senior-flavored follow-up: equal columns come from `flex: 1`, content-weighted columns from `flex: auto`."
  },
  {
    id: "css-015",
    category: "css",
    difficulty: "medium",
    type: "code",
    question: "Fill in the blank so the gallery shows as many columns as fit, each at least 200px wide and stretching equally to share leftover space — with no media queries.",
    code: ".gallery {\n  display: grid;\n  grid-template-columns: ____;\n  gap: 16px;\n}",
    options: null,
    answer: null,
    solution: "The blank is `repeat(auto-fit, minmax(200px, 1fr))`. Breaking it down: `repeat()` generates as many column tracks as the function decides; `auto-fit` creates as many tracks as fit in the container's width and collapses any empty ones so real items stretch to fill the row; `minmax(200px, 1fr)` says each track may never go below 200px but can grow to take an equal share of free space. The `fr` unit means one fraction of the remaining space after fixed sizes and gaps are subtracted, so `1fr` per track yields equal columns. As the viewport narrows, tracks drop out one by one and items reflow onto new rows automatically, which is why this one-liner replaces a stack of media queries for card grids. The sibling keyword `auto-fill` keeps the empty tracks instead of collapsing them, leaving items at their minimum-ish width when there are few of them. This pattern, often called RAM (repeat, auto, minmax), is one of the most practical grid idioms to know in interviews."
  },
  {
    id: "css-016",
    category: "css",
    difficulty: "advanced",
    type: "mcq",
    question: "A wide container uses `grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))` but holds only 2 items. How would switching `auto-fill` to `auto-fit` change the result?",
    code: null,
    options: {
      a: "Nothing changes; auto-fill and auto-fit are aliases",
      b: "auto-fit would create extra empty tracks, while auto-fill collapses them",
      c: "auto-fill is invalid inside repeat(), so the rule is currently being ignored",
      d: "auto-fill keeps the empty tracks so the 2 items stay near 150px wide; auto-fit collapses the empty tracks so the 2 items stretch to fill the whole row"
    },
    answer: "d",
    solution: "Correct answer: d. Both keywords create as many tracks as fit the container, but they differ when there are fewer items than tracks. `auto-fill` keeps the surplus empty tracks in the grid, so the 2 items each occupy one narrow track and empty space remains beside them. `auto-fit` collapses the empty tracks to zero width, letting the `1fr` maximum stretch the 2 real items across the full row. (a) is wrong: they behave identically only when items fill every track. (b) states the difference exactly backwards, which is the most common confusion. (c) is wrong: `auto-fill` is perfectly valid inside `repeat()`. Practical guidance: use `auto-fit` when you want few items to grow and fill the row, `auto-fill` when you want items to keep a consistent size as if the grid were full."
  },
  {
    id: "css-017",
    category: "css",
    difficulty: "medium",
    type: "open",
    question: "Explain the five `position` values — static, relative, absolute, fixed, and sticky. What is each one positioned relative to?",
    code: null,
    options: null,
    answer: null,
    solution: "`static` is the default: the element sits in normal document flow and the offset properties `top`, `right`, `bottom`, `left`, and `z-index` have no effect. `relative` keeps the element's slot in normal flow but lets you nudge it visually with offsets relative to where it would normally sit; the original space is still reserved, and importantly it makes the element a positioning ancestor for absolute children. `absolute` removes the element from flow entirely and positions it relative to the nearest ancestor whose position is anything other than static; if no such ancestor exists it falls back to the initial containing block, essentially the document. `fixed` also leaves the flow but anchors to the viewport, staying put during scroll, which suits modals and persistent navigation; a caveat is that an ancestor with a `transform` or `filter` becomes its containing block and breaks the viewport anchoring. `sticky` is a hybrid: the element scrolls normally until it reaches the offset you set, like `top: 0`, then it pins within its nearest scrolling ancestor, but only while inside its parent's bounds. The relative-versus-absolute pairing is the classic follow-up: a common pattern is `position: relative` on a container purely so a child with `position: absolute` positions against it. Interview tip: the sentence \"absolute positions against the nearest positioned ancestor\" is the exact phrase screeners listen for."
  },
  {
    id: "css-018",
    category: "css",
    difficulty: "basic",
    type: "mcq",
    question: "An element has `position: absolute; top: 0; left: 0;`. What is it positioned relative to?",
    code: null,
    options: {
      a: "Always the viewport",
      b: "The nearest ancestor with a position other than static, or the initial containing block if there is none",
      c: "Always its direct parent element",
      d: "Always the body element"
    },
    answer: "b",
    solution: "Correct answer: b. An absolutely positioned element searches up the tree for the closest ancestor whose `position` is `relative`, `absolute`, `fixed`, or `sticky` and uses that ancestor's padding box as its coordinate system; if none exists, it uses the initial containing block, which corresponds to the document's root area. (a) describes `position: fixed`, not absolute. (c) is the most common misconception: the direct parent only counts if it is itself positioned, which is exactly why developers add `position: relative` to a parent without any offsets. (d) is wrong because `body` is only the reference if it happens to be a positioned ancestor or via the initial containing block fallback. The practical takeaway interviewers want: \"to anchor an absolute child, put `position: relative` on the container.\""
  },
  {
    id: "css-019",
    category: "css",
    difficulty: "advanced",
    type: "code",
    question: "This header is supposed to stick to the top while the page scrolls, but it never sticks. Spot the bug.",
    code: ".page {\n  overflow: hidden;\n}\n.page .header {\n  position: sticky;\n  top: 0;\n  background: white;\n}",
    options: null,
    answer: null,
    solution: "The bug is `overflow: hidden` on the `.page` ancestor. Any ancestor with `overflow: hidden`, `auto`, or `scroll` becomes the sticky element's scroll container (only `visible` and the modern `clip` avoid this). Since `.page` itself never scrolls (the document does), the header has nothing to stick within and simply behaves as if it were static. Fixes: remove `overflow: hidden` from `.page`, replace it with `overflow: clip` (which clips without creating a scroll container, so sticky keeps working), or make `.page` the actual scrollable area with a constrained height. Two other classic sticky gotchas worth naming in an interview: sticky does nothing without an offset like `top: 0`, and the element can only stick while it remains inside its direct parent's box, so a parent exactly as tall as the header gives it no room to stick. This question doubles as an overflow question: overflow values other than visible change scrolling and clipping behavior in ways that have side effects on descendants."
  },
  {
    id: "css-020",
    category: "css",
    difficulty: "advanced",
    type: "mcq",
    question: "The dropdown renders behind `.main` even though its z-index is 9999. Why?",
    code: ".sidebar {\n  position: relative;\n  z-index: 1;\n}\n.sidebar .dropdown {\n  position: absolute;\n  z-index: 9999;\n}\n.main {\n  position: relative;\n  z-index: 2;\n}",
    options: {
      a: "Browsers clamp z-index values above 1000, so 9999 is invalid",
      b: "position: absolute elements always paint below position: relative elements",
      c: "The dropdown's z-index needs !important to beat a sibling stacking context",
      d: "`.sidebar` (positioned with a z-index) creates a stacking context, so the dropdown's 9999 only competes inside the sidebar, and the entire sidebar context sits below `.main` at the parent level"
    },
    answer: "d",
    solution: "Correct answer: d. Because `.sidebar` is positioned and has a z-index, it creates a stacking context: all of its descendants' z-index values are compared only against each other, sealed inside it. At the top level the comparison is `.sidebar` (z-index 1) versus `.main` (z-index 2), so everything inside the sidebar, including the 9999 dropdown, paints below `.main`. Think of stacking contexts like version numbers: 1.9999 is still less than 2. The fix is to raise `.sidebar`'s own z-index above 2, or restructure so the dropdown is not trapped inside a lower context. (a) is false: there is no such clamp; z-index accepts very large integers. (b) is false: absolute and relative elements share the same stacking rules. (c) is false: `!important` affects which declaration wins the cascade, not paint order across stacking contexts. Bonus knowledge that impresses: stacking contexts are also created by `opacity` less than 1, `transform`, `filter`, `will-change`, and `position: fixed`, which is why a stray transform on an ancestor can mysteriously break z-index."
  },
  {
    id: "css-021",
    category: "css",
    difficulty: "advanced",
    type: "open",
    question: "What is a stacking context, what creates one, and why does z-index sometimes seem not to work?",
    code: null,
    options: null,
    answer: null,
    solution: "A stacking context is a self-contained layer group: the z-index values of everything inside it are resolved relative to each other, and then the whole group is stacked as a single unit against its sibling contexts. That is why z-index sometimes seems broken: an element with `z-index: 9999` cannot escape a parent stacking context that sits below another context, because the comparison happens at the parents' level first. The root element creates the base context, and new ones are created by, among others: a positioned element with a z-index other than auto; `position: fixed` or `sticky`; `opacity` less than 1; any `transform`, `filter`, `perspective`, or `clip-path`; `will-change` hinting those properties; `isolation: isolate`; and a flex or grid item given a z-index. The sneakiest cases are `opacity` and `transform`, since they are usually added for visual effects with no intention of affecting stacking. Also remember that z-index only applies to positioned elements and to flex or grid items; on a plain static block it is ignored. When debugging, walk up the DOM looking for ancestors with transform, opacity, or filter, and compare contexts at the level where they are actually siblings. Interview tip: the one-liner \"z-index is only meaningful within the element's own stacking context\" plus the opacity/transform gotcha covers what screeners are fishing for."
  },
  {
    id: "css-022",
    category: "css",
    difficulty: "basic",
    type: "mcq",
    question: "Which statement about `display: inline` elements is true?",
    code: null,
    options: {
      a: "width and height are ignored, and vertical margins do not push other lines apart",
      b: "They always start on a new line and take the full available width",
      c: "They respect width and height but ignore all padding",
      d: "They behave exactly like inline-block elements"
    },
    answer: "a",
    solution: "Correct answer: a. Inline elements flow within a line of text: `width` and `height` have no effect, and while horizontal margin and padding apply, vertical margins do not move surrounding lines (vertical padding paints but can overlap lines without affecting layout). (b) describes `display: block` elements, which break onto their own line and stretch to the container's width by default. (c) is wrong: inline elements do apply padding; it is width and height they ignore. (d) is wrong because `inline-block` is exactly the hybrid that fixes inline's limitations: it flows in a line like inline content but accepts width, height, and vertical margins like a block. The classic interview summary: block = new line + sizable; inline = in-line + not sizable; inline-block = in-line + sizable."
  },
  {
    id: "css-023",
    category: "css",
    difficulty: "basic",
    type: "code",
    question: "Fill in the two blanks to center the child element both horizontally and vertically inside the overlay.",
    code: ".overlay {\n  display: flex;\n  ____: center;\n  ____: center;\n  height: 100vh;\n}",
    options: null,
    answer: null,
    solution: "The blanks are `justify-content: center` (horizontal, the main axis in the default row direction) and `align-items: center` (vertical, the cross axis). This flexbox pair is the most common modern centering technique and the one to reach for first in an interview. Equivalent alternatives worth listing when asked for more ways: CSS grid with `display: grid; place-items: center;` (a two-property one-liner); absolute positioning with `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);` on the child (works without knowing the child's size, useful for overlays and tooltips); and the classic horizontal-only `margin: 0 auto` on a block element with a set width. On the flex/grid container itself, `margin: auto` on the child also centers it in both axes. Knowing several techniques and when each fits, rather than just one, is exactly what the \"center a div\" screening question is testing."
  },
  {
    id: "css-024",
    category: "css",
    difficulty: "medium",
    type: "mcq",
    question: "Which of these CSS properties is inherited by child elements by default?",
    code: null,
    options: {
      a: "margin",
      b: "border",
      c: "color",
      d: "padding"
    },
    answer: "c",
    solution: "Correct answer: c. `color` is inherited: set it on `body` and all descendant text picks it up unless overridden. As a rule of thumb, text and typography properties inherit by default — `color`, `font-family`, `font-size`, `line-height`, `text-align`, `letter-spacing` — because it would be unbearable to redeclare fonts on every nested element. Box-model and layout properties do not inherit: (a) `margin`, (b) `border`, and (d) `padding` all default to their initial values on each element, since a child automatically getting its parent's margin or border would wreck layouts. You can override the default in either direction with the keywords `inherit` (force inheritance, e.g. `border-color: inherit`), `initial` (reset to the spec default), and `unset` (inherit if the property normally inherits, otherwise initial). Knowing which properties inherit explains many \"why is this style leaking?\" and \"why is this style not applying?\" debugging sessions."
  },
  {
    id: "css-025",
    category: "css",
    difficulty: "medium",
    type: "open",
    question: "What are media queries, and what does a mobile-first approach mean in practice?",
    code: null,
    options: null,
    answer: null,
    solution: "Media queries conditionally apply CSS based on characteristics of the device or viewport, most commonly its width: `@media (min-width: 768px) { ... }` applies its rules only when the viewport is at least 768px wide. They can also target orientation, resolution, and user preferences like `prefers-color-scheme` and `prefers-reduced-motion`. Mobile-first means your base, unqueried styles are written for the smallest screens, and you then layer on `min-width` queries to progressively enhance the layout as space grows, for example switching a stacked column into a multi-column grid at tablet width. Desktop-first is the inverse: full styles by default, then `max-width` queries to strip things down, which tends to produce more override-heavy, fragile CSS. Mobile-first is generally preferred because the simplest layout is the default, small devices parse less overriding code, and it matches how traffic skews toward mobile. Breakpoints should be chosen where the content visibly breaks rather than chasing specific devices, though 768px and 1024px remain common conventions. A nice modern footnote for bonus points: container queries (`@container`) now let components respond to their container's width instead of the viewport's. Interview tip: say \"base styles for mobile, min-width to enhance\" — that exact framing is what screeners listen for."
  },
  {
    id: "css-026",
    category: "css",
    difficulty: "medium",
    type: "open",
    question: "What does the `overflow` property control, and what is the difference between `visible`, `hidden`, `scroll`, and `auto`?",
    code: null,
    options: null,
    answer: null,
    solution: "`overflow` controls what happens when an element's content is bigger than its box. The default, `visible`, lets content spill out past the box's edges without clipping. `hidden` clips anything beyond the box with no way for the user to scroll to it. `scroll` clips but always renders scrollbars, even when the content actually fits, which can leave permanently greyed-out bars. `auto` is the pragmatic choice: it clips and shows scrollbars only when the content actually overflows. Two important side effects come with any value other than visible: the element becomes a scroll container, which is the classic reason a descendant's `position: sticky` stops working, and it establishes a new block formatting context, which is why old-school `overflow: hidden` was used as a clearfix to make a parent wrap its floated children and to stop margins collapsing through it. The modern `overflow: clip` clips like hidden but without creating a scroll container, avoiding the sticky problem. You can also set axes independently with `overflow-x` and `overflow-y`. Interview tip: mentioning the sticky and BFC side effects elevates this from a definition answer to a debugging-experience answer."
  },
  {
    id: "css-027",
    category: "css",
    difficulty: "advanced",
    type: "code",
    question: "What color is the `.card .title` text, and what color is the `.footer` text? Explain the role of the `red` fallback.",
    code: ":root {\n  --accent: blue;\n}\n.card {\n  --accent: green;\n}\n.card .title {\n  color: var(--accent, red);\n}\n.footer {\n  color: var(--accent, red);\n}",
    options: null,
    answer: null,
    solution: "`.card .title` is green and `.footer` is blue; the red fallback is never used. Custom properties are declared like normal properties (`--accent: blue`) and read with `var()`. Crucially, they inherit down the tree and are resolved against the element where `var()` is used: `.title` sits inside `.card`, so it sees the closer `--accent: green`, which shadows the `:root` value, exactly like scoped variables in a programming language. `.footer` is outside `.card`, so it inherits `--accent` from `:root` and renders blue. The second argument to `var()` is only used when the custom property is not defined at all for that element; since `:root` defines `--accent` globally here, the fallback never fires. This scoping behavior is what makes custom properties more powerful than preprocessor variables: they live in the cascade at runtime, so you can re-theme a subtree (or implement dark mode) just by redeclaring a variable on a container or on a `.dark` class, and even read or set them from JavaScript. Declaring global tokens on `:root` and overriding them locally is the standard theming pattern interviewers expect you to describe."
  },
  {
    id: "css-028",
    category: "css",
    difficulty: "advanced",
    type: "mcq",
    question: "Two sibling paragraphs stack vertically: the first has `margin-bottom: 24px` and the second has `margin-top: 16px`. How much vertical space separates them?",
    code: null,
    options: {
      a: "40px, because adjacent margins add together",
      b: "16px, because the later element's margin overrides the earlier one's",
      c: "24px, because adjacent vertical margins collapse to the larger of the two",
      d: "8px, because the smaller margin is subtracted from the larger"
    },
    answer: "c",
    solution: "Correct answer: c. Adjacent vertical margins collapse: instead of summing, the gap becomes the larger of the two values, so 24px wins over 16px. (a) describes what most people intuitively expect, and it is exactly the behavior margin collapsing prevents; horizontal margins, by contrast, never collapse and do add up. (b) is wrong because source order and \"overriding\" play no role; it is purely a max operation. (d) invents subtraction, which is not a CSS behavior. Margin collapsing happens in three situations: between adjacent siblings, between a parent and its first or last child when nothing separates them (no border, padding, or content, which is why a child's margin-top can mysteriously poke out above its parent), and on empty blocks whose own top and bottom margins collapse together. It only applies to block elements in normal flow: flex items, grid items, floated, and absolutely positioned elements never collapse margins. To prevent it, add a border or padding to the parent, create a new formatting context (for example `display: flow-root`), or switch the container to flex or grid and use `gap`."
  },
  {
    id: "css-029",
    category: "css",
    difficulty: "medium",
    type: "code",
    question: "This button fades smoothly to navy on hover, but snaps back instantly when the mouse leaves. Spot the bug and fix it.",
    code: ".button {\n  background: steelblue;\n}\n.button:hover {\n  background: navy;\n  transition: background 0.3s ease;\n}",
    options: null,
    answer: null,
    solution: "The bug: `transition` is declared inside the `:hover` rule, so it only exists while the element is hovered. Entering hover works because the transition is active for the change to navy, but the moment the mouse leaves, the `:hover` rule, including its transition declaration, stops applying, so the change back to steelblue happens with no transition at all and snaps. The fix is to move `transition: background 0.3s ease;` into the base `.button` rule so it is always present, governing changes in both directions; keep only `background: navy` in the `:hover` rule. (Putting different durations in the base and hover rules is actually a technique for asymmetric enter/exit speeds.) This is also a natural place to contrast transitions with animations: a transition interpolates between two states and needs a trigger such as hover, focus, or a class change, while `@keyframes` animations run on their own, support many intermediate steps, can loop with `animation-iteration-count: infinite`, and offer fine control via delays, direction, and fill modes. For performance, prefer transitioning `transform` and `opacity`, which can be GPU-composited, over layout-affecting properties like width or top."
  },
  {
    id: "css-030",
    category: "css",
    difficulty: "medium",
    type: "open",
    question: "What is BEM, and why do teams adopt a class-naming convention like it?",
    code: null,
    options: null,
    answer: null,
    solution: "BEM stands for Block, Element, Modifier, a convention for naming CSS classes. A block is a standalone component, like `card`; an element is a part that only makes sense inside its block, written with a double underscore, like `card__title`; a modifier is a variant or state, written with a double hyphen, like `card--featured` or `card__button--disabled`. Teams adopt it because it solves CSS's global-namespace problems: names are self-documenting (you can tell from `card__title` exactly where it belongs), collisions between components become unlikely, and HTML markup can change without breaking styles because you target classes rather than tag structure. Crucially, BEM keeps specificity flat: every selector is a single class at (0,1,0), so rules are overridden by simple source order or a modifier class instead of escalating specificity wars with nested selectors, IDs, and `!important`. It also discourages deep descendant selectors like `.card div span`, which are fragile and tightly coupled to markup. The tradeoff is verbosity: class names get long, and the discipline only pays off if the whole team follows it. The same goals motivate alternatives like utility-first CSS, CSS Modules, and scoped styles in frameworks, so in an interview it is worth framing BEM as one answer to the broader problem of scaling CSS. Interview tip: write `block__element--modifier` on the whiteboard and give one concrete example; that is usually all that is asked."
  },
  {
    id: "css-031",
    category: "css",
    difficulty: "basic",
    type: "mcq",
    question: "What does `width: 50vw` mean, and how is it different from `width: 50%`?",
    code: null,
    options: {
      a: "They are always identical",
      b: "`50vw` is half the *viewport* width regardless of where the element sits; `50%` is half of the element's *parent* width",
      c: "`50vw` is half the parent's width; `50%` is half the viewport",
      d: "`vw` units only work on the `<body>` element"
    },
    answer: "b",
    solution: "Correct: b. Viewport units are anchored to the browser window: `1vw` is 1% of the viewport width, `1vh` is 1% of the viewport height — no matter how deeply nested the element is. Percentages, by contrast, resolve against the parent (for `width`, the parent's content width), so the same `50%` means different pixel sizes in different containers. Classic uses: `min-height: 100vh` for a full-screen hero section, `font-size: clamp(1rem, 2.5vw, 2rem)` for fluid type.\n\nWhy the others are wrong:\n- a: they only coincide when the parent happens to be exactly as wide as the viewport.\n- c: reversed.\n- d: viewport units work on any element.\n\nWorth knowing for mobile: the browser UI (address bar) collapsing makes `100vh` jumpy on phones, so the newer small/large/dynamic viewport units exist — `svh`, `lvh`, and `dvh` — with `100dvh` tracking the actually-visible height."
  },
  {
    id: "css-032",
    category: "css",
    difficulty: "basic",
    type: "open",
    question: "What are CSS custom properties (CSS variables)? How are they different from Sass/Less variables, and what are they typically used for?",
    code: null,
    options: null,
    answer: null,
    solution: "Custom properties are values you define yourself with a `--` prefix and read with `var()`: `:root { --brand: #0a66c2; }` then `color: var(--brand)`. The crucial difference from preprocessor variables: Sass variables are compile-time text substitution — by the time the browser sees the CSS they're gone — while custom properties live in the browser at runtime. That gives them three superpowers. First, they cascade and inherit like normal properties, so you can redefine `--brand` inside `.dark-theme` or a media query and everything using `var(--brand)` updates — which makes theming (dark mode!) almost trivial, something Sass variables fundamentally cannot do. Second, JavaScript can read and write them (`el.style.setProperty('--progress', '70%')`), making them a clean bridge for dynamic values like a progress bar or mouse position. Third, `var()` accepts a fallback: `var(--accent, rebeccapurple)`. Typical uses: design tokens (colors, spacing scale, font sizes) defined once on `:root`, component-level knobs, and theme switching. They pair with `calc()` nicely: `width: calc(var(--cols) * 80px)`. Interview tip: the sentence that lands is 'Sass variables disappear at compile time; custom properties live in the cascade at runtime — that's why dark mode is one class flip instead of a second stylesheet.'"
  },
  {
    id: "css-033",
    category: "css",
    difficulty: "basic",
    type: "mcq",
    question: "Which selector matches the 2nd, 4th, 6th... rows of a table (every even row)?",
    code: null,
    options: {
      a: "`tr:nth-child(even)`",
      b: "`tr:even`",
      c: "`tr:child(2n)`",
      d: "`tr[row=\"even\"]`"
    },
    answer: "a",
    solution: "Correct: a. `:nth-child()` takes either the keywords `even`/`odd` or an `An+B` formula — `tr:nth-child(even)` and `tr:nth-child(2n)` are equivalent. The formula form is more powerful: `2n+1` is odd rows, `3n` every third, `n+4` from the 4th onward, `-n+3` the first three. Counting is 1-based.\n\nWhy the others are wrong:\n- b: `:even` is old jQuery selector syntax, not CSS.\n- c: there is no `:child()` pseudo-class.\n- d: that's an attribute selector — it would only match rows that literally carry a `row=\"even\"` attribute in the markup.\n\nA distinction interviewers like: `:nth-child(2)` means 'an element that is the 2nd *child of its parent*' (and also matches the selector), whereas `:nth-of-type(2)` means 'the 2nd child *of that element type*'. If a heading sits above your paragraphs, `p:nth-child(2)` may surprisingly match the first paragraph — `p:nth-of-type(2)` is what you wanted."
  },
  {
    id: "css-034",
    category: "css",
    difficulty: "basic",
    type: "code",
    question: "On this site, visited links never show their special color, and the hover effect doesn't work on visited links either. The individual rules look fine — what's wrong?",
    code: "a:hover   { color: orange; }\na:visited { color: purple; }\na:link    { color: blue; }\na:active  { color: red; }",
    options: null,
    answer: null,
    solution: "The bug is the *order* of the rules. All four pseudo-classes have identical specificity (0,1,1), so when several apply at once, the last one in the stylesheet wins. Here `a:link { color: blue }` comes last, so it overrides `:visited` for every visited-but-not-hovered link; and when you hover a visited link, both `:visited` and `:hover` match, but `:visited` appears later, killing the hover color.\n\nThe fix is the canonical LVHA order — Link, Visited, Hover, Active:\n\na:link    { color: blue; }\na:visited { color: purple; }\na:hover   { color: orange; }\na:active  { color: red; }\n\nMnemonic: \"LoVe, HAte\". The ordering works because later rules win ties: hover should beat link/visited (you're pointing at it right now), and active (mid-click) should beat hover.\n\nBonus depth: browsers deliberately restrict what `:visited` can style (basically colors only) and even lie to JavaScript's `getComputedStyle` about it — otherwise any site could probe your browsing history by styling visited links and measuring them."
  },
  {
    id: "css-035",
    category: "css",
    difficulty: "basic",
    type: "mcq",
    question: "What does the shorthand `margin: 10px 20px` mean?",
    code: null,
    options: {
      a: "10px on the left and right, 20px on the top and bottom",
      b: "10px on the top and bottom, 20px on the left and right",
      c: "10px on the top, 20px on the right, and 0 on the other two sides",
      d: "It is invalid — `margin` requires one or four values"
    },
    answer: "b",
    solution: "Correct: b. The two-value form is `margin: <vertical> <horizontal>`. The full set of shorthand forms:\n- 1 value: all four sides (`margin: 8px`)\n- 2 values: top/bottom, then left/right (`margin: 10px 20px`)\n- 3 values: top, left/right, bottom (`margin: 10px 20px 30px`)\n- 4 values: top, right, bottom, left — clockwise from the top (`margin: 1px 2px 3px 4px`)\n\nThe mnemonic for the four-value order is **TRouBLe** (Top, Right, Bottom, Left) or just 'clockwise starting at 12'. The same value-count rules apply to `padding`, `border-width`, `inset`, and most four-sided shorthands.\n\nWhy the others are wrong:\n- a: reversed — vertical comes first.\n- c: that describes no valid interpretation; with 3 values the bottom (not right) gets its own value.\n- d: 1, 2, 3, and 4 values are all valid.\n\nAlso handy: `margin: 0 auto` — zero vertical margin, automatic horizontal margins — is the classic way to center a fixed-width block element."
  },
  {
    id: "css-036",
    category: "css",
    difficulty: "basic",
    type: "open",
    question: "Explain the difference between `display: block`, `display: inline`, and `display: inline-block`.",
    code: null,
    options: null,
    answer: null,
    solution: "A **block** element starts on its own line and stretches to the full available width by default; `width`, `height`, and all margins/padding work normally. Examples: `div`, `p`, `section`, headings. An **inline** element flows within a line of text like a word: it doesn't break the line, it only takes the space its content needs, and — the part people forget — `width` and `height` are ignored, and vertical margins don't push other lines apart (horizontal padding/margins work; vertical padding paints but doesn't affect layout). Examples: `span`, `a`, `strong`. **Inline-block** is the hybrid: the element still sits in the text flow without forcing a line break, but its box behaves like a block — `width`, `height`, and vertical margins/padding all apply. The classic use cases are buttons or badges that sit in a row of text but need real dimensions, or giving a clickable `<a>` a larger padding-based hit area. Two classic gotchas: setting `width: 300px` on a `span` and watching nothing happen (it's inline — switch the display), and the mysterious few-pixel gaps between inline-block siblings, which are literally the whitespace between the tags in your HTML being rendered as a space. Interview tip: 'inline ignores width/height' is the single fact this question is usually fishing for."
  },
  {
    id: "css-037",
    category: "css",
    difficulty: "basic",
    type: "mcq",
    question: "What is the difference between setting `opacity: 0.5` on an element and giving it a background of `rgba(0, 0, 0, 0.5)`?",
    code: null,
    options: {
      a: "There is no difference — both make only the background translucent",
      b: "`opacity` fades the *entire element including all its children* (text, images, everything); the `rgba()` background makes only the background color translucent while the content stays fully opaque",
      c: "`rgba()` backgrounds fade the text too; `opacity` affects only the background",
      d: "`opacity` only accepts the values 0 and 1"
    },
    answer: "b",
    solution: "Correct: b. `opacity` applies to the element as a whole — the element and its entire subtree are rendered, then faded together. There's no way for a child to 'opt out' (setting `opacity: 1` on the child doesn't help, because the fade happens to the already-composited parent). So a card with `opacity: 0.5` gets washed-out, hard-to-read text. With `background-color: rgba(0,0,0,0.5)` (or the modern space syntax `rgb(0 0 0 / 0.5)`, or 8-digit hex `#00000080`), only that one color channel is translucent — the text on top stays crisp. That's the right tool for dimmed overlays behind modals and tinted hero images.\n\nWhy the others are wrong:\n- a/c: they invert or merge the two behaviors.\n- d: opacity takes any value from 0 to 1.\n\nA detail that impresses: `opacity` below 1 also creates a new stacking context, which is a classic source of 'why did my z-index stop working?' bugs."
  },
  {
    id: "css-038",
    category: "css",
    difficulty: "basic",
    type: "open",
    question: "Why do many projects start their stylesheet with a CSS reset or a normalizer? What problem does it solve, and what does a modern minimal reset look like?",
    code: null,
    options: null,
    answer: null,
    solution: "Every browser ships a user-agent stylesheet with its own defaults — margins on `body` and headings, padding on lists, font sizes, form-control styling — and those defaults differ between browsers. A reset/normalizer makes your starting point predictable so your styles produce the same result everywhere. Two philosophies: a **reset** zeroes everything out (Meyer reset tradition) and you rebuild all styling deliberately; **normalize.css** instead keeps useful defaults but fixes cross-browser inconsistencies and bugs. Modern practice is usually a small custom reset. The greatest hits:\n\n*, *::before, *::after { box-sizing: border-box; }\nbody { margin: 0; }\nimg, video { max-width: 100%; height: auto; display: block; }\nbutton, input, select, textarea { font: inherit; }\n\nEach line earns its place: border-box makes widths intuitive everywhere; the body margin kills the mysterious 8px gap around every page; the image rule stops media overflowing containers on small screens; and `font: inherit` fixes form controls ignoring your page font. Many resets also add `p, h1...h6 { margin: 0 }` (the 'margins are opt-in' philosophy) and respect `prefers-reduced-motion`. Interview tip: knowing *why* each line exists beats naming a library — the `box-sizing` line plus the body margin story is usually enough to show you've actually fought these defaults."
  },
  {
    id: "css-039",
    category: "css",
    difficulty: "medium",
    type: "mcq",
    question: "An element has `min-width: 400px; max-width: 300px;`. Both constraints can't hold at once. How wide does it render?",
    code: null,
    options: {
      a: "300px — `max-width` always has the final say",
      b: "350px — the browser splits the difference",
      c: "400px — when min and max conflict, `min-width` wins over `max-width`",
      d: "The declaration is invalid and both are ignored"
    },
    answer: "c",
    solution: "Correct: c. The CSS sizing algorithm applies constraints in a defined order: compute the preferred width, clamp it by `max-width`, then clamp the result by `min-width`. Because the min clamp happens *last*, `min-width` beats `max-width` whenever they conflict — here the element renders 400px wide. The same precedence holds for `min-height`/`max-height`.\n\nWhy the others are wrong:\n- a: intuitive but backwards — max is applied before min, so min gets the last word.\n- b: no averaging happens anywhere in CSS sizing.\n- d: both declarations are individually valid; conflict resolution is defined, not an error.\n\nWhere this actually bites: responsive components, e.g. `width: 50%; max-width: 600px; min-width: 320px` — on very narrow screens the min kicks in and can overflow the parent (often the *desired* behavior, forcing a scroll rather than crushing content). Also related: flexbox items have `min-width: auto` by default, which is the root cause of the famous 'why won't my flex item shrink / why does `text-overflow` not work in flexbox' problem — fixed with `min-width: 0` on the item."
  },
  {
    id: "css-040",
    category: "css",
    difficulty: "medium",
    type: "open",
    question: "What are container queries (`@container`), and what problem do they solve that media queries can't?",
    code: null,
    options: null,
    answer: null,
    solution: "Media queries respond to the *viewport*; container queries respond to the size of an element's *container* — and that difference is the whole point. Consider a card component used in a wide main column and in a narrow sidebar on the same page. With media queries you can't style it per-location: the viewport is one size, but the card has two different amounts of space. With container queries the card adapts to whatever box it's in. Usage has two parts. First, mark an ancestor as a queryable container: `.sidebar, .main { container-type: inline-size; }` (optionally name it: `container-name: panel`, or shorthand `container: panel / inline-size`). Then query it from the component's styles: `@container (min-width: 400px) { .card { display: flex; } .card img { width: 40%; } }` — the rules apply only when the nearest eligible ancestor container is at least 400px wide. There are also container query *units*: `cqw`/`cqh` (1% of container width/height), useful for fluid type inside components. The strategic consequence: components become truly self-contained — they carry their own responsive behavior instead of relying on page-level breakpoints, which is exactly what design systems want. Media queries remain right for page-level layout shifts and for non-size queries (`prefers-color-scheme`, `prefers-reduced-motion`, print). Interview tip: the card-in-sidebar-vs-main example *is* the expected answer — lead with it."
  },
  {
    id: "css-041",
    category: "css",
    difficulty: "medium",
    type: "code",
    question: "Fill in the two blanks so the page renders as: header across the full top, sidebar on the left at 250px, content filling the rest, footer across the full bottom.",
    code: ".page {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  ____:\n    \"header header\"\n    \"sidebar content\"\n    \"footer footer\";\n}\n\n.page > header  { grid-area: header; }\n.page > aside   { grid-area: sidebar; }\n.page > main    { grid-area: ____; }\n.page > footer  { grid-area: footer; }",
    options: null,
    answer: null,
    solution: "The blanks are `grid-template-areas` and `content`:\n\n.page {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar content\"\n    \"footer footer\";\n}\n.page > main { grid-area: content; }\n\nHow it works: `grid-template-areas` lets you draw the layout as ASCII art — each quoted string is a row, each word a cell, and repeating a name (like `header header`) makes that area span those cells. Then each child claims its region with `grid-area: <name>`. The names are arbitrary; they just have to match, and each named area must form a rectangle.\n\nWhy people love this approach: the layout is *readable at a glance* in the CSS, and rearranging for mobile is just redrawing the picture inside a media query:\n\n@media (max-width: 600px) {\n  .page {\n    grid-template-columns: 1fr;\n    grid-template-areas: \"header\" \"content\" \"sidebar\" \"footer\";\n  }\n}\n\n— content now appears before the sidebar without touching the HTML. A dot (`.`) in the template marks an intentionally empty cell. Add `min-height: 100vh` plus a `1fr` middle row (`grid-template-rows: auto 1fr auto`) and you've also solved the classic sticky-footer problem."
  },
  {
    id: "css-042",
    category: "css",
    difficulty: "medium",
    type: "mcq",
    question: "What is the modern way to put consistent spacing *between* flex items (but not around the outside of the container)?",
    code: null,
    options: {
      a: "`margin: 8px` on every item",
      b: "`gap: 16px` on the flex container",
      c: "`space-between: 16px` on the container",
      d: "Empty spacer `<div>`s between the items"
    },
    answer: "b",
    solution: "Correct: b. `gap` (originally a grid feature, now in flexbox too) inserts space only *between* items — no stray margin on the outer edges, no first/last-child exceptions, and it interacts correctly with wrapping (`row-gap` and `column-gap` can differ: `gap: 24px 12px`).\n\nWhy the others are wrong:\n- a: margins on every item also push against the container's edges, causing the classic 'why is there extra space on the left of the first item' problem — historically worked around with negative margins on the container or `:not(:last-child)` selectors, all of which `gap` makes obsolete.\n- c: `space-between` is not a property; it's a *value* of `justify-content`, and it distributes whatever free space happens to exist rather than guaranteeing a fixed gap — with two items it shoves them to opposite ends.\n- d: spacer divs are markup pollution from the table-layout era.\n\nRelated distinction worth making in an interview: `justify-content` distributes *leftover* space along the main axis (its spacing varies with container size), whereas `gap` is a *fixed* spacing you control. They compose: `display: flex; gap: 16px; justify-content: center` gives centered items with exact 16px gutters."
  },
  {
    id: "css-043",
    category: "css",
    difficulty: "medium",
    type: "open",
    question: "CSS transitions versus CSS animations (`@keyframes`): how do they differ and when do you reach for each?",
    code: null,
    options: null,
    answer: null,
    solution: "A **transition** animates a property *between two states* and needs a trigger: the property's value must change — via `:hover`, `:focus`, a class toggle from JavaScript, a media query flipping. You declare it on the element: `transition: transform 200ms ease-out;` and whenever `transform` changes, the browser tweens it. Transitions are inherently two-point (from current value to new value) and run once per trigger. An **animation** is self-driving: you define a multi-step timeline with `@keyframes` (`0%`, `50%`, `100%` — as many stops as you like) and attach it with `animation: pulse 2s ease-in-out infinite;`. No state change needed — it can start on page load, loop forever (`infinite`), alternate direction, pause (`animation-play-state`), and hold its end state (`animation-fill-mode: forwards`). Rules of thumb: UI feedback tied to interaction states — hover effects, focus rings, accordion open/close, theme fades — wants transitions; anything autonomous or multi-step — loading spinners, pulsing skeleton screens, attention bounces, complex entrance choreography — wants keyframe animations. Two pro details: both should respect `@media (prefers-reduced-motion: reduce)` for accessibility and stick to `transform`/`opacity` for compositor-cheap motion; and JavaScript can listen for `transitionend`/`animationend` to chain logic. Interview tip: 'transitions need a state change; animations run on their own timeline' is the crisp dividing line."
  },
  {
    id: "css-044",
    category: "css",
    difficulty: "medium",
    type: "code",
    question: "Fill in the three blanks to make the spinner rotate continuously: a full turn every second, at constant speed, forever.",
    code: "@____ spin {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #eee;\n  border-top-color: #0a66c2;\n  border-radius: 50%;\n  animation: spin 1s ____ ____;\n}",
    options: null,
    answer: null,
    solution: "The blanks are `keyframes`, `linear`, and `infinite`:\n\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n.spinner {\n  ...\n  animation: spin 1s linear infinite;\n}\n\nWhy each value matters:\n- `@keyframes spin` defines the named timeline; `from`/`to` are aliases for `0%`/`100%`.\n- `linear` — the default easing is `ease`, which accelerates and decelerates; on a loop that makes the spinner visibly lurch at every revolution. Constant rotation needs `linear`.\n- `infinite` — `animation-iteration-count` defaults to 1; without it the spinner does one polite turn and stops.\n\nThe spinner trick itself: a circle (`border-radius: 50%`) with a light border and one colored side (`border-top-color`), rotated forever.\n\nTwo production notes: this animates `transform`, which runs on the compositor thread — smooth even while the main thread is busy (which, for a *loading* spinner, it probably is); animating `width` or `margin` instead would jank. And wrap motion in a reduced-motion guard for accessibility: `@media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 2s; } }` or provide a non-spinning alternative."
  },
  {
    id: "css-045",
    category: "css",
    difficulty: "medium",
    type: "mcq",
    question: "Two ways to slide a panel 200px to the right: animate `left: 0 → 200px`, or animate `transform: translateX(0) → translateX(200px)`. Why is the `transform` version considered better for performance?",
    code: null,
    options: {
      a: "`transform` skips layout and paint: it's applied at the compositor stage (often on the GPU), while animating `left` forces the browser to recompute layout on every frame",
      b: "`transform` animations get a special high-priority network connection",
      c: "Animating `left` is invalid CSS unless the element is a flex item",
      d: "There is no difference; both are equally cheap"
    },
    answer: "a",
    solution: "Correct: a. The rendering pipeline runs layout (geometry) → paint (pixels) → composite (layer assembly). Changing `left` changes the element's layout position, so every animation frame triggers layout, then repaint, then composite — and layout can cascade to other elements. `transform` (and `opacity`) don't affect layout or require repainting the layer's contents: the element is promoted to its own compositor layer and just *moved* during compositing, work that's cheap and typically GPU-accelerated, and that can even continue smoothly while the main thread is blocked by JavaScript.\n\nWhy the others are wrong:\n- b: networking is unrelated to rendering.\n- c: animating `left` is valid (on positioned elements) — just expensive.\n- d: measurable difference; `left` animations are a classic source of jank on low-end devices.\n\nThe practical guideline: animate only `transform` and `opacity` where possible — translate instead of top/left, scale instead of width/height. DevTools' Performance panel shows the purple Layout blocks disappear when you switch. This connects directly to the reflow/repaint story, so expect the follow-up."
  },
  {
    id: "css-046",
    category: "css",
    difficulty: "medium",
    type: "open",
    question: "What does the `:has()` selector do? Give a couple of practical examples of problems it solves.",
    code: null,
    options: null,
    answer: null,
    solution: "`:has()` matches an element based on what's *inside* it (or what follows it) — the 'parent selector' CSS lacked for twenty years. `.card:has(img)` selects cards that contain an image; before `:has()`, no selector could do that, and you'd add a `.card--with-image` class from JavaScript instead. Practical wins: style a form field's wrapper when its input is invalid — `.field:has(input:invalid) { border-color: red; }` — so the label and hint can react to validation without JS; give an article a different grid when it has a hero image — `article:has(> .hero) { grid-template-rows: 300px 1fr; }`; freeze page scroll while a modal is open — `body:has(dialog[open]) { overflow: hidden; }`. It's not limited to descendants — combinators work inside it, enabling 'previous sibling' selection at last: `h2:has(+ p)` matches headings *directly followed by* a paragraph, and `label:has(+ input:focus)` styles the label of the focused field. Things to know: it can't be nested inside another `:has()`; its specificity is that of its most specific argument; and it's supported in all modern browsers (it was the last to land in Firefox, end of 2023). Interview tip: frame it as 'selecting based on children was impossible in CSS — `:has()` removes a whole category of JavaScript class-toggling', then give the `:has(input:invalid)` example."
  },
  {
    id: "css-047",
    category: "css",
    difficulty: "medium",
    type: "mcq",
    question: "You want every video thumbnail in a gallery to render as a 16:9 box, whatever the image's native size, with the image cropped to fill. Which combination does it?",
    code: null,
    options: {
      a: "`aspect-ratio: 16 / 9; object-fit: cover;` on the `img`",
      b: "`ratio: 16x9; crop: true;` on the `img`",
      c: "`height: 56.25%` on the `img`",
      d: "`aspect-ratio: 16 / 9; object-fit: contain;` — `contain` crops to fill the box"
    },
    answer: "a",
    solution: "Correct: a. `aspect-ratio: 16 / 9` sizes the box: give the image a width (say `width: 100%`) and its height is derived automatically. `object-fit: cover` controls how the image's pixels fill that box: scale to *cover* the whole area, cropping the overflow — like `background-size: cover` but for real `<img>` elements. (`object-position` chooses which part survives the crop.)\n\nWhy the others are wrong:\n- b: neither `ratio` nor `crop` is a CSS property.\n- c: percentage `height` resolves against the *parent's height*, not the element's own width, so it can't express an aspect ratio. (The old hack for this was percentage `padding-top: 56.25%` — which *does* resolve against width — but `aspect-ratio` made it obsolete.)\n- d: `contain` letterboxes — the whole image stays visible with empty space around it; it never crops. The mnemonic: **cover crops, contain letterboxes**.\n\nBonus connection: browsers now use an `<img>`'s `width`/`height` attributes to compute an intrinsic `aspect-ratio` before the file loads — that's how modern pages reserve image space and avoid layout shift (CLS)."
  },
  {
    id: "css-048",
    category: "css",
    difficulty: "medium",
    type: "code",
    question: "Fill in the three blanks so that any product title longer than its single line is cut off with an ellipsis (…) instead of wrapping or overflowing.",
    code: ".product-title {\n  width: 200px;\n  white-space: ____;\n  overflow: ____;\n  text-overflow: ____;\n}",
    options: null,
    answer: null,
    solution: "The blanks are `nowrap`, `hidden`, and `ellipsis`:\n\n.product-title {\n  width: 200px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\nAll three are required, and interviewers love asking why:\n- `white-space: nowrap` stops the text from wrapping to a second line — without it, long text just wraps and there's nothing to truncate.\n- `overflow: hidden` clips the text that no longer fits — without it, the text visibly spills out of the box.\n- `text-overflow: ellipsis` swaps the clipped edge for the `…` character — it only has a visible effect when the other two have created a clipped, non-wrapping situation. The element also needs a constrained width and must not be `display: inline`.\n\nMulti-line truncation (e.g. clamp to 3 lines) needs the line-clamp pattern:\n\ndisplay: -webkit-box;\n-webkit-line-clamp: 3;\n-webkit-box-orient: vertical;\noverflow: hidden;\n\n(standardized as `line-clamp`, but the prefixed form is what works everywhere today).\n\nClassic trap: inside flexbox this often 'doesn't work' because flex items refuse to shrink below their content size — `min-width: 0` on the flex item fixes it. Accessibility note: the full text should still be reachable, e.g. a `title` attribute or accessible full-text elsewhere."
  },
  {
    id: "css-049",
    category: "css",
    difficulty: "medium",
    type: "open",
    question: "What are CSS logical properties (e.g. `margin-inline-start`, `padding-block`, `inset-inline-end`)? Why would a team migrate to them from `margin-left` and friends?",
    code: null,
    options: null,
    answer: null,
    solution: "Physical properties name screen directions: `margin-left` is always the left edge. Logical properties name directions *relative to the text flow*: `margin-inline-start` is where text begins — left in English, but **right** in Arabic or Hebrew (`dir=\"rtl\"`), and top in vertical Japanese writing modes. The vocabulary: **inline** is the axis text flows along (horizontal in English), **block** is the axis paragraphs stack on (vertical in English); each has a **start** and **end**. So `margin-inline-start` ≈ margin-left, `padding-block` sets top+bottom padding in one go, `border-inline-end` ≈ border-right, `inset-inline-start` replaces `left` for positioned elements, and `margin-inline: auto` is the new `margin: 0 auto`. Sizes too: `inline-size`/`block-size` mirror width/height. Why migrate: internationalization for free. With physical properties, supporting RTL means maintaining a mirrored stylesheet or `[dir=\"rtl\"]` overrides for every directional rule; with logical properties the same CSS just works — flip `dir=\"rtl\"` on `<html>` and the layout mirrors itself. Flexbox and grid are already logical (`flex-start`, not 'flex-left'), so this extends the same idea to box properties. Browser support is universal in modern browsers. The pragmatic team policy: write logical properties in new code, especially for anything directional like chat bubbles, list indents, and icon gaps. Interview tip: the `dir=\"rtl\"` flip is the demo that sells it — one attribute, whole layout mirrors, zero extra CSS."
  },
  {
    id: "css-050",
    category: "css",
    difficulty: "medium",
    type: "mcq",
    question: "Which media query lets your site automatically follow the user's operating-system dark-mode setting?",
    code: null,
    options: {
      a: "`@media (theme: dark)`",
      b: "`@media (prefers-color-scheme: dark)`",
      c: "`@media (dark-mode: on)`",
      d: "`@media screen and (color-scheme: night)`"
    },
    answer: "b",
    solution: "Correct: b. `prefers-color-scheme` reflects the OS/browser-level appearance setting, with values `dark` and `light`. The standard pattern pairs it with custom properties so components never need to know which theme is active:\n\n:root { --bg: white; --fg: #111; }\n@media (prefers-color-scheme: dark) {\n  :root { --bg: #121212; --fg: #eee; }\n}\nbody { background: var(--bg); color: var(--fg); }\n\nSites that also offer a manual toggle typically combine this default with a `data-theme` attribute override on `<html>`, persisted in localStorage. Also set `color-scheme: light dark` on `:root` so built-in UI (form controls, scrollbars) follows along.\n\nWhy the others are wrong: a, c, d are invented syntax — `color-scheme` is a *property*, not a media feature, and there's no `theme` or `dark-mode` feature.\n\nThis belongs to the user-preference media query family worth naming in interviews: `prefers-reduced-motion: reduce` (tone down animation — an accessibility must), `prefers-contrast: more`, and `prefers-reduced-data`. They all share the philosophy: the user told the OS what they need; good CSS listens."
  },
  {
    id: "css-051",
    category: "css",
    difficulty: "medium",
    type: "mcq",
    question: "What is the difference between the `:is()` and `:where()` pseudo-classes?",
    code: null,
    options: {
      a: "`:is()` matches descendants while `:where()` matches ancestors",
      b: "They match identically, but `:is()` takes the specificity of its most specific argument while `:where()` always contributes zero specificity",
      c: "`:where()` is just the legacy name for `:is()`",
      d: "`:is()` allows combinators inside it and `:where()` does not"
    },
    answer: "b",
    solution: "Correct: b. Both exist to flatten repetitive selector lists — `:is(header, main, footer) a` replaces three separate `header a, main a, footer a` rules. The single difference is specificity. `:is(nav, #sidebar) a` counts as (1,0,1) for *every* element it matches, because `:is()` adopts the most specific argument (`#sidebar`). `:where(nav, #sidebar) a` counts as just (0,0,1) — the `:where()` part contributes nothing at all.\n\nZero specificity sounds useless until you write CSS meant to be overridden: design-system base styles, resets, library defaults. A reset written as `:where(h1, h2, h3) { margin: 0 }` can be overridden by *any* selector the consumer writes, even a bare `h3 { margin-block: 1em }` — no specificity fight. That's why modern resets and frameworks lean on `:where()` heavily.\n\nWhy the others are wrong:\n- a: both work the same positionally; they're about grouping, not tree direction.\n- c: they were standardized together, deliberately differing in specificity.\n- d: both accept full complex selectors in modern browsers.\n\nBonus: another `:is()` subtlety — it's forgiving of invalid selectors in its list (one bad selector doesn't kill the whole rule), unlike a plain selector list."
  },
  {
    id: "css-052",
    category: "css",
    difficulty: "medium",
    type: "code",
    question: "Fill in the blank so the heading scales fluidly with the viewport but never gets smaller than 1.5rem and never larger than 3rem — no media queries.",
    code: "h1 {\n  font-size: ____(1.5rem, 4vw, 3rem);\n}",
    options: null,
    answer: null,
    solution: "The blank is `clamp`:\n\nh1 {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n}\n\n`clamp(MIN, PREFERRED, MAX)` resolves to the preferred value, but never below the minimum or above the maximum. Here the heading tracks `4vw` (4% of viewport width): on a 375px phone that's 15px → clamped up to the 1.5rem (24px) floor; on a 1200px laptop it's 48px = 3rem, right at the ceiling; beyond that it stops growing. The result is one line of CSS replacing a stack of font-size media queries — this is 'fluid typography'.\n\nDetails worth knowing:\n- Mixing units is the point: rem bounds keep accessibility intact, the vw middle gives fluidity.\n- Accessibility gotcha: a *pure* `vw` middle value doesn't respond to browser zoom/text-size settings, so best practice blends in a rem term: `clamp(1.5rem, 1rem + 2vw, 3rem)` — the `calc`-style expression is allowed directly inside clamp.\n- `clamp()` works for any length property: fluid spacing (`padding: clamp(1rem, 3vw, 2.5rem)`), fluid gaps, container padding.\n- Related functions: `min()` and `max()` — `width: min(90%, 1200px)` is a neat one-liner for a centered content column.\n\nInterview tip: say the argument order out loud — 'min, preferred, max' — interviewers check whether you actually know it."
  },
  {
    id: "css-053",
    category: "css",
    difficulty: "advanced",
    type: "open",
    question: "What does `@layer` (cascade layers) do, and what specificity problem does it solve for large codebases?",
    code: null,
    options: null,
    answer: null,
    solution: "Cascade layers add an explicit priority tier to the cascade that outranks specificity. You declare an order once — `@layer reset, framework, components, utilities;` — and then put rules into layers: `@layer components { .card { padding: 1rem } }`. When declarations from different layers conflict, the *later layer wins, regardless of selector specificity*. An ID selector in the `framework` layer loses to a single class in `utilities`, because layer order is compared before specificity ever gets looked at. (Un-layered styles rank above all layers, and `!important` inverts the layer order — earlier layers' importants win — though that's trivia territory.) The problem this solves: in large codebases, third-party CSS, legacy styles, and your component styles fight via specificity, and the traditional weapons — `!important`, selector hacks like `.card.card`, source-order shuffling of imports — all escalate. With layers you decide the architecture *once*: reset at the bottom, vendor/framework CSS imported into a low layer (`@import url(lib.css) layer(framework);`), your components above it, single-purpose utility classes on top. Now a utility like `.mt-0` reliably beats any component style without `!important`, and vendor CSS can never accidentally override yours no matter how specific its selectors are. It pairs philosophically with `:where()` (zero-specificity resets) and BEM (flat specificity) — all are tools for making the cascade *intentional*. Interview tip: the one-liner is 'layer order beats specificity — so you fight about architecture once instead of fighting specificity forever'."
  },
  {
    id: "css-054",
    category: "css",
    difficulty: "advanced",
    type: "mcq",
    question: "A page renders a feed of 1000 complex cards and scrolling is sluggish. Which CSS-only change lets the browser skip rendering work for the cards that are off-screen?",
    code: null,
    options: {
      a: "`content-visibility: auto;` (with `contain-intrinsic-size` as a size placeholder) on the cards",
      b: "`z-index: -1` on off-screen cards",
      c: "`opacity: 0.99` on the feed container",
      d: "`overflow: hidden` on the `<body>`"
    },
    answer: "a",
    solution: "Correct: a. `content-visibility: auto` tells the browser it may *skip layout and paint entirely* for an element while it's off-screen, picking the work up just before it scrolls into view — a CSS-only cousin of list virtualization. For long feeds, comment threads, and documentation pages, initial-render and scroll costs can drop dramatically (the technique made some real pages render several times faster). The companion property matters: skipped elements have unknown height, which would make the scrollbar jump around, so `contain-intrinsic-size: auto 320px` supplies an estimated placeholder size to keep scroll geometry stable.\n\nWhy the others are wrong:\n- b: z-index changes stacking order; everything still gets laid out and painted.\n- c: a near-1 opacity may force a compositing layer but skips no rendering work.\n- d: hiding body overflow just breaks scrolling.\n\nContext for the 'why': this builds on CSS *containment* (`contain: layout paint ...`), which promises the browser that an element's internals can't affect the outside, unlocking exactly these skip-the-work optimizations. Caveats: skipped content still exists for find-in-page and the accessibility tree, and it's no substitute for true virtualization when lists hit tens of thousands of rows."
  },
  {
    id: "css-055",
    category: "css",
    difficulty: "medium",
    type: "code",
    question: "Fill in the two blanks so this horizontal carousel snaps each image neatly to the left edge of the scroller as the user swipes.",
    code: ".carousel {\n  display: flex;\n  gap: 16px;\n  overflow-x: auto;\n  ____: x mandatory;\n}\n\n.carousel > img {\n  width: 80%;\n  flex-shrink: 0;\n  ____: start;\n}",
    options: null,
    answer: null,
    solution: "The blanks are `scroll-snap-type` and `scroll-snap-align`:\n\n.carousel {\n  display: flex;\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n}\n.carousel > img {\n  flex-shrink: 0;\n  scroll-snap-align: start;\n}\n\nThe two halves of the API:\n- On the **scroll container**: `scroll-snap-type: <axis> <strictness>`. Axis `x` here; strictness `mandatory` means the scroller must always come to rest on a snap point, while `proximity` only snaps when the user stops near one. (`mandatory` feels crisp for same-size carousels but can trap content if items are taller/wider than the viewport — `proximity` is the safe default for mixed content.)\n- On the **items**: `scroll-snap-align: start | center | end` — which edge of the item aligns to the scrollport. `center` gives the centered-card carousel look.\n\nSupporting cast: `scroll-padding` on the container insets the snap positions (e.g. to account for a sticky header on a vertical snapper), `scroll-margin` does the per-item equivalent, and `overscroll-behavior: contain` stops scroll chaining to the page.\n\nWhy this matters: it replaces a whole category of JavaScript carousel libraries — momentum, touch handling, and snapping all come native and run on the compositor, so it stays smooth even when the main thread is busy."
  },
  {
    id: "css-056",
    category: "css",
    difficulty: "advanced",
    type: "open",
    question: "Explain reflow (layout) and repaint in the browser rendering pipeline. What triggers each, why is reflow the expensive one, and what is layout thrashing?",
    code: null,
    options: null,
    answer: null,
    solution: "After style calculation, the browser pipeline runs **layout** (a.k.a. reflow — compute every box's geometry), **paint** (rasterize pixels into layers), and **composite** (assemble layers on screen). Changing geometry — width, height, padding, margin, font-size, adding/removing DOM nodes, even resizing the window — triggers reflow, and reflow cascades: one element's new size can move everything after it, so the browser may recompute large parts of the tree. Changing only appearance — `color`, `background`, `box-shadow`, `border-radius` — skips layout and just repaints. Changing only `transform` or `opacity` skips both and goes straight to composite, which is why those are the blessed animation properties. Reflow is the expensive one because it's geometric constraint-solving over the document, synchronous on the main thread. **Layout thrashing** is the JavaScript-side amplifier: reading a layout value (`offsetHeight`, `getBoundingClientRect()`, `getComputedStyle()` for geometry) forces the browser to flush any pending layout *right now* so the answer is accurate. Alternate writes and reads in a loop — `el.style.width = ...; el.offsetHeight; ...` — and you force a full synchronous reflow *per iteration*. The fix is batching: do all reads first, then all writes (or use `requestAnimationFrame`, or libraries that schedule this). DevTools' Performance panel exposes it as repeated purple Layout blocks with 'forced reflow' warnings. Interview tip: the phrase 'read-then-write batching' plus naming `offsetHeight` as a forced-flush trigger is exactly what this question screens for."
  },
  {
    id: "css-057",
    category: "css",
    difficulty: "advanced",
    type: "mcq",
    question: "Which statement about the `will-change` property is correct?",
    code: null,
    options: {
      a: "Adding `will-change: transform` to every animated element site-wide is a recommended performance baseline",
      b: "`will-change` hints that a property is about to change so the browser can prepare (e.g. promote the element to its own compositor layer) — but each promoted layer costs memory, so it should be used sparingly, ideally applied just before the change and removed after",
      c: "`will-change` makes any property GPU-accelerated, including `width` and `top`",
      d: "`will-change` is required for CSS transitions to work at all"
    },
    answer: "b",
    solution: "Correct: b. `will-change: transform` (or `opacity`, `scroll-position`...) warns the browser ahead of time so it can do expensive setup — typically promoting the element onto its own compositor layer — *before* the animation starts, avoiding a first-frame stutter. The catch is that every layer consumes GPU memory and compositing time, so blanket use makes performance *worse*, especially on phones; the spec itself tells you to treat it as a last resort. Best practice: apply it to the handful of elements about to animate (e.g. add the class on `mouseenter`, remove it on `animationend`), or just rely on the fact that compositor-friendly animations of `transform`/`opacity` usually get promoted automatically anyway.\n\nWhy the others are wrong:\n- a: that's the documented anti-pattern — memory bloat for no benefit.\n- c: `will-change` doesn't change *how* a property animates; `width` and `top` still require layout every frame. It can't make a layout property cheap.\n- d: transitions work fine without it; it's purely an optimization hint.\n\nGotcha worth naming: like `opacity < 1` and `transform`, `will-change` creates a new stacking context — applying it can suddenly change z-index behavior, a genuinely confusing bug the first time you meet it."
  },
  {
    id: "css-058",
    category: "css",
    difficulty: "advanced",
    type: "open",
    question: "What is the difference between `:focus` and `:focus-visible`? How does this pair relate to the old practice of `outline: none`, and what does `:focus-within` add?",
    code: null,
    options: null,
    answer: null,
    solution: "`:focus` matches whenever the element has focus, however it got it — keyboard Tab, mouse click, or `element.focus()`. That's the root of a famous tension: designers dislike the focus ring flashing on every mouse click of a button, so for years sites wrote `button:focus { outline: none }` — which also removed the ring for keyboard users, leaving them with no idea where they are on the page. That's a serious accessibility failure (WCAG requires a visible focus indicator). `:focus-visible` resolves the tension: it matches only when the browser judges the focus indicator *should* be shown — in practice, keyboard and assistive-tech navigation yes, plain mouse clicks on buttons no. So the modern pattern is:\n\nbutton:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }\nbutton:focus:not(:focus-visible) { outline: none; }\n\n— a clearly visible custom ring for keyboard users, nothing for mouse clicks, and nobody loses their place. (Browsers' default rings now use the same heuristic.) `:focus-within` is the third sibling: it matches an element when focus is anywhere *inside* it — highlight the whole form row while its input is focused (`.field:focus-within { background: #f0f7ff }`), or keep a dropdown menu open while any of its links has keyboard focus, no JavaScript needed. Interview tip: the story arc to tell is 'outline:none was the accessibility bug; :focus-visible is the fix that finally let design and accessibility stop fighting'."
  },
  {
    id: "css-059",
    category: "css",
    difficulty: "advanced",
    type: "code",
    question: "Fill in the three blanks to implement dark mode the idiomatic way: tokens defined once, automatically following the OS preference, and components that never mention either theme.",
    code: ":root {\n  ____: light dark;\n  --bg: #ffffff;\n  --fg: #1a1a1a;\n  --card-bg: #f5f5f5;\n}\n\n@media (____: dark) {\n  :root {\n    --bg: #121212;\n    --fg: #e8e8e8;\n    --card-bg: #1e1e1e;\n  }\n}\n\n.card {\n  background: ____(--card-bg);\n  color: var(--fg);\n}",
    options: null,
    answer: null,
    solution: "The blanks are `color-scheme`, `prefers-color-scheme`, and `var`:\n\n:root {\n  color-scheme: light dark;\n  --bg: #ffffff; ...\n}\n@media (prefers-color-scheme: dark) {\n  :root { --bg: #121212; ... }\n}\n.card { background: var(--card-bg); color: var(--fg); }\n\nWhy this is the idiomatic architecture:\n- **Tokens, not themes, in components.** `.card` references semantic variables and contains zero theme logic. Adding a theme means redefining variables in one place — components are untouched. This is the payoff of custom properties being runtime values that cascade.\n- **`color-scheme: light dark`** declares that the page supports both schemes, so *browser-rendered* UI — form controls, scrollbars, the default canvas color — switches to dark variants too. Without it you get the telltale white scrollbars and pale inputs on a dark page.\n- **`prefers-color-scheme`** picks up the OS setting with no JavaScript and no flash.\n\nAdding a manual toggle on top: re-declare the dark token values under `[data-theme=\"dark\"]`, set that attribute on `<html>` from a tiny inline script that reads localStorage *before first paint* (to avoid the wrong-theme flash, a.k.a. FART — flash of inaccurate representation of theme), and fall back to the media query when no stored choice exists. Modern bonus: the `light-dark(white, #121212)` CSS function collapses the two definitions into one line per token."
  },
  {
    id: "css-060",
    category: "css",
    difficulty: "advanced",
    type: "open",
    question: "Your team's stylesheet has grown to 8000 lines and changes regularly break unrelated pages. What strategies and modern CSS features would you bring up to make the CSS maintainable?",
    code: null,
    options: null,
    answer: null,
    solution: "The root problem is that classic CSS is one global namespace where everything can affect everything; every strategy below is some way of restoring *locality*. (1) **Naming discipline**: BEM or similar makes scope visible in the class name and keeps specificity flat so overrides don't escalate. (2) **Design tokens**: extract colors, spacing, and type scales into custom properties on `:root` — magic numbers scattered across 8000 lines are the first thing to consolidate, and theming falls out for free. (3) **Cascade layers**: declare `@layer reset, vendor, components, utilities` once so the *architecture*, not specificity accidents, decides what wins; vendor CSS gets quarantined in a low layer. (4) **Real scoping**: CSS Modules or framework scoped styles guarantee a component's styles can't leak; native `@scope` is arriving for the same purpose; web components get it via shadow DOM. (5) **Native nesting** keeps a component's rules physically together. (6) **Reduce bespoke CSS**: a utility-first layer (Tailwind-style) for one-off spacing/layout eliminates a long tail of single-use classes. (7) **Delete safely**: coverage tooling and a deprecation process for dead styles — unused CSS is where breakage hides. (8) **Process**: lint rules (stylelint) against IDs/`!important`/deep nesting, and visual regression tests so 'unrelated page broke' is caught in CI rather than production. Interview tip: name the disease before the cures — 'CSS is global by default; everything we do is about restoring locality' frames you as someone who understands *why*, then pick two or three tools rather than reciting all eight."
  }
];
