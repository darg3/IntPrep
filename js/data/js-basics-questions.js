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
  }
];
