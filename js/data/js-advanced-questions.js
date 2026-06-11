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
  }
];
