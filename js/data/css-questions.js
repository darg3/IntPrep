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
  }
];
