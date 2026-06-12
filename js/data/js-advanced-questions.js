window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["js-advanced"] = [
  {
    id: "jsa-001",
    category: "javascript",
    difficulty: "medium",
    type: "open",
    question: "What is a closure in JavaScript, and can you give me a practical use case for one?",
    code: null,
    options: null,
    answer: null,
    solution: "A closure is a function that retains access to the variables of the scope in which it was created, even after that outer scope has finished executing. The function carries its lexical environment with it. The classic use case is data privacy: a counter factory like `function makeCounter() { let count = 0; return () => ++count; }` exposes a function that can update `count`, but nothing outside can read or reset `count` directly, so the closure acts like a private variable. Closures also power callbacks that remember context, memoization caches, debounce/throttle utilities, and the module pattern. Every function in JavaScript forms a closure over its defining scope, so you use them constantly even without naming them. Interview tip: be ready for the follow-up about closure bugs, such as the `var` loop with `setTimeout` printing the same value, or stale closures in React hooks that capture an old state value inside an effect or handler."
  },
  {
    id: "jsa-002",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "What does this code print, and how would you fix it so it prints 0, 1, 2? Give two different fixes.",
    code: "for (var i = 0; i < 3; i++) {\n  setTimeout(function () {\n    console.log(i);\n  }, 0);\n}",
    options: null,
    answer: null,
    solution: "It prints 3, 3, 3. `var` is function-scoped, so all three callbacks close over the same single `i` variable. The loop finishes synchronously (leaving `i` at 3) before any `setTimeout` callback runs, so each callback reads the final value. Fix 1: use `let i`, which creates a fresh per-iteration binding, so each callback closes over its own copy (prints 0, 1, 2). Fix 2: capture the value with a closure, e.g. an IIFE: `(function (j) { setTimeout(() => console.log(j), 0); })(i);`. A third option interviewers accept: pass the value as an extra argument, `setTimeout(console.log, 0, i)`. The key insight to say out loud is that closures capture variables, not values."
  },
  {
    id: "jsa-003",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "Which option correctly lists the three possible states of a Promise?",
    code: null,
    options: {
      a: "waiting, done, failed",
      b: "pending, resolved, finished",
      c: "pending, fulfilled, rejected",
      d: "open, settled, closed"
    },
    answer: "c",
    solution: "Correct answer: c. A Promise starts as pending, then settles exactly once into either fulfilled (with a value) or rejected (with a reason); once settled it never changes again. (a) uses informal terms that are not the spec states. (b) 'resolved' is often used loosely but the spec state is 'fulfilled', and 'finished' is not a state; also a promise can resolve to another promise without being fulfilled yet. (d) 'settled' is real terminology but it is the umbrella term for fulfilled-or-rejected, not a third state, and 'open'/'closed' are not Promise states."
  },
  {
    id: "jsa-004",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "Predict the output of this snippet and explain the order.",
    code: "console.log(1);\nsetTimeout(function () {\n  console.log(2);\n}, 0);\nPromise.resolve().then(function () {\n  console.log(3);\n});\nconsole.log(4);",
    options: null,
    answer: null,
    solution: "Output: 1, 4, 3, 2. First, all synchronous code on the call stack runs: 1 and 4 are logged. The `setTimeout` callback is queued as a macrotask; the `.then` callback is queued as a microtask. When the stack empties, the event loop drains the entire microtask queue before taking the next macrotask, so the promise callback logs 3 before the timer logs 2 — even though the timer delay was 0 ms. This is the canonical microtask-vs-macrotask ordering question; mentioning the words 'call stack', 'microtask queue', and 'macrotask queue' is exactly what the interviewer is listening for."
  },
  {
    id: "jsa-005",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "Walk me through how the JavaScript event loop works. What is the difference between the microtask queue and the macrotask queue, and why does it matter?",
    code: null,
    options: null,
    answer: null,
    solution: "JavaScript runs single-threaded: one call stack executes one frame at a time. Asynchronous work (timers, network, DOM events) is handled by the host environment, which queues callbacks for later. The event loop's job is simple: when the call stack is empty, take the next queued callback and run it. There are two kinds of queues. The macrotask (task) queue holds callbacks from `setTimeout`, `setInterval`, I/O, and UI events. The microtask queue holds Promise reactions (`.then`/`.catch`/`.finally`), `queueMicrotask`, and `MutationObserver` callbacks. The crucial rule: after each macrotask (and after the initial script), the engine drains the entire microtask queue — including microtasks queued by other microtasks — before rendering or starting the next macrotask. That is why `Promise.resolve().then(...)` always beats `setTimeout(..., 0)`, and why an infinite chain of microtasks can starve rendering and freeze the page. Interview tip: draw the stack, the two queues, and the loop arrow — interviewers love a 30-second sketch over a memorized definition."
  },
  {
    id: "jsa-006",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "You pass three promises to `Promise.all`. One rejects after 1 second; the other two fulfill after 3 seconds. What happens to the promise returned by `Promise.all`?",
    code: null,
    options: {
      a: "It rejects after about 1 second with the first rejection's reason",
      b: "It waits the full 3 seconds, then resolves with an array of two values and one error",
      c: "It resolves with the values of the two fulfilled promises only",
      d: "It throws a synchronous error the moment the rejection happens"
    },
    answer: "a",
    solution: "Correct answer: a. `Promise.all` is fail-fast: it rejects as soon as any input rejects, with that first rejection reason; the other promises keep running but their results are ignored. (b) describes `Promise.allSettled`, which always waits for every promise and gives you an array of `{status, value/reason}` objects. (c) is not a behavior of any combinator — `Promise.all` never silently drops a rejection. (d) is wrong because promise rejections are always delivered asynchronously through the rejected promise, never as synchronous throws. Related combinators worth naming: `Promise.race` settles with whichever settles first (fulfill or reject), and `Promise.any` fulfills with the first fulfillment and only rejects if all inputs reject."
  },
  {
    id: "jsa-007",
    category: "javascript",
    difficulty: "medium",
    type: "open",
    question: "How does async/await relate to Promises, and how do you handle errors in async code?",
    code: null,
    options: null,
    answer: null,
    solution: "async/await is syntax built on top of Promises — it does not replace them. Declaring a function `async` makes it always return a promise; `await` pauses that function (without blocking the thread) until the awaited promise settles, then resumes with the fulfilled value or throws the rejection reason. This lets asynchronous code read top-to-bottom like synchronous code, which is the modern answer to callback hell and long `.then` chains. For errors, you wrap awaits in `try/catch`, which catches both rejected promises and synchronous throws in one place; with raw promises you would attach `.catch` to the chain instead. A common junior bug is forgetting that an unhandled rejection in an async function silently propagates to the caller — someone must catch it. Another is awaiting independent operations sequentially; use `await Promise.all([a, b])` to run them in parallel. Interview tip: mention that `await` only pauses the async function itself, scheduling the continuation as a microtask — that connects this answer to the event loop."
  },
  {
    id: "jsa-008",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "What does this code log when `counter.increment()` is called, and why?",
    code: "const counter = {\n  count: 0,\n  increment: function () {\n    setTimeout(() => {\n      this.count++;\n      console.log(this.count);\n    }, 0);\n  }\n};\ncounter.increment();",
    options: {
      a: "NaN, because `this` is undefined inside setTimeout callbacks",
      b: "TypeError, because arrow functions cannot access `this` at all",
      c: "NaN, because the arrow function creates its own empty `this`",
      d: "1, because the arrow function inherits `this` from `increment`, which was called on `counter`"
    },
    answer: "d",
    solution: "Correct answer: d. Arrow functions have no `this` of their own; they capture `this` lexically from the enclosing function. `increment` was called as `counter.increment()`, so its `this` is `counter`, and the arrow inside `setTimeout` inherits that — `this.count` becomes 1 and is logged. (a) would be the symptom if a regular `function` were used as the callback: `this` would be the global object (or undefined in strict mode) and `this.count++` would yield NaN or throw. (b) is backwards — arrows can use `this`, they just do not bind their own. (c) misstates the mechanism: arrows do not create any `this`, empty or otherwise. This 'arrow inside a method's callback' pattern is exactly why arrows replaced `var self = this`."
  },
  {
    id: "jsa-009",
    category: "javascript",
    difficulty: "advanced",
    type: "code",
    question: "Predict the output of each of the three `console.log` calls (assume non-strict script mode), and explain the `this` binding rule behind each one.",
    code: "const user = {\n  role: \"admin\",\n  describe: function () {\n    return \"Role: \" + this.role;\n  }\n};\nconst describe = user.describe;\nconsole.log(user.describe());\nconsole.log(describe());\nconsole.log(describe.call(user));",
    options: null,
    answer: null,
    solution: "Output: \"Role: admin\", \"Role: undefined\", \"Role: admin\". Line 1 is a method call — `this` is the object before the dot, so `this.role` is \"admin\". Line 2 demonstrates that `this` is decided at call time, not definition time: `describe` is invoked as a plain standalone function, so `this` defaults to the global object in sloppy mode (`globalThis.role` is undefined); in strict mode or inside an ES module `this` would be `undefined` and reading `this.role` would throw a TypeError. Line 3 uses explicit binding: `call` invokes the function with `this` set to `user`, restoring \"Role: admin\". The four rules to recite: default binding (standalone call), implicit binding (object before the dot), explicit binding (`call`/`apply`/`bind`), and `new` binding — with arrow functions opting out entirely by inheriting `this` lexically."
  },
  {
    id: "jsa-010",
    category: "javascript",
    difficulty: "medium",
    type: "open",
    question: "What do `call`, `apply`, and `bind` do, and when would you use each one?",
    code: null,
    options: null,
    answer: null,
    solution: "All three let you control what `this` is when a function runs. `fn.call(ctx, a, b)` invokes the function immediately with `this` set to `ctx` and arguments listed individually. `fn.apply(ctx, [a, b])` does the same but takes the arguments as an array — handy when the arguments are already in array form (mnemonic: Apply = Array, Call = Comma). `fn.bind(ctx, a)` does not invoke anything; it returns a new function with `this` permanently locked to `ctx` (and optionally some arguments pre-filled, which is partial application). You would use `call`/`apply` for one-off borrowing of a method, like `Array.prototype.slice.call(arguments)` in older code, and `bind` when you must hand a method to someone else to call later — for example `button.addEventListener(\"click\", handler.bind(this))` or binding class methods before React hooks era. Two details that impress: a bound function's `this` cannot be overridden by a later `call`, and since ES6 the spread operator covers most old `apply` use cases (`Math.max(...nums)`)."
  },
  {
    id: "jsa-011",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "What does the ES6 `class` keyword actually do under the hood in JavaScript?",
    code: null,
    options: {
      a: "It introduces true classical inheritance, copying parent members into the child at definition time",
      b: "It is mainly syntactic sugar over constructor functions and the prototype chain",
      c: "It creates a new primitive type that behaves like classes in Java or C#",
      d: "It replaces prototypes entirely with static method dispatch"
    },
    answer: "b",
    solution: "Correct answer: b. A `class` declaration creates a constructor function; methods are placed on `ClassName.prototype`, and `extends` wires up the prototype chain (both for instances and for static members). Instances still resolve properties by walking the prototype chain at runtime — nothing is copied. (a) is the classical-inheritance misconception: JS delegates lookups up the chain instead of copying members. (c) classes are functions, not a new primitive — `typeof MyClass === \"function\"`. (d) prototypes are not replaced; classes are built directly on them. Worth adding in an interview: it is not 100% pure sugar — class bodies are always strict mode, methods are non-enumerable, classes are not hoisted in a usable way (TDZ), and you must call them with `new`."
  },
  {
    id: "jsa-012",
    category: "javascript",
    difficulty: "advanced",
    type: "code",
    question: "Predict the output of the three `console.log` calls and explain what the prototype chain has to do with each result.",
    code: "function Dog(name) {\n  this.name = name;\n}\nDog.prototype.speak = function () {\n  return this.name + \" says woof\";\n};\nconst rex = new Dog(\"Rex\");\nconsole.log(rex.speak());\nconsole.log(rex.hasOwnProperty(\"speak\"));\nconsole.log(Object.getPrototypeOf(rex) === Dog.prototype);",
    options: null,
    answer: null,
    solution: "Output: \"Rex says woof\", false, true. `new Dog(\"Rex\")` creates a fresh object whose internal prototype is `Dog.prototype`, then runs the constructor with `this` bound to it, so `name` becomes an own property. When you call `rex.speak()`, the engine does not find `speak` on `rex` itself, so it walks up the prototype chain and finds it on `Dog.prototype` — that is prototypal inheritance: delegation at lookup time, not copying. `hasOwnProperty(\"speak\")` is false because `speak` lives on the prototype, not on the instance (and note `hasOwnProperty` itself comes from `Object.prototype`, two links up the chain). The last line confirms the wiring `new` performed. The chain here is: rex -> Dog.prototype -> Object.prototype -> null."
  },
  {
    id: "jsa-013",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "What is event delegation, and why would you use it? How would you implement it for a list with hundreds of items?",
    code: null,
    options: null,
    answer: null,
    solution: "Event delegation means attaching a single event listener to a common ancestor instead of one listener per child, and relying on event bubbling to catch events that originate on the children. When a click happens on an `<li>`, it bubbles up through the `<ul>`, so a listener on the `<ul>` fires with `event.target` pointing at the actual element clicked. Implementation: `list.addEventListener(\"click\", (e) => { const item = e.target.closest(\"li\"); if (item && list.contains(item)) { /* handle item */ } });` — `closest` handles clicks landing on nested elements inside the `<li>`. The benefits: far fewer listeners (better memory and setup time for hundreds of items), and it automatically works for items added to the list later, which per-item listeners would miss. The caveats: a few events do not bubble (`focus`, `blur` — use `focusin`/`focusout`), and `stopPropagation` in a child handler can prevent the delegated handler from ever seeing the event. Interview tip: mention that frameworks like React historically used a single delegated root listener for exactly these reasons."
  },
  {
    id: "jsa-014",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "You click a button inside a `<div>`, and both the button and the div have click listeners. Which statement is true about how the event travels and how you can control it?",
    code: null,
    options: {
      a: "Events only travel downward (capturing), and you stop them with `preventDefault()`",
      b: "Events bubble from the target up to the root, and `preventDefault()` stops that bubbling",
      c: "Events bubble from the target up to the root by default; `stopPropagation()` halts the traversal, while `preventDefault()` only cancels the browser's default action",
      d: "Capturing and bubbling are the same phase, and `stopPropagation()` cancels form submission"
    },
    answer: "c",
    solution: "Correct answer: c. An event travels in three phases: capturing from the root down to the target, the target phase, then bubbling back up to the root. Listeners run in the bubble phase by default (pass `{ capture: true }` to hear the capture phase). `stopPropagation()` stops the event from reaching further elements in the traversal, whereas `preventDefault()` leaves propagation alone and only cancels the default behavior (following a link, submitting a form). (a) is wrong on both counts — bubbling is the default listening phase and `preventDefault` does not affect travel. (b) confuses the two methods: `preventDefault` never stops bubbling. (d) capturing and bubbling are distinct phases, and cancelling a form submit is `preventDefault`'s job, not `stopPropagation`'s."
  },
  {
    id: "jsa-015",
    category: "javascript",
    difficulty: "medium",
    type: "open",
    question: "What is the difference between debounce and throttle? Give a real example of when you would use each.",
    code: null,
    options: null,
    answer: null,
    solution: "Both are rate-limiting techniques for functions that fire too often, but they limit differently. Debounce waits for a quiet period: every new call resets a timer, and the function only runs once the calls stop for the given delay. Throttle guarantees a maximum frequency: the function runs at most once per interval no matter how many calls come in, executing at a steady rate while events keep firing. The classic debounce example is a search-as-you-type input — you do not want an API request per keystroke, only one request 300 ms after the user pauses typing. The classic throttle examples are scroll, resize, or mousemove handlers — you want regular updates while the user scrolls (say every 100-200 ms), not silence until they stop, which is what debounce would give you. A good one-liner for the interviewer: debounce fires after the burst ends; throttle fires during the burst at a fixed pace. Interview tip: juniors are very often asked to implement debounce on a whiteboard right after defining it, so have the closure-plus-`clearTimeout` version memorized."
  },
  {
    id: "jsa-016",
    category: "javascript",
    difficulty: "advanced",
    type: "code",
    question: "Fill in the two blanks (____) to complete this debounce implementation. Bonus: why is the returned function a regular `function` and not an arrow function?",
    code: "function debounce(fn, delay) {\n  let timerId;\n  return function (...args) {\n    ____(timerId);\n    timerId = setTimeout(() => {\n      fn.apply(this, args);\n    }, ____);\n  };\n}",
    options: null,
    answer: null,
    solution: "The blanks are `clearTimeout` and `delay`. Each call cancels the previously scheduled timer with `clearTimeout(timerId)` and schedules a new one, so `fn` only runs after `delay` ms of silence — that is the essence of debounce. `timerId` lives in the closure, shared across all calls to the returned function. The returned wrapper is a regular function so that it picks up `this` and `arguments` dynamically from however the caller invokes it (for example as a method or an event handler, where `this` is the element); `fn.apply(this, args)` then forwards both. The inner `setTimeout` callback is deliberately an arrow function so it inherits that same `this` instead of getting its own. If the wrapper were an arrow, `this` would be frozen to wherever `debounce` was called, breaking method-style usage. Note that calling `clearTimeout(undefined)` on the first invocation is harmless."
  },
  {
    id: "jsa-017",
    category: "javascript",
    difficulty: "basic",
    type: "mcq",
    question: "After this destructuring assignment runs, what is the value of `rest`?",
    code: "const [first, ...rest] = [10, 20, 30, 40];",
    options: {
      a: "[20, 30, 40]",
      b: "20",
      c: "[10, 20, 30, 40]",
      d: "{ 1: 20, 2: 30, 3: 40 }"
    },
    answer: "a",
    solution: "Correct answer: a. Array destructuring assigns `first = 10`, and the rest element `...rest` collects all remaining items into a new array `[20, 30, 40]`. (b) confuses rest with positional destructuring — rest always produces an array, never a single value. (c) ignores that `first` consumed the first element; rest only gathers what is left. (d) describes object-like indexing — rest in array destructuring yields a real array, not an object keyed by index. Remember the direction: rest gathers many values into one array (in destructuring or function parameters), while spread does the opposite, expanding an iterable out into individual elements or arguments."
  },
  {
    id: "jsa-018",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "Which scenario is the strongest reason to choose a `Map` over a plain object?",
    code: null,
    options: {
      a: "You need to serialize the structure to JSON frequently",
      b: "You want inherited methods like `hasOwnProperty` available on the data itself",
      c: "You only use short string keys and want object literal syntax",
      d: "You need keys that are objects or DOM elements, frequent adds/removes, and a reliable `size`"
    },
    answer: "d",
    solution: "Correct answer: d. `Map` accepts any value as a key — objects, DOM nodes, functions — without coercing them to strings like an object would; it keeps insertion order, exposes `size` directly, is directly iterable, and is optimized for frequent additions and deletions. It also has no inherited keys, so there is no prototype-pollution or accidental `toString` collision. (a) is a reason to prefer plain objects: `JSON.stringify` ignores Maps (you would have to convert first). (b) is backwards — inherited prototype members on plain objects are usually a hazard for dictionary use, not a benefit, and Maps deliberately avoid them. (c) is the textbook case where a plain object literal is simpler and fine. Bonus points: mention `Set` vs arrays for uniqueness and O(1) `has`, and `WeakMap`/`WeakSet` when keys should not prevent garbage collection."
  },
  {
    id: "jsa-019",
    category: "javascript",
    difficulty: "medium",
    type: "open",
    question: "What is the difference between a shallow copy and a deep copy of an object, and how would you make each in modern JavaScript?",
    code: null,
    options: null,
    answer: null,
    solution: "First, remember that objects and arrays are assigned and passed by reference — `const b = a` copies the reference, not the data, so mutating `b` mutates `a`. A shallow copy creates a new top-level object but copies nested objects by reference: spread (`{ ...obj }`, `[...arr]`) and `Object.assign({}, obj)` are shallow, so `copy.address.city = \"X\"` still changes the original's nested object. A deep copy recursively clones every level so the two structures share nothing. The modern way is `structuredClone(obj)`, which handles nesting, Dates, Maps, Sets, and circular references — though not functions or DOM nodes. The old `JSON.parse(JSON.stringify(obj))` trick is still asked about because of its pitfalls: it drops functions and `undefined`, turns Dates into strings, and throws on circular references. Knowing when shallow is enough matters too: immutable update patterns (React state, reducers) intentionally use shallow copies with spread, replacing only the changed branch instead of cloning everything. Interview tip: say 'copy the reference vs copy one level vs copy all levels' — that three-tier framing shows you really get it."
  },
  {
    id: "jsa-020",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "A teammate deep-copies this object with `JSON.parse(JSON.stringify(obj))`. What is wrong with the resulting copy?",
    code: "const obj = {\n  when: new Date(),\n  greet() {\n    return \"hi\";\n  },\n  amount: undefined\n};\nconst copy = JSON.parse(JSON.stringify(obj));",
    options: {
      a: "Nothing; the copy is structurally identical to the original",
      b: "`when` becomes a plain string, and both `greet` and `amount` are missing from the copy",
      c: "It throws a TypeError because functions cannot be stringified",
      d: "The function is copied but loses access to its closure scope"
    },
    answer: "b",
    solution: "Correct answer: b. JSON has no representation for Dates, functions, or `undefined`. `JSON.stringify` serializes the Date via its `toJSON` into an ISO string (so `copy.when` is a string, not a Date), and it silently omits properties whose values are functions or `undefined` — so `greet` and `amount` simply do not exist on the copy. (a) is wrong for those three reasons. (c) is a real-sounding trap: `stringify` does not throw on functions, it skips them; it throws on circular references and on BigInt values. (d) is impossible — functions are never serialized at all, so there is nothing to lose a closure from. The modern fix is `structuredClone`, which preserves Dates, Maps, Sets, and circular structures (though it still cannot clone functions)."
  },
  {
    id: "jsa-021",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "How do ES modules differ from regular scripts, and what is the difference between named and default exports?",
    code: null,
    options: null,
    answer: null,
    solution: "An ES module (`<script type=\"module\">` or a `.mjs`/configured file in Node) differs from a classic script in several ways: each module has its own scope, so top-level variables do not become globals; module code always runs in strict mode; in the browser, modules are deferred by default and fetched with CORS; each module is evaluated once and cached, no matter how many files import it; and top-level `this` is `undefined` instead of `window`. Imports and exports are static — they must sit at the top level with literal paths — which lets tools build the dependency graph ahead of time for tree-shaking and lets the engine catch missing exports early (dynamic `import()` exists for on-demand loading and returns a promise). Named exports (`export const parse = ...`, imported as `import { parse } from \"./utils.js\"`) can be many per file and must match by name, which helps refactoring and autocomplete. A default export (`export default ...`) is one per file and the importer picks any local name. Also worth one sentence: imported bindings are live, read-only views of the exporting module's variables, not copies — and ES modules are the standard that replaced the older CommonJS `require`/`module.exports` system used historically in Node."
  },
  {
    id: "jsa-022",
    category: "javascript",
    difficulty: "advanced",
    type: "code",
    question: "This is a generic curry helper. Predict the output of the two `console.log` calls and explain how the helper works.",
    code: "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn(...args);\n    }\n    return (...more) => curried(...args, ...more);\n  };\n}\nconst add = (a, b, c) => a + b + c;\nconst curriedAdd = curry(add);\nconsole.log(curriedAdd(1)(2)(3));\nconsole.log(curriedAdd(1, 2)(3));",
    options: null,
    answer: null,
    solution: "Both lines log 6. Currying transforms a function of several arguments into a chain of functions that each take part of the argument list. The helper compares how many arguments have been collected (`args.length`) against how many the original function declares (`fn.length`, which is 3 for `add`). If enough have arrived, it calls `fn`; otherwise it returns a new function that closes over the arguments gathered so far and concatenates the next batch — so each partial call accumulates state in a closure. `curriedAdd(1)(2)(3)` collects 1, then 1+2, then 1+2+3 arguments and fires; `curriedAdd(1, 2)(3)` shows this implementation also accepts arguments in groups. Practical uses to mention: building specialized functions from general ones (`const addTax = multiply(1.2)`), configuration-first APIs, and partial application in functional pipelines. Gotcha worth naming: `fn.length` ignores rest and defaulted parameters, so this helper breaks for those."
  },
  {
    id: "jsa-023",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "Why were IIFEs (Immediately Invoked Function Expressions) so widely used before ES6?",
    code: null,
    options: {
      a: "They created a private scope so variables would not leak into the global object",
      b: "They were the only way to define reusable functions before function declarations existed",
      c: "They made code faster by forcing the engine to precompile the function",
      d: "They were required in order to use `this` inside a function"
    },
    answer: "a",
    solution: "Correct answer: a. Before ES6, `var` was the only declaration and it is function-scoped, so any top-level variable in a script became a global. Wrapping code in `(function () { ... })()` created a function scope that ran immediately, keeping helpers and state private; combined with a returned object this became the module pattern, and libraries used it to avoid polluting `window`. (b) is wrong — function declarations have always existed; IIFEs are about scoping, not defining. (c) is a myth; IIFEs have no special performance behavior. (d) is wrong — `this` works in any function and IIFEs do nothing special for it. Today, block scoping with `let`/`const` and real ES modules (which give every file its own scope) cover most old IIFE use cases, but you still see IIFEs for one-shot initialization, including async IIFEs like `(async () => { await init(); })()` where top-level await is unavailable."
  },
  {
    id: "jsa-024",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "What are some common causes of memory leaks in JavaScript applications, and how would you find and avoid them?",
    code: null,
    options: null,
    answer: null,
    solution: "JavaScript is garbage-collected, but the GC can only free memory that nothing references — leaks happen when code accidentally keeps references alive. The usual suspects: forgotten timers (`setInterval` callbacks that are never cleared keep their closure and everything it references alive forever); event listeners that are never removed, especially listeners on long-lived objects like `window` that close over large component state; detached DOM nodes — removing an element from the page does not free it if a variable, array, or closure still points to it; ever-growing caches, arrays, or Maps that are only ever appended to; and accidental globals from undeclared assignments in sloppy mode. Fixes: always pair `setInterval`/`addEventListener` with `clearInterval`/`removeEventListener` in your teardown or cleanup path (e.g., a framework's unmount hook, or `AbortController` signals for listeners), use `WeakMap`/`WeakSet` for metadata keyed by objects so entries die with their keys, and bound the size of caches. To find leaks, use Chrome DevTools: the Memory panel's heap snapshots (compare two snapshots and look at retained objects, search for 'Detached'), and the Performance panel's memory graph to spot a sawtooth that trends upward. Interview tip: framing leaks as 'unintentionally retained references' rather than 'GC failure' shows you understand the model."
  },
  {
    id: "jsa-025",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "Your code is `fetch(url).then(r => r.json()).then(render).catch(handleError)`. The server responds with HTTP 500. What happens?",
    code: null,
    options: {
      a: "`handleError` runs immediately because fetch rejects on any non-2xx status code",
      b: "The request is automatically retried once before the promise rejects",
      c: "The fetch promise still fulfills; the code tries to parse the error body as JSON, and `handleError` only runs for network failures or a JSON parse error",
      d: "fetch throws a synchronous exception that must be caught with try/catch around the call"
    },
    answer: "c",
    solution: "Correct answer: c. This is the classic fetch gotcha: the promise returned by `fetch` rejects only on network-level failures (DNS error, offline, CORS block, abort). An HTTP 500 is a completed request, so the promise fulfills with a Response whose `ok` is false and `status` is 500 — the chain happily calls `r.json()` on the error body, and `render` may receive garbage, or `handleError` fires only because the body was not valid JSON. The correct pattern is to check manually: `if (!r.ok) throw new Error(\"HTTP \" + r.status);` before parsing, which routes server errors into `.catch` (or `try/catch` with async/await). (a) describes how people wish fetch worked, and roughly how libraries like axios behave — not native fetch. (b) fetch never retries automatically. (d) fetch returns a promise; errors arrive asynchronously as rejections, not synchronous throws."
  },
  {
    id: "jsa-026",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "You fire three independent API requests. You want to wait for all of them, but a single failure must not throw away the two successful results. Which combinator fits?",
    code: null,
    options: {
      a: "`Promise.all` — it always waits for every promise to settle",
      b: "`Promise.allSettled` — it waits for all and gives you a `{status, value | reason}` record per promise, never rejecting",
      c: "`Promise.race` — it resolves with the array of all results",
      d: "`Promise.any` — it collects every fulfilled value into an array"
    },
    answer: "b",
    solution: "Correct: b. The four combinators in one table:\n- `Promise.all` — fulfills with an array of values when *all* fulfill; rejects *immediately* on the first rejection (fail-fast), discarding the others' results. Right when everything is required.\n- `Promise.allSettled` — never rejects; waits for everything and yields `[{status: \"fulfilled\", value}, {status: \"rejected\", reason}, ...]`, so you can render the two dashboards that loaded and show an error tile for the third. Exactly this scenario.\n- `Promise.race` — settles as soon as the *first* promise settles, fulfilled *or* rejected. Classic use: timeout pattern, racing a fetch against a `setTimeout` rejection.\n- `Promise.any` — fulfills with the *first fulfillment*, ignoring rejections; rejects (with `AggregateError`) only if *every* promise rejects. Classic use: query mirrors/redundant endpoints, take whichever answers first.\n\nWhy the others are wrong: a — `all` is fail-fast, the opposite of the requirement; c — `race` gives one result, not all; d — `any` returns the single first success.\n\nMnemonic: **all** = everyone or nobody, **allSettled** = everyone's report card, **race** = first to *finish*, **any** = first to *succeed*."
  },
  {
    id: "jsa-027",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "Both functions fetch the same three users. Roughly how long does each take if every request takes ~1 second, and what is the rule for choosing between the two shapes?",
    code: "async function loadA() {\n  const a = await fetchUser(1);\n  const b = await fetchUser(2);\n  const c = await fetchUser(3);\n  return [a, b, c];\n}\n\nasync function loadB() {\n  const [a, b, c] = await Promise.all([\n    fetchUser(1),\n    fetchUser(2),\n    fetchUser(3),\n  ]);\n  return [a, b, c];\n}",
    options: null,
    answer: null,
    solution: "`loadA` takes ~3 seconds; `loadB` takes ~1 second.\n\nIn `loadA`, each `await` suspends the function until that promise settles — request 2 doesn't even *start* until request 1 finishes. The awaits create a sequential chain: 1s + 1s + 1s. In `loadB`, all three `fetchUser` calls run *first* — calling an async function starts its work immediately and returns a promise — and only then does the function await the combined `Promise.all`. The three requests fly concurrently, so total time is the slowest one: ~1s.\n\nThe rule: **await sequentially only when step N needs step N−1's result** (fetch user → then fetch *that user's* orders). When operations are independent, start them all, then await together. The subtle middle form also works for two operations:\n\nconst userPromise = fetchUser(id);     // started\nconst prefsPromise = fetchPrefs(id);   // started, concurrent\nconst user = await userPromise;\nconst prefs = await prefsPromise;\n\nTwo follow-ups interviewers like: a `for` loop with `await` inside is the same sequential trap (and `forEach(async ...)` is worse — it doesn't wait at all; use `for...of` with await, or `Promise.all(items.map(...))` for concurrency); and `Promise.all` is fail-fast, so if partial failure must be survivable, reach for `Promise.allSettled`."
  },
  {
    id: "jsa-028",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "What are iterators and generators in JavaScript? What does `function*` / `yield` give you, and how does the iteration protocol connect to `for...of` and spread?",
    code: null,
    options: null,
    answer: null,
    solution: "The **iteration protocol** is a convention: an object is *iterable* if it has a `[Symbol.iterator]()` method returning an *iterator* — an object whose `next()` returns `{value, done}`. Everything that 'iterates' in modern JS — `for...of`, spread `[...x]`, destructuring, `Promise.all`, `new Map(pairs)` — just calls this protocol. Arrays, strings, Maps, Sets, and NodeLists are iterable out of the box; plain objects are not (hence `Object.entries(obj)` to get an iterable). You can make any object iterable by implementing the method yourself — but writing `next()` state machines by hand is tedious, and that's exactly what **generators** automate. A `function*` returns a generator object (both iterator *and* iterable); each `yield` pauses the function mid-execution, preserving all local state, until the consumer asks for the next value: \n\nfunction* idGenerator() { let n = 1; while (true) yield n++; }\n\nThis gives you: **lazy sequences** (values computed on demand — the infinite loop above is fine because nothing runs until requested), clean custom iteration for your data structures (a tree's `[Symbol.iterator]` as a recursive generator with `yield*` for delegation), and pause/resume control flow — `next(arg)` can even send values *into* the paused function, the mechanism that pre-async/await libraries used to emulate await. Their async cousins, `async function*` with `for await...of`, model streams and paginated APIs. Honest caveat: day-to-day app code reaches for generators rarely, but they're load-bearing in libraries (Redux-Saga, many polyfills/streams). Interview tip: 'yield pauses the function and `for...of` is just sugar over `next()`' plus the infinite-lazy-sequence example covers what's being probed."
  },
  {
    id: "jsa-029",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "You want to cache computed metadata for DOM elements without preventing those elements from being garbage-collected after they're removed from the page. Which structure is designed for this?",
    code: null,
    options: {
      a: "A plain object with element ids as keys",
      b: "A `Map` with the elements as keys",
      c: "A `WeakMap` with the elements as keys",
      d: "An array of `[element, data]` pairs"
    },
    answer: "c",
    solution: "Correct: c. A `WeakMap` holds its keys *weakly*: the map's reference doesn't count toward the key's reachability, so once an element is removed from the DOM and nothing else references it, the garbage collector can reclaim it — and the WeakMap entry vanishes with it, automatically. The cache can never be the reason memory grows.\n\nWhy the others are wrong:\n- b: a regular `Map` holds keys *strongly* — as long as the map lives, every element used as a key is pinned in memory even after removal from the page. This is a textbook memory-leak pattern (detached DOM nodes held by caches).\n- a: ids work only if every element has a unique id, and entries still must be cleaned up manually.\n- d: same strong-reference problem as Map, with O(n) lookup as a bonus.\n\nThe trade-offs that make WeakMap weird: keys must be objects (no primitives), and it is deliberately *not* iterable — no `.keys()`, no `.size` — because entries can disappear at any moment as GC runs; observable iteration would expose GC timing. Use cases: metadata/caches keyed by objects you don't own, truly private per-instance data, tracking 'have I processed this object?' (`WeakSet`). Related newer tools: `WeakRef` (a single weak pointer you must `deref()`) and `FinalizationRegistry` (cleanup callbacks after GC) — both with strong 'avoid if possible' warnings in the spec, since GC timing is unpredictable."
  },
  {
    id: "jsa-030",
    category: "javascript",
    difficulty: "advanced",
    type: "code",
    question: "Predict the exact output order of this snippet, then explain it in terms of the call stack, microtask queue, and macrotask queue.",
    code: "async function main() {\n  console.log(\"A\");\n  setTimeout(() => console.log(\"B\"), 0);\n  await Promise.resolve();\n  console.log(\"C\");\n  queueMicrotask(() => console.log(\"D\"));\n  Promise.resolve().then(() => console.log(\"E\"));\n}\n\nmain();\nconsole.log(\"F\");",
    options: null,
    answer: null,
    solution: "Output: **A, F, C, D, E, B**.\n\nStep by step:\n1. `main()` is called and runs synchronously until the first `await`: logs **A**, schedules the timeout callback (B) into the **macrotask** queue.\n2. `await Promise.resolve()` suspends `main` — everything after the await is, in effect, queued as a **microtask**. Control returns to the caller.\n3. The top-level script continues: logs **F**, then the call stack empties.\n4. Microtasks run before any macrotask: `main` resumes — logs **C**, queues D (queueMicrotask) and E (.then) as further microtasks.\n5. The microtask queue is drained *completely* before moving on: **D**, then **E** (FIFO order among microtasks).\n6. Only now does the event loop take the next macrotask: **B**.\n\nThe three rules this exercises:\n- An async function runs synchronously up to its first `await` — A prints before F, but C waits.\n- `await` yields control even on an already-resolved promise; resumption is a microtask, never immediate.\n- Between macrotasks the engine drains the *entire* microtask queue — so promise callbacks (and anything they queue) always beat `setTimeout(..., 0)`. This is also why an accidental infinite microtask chain freezes a page harder than an interval ever could: macrotasks and rendering never get a turn."
  },
  {
    id: "jsa-031",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "How does garbage collection work in JavaScript? Explain reachability and mark-and-sweep, and why 'memory leaks' are still possible in a garbage-collected language.",
    code: null,
    options: null,
    answer: null,
    solution: "JavaScript memory is managed automatically: you allocate by creating values, and the engine reclaims memory for values that can no longer be reached. The core concept is **reachability**: starting from the *roots* — the global object, the currently executing call stack, active closures — the collector follows every reference; anything reachable survives, everything else is garbage. **Mark-and-sweep** is the standard algorithm: mark every object reachable from the roots, then sweep (free) the unmarked remainder. Modern engines like V8 layer optimizations on top — generational collection (most objects die young, so a small 'nursery' is collected frequently and cheaply, survivors get promoted), incremental and concurrent marking to avoid long pauses — but reachability is still the contract. Crucially, reachability is *not* the same as 'will ever be used again'. The collector cannot know your intent, so a leak in a GC'd language means: **you are still holding a reference to something you'll never use**. The classic offenders: an ever-growing cache or array that's never pruned; listeners registered on long-lived objects capturing big closures; detached DOM subtrees still referenced from a variable or Map; forgotten `setInterval` callbacks (the interval pins its closure forever); and module-level collections that only ever grow. Fixes follow the diagnosis: remove listeners (`AbortController` makes bulk cleanup easy), clear intervals, bound your caches (LRU), and use `WeakMap`/`WeakSet` so caches don't pin their keys. Tooling: DevTools' Memory panel — take heap snapshots, perform the suspect action, compare snapshots, and look for growing retainer chains and 'Detached' nodes. Interview tip: define a leak as 'unintentionally retained reachability' — that exact framing answers the 'how can GC leak?' follow-up before it's asked."
  },
  {
    id: "jsa-032",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "What does a `Proxy` let you do in JavaScript?",
    code: null,
    options: {
      a: "Route fetch requests through an intermediary server",
      b: "Wrap an object with traps that intercept fundamental operations — property reads, writes, `in`, `delete` — running your logic instead of (or before) the default behavior",
      c: "Create a frozen, read-only snapshot of an object",
      d: "Compile JavaScript to a faster intermediate representation"
    },
    answer: "b",
    solution: "Correct: b. `new Proxy(target, handler)` produces an object that behaves like `target` except where the handler defines *traps*: `get`, `set`, `has` (the `in` operator), `deleteProperty`, `apply` (function calls), `construct` (new), `ownKeys`, and more. Each trap intercepts a language-level operation:\n\nconst tracked = new Proxy(state, {\n  set(obj, key, value) {\n    obj[key] = value;\n    rerender();          // react to ANY property write\n    return true;\n  }\n});\n\nReal-world uses: **reactivity systems** — Vue 3's entire reactivity is Proxy-based (it can observe property *additions* and deletions, which the older getter/setter approach couldn't); **validation** — reject writes of the wrong type at the boundary; **logging/instrumentation** — record which properties code actually touches; **virtual objects** — negative array indices, auto-vivifying nested paths, API clients where `api.users.get(1)` builds a URL from the property chain. The companion `Reflect` object provides the default behaviors (`Reflect.get(obj, key)`) so traps can delegate cleanly.\n\nWhy the others are wrong: a — network proxies share only the name; c — that's `Object.freeze`; d — engines do that internally regardless.\n\nCaveats worth voicing: proxied property access is slower than direct access (don't proxy hot paths), and identity differs — `proxy !== target`, which can break Maps keyed by the original object."
  },
  {
    id: "jsa-033",
    category: "javascript",
    difficulty: "advanced",
    type: "code",
    question: "Fill in the three blanks to complete this throttle implementation: the wrapped function runs at most once every `delay` ms, executing immediately on the first call and ignoring calls during the cooldown.",
    code: "function throttle(fn, delay) {\n  let lastRun = 0;\n  return function (...args) {\n    const now = Date.now();\n    if (now - lastRun >= ____) {\n      ____ = now;\n      fn.____(this, args);\n    }\n  };\n}\n\nwindow.addEventListener(\"scroll\", throttle(updateProgressBar, 100));",
    options: null,
    answer: null,
    solution: "The blanks are `delay`, `lastRun`, and `apply`:\n\nfunction throttle(fn, delay) {\n  let lastRun = 0;\n  return function (...args) {\n    const now = Date.now();\n    if (now - lastRun >= delay) {\n      lastRun = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\nHow it works:\n- `lastRun` lives in the **closure** — shared, persistent state across every call of the returned function. Starting it at 0 makes the first call pass the check immediately.\n- The guard `now - lastRun >= delay` implements the cooldown: calls arriving inside the window are simply dropped.\n- `fn.apply(this, args)` forwards both the `this` the wrapper was called with and all arguments — which is why the wrapper is a regular `function`, not an arrow (an arrow would freeze `this` to the definition site, breaking `el.onscroll = throttle(handler)` style usage where `this` should be the element).\n\nThrottle vs debounce, one line each: throttle = 'at a steady rate while it keeps happening' (scroll progress, mousemove, game input); debounce = 'once, after it stops' (search-as-you-type, resize end, autosave).\n\nKnown limitation of this minimal version: a final call landing inside the cooldown is lost — the scroll position may end slightly stale. Production implementations (e.g. lodash's) add a trailing invocation via a `setTimeout` so the last event always lands; mentioning that trade-off unprompted is exactly the kind of edge-case awareness interviews reward."
  },
  {
    id: "jsa-034",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "What is `AbortController`? How do you cancel a fetch with it, implement a timeout, and what else can it clean up?",
    code: null,
    options: null,
    answer: null,
    solution: "`AbortController` is the standard cancellation primitive: `const controller = new AbortController()` gives you a `controller.signal` to hand to cancellable APIs and a `controller.abort(reason)` to pull the plug. With fetch: pass `{ signal }` in the options; calling `abort()` rejects the fetch promise with a `DOMException` named `AbortError`, and the browser actually tears down the network request. The canonical use case is search-as-you-type: each new keystroke aborts the previous in-flight request, killing the race condition where a slow old response overwrites a fresh one. Timeouts: either the built-in `AbortSignal.timeout(5000)` passed straight as the signal, or manually `setTimeout(() => controller.abort(), 5000)`. In your catch block, distinguish cancellation from real failure: `if (err.name === \"AbortError\") return;` — an aborted request is usually not an error worth showing the user. Two power features round it out. First, `addEventListener` accepts a signal too: register a dozen listeners with one shared signal and `abort()` removes them all — the cleanest teardown pattern for components and a tidy fix for listener-based memory leaks (React effects and similar lifecycles pair beautifully with it). Second, `AbortSignal.any([sig1, sig2])` combines signals — e.g. 'user navigated away OR timeout hit'. Writing your own cancellable async function means accepting a `signal` option, checking `signal.aborted` at checkpoints, and forwarding it to inner fetches. Interview tip: the search-box race condition is the story to tell — cancellation isn't about saving bandwidth, it's about *correctness*."
  },
  {
    id: "jsa-035",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "In this class, why does the `handleClick` class-field arrow function 'just work' as an event listener, while the regular method `handleHover` loses `this`?\n\n```\nclass Menu {\n  open = false;\n  handleClick = () => { this.open = !this.open; };\n  handleHover() { this.open = true; }\n}\nbutton.addEventListener(\"click\", menu.handleClick);   // works\nbutton.addEventListener(\"mouseover\", menu.handleHover); // breaks\n```",
    code: null,
    options: {
      a: "Arrow functions run in a special scope where `this` is always the class",
      b: "Class fields are evaluated per instance, and the arrow captures `this` lexically at construction — permanently the instance; the regular method's `this` is decided at *call time*, and the event system calls it detached, so `this` is the button (or undefined in strict class code)",
      c: "Regular methods cannot be used as event listeners at all",
      d: "`addEventListener` clones functions, which strips `this` from regular methods only"
    },
    answer: "b",
    solution: "Correct: b. Two rules combine. (1) A class field initializer runs once *per instance, during construction*, so `handleClick = () => ...` creates a fresh arrow function for each instance. (2) Arrow functions don't have their own `this` — they capture it *lexically* from where they're defined, which during field initialization is the instance itself. The result is a function permanently bound to the instance, immune to how it's later called. The regular method, by contrast, follows the normal rule: `this` is whatever's left of the dot *at call time*. `addEventListener` stores a bare reference and invokes it with `this` set to the element — so inside `handleHover`, `this` is the button, and `this.open = true` writes a stray property onto a DOM node.\n\nWhy the others are wrong: a — there's no special scope, just lexical capture; c — they work fine if bound: `menu.handleHover.bind(menu)`; d — nothing is cloned.\n\nThe trade-offs worth knowing: the pre-class-fields fix was `this.handleClick = this.handleClick.bind(this)` in the constructor (same effect); per-instance arrows cost one function object per instance instead of one shared prototype method (negligible for most apps); and a subtle testing note — per-instance functions aren't on the prototype, so they can't be spied/overridden there. This exact pattern is everywhere in pre-hooks React, which is why interviewers keep asking it."
  },
  {
    id: "jsa-036",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "Predict the output of the three `console.log` calls and explain what getters and setters are doing here.",
    code: "const account = {\n  _balance: 100,\n  get balance() {\n    return this._balance + \" EUR\";\n  },\n  set balance(value) {\n    if (value < 0) throw new Error(\"negative\");\n    this._balance = value;\n  },\n};\n\nconsole.log(account.balance);\naccount.balance = 250;\nconsole.log(account.balance);\nconsole.log(typeof account.balance);",
    options: null,
    answer: null,
    solution: "Output:\n\n\"100 EUR\"\n\"250 EUR\"\n\"string\"\n\nWhat's happening: `get balance()` and `set balance(v)` define an **accessor property** — code that runs on plain property syntax. `account.balance` (no parentheses!) invokes the getter; `account.balance = 250` invokes the setter with 250. The third log: `typeof account.balance` runs the getter first, and the getter returns a string, so \"string\".\n\nWhy this pattern exists:\n- **Computed properties** that stay in sync automatically: `get fullName() { return this.first + \" \" + this.last; }` can never go stale, unlike a stored copy.\n- **Validation at the boundary**: the setter rejects bad writes (`account.balance = -5` throws) while callers keep using natural assignment syntax.\n- **Evolving an API without breaking callers**: a plain data property can later become an accessor — same syntax for consumers.\n\nThe fine print: `_balance` is only a *convention* for 'private' — nothing stops `account._balance = -999` from bypassing the setter; real privacy needs `#balance` class fields or closures. A getter with side effects or heavy computation is a trap (it looks like a cheap read); keep getters pure and fast. The same mechanism powers `class` accessors and is how many frameworks implemented reactivity before Proxies. And note the classic infinite-recursion bug: naming the backing field the same as the accessor (`set balance(v) { this.balance = v }`) calls the setter from inside itself."
  },
  {
    id: "jsa-037",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "What are Symbols in JavaScript? Why do they exist, and what are well-known symbols like `Symbol.iterator` for?",
    code: null,
    options: null,
    answer: null,
    solution: "A Symbol is a primitive whose every value is **guaranteed unique**: `Symbol(\"id\") === Symbol(\"id\")` is false — the string is just a debugging label. Their core purpose: **collision-proof property keys**. Object keys are otherwise strings, so two libraries attaching metadata to the same object can clobber each other; a symbol key (`obj[MY_META] = ...`) can never collide with anyone else's key, because nobody else can recreate your symbol. Symbol-keyed properties are also semi-hidden: invisible to `for...in`, `Object.keys`, and `JSON.stringify` (discoverable via `Object.getOwnPropertySymbols` — so hidden from accident, not from inspection). The second purpose is the **well-known symbols**: language hooks exposed as predefined symbols so the engine can ask *your* object how to behave. `Symbol.iterator` is the famous one — implement it and your object works with `for...of`, spread, and destructuring; it's the entire iteration protocol's entry point. Others: `Symbol.asyncIterator` (`for await...of`), `Symbol.hasInstance` (customize `instanceof`), `Symbol.toPrimitive` (control coercion), `Symbol.toStringTag` (what `Object.prototype.toString` reports). This design let the language add new protocols without ever colliding with existing string property names in old code. Footnotes: `Symbol.for(\"key\")` uses a global registry — *those* are shared and equal across your whole runtime; symbols used as enum-like constants beat strings because typos throw instead of silently matching; and `typeof sym === \"symbol\"` — it's the sixth primitive. Interview tip: 'unique keys that can't collide, plus the hooks the language itself uses — `Symbol.iterator` being the one you've already used without noticing' is the complete elevator answer."
  },
  {
    id: "jsa-038",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "What is a tagged template literal, e.g. `` html`<b>${user}</b>` ``?",
    code: null,
    options: {
      a: "A template literal with a CSS class attached for syntax highlighting",
      b: "A function call where `html` receives the literal's string parts and the interpolated values *separately*, letting it process them — e.g. escape the values — before assembling the result",
      c: "A faster compilation mode for template strings",
      d: "Syntax sugar for `html(\"<b>\" + user + \"</b>\")`"
    },
    answer: "b",
    solution: "Correct: b. Placing a function name before a template literal turns it into a call with a special shape: the first argument is an array of the static string chunks (`[\"<b>\", \"</b>\"]`), and the remaining arguments are the evaluated `${}` values. Because the tag function sees strings and values *separately, before* they're joined, it can transform either — which option d's naive concatenation can't.\n\nThe killer use case is **auto-escaping**: an `html` tag that escapes every interpolated value but trusts the literal parts gives you XSS-safe templating with natural syntax — the static markup you wrote is trusted, the dynamic data is not, and the tag can tell them apart. Real-world sightings: `styled.button`...`` in styled-components (CSS-in-JS), the `html` tag in lit (web components), `sql` tags that turn interpolations into bound query parameters (SQL-injection-safe by construction), `gql` in GraphQL clients, and i18n tags that look up translations.\n\nWhy the others are wrong: a/c are invented; d loses exactly the information (which parts are literal, which are data) that makes tags useful.\n\nTwo details for bonus points: the strings array has a `.raw` property with backslash escapes unprocessed (`String.raw`\\`C:\\new\\file`\\` is the built-in tag using it — handy for regexes and Windows paths), and a tag can return *anything*, not just a string — lit returns structured template objects it can diff efficiently."
  },
  {
    id: "jsa-039",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "Fill in the three blanks to complete this memoize helper, which caches results so repeated calls with the same argument skip the expensive computation.",
    code: "function memoize(fn) {\n  const cache = new ____();\n  return function (arg) {\n    if (cache.____(arg)) {\n      return cache.get(arg);\n    }\n    const result = fn(arg);\n    cache.____(arg, result);\n    return result;\n  };\n}\n\nconst slowSquare = (n) => { /* pretend this is expensive */ return n * n; };\nconst fastSquare = memoize(slowSquare);\nfastSquare(9); // computes\nfastSquare(9); // instant, from cache",
    options: null,
    answer: null,
    solution: "The blanks are `Map`, `has`, and `set`:\n\nfunction memoize(fn) {\n  const cache = new Map();\n  return function (arg) {\n    if (cache.has(arg)) return cache.get(arg);\n    const result = fn(arg);\n    cache.set(arg, result);\n    return result;\n  };\n}\n\nWhy each choice:\n- The `cache` lives in a **closure** — private, persistent state attached to the returned function. This is the canonical 'practical closure' example, worth narrating explicitly in an interview.\n- A `Map` beats a plain object here: keys of any type (objects, numbers — object keys would stringify to \"[object Object]\" and collide), no prototype-key accidents, and `has` distinguishes 'cached `undefined` result' from 'not cached'.\n- `has` before `get` is the correctness detail: a falsy cached value (0, \"\", false) must still be a cache *hit* — testing `if (cache.get(arg))` would recompute falsy results forever.\n\nThe assumptions and their limits — memoization is only valid for **pure** functions (same input → same output, no side effects); this version handles a single argument (multi-arg versions need a composite key, e.g. `JSON.stringify(args)`, with its own pitfalls); and the cache grows forever — production memoizers bound it (LRU eviction) or use `WeakMap` when keys are objects so the cache can't pin them in memory. When asked 'where would you use this?': expensive derived data, recursive algorithms like Fibonacci/DP, and per-key request deduplication."
  },
  {
    id: "jsa-040",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "What are Web Workers? What problem do they solve, what are their limitations, and how do they communicate with the page?",
    code: null,
    options: null,
    answer: null,
    solution: "JavaScript on a page runs on a single main thread shared with layout, paint, and input handling — so any long computation freezes the UI: no clicks, no scrolling, eventually the 'page unresponsive' dialog. A **Web Worker** is a separate thread for JavaScript: `new Worker(\"worker.js\")` runs that script in parallel, keeping the main thread free. Communication is **message passing**: each side calls `postMessage(data)` and listens via `onmessage`; data is copied with the structured-clone algorithm (objects, arrays, dates, maps — but not functions or DOM nodes). For big payloads there are **transferables** — an `ArrayBuffer` can be *moved* (zero-copy) by listing it in postMessage's second argument, after which the sender loses access. The defining limitation: workers have **no DOM access** — no `document`, no `window` (they get `self`) — because the DOM isn't thread-safe; they do get `fetch`, timers, IndexedDB, `OffscreenCanvas`, and can spawn sub-workers. So the architecture is always: main thread owns the UI, worker does the number crunching, messages carry inputs and results. Good candidates: parsing/processing large files (CSV, images), heavy math (compression, crypto, ML inference), search indexing, anything taking >50ms that would jank a frame. Not worth it for: quick tasks (message-passing and startup overhead), and remember async/await alone does *not* create parallelism — awaiting doesn't move CPU work off the thread, a point interviewers specifically probe. Siblings worth naming: `SharedWorker` (one instance shared by multiple tabs) and **Service Workers** — a different beast entirely (network proxy for offline/caching/push), despite the similar name. Interview tip: 'message passing, no shared memory, no DOM' is the three-fact core; the CSV-parsing example shows you know *when* to bother."
  },
  {
    id: "jsa-041",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "For a smooth 60fps animation driven by JavaScript, why is `requestAnimationFrame(step)` preferred over `setTimeout(step, 16)`?",
    code: null,
    options: {
      a: "requestAnimationFrame runs on a separate thread from JavaScript",
      b: "It synchronizes your callback with the browser's actual render cycle — running right before paint, at the display's true refresh rate, pausing in background tabs — while setTimeout drifts, ignores frame timing, and fires pointlessly when nothing is visible",
      c: "setTimeout cannot fire more than 10 times per second",
      d: "requestAnimationFrame automatically interpolates positions between frames"
    },
    answer: "b",
    solution: "Correct: b. `setTimeout(step, 16)` *approximates* frame timing but guarantees nothing: timers fire 'no earlier than' the delay, get pushed around by other tasks, and drift out of phase with the display — your update can land just *after* a frame was painted, making the change wait a full extra frame (perceived stutter), or fire twice between paints (wasted work). `requestAnimationFrame` hands your callback to the browser's render loop itself: it runs once per display frame, right before style/layout/paint, automatically matching 60Hz, 120Hz, or whatever the screen actually is. The DOMHighResTimeStamp argument it passes lets you compute time-based motion (`position = speed * elapsed`) so animation speed is refresh-rate-independent — the right pattern regardless. In background tabs rAF stops entirely, saving battery, where setTimeout keeps spinning (throttled, but still). Each invocation schedules only one frame, so animations are written as a self-rescheduling loop: `function step(t) { ...; requestAnimationFrame(step); }`.\n\nWhy the others are wrong: a — rAF callbacks run on the main thread like all your JS; c — setTimeout can fire much faster; d — no interpolation happens, you compute positions yourself.\n\nFollow-up worth volunteering: prefer CSS transitions/animations or the Web Animations API when possible (compositor-driven, survives main-thread jank); rAF is for animations that genuinely need per-frame JavaScript logic — canvas drawing, physics, scroll-linked effects."
  },
  {
    id: "jsa-042",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "Predict the final output, and explain what each `return` (or missing return) inside the `.then` handlers does to the chain.",
    code: "Promise.resolve(2)\n  .then((n) => {\n    return n * 10;\n  })\n  .then((n) => {\n    console.log(\"step 1:\", n);\n  })\n  .then((n) => {\n    console.log(\"step 2:\", n);\n    return Promise.resolve(99);\n  })\n  .then((n) => {\n    console.log(\"step 3:\", n);\n  });",
    options: null,
    answer: null,
    solution: "Output:\n\nstep 1: 20\nstep 2: undefined\nstep 3: 99\n\nThe three chain rules at work:\n1. **Each `.then` creates a new promise resolved with its handler's return value.** The first handler returns `n * 10` = 20, so step 1 receives 20.\n2. **A handler with no `return` returns `undefined`** — the step-1 handler only logs, so step 2 receives `undefined`. This is the most common chain bug in real code: someone forgets to `return fetchNext()` inside a `.then`, and the next step runs with undefined *and without waiting for that inner operation* — a subtle race that 'usually works' until it doesn't.\n3. **Returning a promise makes the chain wait and adopt its value** — step 2's handler returns `Promise.resolve(99)`, so the chain unwraps it and step 3 receives the plain `99`, not a promise. (This auto-flattening is why you never end up with `Promise<Promise<number>>`.)\n\nBonus rules to complete the model: a handler that *throws* rejects the chain (caught by the next `.catch`); `.catch` returning a value *recovers* the chain back to fulfilled; and the async/await translation makes rule 2's bug harder to write — `const a = await step()` forces you to be explicit about what flows forward, which is a real argument for preferring async/await in reviews."
  },
  {
    id: "jsa-043",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "How do you design good error handling in a JavaScript codebase? Cover custom error classes, the `cause` option, rethrowing, and the difference between expected and unexpected failures.",
    code: null,
    options: null,
    answer: null,
    solution: "Principles first: errors are part of a function's *interface*. The split that organizes everything is **expected failures** (the network was down, validation failed, the record doesn't exist — normal life, handle or surface them gracefully) versus **unexpected failures** (programmer bugs: undefined is not a function — let them crash loudly so they get fixed, don't blanket-catch them into silence). Tools for the expected kind: **custom error classes** — `class ValidationError extends Error { constructor(msg, field) { super(msg); this.name = \"ValidationError\"; this.field = field; } }` — give catch blocks something to branch on (`if (err instanceof ValidationError)`) and a place for structured context, far better than parsing message strings. The **cause** option chains errors without losing the original: `throw new Error(\"Failed to load profile\", { cause: err })` — the high-level message says what the *operation* meant, the cause preserves the low-level stack for debugging; loggers print the whole chain. **Rethrowing** discipline: catch only where you can act. If a layer can't handle an error, it shouldn't catch it (or should catch, wrap with context via cause, and rethrow). The cardinal sins: swallowing (`catch (e) {}` — failures vanish), catch-and-log-and-continue when the operation actually failed, and catching too broadly so bugs masquerade as handled conditions. Async specifics: unhandled promise rejections crash Node and fire `unhandledrejection` in browsers — every promise chain needs an owner; `try/catch` around `await` works naturally, and `Promise.allSettled` handles partial failure. At the edges, install last-resort handlers (`window.onerror`/error boundaries/process handlers) that report to monitoring — for *telemetry*, not for pretending recovery. Interview tip: 'catch where you can act, wrap with cause for context, branch on error class not message text' is a three-clause answer that sounds like someone who has operated software."
  },
  {
    id: "jsa-044",
    category: "javascript",
    difficulty: "medium",
    type: "mcq",
    question: "Which of these is an actual effect of `\"use strict\"` (strict mode)?",
    code: null,
    options: {
      a: "Assigning to an undeclared variable throws a ReferenceError instead of silently creating a global",
      b: "All variables become block-scoped, including `var`",
      c: "Type coercion is disabled, so `\"5\" == 5` becomes false",
      d: "Code runs measurably faster because the engine skips safety checks"
    },
    answer: "a",
    solution: "Correct: a. Killing accidental globals is strict mode's headline fix: `function f() { contuer = 0 }` (a typo'd assignment) silently creates a global in sloppy mode but throws in strict mode — turning a heisenbug into an immediate, located error. Other real effects: `this` in a plain function call is `undefined` instead of the global object (so `this.name = ...` in a mis-called function throws instead of polluting globals); assignments that silently failed now throw (writing to read-only or frozen properties, to `NaN`, to a string index); deleting variables or other undeletables throws; duplicate function parameter names become syntax errors; `with` is banned; and octal literals like `0644` are syntax errors.\n\nWhy the others are wrong:\n- b: `var` stays function-scoped — block scoping came from `let`/`const`, an ES6 feature independent of strict mode.\n- c: `==` coercion is unchanged; preferring `===` is a style/lint matter.\n- d: performance is not the point and differences are negligible; it's about catching errors.\n\nThe fact that matters most in 2026: **ES modules and class bodies are strict automatically** — no directive needed — so any modern codebase is already strict. The directive itself is mainly seen in legacy scripts and at the top of functions in old libraries. Saying 'modules are strict by default' is the freshness signal this question fishes for."
  },
  {
    id: "jsa-045",
    category: "javascript",
    difficulty: "advanced",
    type: "code",
    question: "Fill in the three blanks to complete this minimal event emitter (pub/sub), so that `on` registers, `off` removes, and `emit` calls every listener for an event with the given payload.",
    code: "class Emitter {\n  constructor() {\n    this.listeners = {};\n  }\n  on(event, fn) {\n    (this.listeners[event] ??= []).____(fn);\n  }\n  off(event, fn) {\n    this.listeners[event] = (this.listeners[event] ?? []).____((l) => l !== fn);\n  }\n  emit(event, payload) {\n    (this.listeners[event] ?? []).forEach((fn) => fn(____));\n  }\n}\n\nconst bus = new Emitter();\nconst onSave = (doc) => console.log(\"saved\", doc.id);\nbus.on(\"save\", onSave);\nbus.emit(\"save\", { id: 7 }); // logs: saved 7\nbus.off(\"save\", onSave);",
    options: null,
    answer: null,
    solution: "The blanks are `push`, `filter`, and `payload`:\n\non(event, fn) {\n  (this.listeners[event] ??= []).push(fn);\n}\noff(event, fn) {\n  this.listeners[event] = (this.listeners[event] ?? []).filter((l) => l !== fn);\n}\nemit(event, payload) {\n  (this.listeners[event] ?? []).forEach((fn) => fn(payload));\n}\n\nWhat the pattern is and why it matters: pub/sub decouples the code that *announces* something (`emit(\"save\", doc)`) from the code that *reacts* — the emitter knows nobody, listeners know only the event name. The DOM's `addEventListener` and Node's `EventEmitter` are this exact shape; this question checks you could build the thing you use daily.\n\nDetails worth narrating:\n- `??=` lazily creates each event's array on first subscription.\n- `off` compares **by reference** — which is why the example stores `onSave` in a variable. Subscribing with an inline arrow (`bus.on(\"save\", (d) => ...)`)' makes unsubscribing impossible: a new arrow is a different function. Classic real-world leak.\n- `filter` (copy) rather than `splice` (mutate) sidesteps the 'listener unsubscribes during emit' iteration hazard.\n\nProduction extensions an interviewer may probe: `once(event, fn)` (self-removing wrapper), returning an unsubscribe function from `on` (the modern idiom — `const off = bus.on(...)`), error isolation so one throwing listener doesn't stop the rest, and unsubscribed-listener leaks as the memory-leak connection."
  },
  {
    id: "jsa-046",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "What does dynamic `import()` do, and how does it enable code splitting and lazy loading? Mention what tree shaking is while you're at it.",
    code: null,
    options: null,
    answer: null,
    solution: "Static imports (`import x from \"./mod.js\"`) are declarations: hoisted, resolved before the module runs, analyzable without executing anything. Dynamic `import(\"./mod.js\")` is an *expression* — callable anywhere, anytime — that returns a **promise** for the module's namespace object: `const { renderChart } = await import(\"./charts.js\")`. That one capability unlocks **lazy loading**: don't pay for code until it's needed. Bundlers (Vite/Rollup, webpack) treat every dynamic import as a **code-split point** — the imported module and its dependency subtree become a separate chunk, fetched over the network only when the import actually executes. The classic wins: route-based splitting in SPAs (each page's code loads on navigation — this is what React's `lazy()` wraps), heavy optional features (load the 300KB chart library when the user opens the analytics tab, the PDF generator when they click Export), conditional polyfills, and A/B variants. The result is a smaller initial bundle → faster first load, which is usually the single most effective bundle-size lever. Mechanics worth knowing: the module still loads only once (subsequent imports hit the module cache); failures are promise rejections you should handle (user on a flaky connection clicking Export); and you can prefetch likely-needed chunks on hover/idle to hide latency. **Tree shaking** is the complementary, static-side optimization: because static imports/exports are analyzable, the bundler proves which exports are never used and drops them from the output — import one function from a utility library, ship one function. It works best with side-effect-free ES modules (`\"sideEffects\": false` in package.json) and is defeated by dynamic patterns the analyzer can't follow. Interview tip: 'static imports get tree-shaken, dynamic imports get code-split' — one sentence, both concepts, clearly distinguished."
  },
  {
    id: "jsa-047",
    category: "javascript",
    difficulty: "advanced",
    type: "mcq",
    question: "What is top-level `await`?",
    code: null,
    options: {
      a: "A way to use `await` in any `<script>` tag, including classic scripts",
      b: "The ability to use `await` directly at the top level of an **ES module**, outside any async function — the module's evaluation pauses, and modules importing it wait until it finishes",
      c: "A syntax error in all current JavaScript environments",
      d: "An await that automatically times out after one second"
    },
    answer: "b",
    solution: "Correct: b. In ES modules (`<script type=\"module\">`, `.mjs` / module-mode files in Node), `await` works at the top level with no wrapper function:\n\nconst config = await fetch(\"/config.json\").then(r => r.json());\nexport default config;\n\nUnder the hood the module evaluates like an async function, and the module graph respects it: any module importing this one **waits for its top-level awaits to settle** before running its own body — dependency order stays correct automatically. Good uses: one-time async initialization (loading config, opening a database handle, dynamically choosing a dependency via `await import(condition ? \"./a.js\" : \"./b.js\")`, top-of-app feature detection with fallback). The cautions: it's module-level *blocking* — every transitive importer stalls until you finish, so a slow top-level await in a deep dependency delays the whole app's startup; keep it for genuinely-required-before-anything initialization, not arbitrary fetches. Deadlock is possible with circular imports that await each other. And error behavior: a top-level rejection fails the *module itself*, taking every importer down with it — startup code should catch and provide fallbacks.\n\nWhy the others are wrong: a — classic (non-module) scripts still can't use it; the module evaluation semantics are what make it possible; c — it's been standard since ES2022, supported in all modern browsers and Node; d — no implicit timeout exists anywhere in await."
  },
  {
    id: "jsa-048",
    category: "javascript",
    difficulty: "medium",
    type: "code",
    question: "Predict the output of the four `console.log` calls, and explain what `#count` and `static` are doing.",
    code: "class Counter {\n  static created = 0;\n  #count = 0;\n\n  constructor() {\n    Counter.created++;\n  }\n  increment() {\n    this.#count++;\n    return this.#count;\n  }\n}\n\nconst a = new Counter();\nconst b = new Counter();\n\nconsole.log(a.increment());\nconsole.log(a.increment());\nconsole.log(b.increment());\nconsole.log(Counter.created);\n// console.log(a.#count);  ← what would this line do?",
    options: null,
    answer: null,
    solution: "Output:\n\n1\n2\n1\n2\n\nAnd the commented line would be a **SyntaxError** — not undefined, not a runtime error: `#count` is simply not legal syntax outside the class body.\n\nWhat each feature does:\n- `#count` is a **private instance field**. True, engine-enforced privacy — unlike the `_count` underscore *convention*, which anyone can read and write. Each instance gets its own: `a` counts to 2 while `b` independently starts at 1. It's invisible to `Object.keys`, `JSON.stringify`, and bracket access (`a[\"#count\"]` is just a weird normal property, not the private field).\n- `static created` is a **class-level property**: it lives on `Counter` itself, not on instances — one shared value. The constructor increments it per instantiation, so after two `new` calls it's 2. Instances don't see it (`a.created` is undefined); you read it as `Counter.created`. Static is the home for instance-independent things: counters, caches, factory methods (`Counter.fromJSON(...)`), constants.\n- Inside class methods you *can* check private-field presence with the `in` operator: `#count in obj` — the idiomatic brand check for 'is this really one of ours?'.\n\nInterview framing: '#fields are real privacy enforced by the engine — accessing from outside is a syntax error — while static members belong to the class, one copy total.' Knowing that the failure mode is a SyntaxError (caught at parse time, not runtime) is the detail that separates 'read about it' from 'used it'."
  },
  {
    id: "jsa-049",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "How do you work with immutable data in JavaScript? Cover `Object.freeze` and its limits, immutable update patterns, and why frameworks care so much about immutability.",
    code: null,
    options: null,
    answer: null,
    solution: "JavaScript objects are mutable by default, and `const` doesn't change that — it locks the binding, not the contents. **`Object.freeze(obj)`** locks the object itself: existing properties can't be changed or deleted, new ones can't be added (silently ignored in sloppy mode, TypeError in strict mode — a nasty inconsistency worth knowing). Its limit: freezing is **shallow** — `frozen.nested.x = 1` still works because only the outer object froze; deep-freezing requires recursing (`Object.freeze` every nested object). `Object.isFrozen` checks. Honest usage note: freeze is great for true constants (config objects, lookup tables, exported defaults a library doesn't want mutated) and for catching accidental mutation in development; most codebases don't freeze everything — they rely on *discipline plus patterns*. The **immutable update patterns** are the practical core: instead of mutating, build a new value sharing the unchanged parts — objects: `{ ...state, count: state.count + 1 }`; nested: spread each level you touch (`{ ...state, user: { ...state.user, name } }`); arrays: `map` to replace an item, `filter` to remove, `[...arr, item]` to append, and the modern non-mutating quartet `toSorted`/`toReversed`/`toSpliced`/`with`. **Why frameworks care**: change detection by reference. Comparing `oldState === newState` is O(1); deep-comparing is O(n) and error-prone. React re-renders when references change — mutate state in place and the reference is identical, so nothing updates (the single most common React bug); Redux requires reducers to be pure for the same reason, which also enables time-travel debugging and trivial undo (keep old references — they're guaranteed still valid). Immutability also kills aliasing bugs: nobody can change your data behind your back. Costs: more allocations and the verbosity of nested spreads — libraries like Immer give mutable-*looking* syntax that produces immutable updates underneath. Interview tip: 'freeze is shallow, const is about the binding, and frameworks want new references because === is the cheapest possible change detector' hits all three probes."
  },
  {
    id: "jsa-050",
    category: "javascript",
    difficulty: "advanced",
    type: "open",
    question: "What are async iterators and `for await...of`? Where do they show up in real code?",
    code: null,
    options: null,
    answer: null,
    solution: "Async iterators are the asynchronous twin of the iteration protocol: instead of `next()` returning `{value, done}`, it returns a **promise** of `{value, done}` — the protocol lives behind `Symbol.asyncIterator`. `for await...of` is the consumer syntax: it awaits each element before running the loop body, turning 'a sequence that arrives over time' into an ordinary-looking loop. You produce them most easily with **async generators**:\n\nasync function* fetchAllPages(url) {\n  while (url) {\n    const res = await fetch(url);\n    const page = await res.json();\n    yield* page.items;\n    url = page.nextUrl;\n  }\n}\n\nfor await (const item of fetchAllPages(\"/api/items\")) {\n  render(item); // items appear as pages arrive\n}\n\nThis is the cleanest known shape for **paginated APIs** — the pagination logic is encapsulated, the consumer just loops, and nothing fetches page 2 until page 1 is consumed (lazy + backpressure for free). Other real homes: **streams** — in Node, readable streams are async-iterable (`for await (const chunk of fs.createReadStream(path))` processes a multi-gigabyte file in constant memory; the web Streams API is iterable in modern runtimes too), line readers (`readline` interfaces), database cursors yielding rows, message/event queues, and watching for filesystem or WebSocket events. Details that show depth: `for await...of` handles errors with ordinary try/catch around the loop; breaking out of the loop calls the iterator's `return()` so the producer can clean up (close the connection, abort the fetch); and the iteration is inherently *sequential* — if you want concurrency across items, this is the wrong tool (back to `Promise.all` over batches). Interview tip: the paginated-API generator is the demo to write — it's short, real, and showcases generators, await, and the protocol in eight lines."
  }
];
