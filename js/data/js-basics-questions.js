window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["js-basics"] = [
  {
    id: "jsb-001",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "What does `typeof null` evaluate to?",
    code: null,
    options: {
      a: "\"null\"",
      b: "\"undefined\"",
      c: "\"object\"",
      d: "\"boolean\""
    },
    answer: "c",
    solution: "c) `typeof null` returns \"object\". This is a famous bug from the very first JavaScript engine: values were tagged internally, and null's representation (all zero bits) matched the object tag. It cannot be fixed now without breaking existing websites, so it was standardized. a) is wrong because typeof never returns the string \"null\" for any value. b) is wrong because \"undefined\" is what `typeof undefined` returns. d) is wrong because \"boolean\" is only returned for `true` and `false`. To actually test for null, use a strict comparison: `value === null`."
  },
  {
    id: "jsb-002",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "Explain the difference between `var`, `let`, and `const`.",
    code: null,
    options: null,
    answer: null,
    solution: "All three declare variables, but they differ in scope and in what you can do after declaring. `var` is function-scoped, can be redeclared in the same scope, and is hoisted and auto-initialized to `undefined`, which makes accidental bugs easy. `let` and `const` are block-scoped — they only exist inside the nearest pair of curly braces — and cannot be redeclared in the same scope. Accessing a `let` or `const` before its declaration line throws a ReferenceError because of the temporal dead zone. The difference between `let` and `const` is reassignment: `let` allows it, `const` does not. Importantly, `const` does not make objects immutable — you can still mutate the contents of a `const` array or object; you just cannot point the variable at something else. The modern rule of thumb: use `const` by default, `let` when you genuinely need reassignment, and avoid `var` entirely. Interview tip: mentioning the temporal dead zone and the const-objects-are-still-mutable gotcha separates a memorized answer from a real one."
  },
  {
    id: "jsb-003",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "What does this code log, and does any line throw an error? Explain the difference in how the two declarations are treated.",
    code: "console.log(a);\nvar a = 1;\n\nconsole.log(b);\nlet b = 2;",
    options: null,
    answer: null,
    solution: "Output: `undefined` is logged first, then the second log throws `ReferenceError: Cannot access 'b' before initialization`. Both declarations are hoisted, but differently. `var a` is hoisted to the top of its scope and automatically initialized to `undefined`, so reading it before the assignment quietly gives `undefined`. `let b` is also hoisted, but it sits uninitialized in the temporal dead zone until its declaration line executes, so any access before that line throws a ReferenceError. This is one of the main reasons modern code avoids `var`: it turns an obvious mistake into a silent `undefined` instead of a loud error."
  },
  {
    id: "jsb-004",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "Which of the following comparisons evaluates to `true`?",
    code: null,
    options: {
      a: "`\"5\" === 5`",
      b: "`null == undefined`",
      c: "`NaN == NaN`",
      d: "`0 === \"0\"`"
    },
    answer: "b",
    solution: "b) `null == undefined` is true. The loose-equality rules treat null and undefined as equal to each other and to nothing else — it is a special-cased rule, not coercion to a common type. a) is false: `===` never converts types, and a string is never strictly equal to a number. c) is false: NaN compares unequal to everything, including itself, under both == and ===. d) is false for the same reason as a): different types fail strict equality immediately. Interview tip: the practical takeaway is to use `===` everywhere, with `value == null` as the one widely accepted use of `==`, since it checks for both null and undefined in a single expression."
  },
  {
    id: "jsb-005",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "What is the difference between `null` and `undefined` in JavaScript?",
    code: null,
    options: null,
    answer: null,
    solution: "Both represent the absence of a value, but they are used differently. `undefined` is what JavaScript itself gives you when there is no value: a declared but unassigned variable, a missing function parameter, a missing object property, or a function that returns nothing. `null` is an intentional assignment — a developer explicitly set it to say this is empty on purpose. They are different types: `typeof undefined` is \"undefined\", while `typeof null` is \"object\" due to a historical bug. With loose equality `null == undefined` is true, but `null === undefined` is false because the types differ. A common idiom is `value == null`, which checks for both at once. In practice: let JavaScript produce `undefined` on its own, and use `null` yourself when you want to mark something as deliberately empty."
  },
  {
    id: "jsb-006",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "Which of the following values is truthy?",
    code: null,
    options: {
      a: "`0`",
      b: "`\"\"` (an empty string)",
      c: "`null`",
      d: "`\"0\"` (a string containing the character zero)"
    },
    answer: "d",
    solution: "d) The string \"0\" is truthy. Truthiness is decided by the value itself, not what it looks like: every non-empty string is truthy, including \"0\" and even \"false\". JavaScript has exactly eight falsy values — `false`, `0`, `-0`, `0n`, `\"\"`, `null`, `undefined`, and `NaN` — and everything else is truthy. a) the number 0 is on the falsy list. b) the empty string is falsy — it is emptiness that matters, not content. c) null is falsy. Two classic follow-up traps worth knowing: an empty array `[]` and an empty object `{}` are both truthy."
  },
  {
    id: "jsb-007",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "Predict the output of the two `console.log` calls.",
    code: "const nums = [1, 2, 3];\n\nconst doubled = nums.map(function (n) {\n  return n * 2;\n});\n\nconst result = nums.forEach(function (n) {\n  return n * 2;\n});\n\nconsole.log(doubled);\nconsole.log(result);",
    options: null,
    answer: null,
    solution: "Output: `[2, 4, 6]` then `undefined`. `map` builds and returns a new array out of whatever each callback invocation returns, so `doubled` is `[2, 4, 6]` and `nums` is untouched. `forEach` ignores the callback's return value entirely and always returns `undefined` — it exists purely for side effects, so the `return n * 2` inside its callback does nothing useful. This is the classic interview contrast: use `map` when you need the transformed array, `forEach` when you just want to do something with each element. Assigning the result of `forEach` to a variable is a code smell worth pointing out in a code review."
  },
  {
    id: "jsb-008",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "Explain what `map`, `filter`, and `reduce` do. How is `map` different from `forEach`?",
    code: null,
    options: null,
    answer: null,
    solution: "All three are array methods that take a callback, and none of them mutate the original array. `map` transforms: it calls the callback on every element and returns a new array of the same length holding the results. `filter` selects: it returns a new array containing only the elements for which the callback returned a truthy value. `reduce` boils the array down to a single value — a sum, an object, a string — by carrying an accumulator from element to element, and you usually give it an initial value as the second argument. `forEach` differs from `map` in one key way: it always returns `undefined`. It exists purely for side effects, like logging each item or updating the DOM. So if you need the transformed values, use `map`; if you just need to do something per element, use `forEach`. Interview tip: a classic follow-up is to rewrite a for-loop with reduce, so be ready to sum an array with `arr.reduce((total, n) => total + n, 0)`."
  },
  {
    id: "jsb-009",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "Which expression is a reliable way to check whether `x` is `NaN`?",
    code: null,
    options: {
      a: "`Number.isNaN(x)`",
      b: "`x === NaN`",
      c: "`typeof x === \"NaN\"`",
      d: "`x == NaN`"
    },
    answer: "a",
    solution: "a) `Number.isNaN(x)` is the reliable check. NaN is the only JavaScript value that is not equal to itself, so equality comparisons can never detect it. b) `x === NaN` is always false for every x — including when x actually is NaN. d) `x == NaN` is also always false for the same reason. c) is wrong because `typeof NaN` returns \"number\" (NaN is a numeric value meaning invalid number), and typeof never returns \"NaN\". Bonus distinction: the older global `isNaN(x)` coerces its argument first, so `isNaN(\"hello\")` is true, which is usually not what you want; `Number.isNaN` only returns true for the actual NaN value. The not-equal-to-itself quirk also gives you the old-school check `x !== x`."
  },
  {
    id: "jsb-010",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "What are template literals, and why would you use them instead of string concatenation?",
    code: null,
    options: null,
    answer: null,
    solution: "Template literals are strings delimited with backticks instead of quotes, introduced in ES6. Their two big features are interpolation and multiline support. With `${expression}` you can embed any expression directly inside the string — like `Hello, ${name}!` — instead of chaining `+` operators, which gets unreadable fast and is easy to get wrong around spaces. They can also span multiple lines without needing \\n escapes, which is handy for building blocks of HTML or formatted messages. Any expression works inside the placeholder, including function calls and ternaries, not just variable names. They are the default choice for building strings in modern code. There is also an advanced form called tagged templates that libraries use for things like sanitization, but for day-to-day work, interpolation and multiline strings are the selling points."
  },
  {
    id: "jsb-011",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "Predict what each loop logs. What is the difference between `for...in` and `for...of` here?",
    code: "const colors = [\"red\", \"green\", \"blue\"];\n\nfor (const key in colors) {\n  console.log(key);\n}\n\nfor (const value of colors) {\n  console.log(value);\n}",
    options: null,
    answer: null,
    solution: "Output: the first loop logs the strings \"0\", \"1\", \"2\"; the second loop logs \"red\", \"green\", \"blue\". `for...in` iterates over an object's enumerable property keys — for an array those are the indices, and they come out as strings, not numbers. `for...of` iterates over the values of any iterable, which is almost always what you want with an array. `for...in` on arrays has extra pitfalls: it also picks up any custom properties added to the array, and key order is not guaranteed for objects in general. Rule of thumb: use `for...of` (or array methods) for arrays, and `for...in` — or better, `Object.keys` / `Object.entries` — for plain objects."
  },
  {
    id: "jsb-012",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "What does `[1, 2, 3].find(x => x > 5)` return?",
    code: null,
    options: {
      a: "`-1`",
      b: "`null`",
      c: "`[]` (an empty array)",
      d: "`undefined`"
    },
    answer: "d",
    solution: "d) `undefined`. `find` returns the first element for which the callback returns a truthy value, and when nothing matches it returns `undefined` — here no element is greater than 5. a) `-1` is the no-match convention of `indexOf` and `findIndex`, not `find`. b) `null` is never returned by find. c) an empty array is what `filter` would return with no matches; `find` returns a single element, never an array. This trio is a favorite interview check: filter gives an array of all matches, find gives the first match or undefined, and findIndex/indexOf give a position or -1."
  },
  {
    id: "jsb-013",
    category: "javascript",
    difficulty: "medium",
    type: "open",
    question: "When accessing object properties, what is the difference between dot notation and bracket notation — and when are you forced to use brackets?",
    code: null,
    options: null,
    answer: null,
    solution: "Dot notation, like `user.name`, is the default — shorter and easier to read — but the property name must be a valid identifier that you know when writing the code. Bracket notation, like `user[\"name\"]`, takes any expression that evaluates to a key, which makes it mandatory in three situations. First, dynamic keys: if the property name lives in a variable, `user[key]` works, while `user.key` literally looks for a property called \"key\". Second, keys that are not valid identifiers — names with spaces or dashes like `user[\"first name\"]` or `headers[\"content-type\"]`, or keys starting with a digit. Third, computed keys, like building `\"item-\" + i` in a loop. Otherwise prefer dot notation and reach for brackets only when you have to. A related detail worth mentioning: object keys are always strings (or symbols), so `obj[1]` and `obj[\"1\"]` hit the same property."
  },
  {
    id: "jsb-014",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "You want to put user-provided text into a page element. What is the key difference between `element.textContent` and `element.innerHTML`?",
    code: null,
    options: {
      a: "They are interchangeable; `innerHTML` is just the older name",
      b: "`textContent` is slower because it sanitizes the string first",
      c: "`innerHTML` parses the string as HTML and can create elements, while `textContent` inserts it as plain text",
      d: "`textContent` only works on `<input>` elements; `innerHTML` works everywhere"
    },
    answer: "c",
    solution: "c) `innerHTML` parses the assigned string as HTML — any tags in it become real elements — while `textContent` inserts the string as literal text. That difference is why inserting user-provided text with innerHTML is a security hole: a string like `<img src=x onerror=...>` would execute script, a cross-site scripting (XSS) attack, whereas with textContent it just shows up as harmless characters. a) is wrong — they behave very differently; it is not an age difference. b) is wrong — textContent is actually faster precisely because no HTML parsing happens, and neither property sanitizes anything. d) is wrong — form fields use `.value`; textContent works on regular elements. Rule of thumb: textContent for text, innerHTML only for trusted markup you wrote yourself."
  },
  {
    id: "jsb-015",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "Predict the output of each `console.log`. Why does `+` behave differently from the other arithmetic operators?",
    code: "console.log(1 + \"2\");\nconsole.log(\"5\" - 2);\nconsole.log(1 + 2 + \"3\");\nconsole.log(\"4\" * \"2\");\nconsole.log(true + 1);",
    options: null,
    answer: null,
    solution: "Output: \"12\", then 3, then \"33\", then 8, then 2. The key rule: `+` is the only arithmetic operator that is overloaded for strings. If either operand of `+` is a string, JavaScript concatenates, converting the other operand to a string — so `1 + \"2\"` is \"12\". Every other arithmetic operator (`-`, `*`, `/`, `%`) only works on numbers, so it coerces strings to numbers instead: `\"5\" - 2` is 3 and `\"4\" * \"2\"` is 8. The third line shows that evaluation is left to right: `1 + 2` is 3 (both numbers, real addition), and only then does `3 + \"3\"` concatenate into \"33\" — reorder it as `\"3\" + 1 + 2` and you would get \"312\". Booleans coerce to numbers (`true` becomes 1, `false` becomes 0), so `true + 1` is 2. If a string cannot become a number, you get `NaN`: `\"abc\" - 1` is NaN. The practical takeaway interviewers want: do not rely on implicit coercion — convert explicitly with `Number(value)` or `String(value)` at the boundary where data enters (form inputs are always strings!), and the whole class of \"12\" surprises disappears."
  },
  {
    id: "jsb-016",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "How do you attach a click handler to a button in JavaScript, and why is `addEventListener` preferred over setting `onclick`?",
    code: null,
    options: null,
    answer: null,
    solution: "You grab the element, then call `addEventListener` with the event name and a callback: `const btn = document.querySelector(\"#save\"); btn.addEventListener(\"click\", function (event) { ... });`. The callback receives an event object with useful details like `event.target`. `addEventListener` is preferred over assigning to `onclick` for several reasons. You can attach multiple listeners for the same event without them overwriting each other, whereas `btn.onclick = ...` replaces whatever handler was there before. You can remove a specific handler later with `removeEventListener`, as long as you kept a reference to the same function. It also offers options like `{ once: true }` to auto-remove the listener after the first call, and it keeps JavaScript out of your HTML, unlike inline `onclick=\"...\"` attributes. The same API works for any event — \"submit\", \"input\", \"keydown\" — not just clicks."
  },
  {
    id: "jsb-017",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "What does `[1, 2, 3].includes(\"2\")` evaluate to?",
    code: null,
    options: {
      a: "`false`, because `includes` does not perform type coercion",
      b: "`true`, because the string \"2\" is coerced to the number 2",
      c: "It throws a TypeError because the types are mixed",
      d: "`2`, the matched element"
    },
    answer: "a",
    solution: "a) It evaluates to `false`. `includes` compares with the SameValueZero algorithm, which behaves like `===` (with the one exception that it treats NaN as equal to NaN). The array holds the numbers 1, 2, 3 and the argument is the string \"2\" — different types, so there is no match. b) describes `==`-style coercion, which includes never performs. c) is wrong — comparing mixed types is perfectly legal and simply returns false. d) is wrong — `includes` returns a boolean; `find` is the method that returns the matching element. Bonus: `[NaN].includes(NaN)` is true, whereas `[NaN].indexOf(NaN)` is -1 — one of the few practical differences between the two."
  },
  {
    id: "jsb-018",
    category: "javascript",
    difficulty: "basic",
    type: "code",
    question: "Predict the output of each `console.log`.",
    code: "const s = \"  JavaScript  \";\n\nconsole.log(s.trim().toLowerCase());\nconsole.log(s.trim().slice(0, 4));\nconsole.log(s.includes(\"Script\"));\nconsole.log(\"a-b-c\".split(\"-\"));",
    options: null,
    answer: null,
    solution: "Output: \"javascript\", then \"Java\", then `true`, then `[\"a\", \"b\", \"c\"]`. Line by line: `trim` removes whitespace from both ends and `toLowerCase` lowercases the result, giving \"javascript\". `slice(0, 4)` takes characters from index 0 up to but not including index 4 of the trimmed string \"JavaScript\", giving \"Java\". `includes(\"Script\")` is a case-sensitive substring check on the original (untrimmed) string and returns true. `split(\"-\")` breaks the string at every dash and returns an array of the pieces. Worth remembering: strings are immutable, so every one of these methods returns a new string (or array) and never changes the original."
  },
  {
    id: "jsb-019",
    category: "javascript",
    difficulty: "medium",
    type: "open",
    question: "How does error handling with `try`/`catch` work in JavaScript? When would you use `throw` and `finally`?",
    code: null,
    options: null,
    answer: null,
    solution: "You wrap code that might fail in a `try` block; if anything inside it throws, execution jumps immediately to the `catch` block with the thrown value, and the program keeps running instead of crashing. Typical sources of thrown errors are things like `JSON.parse` on malformed input or code that explicitly uses `throw`. With `throw` you raise your own errors — best practice is to throw `Error` objects, like `throw new Error(\"Invalid input\")`, because they carry a message and a stack trace. The `finally` block runs no matter what — whether the try succeeded, the catch ran, or an error was re-thrown — so it is the place for cleanup, like hiding a loading spinner. Two details worth knowing: `catch` only catches runtime errors that happen synchronously inside the try block — it will not catch an error thrown later inside a callback — and since ES2019 you can write `catch` without a parameter if you do not need the error object. Interview tip: `JSON.parse` inside try/catch is the most realistic everyday example to give."
  },
  {
    id: "jsb-020",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "Which of these strings can `JSON.parse` parse without throwing?",
    code: null,
    options: {
      a: "`{'a': 1}`",
      b: "`{\"a\": 1}`",
      c: "`{a: 1}`",
      d: "`{\"a\": 1,}`"
    },
    answer: "b",
    solution: "b) Only `{\"a\": 1}` is valid JSON. JSON is much stricter than JavaScript object-literal syntax: keys must be double-quoted strings, strings must use double quotes, and trailing commas are forbidden. a) fails because single quotes are not allowed anywhere in JSON. c) fails because the key is unquoted — fine in a JS object literal, illegal in JSON. d) fails because of the trailing comma after the value. Practical consequence: `JSON.parse` throws a SyntaxError on all three invalid ones, which is why parsing untrusted or hand-written JSON belongs inside a try/catch."
  },
  {
    id: "jsb-021",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "What does `document.querySelector(\".item\")` return?",
    code: null,
    options: {
      a: "A NodeList containing every element with the class `item`",
      b: "A live HTMLCollection of matching elements",
      c: "It throws an error if no element matches",
      d: "The first element matching the selector, or `null` if none match"
    },
    answer: "d",
    solution: "d) `querySelector` returns the first element in the document that matches the CSS selector, or `null` if nothing matches — so you should null-check before using the result. a) describes `querySelectorAll`, which returns a static NodeList of all matches. b) describes `getElementsByClassName`, which returns a live HTMLCollection. c) is wrong for a missing element — no match just means null — though querySelector does throw if the selector string itself is syntactically invalid. Practical note: because it accepts any CSS selector, querySelector handles `#id`, `.class`, and complex selectors like `\"ul > li:first-child\"` with one API, which is why it has largely replaced getElementById in everyday code."
  },
  {
    id: "jsb-022",
    category: "javascript",
    difficulty: "medium",
    type: "open",
    question: "At the syntax level, how do arrow functions differ from function declarations? When would you reach for each?",
    code: null,
    options: null,
    answer: null,
    solution: "A function declaration looks like `function add(a, b) { return a + b; }`, while an arrow function is an expression you usually assign to a const: `const add = (a, b) => a + b;`. Arrows are more concise: a single-expression body gets an implicit return with no braces, and a single parameter can drop its parentheses. One real behavioral difference at this level is hoisting: a function declaration is fully hoisted, so you can call it before the line where it is defined, while an arrow assigned to a `const` does not exist until that line runs. Watch out for the implicit-return-an-object gotcha: `() => { a: 1 }` is parsed as a block, so you need parentheses — `() => ({ a: 1 })`. Arrow functions are always anonymous expressions; the variable name is just a label. They also behave differently around `this` and the `arguments` object, but that is a deeper topic on its own. In practice: arrows for short callbacks like `arr.map(n => n * 2)`, declarations for top-level named functions."
  },
  {
    id: "jsb-023",
    category: "javascript",
    difficulty: "advanced",
    type: "code",
    question: "This `sum` helper crashes on one of the two calls. What is the bug, what exactly happens on each call, and how do you fix it?",
    code: "function sum(arr) {\n  return arr.reduce(function (total, n) {\n    return total + n;\n  });\n}\n\nconsole.log(sum([1, 2, 3]));\nconsole.log(sum([]));",
    options: null,
    answer: null,
    solution: "The bug: `reduce` is called without an initial value. `sum([1, 2, 3])` works and logs 6, because reduce then uses the first element as the starting accumulator and begins iterating from the second. But `sum([])` throws `TypeError: Reduce of empty array with no initial value` — there is no element to fall back on. The fix is to pass an initial value as the second argument to reduce: `arr.reduce(function (total, n) { return total + n; }, 0)`. Now the empty array correctly returns 0. Rule of thumb: always supply the initial value to reduce unless you can prove the array is never empty — it also makes the accumulator's type explicit, which matters when you are reducing into an object or a different type than the elements."
  },
  {
    id: "jsb-024",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "What happens when this code runs?",
    code: "console.log(typeof x);\nlet x = 5;",
    options: {
      a: "It logs \"undefined\", because `typeof` is safe to use on any identifier",
      b: "It throws a ReferenceError, because `x` is in the temporal dead zone",
      c: "It logs \"number\", because `let` declarations are hoisted along with their values",
      d: "It throws a SyntaxError at parse time"
    },
    answer: "b",
    solution: "b) It throws `ReferenceError: Cannot access 'x' before initialization`. `let` and `const` declarations are hoisted, but unlike `var` they are not initialized — from the start of the block until the declaration line, the variable sits in the temporal dead zone, and any access throws, even via `typeof`. a) is the trap: `typeof` is only safe on completely undeclared identifiers (where it returns \"undefined\") and on var-declared ones — the TDZ broke the old rule that typeof never throws. c) is wrong because only declarations are hoisted, never the assigned values. d) is wrong because the code is syntactically valid; the failure happens at runtime when the first line executes."
  },
  {
    id: "jsb-025",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "What are JavaScript's data types? Walk me through the primitives and any `typeof` quirks worth knowing.",
    code: null,
    options: null,
    answer: null,
    solution: "JavaScript has seven primitive types and one non-primitive. The primitives are `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, and `bigint`; everything else — plain objects, arrays, functions, dates — falls under the `object` type. There is a single `number` type for both integers and decimals, and `NaN`, despite its name, is of type number. `typeof` reports most values directly — `typeof \"hi\"` is \"string\", `typeof 42` is \"number\" — but there are two quirks: `typeof null` returns \"object\" (a historical bug), and `typeof function () {}` returns \"function\" even though functions are technically objects. Primitives are immutable and compared by value, while objects are compared by reference — two identical-looking object literals are not `===` to each other. Arrays are objects too, so to detect one you use `Array.isArray(arr)`, not typeof. Interview tip: being able to rattle off all seven primitives, including symbol and bigint, signals you have kept up with modern JavaScript."
  },
  {
    id: "jsb-026",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "What is the difference between `arr.slice(1, 3)` and `arr.splice(1, 2)`?",
    code: null,
    options: {
      a: "They are aliases for the same operation",
      b: "`slice` returns a new array copy of the selected range and leaves the original untouched; `splice` removes (and can insert) elements *in place*, mutating the original array",
      c: "`splice` returns a copy; `slice` mutates the original",
      d: "`slice` works only on strings and `splice` only on arrays"
    },
    answer: "b",
    solution: "Correct: b. `slice(start, end)` is the non-destructive one: it copies from `start` up to but *not including* `end` and returns the copy — the original is unchanged. `splice(start, deleteCount, ...itemsToInsert)` surgically edits the array itself: it removes `deleteCount` elements at `start`, optionally inserts new ones, and returns *the removed elements*. So for `arr = [1,2,3,4]`: `arr.slice(1,3)` → `[2,3]`, arr still `[1,2,3,4]`; `arr.splice(1,2)` → returns `[2,3]`, arr is now `[1,4]`.\n\nWhy the others are wrong:\n- a/c: the mutate-vs-copy distinction is exactly the difference.\n- d: strings have `slice` too (strings are immutable so a mutating splice is impossible on them), but both exist on arrays.\n\nMemory hook: splice has a **p** for in-**p**lace. Modern bonus: `toSpliced()` is the new immutable cousin that returns a changed copy, alongside `toSorted()` and `toReversed()` — worth mentioning because accidental mutation by `sort`/`splice` is a top source of state bugs in React and friends."
  },
  {
    id: "jsb-027",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "What is destructuring? Show how it works for arrays and objects, and mention defaults, renaming, and rest.",
    code: null,
    options: null,
    answer: null,
    solution: "Destructuring unpacks values from arrays or objects into variables in one declaration, mirroring the literal syntax. Object form matches by *property name*: `const { name, age } = user` pulls `user.name` and `user.age`. Array form matches by *position*: `const [first, second] = scores`. The extras: **renaming** — `const { name: userName } = user` reads `user.name` into `userName`; **defaults** — `const { theme = \"light\" } = settings` applies when the property is `undefined` (only undefined — `null` does not trigger the default); **rest** — `const { id, ...others } = obj` and `const [head, ...tail] = list` collect the remainder; **nesting** — `const { address: { city } } = user` (which throws if `address` is undefined, a common gotcha). The most idiomatic use is in function parameters: `function greet({ name, greeting = \"Hi\" }) {...}` gives you named, defaulted arguments — far clearer at the call site than positional parameters, and the reason options-object APIs feel so pleasant. Other everyday uses: swapping without a temp variable (`[a, b] = [b, a]`), grabbing results from functions that return pairs (`const [state, setState] = useState(0)` in React is array destructuring), and pulling apart `Object.entries` pairs in loops: `for (const [key, value] of Object.entries(obj))`. Interview tip: writing the parameter-destructuring example with a default is the strongest two lines you can put on the whiteboard here."
  },
  {
    id: "jsb-028",
    category: "javascript",
    difficulty: "basic",
    type: "code",
    question: "The developer expected `sorted` to be a new sorted array and `prices` to stay in its original order. Predict what both logs actually print and explain the two bugs.",
    code: "const prices = [10, 2, 33, 4];\nconst sorted = prices.sort();\n\nconsole.log(sorted);\nconsole.log(prices);",
    options: null,
    answer: null,
    solution: "Both logs print the same array: `[10, 2, 33, 4]`. Two separate bugs combine here.\n\nBug 1 — the default sort is lexicographic: with no comparator, `sort()` converts elements to strings and compares them character by character. \"10\" sorts before \"2\" because the character \"1\" comes before \"2\". So the array ends up ordered as strings — `[10, 2, 33, 4]` — not as numbers. To sort numerically you must pass a comparator: `sort((a, b) => a - b)` gives `[2, 4, 10, 33]` (and `(a, b) => b - a` for descending).\n\nBug 2 — `sort` mutates: it reorders the array *in place* and returns a reference to that same array, not a copy. So `sorted === prices` is `true`, the original order is permanently gone, and both logs show the identical mis-sorted array.\n\nThe fix for both:\n\nconst sorted = [...prices].sort((a, b) => a - b);  // copy, then numeric sort\n// or, modern immutable variant:\nconst sorted = prices.toSorted((a, b) => a - b);\n\nconsole.log(sorted); // [2, 4, 10, 33]\nconsole.log(prices); // [10, 2, 33, 4] — untouched\n\nInterview tip: this one snippet demonstrates the two most-asked `sort` facts — 'string comparison by default' and 'mutates and returns itself' — so being able to narrate both bugs fluently is exactly what's being tested."
  },
  {
    id: "jsb-029",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "What is the correct way to check whether a value is an array?",
    code: null,
    options: {
      a: "`typeof value === \"array\"`",
      b: "`value instanceof Object`",
      c: "`Array.isArray(value)`",
      d: "`value.length !== undefined`"
    },
    answer: "c",
    solution: "Correct: c. `Array.isArray()` exists precisely because nothing else is reliable.\n\nWhy the others are wrong:\n- a: `typeof` never returns \"array\" — arrays are objects, so `typeof [] === \"object\"`. This is the most common wrong answer.\n- b: `[] instanceof Object` is true, but so is `{} instanceof Object` — it can't distinguish arrays from other objects. Even `value instanceof Array` (closer) has a real failure mode: an array created in another realm (an iframe, a worker boundary) has a different `Array` constructor, so `instanceof` returns false for a genuine array. `Array.isArray` handles cross-realm arrays correctly.\n- d: 'has a length' describes strings, function objects, and any object that happens to define `length` — `\"hello\".length` is 5, and `{ length: 0 }` passes too. Duck-typing on `length` is how bugs are born.\n\nThe wider pattern worth stating in an interview: `typeof` is for primitives (string, number, boolean, undefined, function...), `Array.isArray` for arrays, and `value === null` for null (because `typeof null` is \"object\")."
  },
  {
    id: "jsb-030",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "Explain short-circuit evaluation with `&&` and `||`, and how the nullish coalescing operator `??` differs from `||`.",
    code: null,
    options: null,
    answer: null,
    solution: "`&&` and `||` don't return booleans — they return *one of their operands*, and they stop evaluating as soon as the outcome is decided. `a || b` returns `a` if it's truthy, otherwise `b`; `a && b` returns `a` if it's falsy, otherwise `b`. The right side isn't even evaluated when short-circuited, which enables guard patterns: `user && user.save()` calls save only if user exists, and `isAdmin || logAccess()` runs the log only for non-admins. `||` became the classic defaulting idiom — `const port = config.port || 3000` — but it has a bug class built in: it replaces *every falsy* value, so a legitimate `0`, `\"\"`, or `false` gets stomped. `config.port || 3000` turns an intentional port `0` into 3000; `input.value || \"N/A\"` wipes out an intentionally empty string. `??` fixes exactly this: `a ?? b` returns `b` only when `a` is `null` or `undefined` — the two 'no value' values — leaving 0, empty string, and false alone. So: `const retries = options.retries ?? 3` keeps an explicit `retries: 0`. Rule of thumb: use `??` for defaults, keep `||` for genuine boolean logic. Two footnotes: the logical assignment forms `||=`, `&&=`, `??=` exist (`cache.value ??= compute()`), and `??` refuses to mix with `&&`/`||` without parentheses — a deliberate syntax error to prevent precedence confusion. Interview tip: the `0`-and-empty-string failure of `||` is the exact story this question wants."
  },
  {
    id: "jsb-031",
    category: "javascript",
    difficulty: "basic",
    type: "code",
    question: "This code throws `TypeError: Cannot read properties of undefined (reading 'city')` for some users. Why, and how do optional chaining and nullish coalescing make it safe — printing 'Unknown' when data is missing?",
    code: "const user = {\n  name: \"Sam\",\n  // some users have no address on file\n};\n\nconst city = user.address.city;\nconsole.log(city.toUpperCase());",
    options: null,
    answer: null,
    solution: "The throw happens at `user.address.city`: `user.address` is `undefined`, and reading any property of `undefined` is a TypeError. (Note the error names the *next* step — 'reading city' — which is how you locate which link in the chain was missing: the one *before* the named property.)\n\nThe safe version:\n\nconst city = user.address?.city ?? \"Unknown\";\nconsole.log(city.toUpperCase()); // \"UNKNOWN\"\n\nHow the pieces work:\n- `?.` — optional chaining: if the value before `?.` is `null` or `undefined`, the whole expression stops and evaluates to `undefined` instead of throwing. Otherwise it proceeds normally. It also has call and index forms: `user.getName?.()` (call only if it's defined) and `list?.[0]`.\n- `??` — turns that `undefined` into a real fallback, so the later `.toUpperCase()` always has a string. Using `??` rather than `||` keeps legitimate falsy values (like an empty-string city) intact.\n\nTwo cautions interviewers like to hear: don't sprinkle `?.` everywhere 'just in case' — if `user` itself should never be missing, `user?.address` silently hides a real bug that should crash loudly in development; apply it only at the links that are *legitimately* optional. And `?.` short-circuits the entire rest of the chain, so `a?.b.c` is safe even without a second `?.` — once `a` is nullish, `.b.c` is never evaluated."
  },
  {
    id: "jsb-032",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "What does this code log?\n\n```\nlet str = \"cat\";\nstr[0] = \"b\";\nconsole.log(str);\n```",
    code: null,
    options: {
      a: "`\"bat\"`",
      b: "`\"cat\"` — strings are immutable, so the index assignment silently does nothing",
      c: "It throws a TypeError in all circumstances",
      d: "`\"b\"`"
    },
    answer: "b",
    solution: "Correct: b. Strings are immutable primitives: you can *read* characters by index (`str[0]` is \"c\"), but writing to an index never changes the string. In normal (sloppy) mode the assignment fails *silently* and the log prints \"cat\" — no error, no effect, which makes this a sneaky bug. (In strict mode — `\"use strict\"` or inside ES modules — the same assignment throws a TypeError, so option c is true only in strict mode, not 'in all circumstances'.)\n\nEvery string method follows from immutability: `toUpperCase()`, `replace()`, `trim()`, `slice()` all return *new* strings and leave the original alone. So the classic bug `str.trim(); use(str)` does nothing — you must reassign: `str = str.trim()`.\n\nTo actually change a character, build a new string:\n\nstr = \"b\" + str.slice(1);            // \"bat\"\n// or via an array:\nconst chars = [...str]; chars[0] = \"b\"; str = chars.join(\"\");\n\nWhy the others are wrong:\n- a: would require mutability.\n- d: assignment expressions don't replace the whole variable.\n\nBonus connection: immutability is also why strings are compared by value (`\"cat\" === \"cat\"` is true) while objects and arrays are compared by reference."
  },
  {
    id: "jsb-033",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "What are `Set` and `Map`? When would you use them instead of plain arrays and objects?",
    code: null,
    options: null,
    answer: null,
    solution: "A **Set** is a collection of unique values: adding a duplicate is a no-op. `new Set([1, 2, 2, 3])` holds 1, 2, 3 — which gives the famous one-liner for de-duplicating an array: `[...new Set(arr)]`. Its real superpower is `has()`: checking membership is effectively O(1), versus `array.includes()` scanning the whole array — so 'have I seen this id before?' inside a loop over thousands of items should be a Set, not an array. API: `add`, `has`, `delete`, `size`, and it's iterable. A **Map** is a key→value store that fixes the limitations of using a plain object as a dictionary: keys can be *any* type (objects, DOM nodes, numbers — object keys are always coerced to strings, so `obj[1]` and `obj[\"1\"]` collide), entries remember insertion order, `size` is a property instead of `Object.keys(o).length`, it iterates directly (`for (const [k, v] of map)`), and there's no prototype baggage (a plain object 'contains' `toString` via inheritance, which has caused real bugs with user-supplied keys like `\"constructor\"`). Rules of thumb: object = fixed, known shape ('a user has name and email'); Map = a dictionary with arbitrary or dynamic keys, frequent adds/removes, or non-string keys ('votes per DOM element'). Array = ordered list, duplicates fine; Set = membership and uniqueness. Newer goodies: `Set` now has algebra methods (`union`, `intersection`, `difference`), and `Map.groupBy(items, fn)` groups in one call. Interview tip: the de-dupe one-liner plus 'O(1) has() vs O(n) includes()' covers what's usually being probed."
  },
  {
    id: "jsb-034",
    category: "javascript",
    difficulty: "basic",
    type: "code",
    question: "One of these two blocks throws a TypeError and the other works fine — which is which, and what does that tell you about what `const` actually protects?",
    code: "// Block A\nconst nums = [1, 2, 3];\nnums.push(4);\nnums[0] = 99;\n\n// Block B\nconst nums2 = [1, 2, 3];\nnums2 = [1, 2, 3, 4];",
    options: null,
    answer: null,
    solution: "Block A works fine; Block B throws `TypeError: Assignment to constant variable.`\n\n`const` protects the *binding*, not the value: the variable name can never be pointed at a different value, but if the value is an object or array, its *contents* remain fully mutable. Block A never reassigns `nums` — it mutates the array that `nums` points to, which `const` doesn't care about. Block B tries to rebind `nums2` to a brand-new array, which is exactly the one thing `const` forbids.\n\nA good mental model: the variable is a label holding an *address*; `const` welds the label to the address but says nothing about what happens inside the building.\n\nIf you genuinely need an immutable object, that's a separate tool: `Object.freeze(obj)` makes the object's own properties read-only (silently ignored in sloppy mode, TypeError in strict mode) — but it's *shallow*: nested objects inside remain mutable unless you freeze them too.\n\nPractical takeaways: `const` for everything by default, `let` only when you'll actually reassign (counters, accumulators, reassigned references) — this makes reassignment visible and intentional; and don't mistake `const arr` for immutability when reasoning about shared state — functions that receive `arr` can still mutate it, which is why defensive copies (`[...arr]`) and immutable update patterns exist."
  },
  {
    id: "jsb-035",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "Which of these evaluates to `NaN`?",
    code: null,
    options: {
      a: "`Number(\"\")`",
      b: "`parseInt(\"42px\")`",
      c: "`Number(\"42px\")`",
      d: "`parseInt(\"  7  \")`"
    },
    answer: "c",
    solution: "Correct: c. `Number()` and `parseInt()` follow different philosophies. `Number()` converts the *whole string* — any trailing garbage makes it NaN, so `Number(\"42px\")` is `NaN`. `parseInt()` parses from the left and *stops at the first invalid character*, so `parseInt(\"42px\")` happily returns `42` (option b).\n\nThe other two:\n- a: `Number(\"\")` is `0` — empty and whitespace-only strings convert to 0, one of JavaScript's stranger rules (and why `Number(\" \")` is 0 too).\n- d: both functions ignore leading/trailing whitespace, so `parseInt(\"  7  \")` is `7`.\n\nMore differences worth knowing: `parseInt` takes a radix — always pass it (`parseInt(str, 10)`) since legacy octal interpretation of leading zeros bit people for years; `parseFloat` is its decimal sibling; `Number(null)` is `0` but `Number(undefined)` is `NaN`; and the unary plus `+str` behaves like `Number(str)`.\n\nChoosing: use `Number()` (or `+`) when the input should be *exactly* a number and garbage should fail loudly as NaN you can check with `Number.isNaN()`; use `parseInt`/`parseFloat` when extracting a leading number from messy input like \"42px\" or \"3.5rem\"."
  },
  {
    id: "jsb-036",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "You need to add a list of items to the page from a JavaScript array. Compare building it with `innerHTML` string concatenation versus `createElement`/`append`. What are the trade-offs?",
    code: null,
    options: null,
    answer: null,
    solution: "The `innerHTML` route builds one big string — `list.innerHTML = items.map(i => `<li>${i}</li>`).join(\"\")` — and is concise and fast for a one-shot render. The DOM-API route creates real nodes: `createElement(\"li\")`, set `textContent`, `append`. The trade-offs: **Security** is the big one — interpolating untrusted data into `innerHTML` is an XSS vulnerability (an item like `<img src=x onerror=...>` executes), while `textContent` treats anything as literal text. If items contain user data, that alone decides it. **State destruction**: assigning `innerHTML` (including `+=`) re-parses and rebuilds the whole subtree, destroying existing event listeners, form input values, and focus inside it — the classic 'my listeners stopped working after I updated the list' bug. `append` only adds. **Performance**: one `innerHTML` assignment is fine; `innerHTML +=` *in a loop* is the worst pattern (full re-serialize and re-parse per iteration). For many createElement nodes, batch them into a `DocumentFragment` (or collect and `append(...nodes)`) so the document updates once instead of reflowing per insert. **Ergonomics**: complex markup is more readable as a template string; element references and listeners are easier with createElement (you already hold the node). A solid middle path for trusted, repeated markup is the `<template>` element: parse once, `cloneNode(true)` per item, fill in fields with `textContent`. Interview tip: name XSS and listener destruction — those two show you've debugged real pages, and frameworks exist largely to make this whole problem go away."
  },
  {
    id: "jsb-037",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "This list will have hundreds of items added dynamically, so the developer attached one listener to the `<ul>` instead of one per `<li>`. Fill in the two blanks so clicks anywhere on an item (including on the `<span>` inside it) log that item's id.",
    code: "<ul id=\"todo-list\">\n  <li data-id=\"1\"><span>Buy milk</span></li>\n  <li data-id=\"2\"><span>Walk dog</span></li>\n</ul>\n\n<script>\ndocument.getElementById(\"todo-list\").addEventListener(\"click\", (e) => {\n  const item = e.____.closest(\"____\");\n  if (!item) return;\n  console.log(\"clicked item\", item.dataset.id);\n});\n</script>",
    options: null,
    answer: null,
    solution: "The blanks are `target` and `li`:\n\nconst item = e.target.closest(\"li\");\nif (!item) return;\nconsole.log(\"clicked item\", item.dataset.id);\n\nThis is **event delegation**, and each piece earns its keep:\n- It works because of **bubbling**: a click on the `<span>` fires there, then bubbles up through `<li>`, `<ul>`, and beyond — so one listener on the ancestor sees every descendant's clicks.\n- `e.target` is the *innermost* element actually clicked (here often the `<span>`), while `e.currentTarget` is the element the listener is attached to (the `<ul>`). Mixing these up is the classic delegation bug.\n- `.closest(\"li\")` walks *upward* from the target (including the target itself) to find the enclosing item — exactly what's needed when the click landed on a child of the `<li>`. Checking `e.target.tagName === \"LI\"` instead would miss clicks on the span.\n- The `if (!item) return` guard handles clicks on the list's own padding, outside any item.\n- `dataset.id` reads the `data-id` attribute.\n\nWhy delegate at all: one listener instead of hundreds (less memory, no wiring loop), and — the killer feature — items added to the list *later* just work, because the listener lives on the ancestor. The alternative, attaching listeners in the code that creates each item, also works and is fine for small lists; delegation wins for large or dynamic ones."
  },
  {
    id: "jsb-038",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "What does `const last = arr.pop()` do?",
    code: null,
    options: {
      a: "Returns the last element without changing the array",
      b: "Removes the *first* element and returns it",
      c: "Removes the *last* element from the array (mutating it) and returns that element; on an empty array it returns `undefined`",
      d: "Returns the new length of the array"
    },
    answer: "c",
    solution: "Correct: c. The four end-of-array methods, with their return values (which interviews love to probe):\n- `push(x)` — adds to the **end**, returns the **new length** (not the array! `const a = arr.push(1)` giving a number is a classic surprise).\n- `pop()` — removes from the **end**, returns the **removed element**.\n- `unshift(x)` — adds to the **front**, returns the new length.\n- `shift()` — removes from the **front**, returns the removed element.\n\nAll four **mutate** the array. Memory hooks: push/pop work at the end like a stack of plates; shift/unshift 'shift' everything over at the front. That shifting is literal — `shift`/`unshift` re-index every remaining element, so they're O(n) while `push`/`pop` are O(1); using `shift()` in a hot loop over a huge array is a real performance smell (a queue is better modeled with an index pointer or a real deque).\n\nWhy the others are wrong:\n- a: non-mutating peeks are `arr[arr.length - 1]` or the modern `arr.at(-1)`.\n- b: that's `shift()`.\n- d: that's what `push`/`unshift` return.\n\nStack = push/pop (LIFO). Queue = push/shift (FIFO). Saying that sentence is usually the point of the question."
  },
  {
    id: "jsb-039",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "Explain JavaScript's scope levels — global, function, and block scope. Why are global variables considered harmful, and what does an accidental global look like?",
    code: null,
    options: null,
    answer: null,
    solution: "Scope is where a variable is visible. **Global scope**: declared outside any function/block — visible everywhere, and in browsers attached to the page's shared environment for its whole lifetime. **Function scope**: parameters and variables declared in a function exist only during that call; `var` is function-scoped — it ignores block boundaries. **Block scope**: `let`/`const` are confined to the nearest `{ }` — an `if` body, a loop, or a bare block; this is the modern default and matches how most languages work. Inner scopes can read outer ones (the chain that makes closures possible), but not vice versa. Why globals are harmful: every piece of code can read *and write* them, so any function might be the one that broke the value — debugging becomes archaeology; names collide between scripts and libraries (two scripts both defining `config`); they make functions secretly depend on outside state, killing testability and reuse; and they live forever, holding memory. The **accidental global** is the sneaky version: assign to an undeclared name — `function f() { counter = 0 }` (missing `let`) — and sloppy mode silently creates a global instead of erroring. A typo like `userNmae = ...` does the same: no crash, just a mysterious global and an unchanged real variable. `\"use strict\"` (automatic in ES modules) turns these into ReferenceErrors, one of its main selling points. Mitigations when you do need shared state: modules with explicit exports (the real fix — module scope replaced globals), or at minimum one namespaced object. Interview tip: 'var is function-scoped, let/const are block-scoped, and strict mode catches accidental globals' hits all three expected beats."
  },
  {
    id: "jsb-040",
    category: "javascript",
    difficulty: "basic",
    type: "code",
    question: "Fill in the three blanks so `formatName(\"  ada LOVELACE \")` returns `\"Ada Lovelace\"` — trimmed, each word capitalized, the rest lowercased.",
    code: "function formatName(raw) {\n  return raw\n    .____()\n    .toLowerCase()\n    .split(\" \")\n    .map(word => word.charAt(0).____() + word.____(1))\n    .join(\" \");\n}",
    options: null,
    answer: null,
    solution: "The blanks are `trim`, `toUpperCase`, and `slice`:\n\nfunction formatName(raw) {\n  return raw\n    .trim()                                   // \"ada LOVELACE\"\n    .toLowerCase()                            // \"ada lovelace\"\n    .split(\" \")                               // [\"ada\", \"lovelace\"]\n    .map(w => w.charAt(0).toUpperCase() + w.slice(1))\n    .join(\" \");                               // \"Ada Lovelace\"\n}\n\nThe idioms this exercises:\n- **Chaining works because strings are immutable** — every method returns a new string (or array), so the pipeline reads top to bottom with no intermediate variables.\n- `trim()` strips whitespace from both ends (`trimStart`/`trimEnd` for one side).\n- `split(\" \")` string→array and `join(\" \")` array→string are the bread-and-butter pair for word-level work; the same pair with `\"\"` does character-level work (`str.split(\"\").reverse().join(\"\")` is the classic string reversal).\n- `charAt(0)` (or `w[0]`) takes the first character; `slice(1)` takes the rest.\n\nEdge cases a reviewer might poke at: double spaces produce empty strings in the array (`split(/\\s+/)` fixes it), `charAt(0)` on an empty word returns `\"\"` so it doesn't crash, and names like \"O'Brien\" or hyphenated names need more rules — worth *mentioning* limits even in a toy function."
  },
  {
    id: "jsb-041",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "Given `const a = { n: 1 }; const b = { n: 1 }; const c = a;` — which comparison is `true`?",
    code: null,
    options: {
      a: "`a === b`",
      b: "`a == b`",
      c: "`a === c`",
      d: "All three are true"
    },
    answer: "c",
    solution: "Correct: c. Objects (and arrays, and functions) are compared **by reference**: `===` asks 'are these the *same object in memory*?', never 'do they look alike?'. `a` and `b` are two separate objects that happen to have identical contents — not equal under `==` *or* `===` (loose equality does no structural comparison either; option b is a common misconception). `c` was assigned the same reference as `a`, so `a === c` is true — and that also means mutating `c.n` changes `a.n`, because there's only one object.\n\nWhy this matters daily:\n- 'Why is my `indexOf`/`includes` not finding the object?' — they compare by reference, so only the exact same instance matches.\n- React and friends detect changes by reference comparison, which is why state updates create *new* objects/arrays (`{...state, n: 2}`) instead of mutating.\n- Function parameters receive a *copy of the reference* — the function can mutate your object, but reassigning the parameter inside doesn't affect your variable.\n\nHow to actually compare contents: there's no built-in deep equal. Options are field-by-field checks, `JSON.stringify(a) === JSON.stringify(b)` (quick but fragile — key order, undefined, dates), or a library deep-equal. Primitives, by contrast, compare by value — `\"hi\" === \"hi\"` is true. 'Primitives by value, objects by reference' is the sentence to say out loud."
  },
  {
    id: "jsb-042",
    category: "javascript",
    difficulty: "basic",
    type: "open",
    question: "What is the DOM, exactly? How does JavaScript interact with it, and why is the DOM not technically part of the JavaScript language?",
    code: null,
    options: null,
    answer: null,
    solution: "The DOM — Document Object Model — is the browser's live, in-memory object representation of the parsed HTML document: a tree where every element, attribute, and piece of text is a node. It is an *API the browser provides*, not part of JavaScript itself — the language spec (ECMAScript) says nothing about `document` or elements, which is why Node.js has no DOM: same language, different host environment with different APIs. JavaScript interacts with it through the `document` object: **finding** nodes (`querySelector`/`querySelectorAll` taking CSS selectors, `getElementById`), **reading/changing** them (`textContent`, `value`, `setAttribute`, `classList.add/remove/toggle`, `style`), **creating/removing** structure (`createElement`, `append`, `remove`), and **reacting** to the user via events (`addEventListener`). Key mental-model points: the DOM is *live* — change a node and the page updates (after the browser re-renders); it can differ from your HTML source, because the parser fixes errors and scripts modify the tree (View Source shows the original bytes; DevTools' Elements panel shows the current DOM); and DOM access has real cost — geometry reads can force layout, and bulk changes are batched (fragments, single innerHTML write) for performance, which is the core problem virtual-DOM frameworks set out to manage. Interview tip: 'a live tree of objects the browser builds from HTML, exposed to JS as an API — and not part of the language, which is why Node doesn't have it' covers every beat this question is fishing for."
  },
  {
    id: "jsb-043",
    category: "javascript",
    difficulty: "basic",
    type: "code",
    question: "Predict the output of each `console.log`.",
    code: "console.log(typeof \"5\");\nconsole.log(typeof 5);\nconsole.log(typeof undefined);\nconsole.log(typeof null);\nconsole.log(typeof []);\nconsole.log(typeof {});\nconsole.log(typeof console.log);",
    options: null,
    answer: null,
    solution: "Line by line:\n\ntypeof \"5\"          // \"string\"\ntypeof 5            // \"number\"\ntypeof undefined    // \"undefined\"\ntypeof null         // \"object\"   ← the famous quirk\ntypeof []           // \"object\"   ← arrays are objects\ntypeof {}           // \"object\"\ntypeof console.log  // \"function\"\n\nThe three lines worth talking about:\n- `typeof null === \"object\"` is a bug from JavaScript's first release, kept forever for backward compatibility. Practical consequence: checking for null is `value === null`, and checking 'is a real object' must exclude null: `typeof v === \"object\" && v !== null`.\n- `typeof []` gives \"object\" — typeof cannot distinguish arrays; use `Array.isArray()`.\n- Functions get their own answer, \"function\", even though they are technically objects — a useful inconsistency, since it makes `typeof cb === \"function\"` the standard callback guard.\n\nAlso worth knowing: typeof returns a *string* (so compare against \"string\", in quotes); `typeof NaN` is \"number\" (Not-a-Number is a number!); and typeof is the one operator that doesn't throw on completely undeclared identifiers — `typeof neverDeclared` is \"undefined\" — *except* for `let`/`const` variables in their temporal dead zone, which throw even with typeof."
  },
  {
    id: "jsb-044",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "You want a random integer from 1 to 10, inclusive. Which expression is correct?",
    code: null,
    options: {
      a: "`Math.random(1, 10)`",
      b: "`Math.floor(Math.random() * 10) + 1`",
      c: "`Math.round(Math.random() * 10)`",
      d: "`Math.ceil(Math.random() * 9)`"
    },
    answer: "b",
    solution: "Correct: b. `Math.random()` returns a float in [0, 1) — 0 inclusive, 1 *exclusive*, taking no arguments. Multiply by 10 → [0, 10); `Math.floor` → integers 0–9, each equally likely; add 1 → 1–10. The general recipe: `Math.floor(Math.random() * (max - min + 1)) + min`.\n\nWhy the others are wrong:\n- a: `Math.random()` ignores arguments entirely — there is no range form.\n- c: `Math.round` skews the distribution: 0 is produced only by [0, 0.05) and 10 only by [9.5, 10), so the endpoints get *half* the probability of 1–9. Classic subtle bug — floor keeps buckets equal.\n- d: `Math.ceil(x * 9)` yields 0–9 (0 when random() returns exactly 0) and never 10; both endpoints are wrong.\n\nTwo related notes that score points: picking a random array element is `arr[Math.floor(Math.random() * arr.length)]`; and `Math.random()` is *not* cryptographically secure — for tokens, codes, or anything security-flavored, use `crypto.getRandomValues()` (or `crypto.randomUUID()` for ids)."
  },
  {
    id: "jsb-045",
    category: "javascript",
    difficulty: "medium",
    type: "open",
    question: "What do `JSON.stringify` and `JSON.parse` do? What kinds of values does `JSON.stringify` handle badly, and what is the deep-copy trick (and its limits)?",
    code: null,
    options: null,
    answer: null,
    solution: "`JSON.stringify(value)` serializes a value to a JSON string; `JSON.parse(string)` does the reverse. They power API payloads and `localStorage` (which stores only strings — stringify on write, parse on read). The danger zone is everything JSON-the-format can't represent: `undefined`, functions, and symbols are *dropped* from objects (`{a: undefined}` → `\"{}\"`) and become `null` inside arrays; `Date` objects become ISO strings and **stay strings after parsing** — the classic round-trip bug where `user.createdAt.getTime()` crashes after a save/load cycle; `NaN` and `Infinity` become `null`; `Map`/`Set` serialize to useless `{}`; `BigInt` throws; and circular references throw `TypeError: Converting circular structure to JSON`. Useful extras: `JSON.stringify(obj, null, 2)` pretty-prints with 2-space indent (great for debugging); the second argument can also be a replacer (array of keys to keep, or a transform function); `JSON.parse` accepts a reviver function — the standard place to turn date strings back into Dates; and an object with a `toJSON()` method controls its own serialization (that's *why* dates become strings). The deep-copy trick — `JSON.parse(JSON.stringify(obj))` — produces a genuinely deep clone but inherits every limitation above: dates corrupt to strings, undefined/functions vanish, circular structures throw. The modern replacement is `structuredClone(obj)`: handles Dates, Maps, Sets, and circular references natively (though still not functions). Interview tip: the date round-trip bug is the war story to tell — it proves you've actually shipped persistence code."
  },
  {
    id: "jsb-046",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "Which statement about `localStorage` is correct?",
    code: null,
    options: {
      a: "`localStorage.setItem(\"user\", {name: \"Ada\"})` stores the object and retrieves it intact",
      b: "localStorage stores only strings — objects must go through `JSON.stringify` on write and `JSON.parse` on read, or you'll read back the useless string `\"[object Object]\"`",
      c: "localStorage is cleared automatically when the tab closes",
      d: "Data in localStorage is shared across all websites the user visits"
    },
    answer: "b",
    solution: "Correct: b. localStorage is a string-to-string store. Pass it an object and it silently calls `toString()`, storing the literal text `\"[object Object]\"` — data gone, no error. The standard pattern:\n\nlocalStorage.setItem(\"user\", JSON.stringify(user));\nconst user = JSON.parse(localStorage.getItem(\"user\") ?? \"null\");\n\n(`getItem` returns `null` for missing keys, and `JSON.parse(null)` happens to work — but guarding explicitly is clearer. Wrap parse in try/catch if the stored data could ever be corrupt.)\n\nWhy the others are wrong:\n- c: that's **sessionStorage** — same API, but scoped to the tab session. localStorage persists until explicitly cleared by code, the user, or the browser.\n- d: storage is partitioned by **origin** (scheme + host + port) — `https://a.com` and `https://b.com` can never see each other's data; even `http://a.com` vs `https://a.com` are separate.\n\nOther facts that come up: ~5–10MB quota, with `setItem` throwing `QuotaExceededError` when full; it's *synchronous*, so huge reads/writes block the main thread (IndexedDB is the async heavyweight); the `storage` event lets other tabs of the same origin react to changes; and never store secrets or tokens you can avoid storing — any XSS on the page can read all of localStorage."
  },
  {
    id: "jsb-047",
    category: "javascript",
    difficulty: "medium",
    type: "open",
    question: "In event handling, what is the difference between `event.preventDefault()` and `event.stopPropagation()`? Give a real use case for each.",
    code: null,
    options: null,
    answer: null,
    solution: "They stop two completely different things. `preventDefault()` cancels the **browser's built-in action** for the event, while leaving the event flowing through the DOM: a form's `submit` event still bubbles, but the page no longer navigates/reloads — which is exactly how every AJAX form starts (`form.addEventListener(\"submit\", e => { e.preventDefault(); fetch(...) })`). Other classic uses: stopping a link's navigation for client-side routing, blocking default scrolling in a drawing canvas's touch handlers, custom right-click menus via `contextmenu`. `stopPropagation()` does the opposite trade: the default action still happens, but the event **stops travelling** to other elements' listeners — typically halting bubbling toward ancestors. The textbook case is a modal: a click listener on the overlay closes the modal, so clicks *inside* the dialog call `stopPropagation()` to keep them from bubbling out to the overlay and closing it. Variants and footnotes: `stopImmediatePropagation()` also silences *other listeners on the same element*; `return false` in an addEventListener handler does **nothing** (that folklore is from jQuery/onclick attributes — say this and interviewers nod); and some defaults can't be prevented in passive listeners (scroll performance optimization). A caution worth voicing: liberal `stopPropagation()` is a code smell — it breaks event delegation and analytics listeners upstream; prefer checking `e.target` at the receiving end when possible. Memory hook: preventDefault = 'browser, don't do *your* thing'; stopPropagation = 'other listeners, you don't get to hear about this'."
  },
  {
    id: "jsb-048",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "The price calculator displays '101' instead of 11 when the user enters 10. Find the bug and give two idiomatic fixes.",
    code: "<input id=\"price\" type=\"number\" value=\"10\">\n<button id=\"add\">Add $1 fee</button>\n\n<script>\ndocument.getElementById(\"add\").addEventListener(\"click\", () => {\n  const price = document.getElementById(\"price\").value;\n  const total = price + 1;\n  console.log(total); // \"101\" ??\n});\n</script>",
    options: null,
    answer: null,
    solution: "The bug: `input.value` is **always a string** — even when the input's `type` is \"number\". So `price` is `\"10\"`, and `\"10\" + 1` triggers string concatenation (`+` prefers strings when either operand is one), producing `\"101\"`. Every other arithmetic operator would have coerced to numbers (`\"10\" - 1` is 9), which is why these bugs surface specifically around `+`.\n\nIdiomatic fixes:\n\n// 1. Convert explicitly at the boundary\nconst price = Number(document.getElementById(\"price\").value);\n\n// 2. For number inputs, the DOM gives you a numeric accessor\nconst price = document.getElementById(\"price\").valueAsNumber;\n\n(Also fine: `parseFloat(value)` for decimal input, `+value` as terse Number(). `parseInt` would silently truncate decimals — wrong tool for money.)\n\nThen guard the failure mode — an empty input yields `Number(\"\")` = 0 and `valueAsNumber` = NaN:\n\nif (Number.isNaN(price)) { /* show validation message */ }\n\nThe transferable lesson: **convert at the boundary**. Everything arriving from the DOM, URLs, localStorage, and form posts is strings; turn it into a number once, immediately, at the edge — instead of letting strings drift into your math, where `+` is waiting."
  },
  {
    id: "jsb-049",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "Which of these array methods does NOT mutate the array it's called on?",
    code: null,
    options: {
      a: "`sort()`",
      b: "`map()`",
      c: "`splice()`",
      d: "`reverse()`"
    },
    answer: "b",
    solution: "Correct: b. `map` (with `filter`, `slice`, `concat`, `flat`, `reduce`, and friends) returns a **new array**, leaving the original alone — the 'transformer' family. `sort`, `splice`, and `reverse` belong to the 'mutator' family that edits in place: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`.\n\nThe two trap members are exactly `sort` and `reverse` — they *also return the array*, which makes them look like the copying kind: `const sorted = arr.sort()` compiles, works, and silently destroys the original order, because `sorted` and `arr` are the same object. This is a top-tier source of state bugs in frameworks where mutated state defeats change detection.\n\nDefensive patterns: copy first — `[...arr].sort()` — or use the modern immutable counterparts added to the language precisely for this: `toSorted()`, `toReversed()`, `toSpliced()`, and `with(index, value)` (an immutable single-element replacement). So today the cleanest answer to 'sort without mutating' is `arr.toSorted(cmp)`.\n\nQuick self-test heuristic: methods that conceptually *rearrange or resize this array* mutate; methods that conceptually *derive something from it* return new. When unsure, check MDN — guessing wrong here costs hours."
  },
  {
    id: "jsb-050",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "Predict what each of the four logs prints, and explain the copying rule that makes the difference.",
    code: "const original = { name: \"Ada\", skills: [\"math\"] };\nconst copy = { ...original };\n\ncopy.name = \"Grace\";\ncopy.skills.push(\"naval engineering\");\n\nconsole.log(original.name);\nconsole.log(original.skills);\nconsole.log(copy.name);\nconsole.log(copy.skills);",
    options: null,
    answer: null,
    solution: "Output:\n\noriginal.name    // \"Ada\"            — unaffected\noriginal.skills  // [\"math\", \"naval engineering\"]  — CHANGED!\ncopy.name        // \"Grace\"\ncopy.skills      // [\"math\", \"naval engineering\"]\n\nThe rule: spread (`{...obj}`, and equally `Object.assign({}, obj)` or `arr.slice()`) makes a **shallow** copy — one level deep. Top-level *primitive* properties are copied by value, so `copy.name = \"Grace\"` doesn't touch the original. But top-level *object/array* properties copy only the **reference**: `original.skills` and `copy.skills` point at the *same array*, so pushing through either is visible through both. That's why log 2 shows the mutation.\n\nFixes when you need real independence:\n\n// Targeted: copy the nested layer you're changing (idiomatic in React state updates)\nconst copy = { ...original, skills: [...original.skills] };\n\n// General: deep clone\nconst copy = structuredClone(original);   // handles nesting, dates, maps, circular refs\n\n(The old `JSON.parse(JSON.stringify(obj))` trick also deep-copies but corrupts dates, drops undefined/functions, and throws on circular references.)\n\nInterview framing: 'spread copies one level; below that it shares references' — then point at the React-style nested-spread fix. This exact scenario (mutating shared nested state) is among the most common real bugs juniors ship."
  }
];
