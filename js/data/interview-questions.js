window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["interview"] = [
  {
    id: "int-001",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "In object-oriented programming, what is the relationship between a class and an object?",
    code: null,
    options: {
      a: "They are interchangeable terms for the same concept.",
      b: "A class is a blueprint or template; an object is a concrete instance of that class created at runtime.",
      c: "An object is the blueprint, and a class is one particular instance of that object.",
      d: "A class exists only at runtime, while objects exist only in source code."
    },
    answer: "b",
    solution: "Correct: b. A class defines the structure and behavior (fields and methods); an object is a concrete instance built from that blueprint at runtime, with its own state. One class can produce many objects: `class Dog` is the template, `let rex = new Dog()` is an object. Why the others are wrong: (a) they are related but not interchangeable — one is a definition, the other a live instance. (c) reverses the relationship. (d) is backwards: the class lives in source code; objects come into existence at runtime."
  },
  {
    id: "int-002",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What are the four pillars of object-oriented programming? Give me a concrete example of each.",
    code: null,
    options: null,
    answer: null,
    solution: "The four pillars are encapsulation, abstraction, inheritance, and polymorphism. Encapsulation means bundling data with the methods that operate on it and hiding internal state: a `BankAccount` keeps its balance private and only exposes `deposit()` and `withdraw()`, so the balance can never be set to an invalid value from outside. Abstraction means exposing a simple interface and hiding the complexity behind it: when I call `list.sort()` I do not need to know which sorting algorithm runs underneath, just like pressing a car's brake pedal without knowing the hydraulics. Inheritance lets a class reuse and extend another: `Dog` and `Cat` both extend `Animal`, inheriting `eat()` instead of duplicating it. Polymorphism means the same call behaves differently depending on the actual object: if I loop over a list of `Animal` and call `speak()`, a `Dog` barks and a `Cat` meows — same interface, different behavior. Together they make code easier to reason about, reuse, and change safely. Interview tip: interviewers consistently rate concrete examples higher than textbook definitions, and polymorphism is the pillar they probe deepest."
  },
  {
    id: "int-003",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Which statement correctly distinguishes method overloading from method overriding?",
    code: null,
    options: {
      a: "Overloading is resolved at runtime; overriding is resolved at compile time.",
      b: "Overloading requires inheritance between two classes; overriding does not.",
      c: "They are two names for exactly the same mechanism.",
      d: "Overloading is the same method name with different parameter lists in the same class (resolved at compile time); overriding is a subclass redefining a parent method with the same signature (resolved at runtime)."
    },
    answer: "d",
    solution: "Correct: d. Overloading: `add(int, int)` and `add(double, double)` coexist in one class; the compiler picks one based on the arguments — compile-time (static) polymorphism. Overriding: `Dog` provides its own `speak()` replacing `Animal.speak()`; which version runs depends on the actual object at runtime — runtime (dynamic) polymorphism. Why the others are wrong: (a) has the two resolution times swapped. (b) is reversed — overriding is the one that requires an inheritance relationship; overloading happens within one class. (c) they are distinct mechanisms, which is exactly why this question is so common."
  },
  {
    id: "int-004",
    category: "interview",
    difficulty: "basic",
    type: "code",
    question: "Walk me through what each of these git commands does, and what the natural next step is after the last one.",
    code: "git clone https://github.com/team/app.git\ncd app\ngit checkout -b fix-login\n# ...edit login.js...\ngit add login.js\ngit commit -m \"Fix login redirect\"\ngit push -u origin fix-login",
    options: null,
    answer: null,
    solution: "Answer: it downloads the repository, creates a feature branch, records one commit on it, and publishes that branch — the natural next step is opening a pull request. Step by step: `git clone` copies the full repository (all history) to your machine. `git checkout -b fix-login` creates a new branch named `fix-login` and switches to it, so your work is isolated from `main`. `git add login.js` stages the change — it marks exactly what will go into the next commit. `git commit` permanently records the staged snapshot in local history with a message. `git push -u origin fix-login` uploads the branch to the remote and sets it as the upstream, so future `git push`/`git pull` know where to go. Nothing has touched `main` yet: you would now open a pull request so a teammate can review the change before it is merged."
  },
  {
    id: "int-005",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Explain debugging and walk me through your preferred method.",
    code: null,
    options: null,
    answer: null,
    solution: "Debugging is the systematic process of finding the root cause of incorrect behavior and fixing it — not just making the symptom disappear. My method: first, reproduce the bug reliably, because a bug I can trigger on demand is half solved. Second, read the actual error message and logs carefully, including the full stack trace — the answer is often right there. Third, isolate the cause: I shrink the problem by commenting out code, testing components in isolation, or binary-searching recent changes (even `git bisect` if it appeared after a known-good commit). Fourth, I form a hypothesis about the cause and test it by changing exactly one thing at a time, using a debugger with breakpoints or targeted log statements to inspect actual values instead of assuming them. When I find the root cause I fix it, verify the original reproduction now passes, and check I have not broken anything nearby. Finally, I add a regression test so the bug cannot silently return, and if I was stuck I explain the problem out loud — rubber-duck debugging genuinely works. Interview tip: interviewers grade the structured process (reproduce, isolate, verify) far more than which tool you name."
  },
  {
    id: "int-006",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "You want to update only the email field of an existing user record through a REST API. Which HTTP method is the conventional choice?",
    code: null,
    options: {
      a: "GET",
      b: "PUT",
      c: "PATCH",
      d: "POST"
    },
    answer: "c",
    solution: "Correct: c. PATCH applies a partial update — you send only the fields that change, e.g. `PATCH /users/42` with `{\"email\": \"new@mail.com\"}`. The full CRUD mapping: POST = Create, GET = Read, PUT/PATCH = Update, DELETE = Delete. Why the others are wrong: (a) GET only reads data and must never change server state. (b) PUT conventionally replaces the entire resource, so you would have to send every field, not just the email. (d) POST creates a new resource (or triggers an action); using it for a field update fights the convention."
  },
  {
    id: "int-007",
    category: "interview",
    difficulty: "basic",
    type: "code",
    question: "Fill in the four HTTP status codes marked with ____ in this API route handler.",
    code: "app.get(\"/users/:id\", (req, res) => {\n  const user = db.find(req.params.id);\n  if (!user) return res.status(____).send(\"No such user\");\n  res.status(____).json(user);\n});\n\napp.post(\"/users\", (req, res) => {\n  if (!req.body.email) return res.status(____).send(\"Email required\");\n  const user = db.create(req.body);\n  res.status(____).json(user);\n});",
    options: null,
    answer: null,
    solution: "Answer, in order: 404, 200, 400, 201. Explanation: 404 Not Found — the requested resource does not exist. 200 OK — the standard success response for a read. 400 Bad Request — the client sent invalid input (missing email), so it is the client's fault and a 4xx code. 201 Created — the conventional success code when a POST creates a new resource (often with a `Location` header pointing at it). Related codes worth knowing cold: 301 Moved Permanently (resource has a new URL — redirects), 401 Unauthorized (not logged in), 403 Forbidden (logged in but not allowed), and 500 Internal Server Error (the server crashed — never the client's fault)."
  },
  {
    id: "int-008",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What happens when you type a URL into the browser and press Enter?",
    code: null,
    options: null,
    answer: null,
    solution: "First the browser resolves the domain name to an IP address via DNS — checking its own cache, the OS cache, and then asking a DNS resolver — because the network routes packets by IP, not by name. With the IP, the browser opens a TCP connection using the three-way handshake so both sides agree they have a reliable channel. Since the site is HTTPS, a TLS handshake follows: the server presents its certificate, the browser verifies it, and they agree on encryption keys so the traffic cannot be read or tampered with. The browser then sends an HTTP GET request for the page, and the server responds with a status code and the HTML. The browser parses the HTML into the DOM, fetches referenced resources like CSS, JavaScript, and images (each triggering more requests), builds the CSSOM, combines them into a render tree, computes layout, and paints pixels to the screen. JavaScript runs as it loads and can modify the page further. Interview tip: interviewers grade whether you know why each step exists — name-to-address, reliability, security, content, rendering — more than how many acronyms you can list."
  },
  {
    id: "int-009",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "Which statement best describes a REST API?",
    code: null,
    options: {
      a: "An architectural style where clients use standard HTTP methods on resource URLs, each request is stateless, and data is usually exchanged as JSON.",
      b: "A protocol that keeps a permanent two-way connection open between client and server for real-time messaging.",
      c: "A query language that lets the client specify exactly which fields it wants in a single request.",
      d: "A library that must be installed on both the client and the server so they can call each other's functions directly."
    },
    answer: "a",
    solution: "Correct: a. REST treats everything as a resource identified by a URL (like `/users/42`) and manipulates it with standard HTTP verbs (GET, POST, PUT/PATCH, DELETE). Statelessness means each request carries everything the server needs — the server stores no client session between calls — which makes scaling and caching easier. Why the others are wrong: (b) describes WebSockets, not REST — REST is request/response over plain HTTP. (c) describes GraphQL, a common alternative to REST. (d) describes RPC-style frameworks; REST needs no shared library, just HTTP, which is why any language can consume a REST API."
  },
  {
    id: "int-010",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "The SQL in this signup/login code is safely parameterized, yet there is still a serious security flaw in how it handles the password. What is it, why is it dangerous, and how do you fix it?",
    code: "// signup handler\nfunction signup(username, password) {\n  return db.run(\n    \"INSERT INTO users (name, pass) VALUES (?, ?)\",\n    [username, password]\n  );\n}\n\n// login handler\nfunction login(username, password) {\n  const row = db.get(\n    \"SELECT * FROM users WHERE name = ?\", [username]\n  );\n  return row && row.pass === password;\n}",
    options: null,
    answer: null,
    solution: "Answer: the password is stored in plain text — `signup` inserts the raw password into the database and `login` compares raw strings. Why it is dangerous: if the database (or a backup, log, or admin screen) is ever leaked, every user's password is exposed immediately, and because people reuse passwords, attackers will replay them against email and banking accounts; even your own employees should never be able to read users' passwords. Fix: store only a salted, slow hash of the password. On signup: `const hash = await bcrypt.hash(password, 12); db.run(..., [username, hash])`. On login: `return row && await bcrypt.compare(password, row.pass);`. Key vocabulary to use: hashing is one-way (you verify by re-hashing, you never decrypt), which is why hashing — not encryption — is correct here. The salt (bcrypt generates one per password) defeats rainbow-table lookups by making identical passwords hash differently, and a deliberately slow algorithm (bcrypt, scrypt, argon2) throttles brute-force attempts — never use fast general-purpose hashes like MD5 or plain SHA-256 for passwords. Defense in depth: transmit credentials only over HTTPS, never write passwords to logs, and rate-limit login attempts."
  },
  {
    id: "int-011",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A user sends a request with a valid login token, but their account lacks permission to delete the resource. Which status code should the API return?",
    code: null,
    options: {
      a: "400 Bad Request",
      b: "401 Unauthorized",
      c: "404 Not Found",
      d: "403 Forbidden"
    },
    answer: "d",
    solution: "Correct: d. 403 Forbidden means \"I know exactly who you are, and you are not allowed to do this.\" The classic pairing: 401 = not authenticated (who are you?), 403 = authenticated but not authorized (you may not). Why the others are wrong: (a) 400 means the request itself was malformed — here the request is fine, the permissions are not. (b) 401 would imply the token is missing or invalid, but it is valid. (c) 404 means the resource does not exist — though some APIs deliberately return 404 instead of 403 to avoid revealing that a resource exists, the standard semantic answer is 403. Quick map worth memorizing: 200 OK, 201 Created, 301 Moved Permanently, 400 client error, 401 unauthenticated, 403 unauthorized, 404 missing, 500 server error."
  },
  {
    id: "int-012",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What is a merge conflict, when does it happen, and walk me through how you resolve one.",
    code: null,
    options: null,
    answer: null,
    solution: "A merge conflict happens when git cannot automatically combine two branches because both changed the same lines of the same file (or one deleted a file the other edited) — git refuses to guess which version is right. When it happens, git pauses the merge and writes conflict markers into the file: `<<<<<<<` my version, `=======` the divider, and `>>>>>>>` the incoming version. To resolve it, I run `git status` to see which files conflict, open each one, and read both versions to understand the intent of each change — sometimes I keep mine, sometimes theirs, and often I combine the two. If I do not understand the other change, I talk to the teammate who wrote it rather than silently overwrite their work. Then I delete the markers, make sure the file is correct, run the tests, `git add` the resolved files, and complete the merge with a commit (or `git rebase --continue` during a rebase). To keep conflicts rare and small, I pull main into my branch frequently and keep branches short-lived. Interview tip: this is the single most-asked git scenario — mentioning that you test after resolving and communicate with the other author is what separates good answers."
  },
  {
    id: "int-013",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "What is the key difference between a process and a thread?",
    code: null,
    options: {
      a: "Threads are always faster than processes for every kind of workload.",
      b: "A process has its own isolated memory space, while threads within a process share that process's memory.",
      c: "A process can only ever contain a single thread.",
      d: "Threads each get their own isolated memory, while processes share memory with each other by default."
    },
    answer: "b",
    solution: "Correct: b. A process is a running program with its own address space, file handles, and resources — one process cannot accidentally read another's memory. A thread is a unit of execution inside a process; all threads of a process share its heap and globals (each has only its own stack), which makes communication fast but introduces the danger of race conditions and the need for locks. Why the others are wrong: (a) threads are cheaper to create and switch, but isolation, stability, and multi-machine scaling can favor processes. (c) a process contains at least one thread and may contain many. (d) is exactly backwards — the shared-versus-isolated memory relationship is inverted."
  },
  {
    id: "int-014",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "This code can leave `balance` at -100 even though it checks the balance first. What is this bug called, why does it happen, and how would you fix it?",
    code: "let balance = 100;\n\nasync function withdraw(amount) {\n  if (balance >= amount) {\n    await chargeFee();        // takes ~50ms\n    balance = balance - amount;\n  }\n}\n\n// two requests arrive at almost the same time:\nwithdraw(100);\nwithdraw(100);",
    options: null,
    answer: null,
    solution: "Answer: it is a race condition — specifically a check-then-act (time-of-check to time-of-use) bug. Both calls run `balance >= amount` while balance is still 100, so both pass the check. Then each one awaits `chargeFee()`, yielding control, and afterwards both subtract 100, leaving balance at -100. The check and the update are not atomic: another execution can interleave between them. Fixes: make check-and-update a single atomic operation — at the database level, `UPDATE accounts SET balance = balance - 100 WHERE id = ? AND balance >= 100` and inspect the affected-row count; or serialize access with a lock/mutex or a per-account queue so only one withdrawal runs at a time; or use a transaction with the right isolation level. The cheap patch of re-checking the balance after the `await` narrows the window but does not close it — atomicity or mutual exclusion is the real fix. Race conditions are the standard follow-up to the process-vs-thread question, so have this example ready."
  },
  {
    id: "int-015",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "Explain agile and scrum to me in about one minute.",
    code: null,
    options: null,
    answer: null,
    solution: "Agile is a way of building software in small, working increments instead of one giant plan executed over months — you ship something usable early, get feedback, and adjust, because requirements always change. Scrum is the most popular framework for doing that. Work happens in sprints, fixed time-boxes of usually two weeks, and each sprint ends with a working increment of the product. The product owner keeps a prioritized backlog of work; in sprint planning the team pulls the top items into the sprint. Every day there is a short standup where each person says what they did, what they will do, and what is blocking them — it is for surfacing blockers, not status theater. At the end of the sprint, the team demos the work in a sprint review and then holds a retrospective to discuss how to work better next time, while the scrum master removes obstacles and protects the process. Interview tip: end with one sentence about why it matters — fast feedback and course-correction — rather than just listing the ceremonies."
  },
  {
    id: "int-016",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your team is building a banking ledger that needs strict transactional guarantees and many multi-table joins. Which data store is the most natural fit?",
    code: null,
    options: {
      a: "A relational SQL database like PostgreSQL, because of ACID transactions, enforced schema, and join support.",
      b: "A document store like MongoDB, because its flexible schema makes financial data safer.",
      c: "A key-value cache like Redis as the primary store, because it has the lowest latency.",
      d: "Any NoSQL store, because relational databases cannot scale beyond small workloads."
    },
    answer: "a",
    solution: "Correct: a. Money movement is the textbook ACID case: a transfer must debit one account and credit another atomically, and a strict schema plus foreign keys prevents malformed records; SQL joins handle the inherently relational data (accounts, transactions, customers). Why the others are wrong: (b) flexible schema is a liability here — you want the database to reject invalid financial records, and MongoDB's strengths (varied document shapes, horizontal scaling) solve problems a ledger does not have. (c) Redis is an excellent cache or queue but an in-memory key-value store is not a system of record for money. (d) is a myth — PostgreSQL and MySQL handle enormous workloads; NoSQL trades joins and strict consistency for easier horizontal scaling, which is a different trade-off, not an upgrade. Rule of thumb to say aloud: relational/structured data and strong consistency point to SQL; massive scale-out, flexible or evolving document shapes point to NoSQL."
  },
  {
    id: "int-017",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Your frontend running at `http://localhost:3000` executes this fetch, the data never arrives, and the browser console shows the error below — yet the same URL works fine in Postman. What is CORS, why did the browser block the request, and whose code has to change to fix it?",
    code: "fetch(\"https://api.example.com/data\")\n  .then(r => r.json())\n  .then(console.log);\n\n// Browser console:\n// Access to fetch at 'https://api.example.com/data' from origin\n// 'http://localhost:3000' has been blocked by CORS policy: No\n// 'Access-Control-Allow-Origin' header is present on the\n// requested resource.",
    options: null,
    answer: null,
    solution: "Answer: CORS (Cross-Origin Resource Sharing) is the mechanism by which a server opts in to letting pages from OTHER origins read its responses — and here the API server never opted in, so the fix belongs on the server, not in your JavaScript. Background: an origin is the combination of scheme + host + port, so `http://localhost:3000` and `https://api.example.com` are different origins. By default the browser's same-origin policy forbids page scripts from reading cross-origin responses — a protection for the user, so a malicious site cannot use your logged-in cookies to read your bank's data. CORS relaxes that: the server includes response headers like `Access-Control-Allow-Origin: http://localhost:3000` (or `*` for public APIs), and for \"non-simple\" requests (e.g. `PUT`, or a JSON `Content-Type`, or an `Authorization` header) the browser first sends a preflight `OPTIONS` request asking permission. Why Postman works: CORS is enforced only by browsers on behalf of users — server-to-server calls, curl, and Postman are unaffected, which is the classic telltale that the problem is CORS and not the network. Practical fixes: have the API set the CORS headers for your origin, or during development route the call through a same-origin dev-server proxy. Saying clearly that CORS is a browser security feature and a server-side fix — not a frontend bug — is exactly what interviewers listen for."
  },
  {
    id: "int-018",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What is the difference between unit, integration, and end-to-end tests, and roughly how many of each should a project have?",
    code: null,
    options: null,
    answer: null,
    solution: "A unit test checks one small piece of logic — a function or class — in complete isolation, with dependencies replaced by mocks or stubs; it should be fast, deterministic, and pinpoint exactly what broke. An integration test checks that several real pieces work together — for example, that my repository code actually reads and writes a real test database, or that two services agree on an API contract. An end-to-end test drives the whole running system the way a user would — a browser script that logs in, adds an item to the cart, and checks out. The classic answer for proportions is the testing pyramid: many unit tests at the base, fewer integration tests in the middle, and a small number of end-to-end tests at the top. The reasoning is cost: as you go up the pyramid, tests get slower, flakier, and harder to debug when they fail — an e2e failure tells you something is wrong somewhere, a unit failure tells you exactly where. A good unit test is fast, isolated, deterministic, and tests behavior rather than implementation details, so refactoring does not break it. Interview tip: naming the pyramid and the why (speed and failure-localization) is what interviewers listen for."
  },
  {
    id: "int-019",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Which browser storage option persists after the browser is fully closed AND is automatically sent to the server with every HTTP request to its domain?",
    code: null,
    options: {
      a: "sessionStorage",
      b: "localStorage",
      c: "Cookies",
      d: "In-memory JavaScript variables"
    },
    answer: "c",
    solution: "Correct: c. Cookies with an expiry date survive browser restarts, and the browser attaches them automatically to every request to their domain — which is exactly why they are used for sessions, and also why they need protection like `HttpOnly`, `Secure`, and `SameSite` flags (CSRF exists because of this auto-send). Why the others are wrong: (a) sessionStorage is wiped when the tab closes and is never sent to the server. (b) localStorage does persist across restarts, but the server never sees it automatically — your JavaScript must read it and attach it (e.g. an `Authorization` header) manually. (d) plain variables vanish on every page reload. Related talking point: a JWT can be stored in localStorage (simple, but readable by any injected script — XSS risk) or in an HttpOnly cookie (invisible to JavaScript, but needs CSRF protection); knowing that trade-off is a strong junior answer."
  },
  {
    id: "int-020",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "This test passes every December and fails the other eleven months. What is wrong with it, and how do you turn it into a good unit test?",
    code: "// discount applies only in December\ntest(\"applies holiday discount\", () => {\n  const cart = new Cart();\n  cart.add(\"book\", 20);\n  const total = cart.totalWithDiscounts(new Date());\n  expect(total).toBe(18); // 10% holiday discount\n});",
    options: null,
    answer: null,
    solution: "Answer: the test is non-deterministic because it depends on the real current date — `new Date()` returns December only one month a year, so the 10% discount branch only runs then. A good unit test must be deterministic: same code, same result, every run, on every machine. Fix: control the time instead of sampling it. Since `totalWithDiscounts` already accepts the date as a parameter, pass fixed dates: `cart.totalWithDiscounts(new Date(\"2026-12-15\"))` and expect 18, plus a second test with `new Date(\"2026-03-15\")` expecting 20 — now both branches are covered explicitly. If the date were read inside the method, you would inject a clock or freeze time with the test framework's fake timers. The general principle interviewers want to hear: hidden dependencies on current time, randomness, network, or shared global state are the classic causes of flaky tests, and the cure is always the same — make the dependency explicit and inject a controlled value. Good unit tests are fast, isolated, deterministic."
  },
  {
    id: "int-021",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "Tell me about a project you built.",
    code: null,
    options: null,
    answer: null,
    solution: "Use the STAR framework: Situation, Task, Action, Result. Situation — one or two sentences of context: \"For my portfolio I wanted a flashcard app to drill interview questions, because the spreadsheet I was using did not track what I kept getting wrong.\" Task — what you specifically set out to do: \"I decided to build it in vanilla JavaScript with no framework so I would actually understand the DOM and state management.\" Action — the meat, in first person singular: the 2-3 most interesting decisions and obstacles, e.g. how you structured the data, a bug that taught you something, a trade-off you consciously made. Result — finish with outcomes, ideally measurable: \"It is deployed, I use it daily, and spaced repetition cut my miss rate on repeat questions roughly in half.\" Keep the whole story under two minutes, then stop and let them dig in — the follow-up questions are where you score points. Two warnings: always say \"I\", not \"we\", for the parts you personally did, and pick a project you can defend down to the details, because a good interviewer will descend until they find the floor of your understanding. The same STAR skeleton answers the equally common \"tell me about a difficult bug you fixed.\""
  },
  {
    id: "int-022",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "At a high level, which statement about JSON Web Tokens (JWTs) is accurate?",
    code: null,
    options: {
      a: "The payload is encrypted, so it is safe to store passwords inside a JWT.",
      b: "The server must look up every JWT in a database table to validate it.",
      c: "JWTs only work when stored in cookies.",
      d: "A JWT is signed, so the server can verify it has not been tampered with — but the payload is only base64-encoded and readable by anyone holding the token."
    },
    answer: "d",
    solution: "Correct: d. A JWT has three parts — header, payload, signature. The signature (created with a secret or private key) lets the server verify integrity and origin without storing anything: change one character of the payload and the signature no longer matches. But signing is not encryption — anyone can base64-decode the payload, so it must never contain secrets, only claims like user id, role, and expiry. Why the others are wrong: (a) confuses signing with encryption; putting a password in a JWT leaks it. (b) misses the main selling point — JWTs are stateless and self-contained, validated by checking the signature, no session table needed (the flip side: revoking one before expiry is hard). (c) JWTs are transport-agnostic — commonly sent in an `Authorization: Bearer` header, and storable in memory, localStorage, or cookies, each with different security trade-offs."
  },
  {
    id: "int-023",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "What does this sequence do to the commit history, and how does the result differ from instead running `git merge main` while on the feature branch?",
    code: "# main has new commits since you branched off\ngit checkout feature\ngit rebase main\n# ...resolve any conflicts...\ngit checkout main\ngit merge feature   # fast-forward",
    options: null,
    answer: null,
    solution: "Answer: it produces a perfectly linear history with no merge commit. `git rebase main` lifts the feature branch's commits off their old base and replays them one by one on top of the current tip of main — the commits are rewritten (new hashes), as if the work had started from today's main. Because feature is now strictly ahead of main, the final `git merge feature` is a fast-forward: main's pointer just moves up, no merge commit is created. By contrast, `git merge main` on the feature branch keeps both original lines of history and ties them together with a merge commit — truthful but bushier history, and the eventual merge into main adds another merge commit. Trade-off to say out loud: rebase gives clean, linear, bisect-friendly history; merge preserves what actually happened and never rewrites commits. The golden rule: never rebase commits that are already pushed and shared, because rewriting public history forces everyone else's clones out of sync. Either is fine for a private feature branch; teams usually pick a convention."
  },
  {
    id: "int-024",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Your code works on your machine but fails in staging. Walk me through what you check first.",
    code: null,
    options: null,
    answer: null,
    solution: "First I go to the staging logs and get the exact error — message, stack trace, timestamp — because guessing without the real failure is wasted time, and I try to reproduce it with the same request or input that failed. Then I look for what differs between the two environments, since the code is the same but the context is not: environment variables and config files, secrets and API keys, the database (different data, missing migrations), dependency versions — does the lockfile guarantee identical packages, and was the build done the same way? I also check infrastructure differences: staging may sit behind a proxy or HTTPS, run a different OS or runtime version, or have stricter file permissions and network rules. Next I binary-search the change: did the last deploy introduce it? Diffing the previously working release against the current one — or using `git bisect` — usually corners the culprit fast. Classic root causes worth naming: a hardcoded `localhost` URL, a file that exists locally but was never committed, a case-sensitive path that works on Windows but not Linux, or an environment variable set only on my machine. Once fixed, I verify in staging itself, not just locally, and add the missing config check or log line so the same failure is obvious next time. Interview tip: this scenario phrasing is the modern form of the debugging question — they are grading the systematic elimination process, not a lucky guess."
  },
  {
    id: "int-025",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "Which HTTP method is NOT idempotent — meaning that sending the identical request twice can change the server's state twice?",
    code: null,
    options: {
      a: "GET",
      b: "POST",
      c: "PUT",
      d: "DELETE"
    },
    answer: "b",
    solution: "Correct: b. Idempotent means repeating the same request leaves the server in the same state as doing it once. POST is not idempotent: `POST /orders` twice creates two orders — which is why the browser warns before resubmitting a form, and why payment APIs use idempotency keys. Why the others are idempotent: (a) GET is safe — it never modifies state at all, which also makes it cacheable and is why sensitive data goes in a POST body, not in a GET URL that lands in history and server logs. (c) PUT replaces the resource with the supplied representation; replacing it twice with the same body yields the same final state. (d) DELETE twice leaves the resource just as deleted — the second call may return 404, but the response code is irrelevant to idempotency; only the resulting server state counts."
  },
  {
    id: "int-026",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "Both threads occasionally freeze forever. What is this situation called, how exactly does it happen here, and what is the standard fix?",
    code: "// Thread 1\nlock(accountA);\nlock(accountB);\ntransfer(accountA, accountB, 50);\nunlock(accountB);\nunlock(accountA);\n\n// Thread 2 (running concurrently)\nlock(accountB);\nlock(accountA);\ntransfer(accountB, accountA, 30);\nunlock(accountA);\nunlock(accountB);",
    options: null,
    answer: null,
    solution: "Answer: a deadlock. The fatal interleaving: Thread 1 acquires the lock on accountA; before it can take accountB, the scheduler switches to Thread 2, which acquires accountB. Now Thread 1 waits for B (held by Thread 2) while Thread 2 waits for A (held by Thread 1) — a circular wait where neither can ever proceed, and neither will release what it holds. All four classic deadlock conditions are present: mutual exclusion, hold-and-wait, no preemption, and circular wait; break any one and the deadlock is impossible. The standard fix breaks circular wait with a global lock ordering: every thread must acquire locks in the same agreed order — say, always lock the account with the lower id first. Then Thread 2 would also try A first, block harmlessly until Thread 1 finishes, and proceed. Alternatives: acquire both locks atomically, use lock timeouts with retry, or push the whole transfer into a database transaction and let the engine detect deadlocks. Deadlock is the second standard follow-up to process-vs-thread, right after race conditions — know both cold."
  },
  {
    id: "int-027",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "What do you do when you are stuck on a problem?",
    code: null,
    options: null,
    answer: null,
    solution: "Model answer framework: First, I make sure I actually understand the problem — I re-read the error message slowly and restate what I expected versus what is happening, because half my \"stuck\" moments dissolve right there. Then I timebox focused attempts: I search the docs and the exact error text, build a minimal reproduction that strips away everything irrelevant, and explain the problem out loud rubber-duck style, which forces hidden assumptions into the open. If I am still stuck after my timebox — say 30 to 60 minutes depending on urgency — I step away briefly; a walk resets the tunnel vision that keeps me re-trying the same dead end. After that, I ask for help, and I ask well: here is what I am trying to do, here is what I expected, here is what happens instead, and here are the three things I already tried. That respects the helper's time and very often answering it solves the problem mid-question. Finally, when it is solved, I write the answer down — in a note or the team wiki — so the same wall never costs me twice. Interview tip: the interviewer is checking two failure modes — giving up too fast and burning days in silent pride — so explicitly naming the timebox shows you avoid both."
  },
  {
    id: "int-028",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "Your web app runs on one server that is hitting its CPU limit under growing traffic. Which statement correctly distinguishes vertical from horizontal scaling?",
    code: null,
    options: {
      a: "Vertical scaling means adding more servers; horizontal scaling means buying a bigger server.",
      b: "Vertical scaling upgrades the existing machine (more CPU/RAM); horizontal scaling adds more machines behind a load balancer that spreads requests across them.",
      c: "Horizontal scaling only applies to databases; web servers can only be scaled vertically.",
      d: "Vertical scaling has no upper limit, which is why the largest sites rely on it."
    },
    answer: "b",
    solution: "Correct: b. Vertical scaling (scaling up) means moving the same application onto a beefier machine — more cores, more memory, faster disks. It is the simplest first step because the code usually needs no changes, but it has a hard ceiling (you can only buy so big a machine), the price grows non-linearly near the top, and the single machine remains a single point of failure. Horizontal scaling (scaling out) adds more, often cheaper, machines and puts a load balancer in front to distribute requests; it scales much further and adds redundancy — one server dying just removes it from the pool. The catch interviewers probe: horizontal scaling requires the app to be effectively stateless, because consecutive requests from one user may hit different servers — so session data moves out of server memory into a shared store like Redis or a database, or into signed tokens such as JWTs. Why the others are wrong: (a) has the two terms swapped. (c) is backwards in practice — stateless web tiers are the EASIEST thing to scale horizontally; databases are the hard part (read replicas, sharding). (d) is the opposite of reality: the ceiling is vertical scaling's defining weakness, which is exactly why large sites scale out."
  },
  {
    id: "int-029",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "During code review, which is the most professional way to handle a problem you found in a teammate's pull request?",
    code: null,
    options: {
      a: "Rewrite their branch yourself and force-push the corrected version.",
      b: "Approve it anyway to avoid conflict, then quietly fix it in a later commit.",
      c: "Comment on the code, not the person: explain the issue, why it matters, and suggest an alternative — e.g. \"This query runs inside the loop, so it fires once per user; could we batch it before the loop?\"",
      d: "Request changes with the single comment \"this is wrong\" and let them figure out the rest."
    },
    answer: "c",
    solution: "Correct: c. Good review comments are specific, explain the why, target the code rather than the author, and are phrased as questions or suggestions — which both keeps the tone collaborative and leaves room for the possibility that the author knows something you do not. Why the others are wrong: (a) force-pushing over a teammate's branch destroys their work, bypasses review entirely, and erodes trust. (b) approving known-broken code defeats the purpose of review and ships the bug. (d) \"this is wrong\" with no reasoning is unactionable and demoralizing — the author learns nothing. Same etiquette applies on the receiving side: treat comments as gifts to the codebase, not attacks, and say thanks for good catches. And in pair programming the analogous rule: the navigator suggests and asks (\"what if that input is null?\") rather than grabbing the keyboard, and driver and navigator swap roles regularly."
  },
  {
    id: "int-030",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "How do you learn a new technology?",
    code: null,
    options: null,
    answer: null,
    solution: "Model answer framework: I start with the official documentation's getting-started guide, because it is the most accurate, current source and shows how the authors intend the tool to be used. Then I build something small but real with it as fast as possible — not a copied tutorial, but a tiny project of my own — because I only truly learn when I hit my own errors and have to understand them. I deliberately timebox passive learning to avoid tutorial hell; one good tutorial to get oriented, then hands-on. While building, I read existing code that uses the technology well — open-source examples teach idioms that docs do not. I keep short notes of the commands, concepts, and gotchas I hit, which doubles as my own quick reference and proves to me what I have actually absorbed. I connect the new thing to what I already know — \"this is like X but with Y\" — so it slots into an existing mental model instead of floating free. Finally, I test my understanding by explaining it to someone else or writing it up; if I cannot explain it simply, I am not done. Recent concrete example beats theory here, so end with one: name the last technology you learned this way and what you built."
  },
  {
    id: "int-031",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Why do experienced developers say 'prefer composition over inheritance'?",
    code: null,
    options: {
      a: "Inheritance is deprecated in modern languages",
      b: "Composition (building objects out of smaller collaborators) keeps coupling low and stays flexible, while deep inheritance hierarchies lock you into rigid is-a relationships that are hard to change — inheritance still has its place, but as the exception",
      c: "Composition runs faster at the CPU level",
      d: "Inheritance cannot be combined with interfaces"
    },
    answer: "b",
    solution: "Correct: b. Inheritance is the *strongest* coupling a language offers: a subclass depends on its parent's implementation details, every parent change ripples downward, and the hierarchy bakes in one rigid taxonomy. The classic pain: you start with `Bird` and `fly()`, then penguins arrive; or `ReportGenerator extends DatabaseConnector` and now reports can never come from anywhere else. Composition instead assembles behavior from parts: a `Car` *has an* `Engine`; a `ReportGenerator` *receives* a data source. Swap parts freely (electric engine, mock data source in tests), combine capabilities without multiple-inheritance puzzles, and change one part without breaking the others.\n\nThe heuristic worth saying: inheritance models true **is-a** with stable, shallow hierarchies (your `ValidationError extends Error` is fine); composition models **has-a** or 'uses-a', and when in doubt, compose. Frameworks echo this: React moved from class inheritance to composed hooks; Go and Rust don't even offer classical inheritance.\n\nWhy the others are wrong: a — inheritance remains a core, supported feature; c — performance is not the issue, design flexibility is; d — interfaces and inheritance coexist fine (and 'program to an interface' is the *companion* advice).\n\nInterview tip: the penguin/fly example plus 'has-a beats is-a when in doubt' shows you understand the *why*, not just the slogan."
  },
  {
    id: "int-032",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "What is the difference between a library and a framework? People say 'you call a library, a framework calls you' — explain what that means.",
    code: null,
    options: null,
    answer: null,
    solution: "The difference is **who is in control of the program's flow** — which that slogan ('inversion of control', or the Hollywood Principle: 'don't call us, we'll call you') captures exactly. With a **library**, your code owns the flow and calls into the library when it wants something: you call `lodash.groupBy(...)`, `axios.get(...)`, `dayjs().format(...)` — each call is a tool you pick up and put down; the library has no opinion about how your program is shaped. With a **framework**, the framework owns the flow: it boots, runs its lifecycle, and calls *your* code at defined extension points. In Express you register handlers and the framework invokes them when requests arrive; in React you write components and React decides when to render them; a test framework finds and runs your test functions. You fill in blanks inside someone else's main loop. Practical consequences of that control difference: frameworks impose structure (a blessing for teams and juniors — decisions are pre-made, codebases look alike) but are a bigger commitment (swapping React for Vue is a rewrite; swapping axios for fetch is an afternoon); libraries compose freely but leave architecture decisions — and their consistency — on you. The boundary is fuzzy in places (Next.js is a framework wrapping React, which calls itself a library but controls rendering), so don't over-litigate labels; the *control* question is what matters. Interview tip: give one concrete pair from your own stack — 'I call lodash; Express calls me' — and name-drop inversion of control; that's the complete expected answer."
  },
  {
    id: "int-033",
    category: "interview",
    difficulty: "basic",
    type: "code",
    question: "Users report that saving sometimes silently does nothing — no error message, no saved data. Code review finds this. What is wrong, and how should it be handled?",
    code: "async function saveUserProfile(profile) {\n  try {\n    await api.save(profile);\n    showToast(\"Saved!\");\n  } catch (e) {\n    // TODO: handle later\n  }\n}",
    options: null,
    answer: null,
    solution: "The empty catch block **swallows every failure**. When `api.save` rejects — network down, validation rejected, session expired, server 500 — the exception is caught and discarded: no log, no user feedback, no retry. The user's data is gone and *nobody knows*, which is precisely the reported symptom. Worse, the success toast is the only signal path, so on failure the UI just... does nothing. Silent failure is the most expensive kind: a crash gets fixed in a day; this ships and quietly loses data for months.\n\nMinimum acceptable handling — every caught error must go *somewhere*:\n\nasync function saveUserProfile(profile) {\n  try {\n    await api.save(profile);\n    showToast(\"Saved!\");\n  } catch (e) {\n    showToast(\"Save failed — please try again.\");   // tell the user\n    logger.error(\"profile save failed\", { userId: profile.id, cause: e });  // tell the team\n    throw e; // or rethrow if a caller needs to react\n  }\n}\n\nThe principles this exercises:\n- **Catch only where you can act.** If this function can't do anything useful about the failure, it shouldn't catch at all — let it propagate to a layer that can.\n- Every catch needs at least: user-visible feedback (when a user action failed) and a log with context for diagnosis.\n- `// TODO: handle later` in an error path is a review blocker, not a style nit — 'later' reliably means 'never', and linters (`no-empty` rules) exist to flag exactly this.\n\nInterview framing: 'errors are part of the feature' — the failure path deserves the same design attention as the success path."
  },
  {
    id: "int-034",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "What is the difference between a compile-time error and a runtime error?",
    code: null,
    options: {
      a: "Compile-time errors are detected before the program runs (syntax errors, type mismatches in statically-typed languages); runtime errors occur while it executes (null dereference, division by zero, file not found) — and the earlier an error is caught, the cheaper it is",
      b: "Compile-time errors only happen on slow computers",
      c: "Runtime errors are always less severe than compile-time errors",
      d: "Interpreted languages have neither kind of error"
    },
    answer: "a",
    solution: "Correct: a. **Compile-time errors** are caught by tooling before execution: syntax errors, references to undefined names, and — in statically-typed languages — type mismatches like passing a string where an int is required. The program never runs until they're fixed, so they cannot reach users. **Runtime errors** happen during execution, often only under specific conditions: null/undefined access, dividing by zero, out-of-bounds indexing, failed network calls, out-of-memory. They escape to production whenever testing misses the triggering condition.\n\nThe principle that makes this question matter: **errors get more expensive the later they're found** — caught by the compiler (seconds, free) < failing test (minutes) < crash in staging (hours) < incident in production (days, plus user trust). That's the entire pitch for static type checkers: TypeScript exists to convert a whole class of JavaScript *runtime* errors ('undefined is not a function') into *compile-time* errors; same story for Python's type hints with mypy. It's also the logic behind linters, schema validation at boundaries, and 'fail fast' — move detection earlier.\n\nWhy the others are wrong: b — nonsense; c — backwards if anything: runtime errors are the ones that hit users; d — interpreted languages still have parse/syntax errors (caught at load) and plenty of runtime errors — they just lack the static type-checking phase unless you add one.\n\nBonus vocabulary: *logic errors* — the program runs without crashing but computes the wrong thing — are the third, sneakiest category, catchable only by tests and review."
  },
  {
    id: "int-035",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What is dependency injection? Explain it without a framework — and why it makes code easier to test.",
    code: null,
    options: null,
    answer: null,
    solution: "Dependency injection (DI) is a simple idea wearing an intimidating name: **a component receives the things it depends on from outside, instead of creating them itself.** Without DI: `class OrderService { constructor() { this.db = new PostgresClient(...); this.mailer = new SmtpMailer(...) } }` — the service hard-wires *which* database and mailer it uses, including their config. With DI: `constructor(db, mailer)` — the caller passes them in. That one change has outsized consequences. **Testability** is the headline: to test the no-DI version you need a real Postgres and a real SMTP server (slow, flaky, side-effecting); with DI, the test passes a fake — `new OrderService(fakeDb, recordingMailer)` — and asserts the mailer was called with the right arguments. The dependency *seam* is what makes mocking possible at all. **Flexibility**: swap Postgres for SQLite locally, the real mailer for a no-op in dev, without touching OrderService. **Explicitness**: the constructor signature *documents* what the class needs; hidden `new` calls deep inside methods are invisible dependencies that bite later. The follow-ups worth handling: DI does **not** require a framework — passing arguments is dependency injection, full stop; DI *containers* (Spring, NestJS, Angular's injector) just automate the wiring when graphs get big — they're a convenience on top of the idea, not the idea. And the related principle: 'program to an interface' — the service should depend on 'something that can `send(email)`', not specifically SmtpMailer, which is what makes substitution clean. Interview tip: the strongest answer is two constructor snippets — with and without — followed by 'so in the test I pass a fake'; that demonstrates the concept and its payoff in fifteen seconds, no framework names needed."
  },
  {
    id: "int-036",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A function receives a parameter and modifies it. In most mainstream languages (JavaScript, Python, Java), which statement about argument passing is accurate?",
    code: null,
    options: {
      a: "Everything is passed by reference, so reassigning a parameter changes the caller's variable",
      b: "Primitives are copied; for objects, the *reference is copied* — so the function CAN mutate the caller's object through it, but REASSIGNING the parameter does not affect the caller's variable",
      c: "Everything is deep-copied on every call, so functions can never affect the caller's data",
      d: "It depends entirely on whether the function is declared async"
    },
    answer: "b",
    solution: "Correct: b. The model (sometimes called 'call by sharing'): the parameter is a **new variable holding a copy of the value** — and for objects, that value *is a reference*. Two consequences that look contradictory until the model clicks:\n\nfunction f(obj) {\n  obj.name = \"changed\";   // mutates the SHARED object — caller sees it\n  obj = { name: \"new\" };  // rebinds the LOCAL variable — caller unaffected\n}\n\nMutating *through* the reference reaches the caller's object (both variables point at the same thing); *reassigning* the parameter just points the local name elsewhere. Python behaves identically (`list.append` inside a function is visible; `lst = []` is not), and Java passes object references by value the same way.\n\nWhy the others are wrong: a — true pass-by-reference (where reassignment propagates, like C++'s `&` or C#'s `ref`) is what these languages *don't* do; c — no deep copying happens, which is exactly why accidental mutation bugs exist; d — async is irrelevant to passing semantics.\n\nWhy this matters in practice: functions that mutate their arguments create spooky action at a distance — the caller's data changes without any visible assignment at the call site. Hence the defensive idioms: copy before mutating (`[...arr].sort()`), treat parameters as read-only, and let immutability conventions (or `Object.freeze`, or readonly types) enforce it. Interview tip: the two-line mutate-vs-reassign snippet above *is* the answer — draw it and narrate 'the reference is copied, the object is shared'."
  },
  {
    id: "int-037",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Users report that page 2 of results shows one item from page 1 again, and the last item of the list never appears anywhere. Find the two off-by-one bugs.",
    code: "// items per page\nconst PAGE_SIZE = 20;\n\nfunction getPage(pageNumber) {\n  // pageNumber starts at 1\n  const offset = pageNumber * PAGE_SIZE;\n  return db.query(\n    \"SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?\",\n    [PAGE_SIZE - 1, offset]\n  );\n}",
    options: null,
    answer: null,
    solution: "Bug 1 — **the offset is one page too far**: with 1-based page numbers, page 1 computes `offset = 1 * 20 = 20`, skipping the first 20 items — page 1 *starts at item 21*. The formula must shift to zero-based: `offset = (pageNumber - 1) * PAGE_SIZE`.\n\nBug 2 — **`LIMIT PAGE_SIZE - 1` fetches 19 items**, not 20. Every page silently drops one row, so consecutive pages mis-tile the list: items fall into the gaps and are never shown on any page.\n\nThe corrected function:\n\nconst offset = (pageNumber - 1) * PAGE_SIZE;\nreturn db.query(\n  \"SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?\",\n  [PAGE_SIZE, offset]\n);\n\nVerify with the boundary table — the standard off-by-one defense: page 1 → offset 0, rows 1–20; page 2 → offset 20, rows 21–40. Checking n=1 and the first boundary catches both bugs in ten seconds, which is the transferable habit: **test the edges, not the middle**.\n\nTwo professional footnotes: pagination must have a **stable ORDER BY** (this one's `ORDER BY id` is correct — without it, SQL row order is undefined and pages shuffle); and OFFSET pagination degrades on deep pages and shifts when rows are inserted mid-browse — cursor/keyset pagination (`WHERE id > lastSeen LIMIT 20`) is the production-grade fix worth name-dropping."
  },
  {
    id: "int-038",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "What is serialization? Why does data need to be serialized at all, and what formats and pitfalls should a developer know?",
    code: null,
    options: null,
    answer: null,
    solution: "Serialization converts an in-memory data structure — objects with references, types, and a memory layout particular to your running process — into a **flat sequence of bytes or text** that can leave the process: travel over a network, be written to a file or database, or be read by a program written in a different language. Deserialization is the reverse. Why it's necessary: in-memory representations are full of pointers — addresses valid only inside *this* process *right now* — so 'just send the object' is meaningless; you must encode the *information* in a self-contained, agreed-upon format. The formats to know: **JSON** — the web's default: human-readable, universal, but limited types (no dates, no binary, number-precision quirks); **XML** — verbose elder, still common in enterprise; **CSV** — tabular interchange; **binary formats** like Protocol Buffers/MessagePack — compact and fast with schemas, the choice for high-volume internal services; plus language-native ones (Python pickle, Java serialization). The pitfalls that make this interview-worthy: (1) **types that don't survive** — a JS `Date` becomes a string in JSON and *stays* a string after parsing (the classic round-trip bug); Maps, functions, and circular references don't serialize at all; (2) **versioning** — writer and reader evolve separately, so formats need a compatibility story (optional fields, defaults — protobuf is largely *about* this); (3) **security** — deserializing untrusted data with powerful native deserializers (pickle, Java) can execute attacker code; treat serialized input as hostile and prefer dumb-data formats like JSON at trust boundaries; (4) **precision** — 64-bit integers and money don't fit safely in JSON numbers (send strings). Interview tip: 'pointers can't cross process boundaries, so we flatten to an agreed format' is the *why*; the Date-round-trip bug is the battle scar that proves practice."
  },
  {
    id: "int-039",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "A program crashes with 'stack overflow'. Which of these is the most common cause?",
    code: null,
    options: {
      a: "The heap ran out of memory while allocating objects",
      b: "Recursion without a reachable base case (or too deep for the stack), piling up call frames until the call stack's fixed size is exhausted",
      c: "Too many global variables",
      d: "An array was indexed out of bounds"
    },
    answer: "b",
    solution: "Correct: b. Every function call pushes a *frame* (parameters, locals, return address) onto the **call stack**, which has a fixed, small size — typically ~1–8 MB. Unbounded recursion — a missing base case, a base case the input never reaches (`f(n-2)` called with an odd n and a base of `n === 0`), or even *correct* recursion on very deep data — pushes frames until the stack is exhausted: 'stack overflow' (`RangeError: Maximum call stack size exceeded` in JS, `RecursionError` in Python, segfault in C).\n\nWhy the others are wrong:\n- a: heap exhaustion is a different failure — 'out of memory' from allocating too many/too-large *objects*; not a stack overflow. The distinction (stack = call frames, fixed and small; heap = dynamic allocations, large) is exactly what this question checks.\n- c: globals live in static storage, not the stack.\n- d: out-of-bounds indexing raises an exception (managed languages) or corrupts memory (C) — a different bug.\n\nFixes when recursion is the cause: add/repair the base case (write it first, guard with inequalities like `n <= 0`); convert to iteration with an explicit loop or your own stack data structure (which lives on the *heap* — effectively unlimited depth); for tree/graph walks on deep inputs, iterative traversal is the production-safe form. Worth one bonus sentence: some languages optimize tail calls to reuse the frame, but you can't rely on it in JavaScript or Python — so 'recursion depth is bounded' is a real engineering constraint, not trivia."
  },
  {
    id: "int-040",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Regular expressions: when are they the right tool, when are they the wrong tool, and what are the classic mistakes people make with them?",
    code: null,
    options: null,
    answer: null,
    solution: "Regexes are a compact language for describing **text patterns** — and the skill is knowing the grain of the material. **Right tool**: validating simple formats (postal codes, order-ID shapes like `ORD-\\d{6}`), extracting structured fragments from semi-structured text (timestamps in log lines, capture groups pulling fields out), search-and-replace with structure (editor/codebase-wide refactors), and splitting on flexible delimiters (`split(/\\s+/)`). **Wrong tool**: (1) **Parsing nested/recursive formats** — HTML, JSON, code: regular expressions fundamentally cannot match arbitrarily nested structure (the famous Stack Overflow answer about parsing HTML with regex exists for a reason); use a real parser (`JSON.parse`, an HTML parser, a DOM). (2) **Over-strict validation of human realities** — the 'perfect email regex' is a tarpit; the pragmatic answer is checking basic shape (`something@something`) and verifying with a confirmation email, since no regex proves the inbox exists. (3) **Anything a string method does** — `str.includes(\"error\")` beats `/error/.test(str)`: clearer, no escaping landmines. The classic mistakes: **forgetting to escape metacharacters** (a user-supplied search term containing `.` or `(` breaks the pattern or silently over-matches — escape dynamic input); **catastrophic backtracking / ReDoS** — nested quantifiers like `(a+)+$` can take exponential time on crafted input, a real denial-of-service class when servers regex untrusted input; **greedy vs lazy confusion** — `<.+>` gobbling across multiple tags where `<[^>]+>` was meant; **unanchored validation** — without `^...$`, `/\\d{4}/` happily 'validates' `\"abcd1234junk\"`; and **write-only regexes** — a 200-character pattern nobody can review; prefer several small regexes or verbose mode, and *always* keep tests with example matches and non-matches next to any nontrivial pattern. Interview tip: 'great for flat patterns, structurally incapable of nesting, and never regex untrusted input without thinking about backtracking' covers tool choice, theory, and security in one sweep."
  },
  {
    id: "int-041",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A user named José signs up, and his name displays as 'JosÃ©'. What happened?",
    code: null,
    options: {
      a: "The database is too small to store accented characters",
      b: "Classic encoding mismatch (mojibake): the text was encoded as UTF-8 but decoded as a different encoding (e.g. Latin-1) somewhere in the pipeline — é's two UTF-8 bytes got interpreted as two separate characters",
      c: "José typed his name wrong",
      d: "Accented characters cannot be transmitted over HTTP"
    },
    answer: "b",
    solution: "Correct: b. This is **mojibake**, and the signature is diagnostic: in UTF-8, `é` is two bytes (0xC3 0xA9). Decode those bytes as Latin-1/Windows-1252 — where every byte is its own character — and you get `Ã` (0xC3) followed by `©` (0xA9): 'JosÃ©'. One character became two because *the bytes were right but the decoder was wrong*.\n\nThe conceptual model every developer needs: **text is not bytes**. A string is a sequence of Unicode code points; an *encoding* (UTF-8, UTF-16, Latin-1) is a scheme for turning those into bytes and back. Bytes without a known encoding are ambiguous — so every boundary that converts (file read/write, HTTP, database connection) must agree on the encoding. The practical checklist when mojibake appears: HTML `<meta charset=\"utf-8\">`; HTTP `Content-Type: ...; charset=utf-8`; database column *and connection* encoding (MySQL's `utf8mb4` — note plain `utf8` in MySQL is a broken 3-byte subset that rejects emoji, a famous production bug); and file I/O encoding parameters. The fix is making the whole pipeline UTF-8 — today's universal default.\n\nWhy the others are wrong: a — size isn't the issue, interpretation is; c — the data was fine at entry; d — HTTP carries any bytes; declaring their encoding is what headers are for.\n\nBonus depth: even valid Unicode has wrinkles — `é` can be one code point or `e` + combining accent (normalization, NFC/NFD), and 'string length' gets philosophical with emoji. But 'UTF-8 everywhere, declared at every boundary' solves the 99% case."
  },
  {
    id: "int-042",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Explain the MVC pattern. What goes in each part, and what problem is the separation actually solving?",
    code: null,
    options: null,
    answer: null,
    solution: "MVC splits an application into three responsibilities. The **Model** is the data and business logic — entities, rules, persistence: 'an order's total is items minus discounts, and it can't ship without payment'. It knows nothing about screens or HTTP. The **View** is presentation: templates/components rendering model data for humans; it holds no business rules. The **Controller** is the traffic cop: it receives input (an HTTP request, a click), invokes the right model operations, and selects the view to respond with — thin by design, orchestration only. In an Express app: routes/handlers are controllers, your service + database layer is the model, and templates or JSON shaping are the view. The problem the separation solves is **change isolation and testability**: the business rule 'orders over €50 ship free' lives in exactly one place (the model), so the website, the mobile API, and the admin panel can't drift apart on it; designers restyle views without touching logic; and — the big one — business logic is testable *without* a browser or HTTP, because the model depends on neither. The smells when MVC goes wrong are worth naming: the **fat controller** (business logic accumulating in route handlers — the most common junior codebase disease; the fix is pushing logic down into the model/service layer) and logic-in-templates (if/else pyramids in views). Honest caveats that show maturity: MVC is one of a family (MVP, MVVM — and modern component frameworks blur the lines: a React component contains its own view and controller-ish logic, with state management as the model); the boundaries are conventions, not laws; and the durable idea underneath — *separate business rules from presentation from input handling* — outlives every specific acronym. Interview tip: define the three parts in one sentence each, place them in a framework you've used, then say 'the payoff is the business rule lives once and is testable without the UI' — that last sentence is the actual answer."
  },
  {
    id: "int-043",
    category: "interview",
    difficulty: "basic",
    type: "code",
    question: "This function works, but reviewers call it 'arrow code'. Refactor it using guard clauses and explain why the flat version is better.",
    code: "function processOrder(order) {\n  if (order) {\n    if (order.items.length > 0) {\n      if (order.paymentVerified) {\n        if (!order.shipped) {\n          ship(order);\n          return true;\n        } else {\n          return false;\n        }\n      } else {\n        return false;\n      }\n    } else {\n      return false;\n    }\n  } else {\n    return false;\n  }\n}",
    options: null,
    answer: null,
    solution: "The refactor — invert each condition into an early return:\n\nfunction processOrder(order) {\n  if (!order) return false;\n  if (order.items.length === 0) return false;\n  if (!order.paymentVerified) return false;\n  if (order.shipped) return false;\n\n  ship(order);\n  return true;\n}\n\nSame behavior, dramatically better to read — in review-comment terms:\n- **Preconditions become a checklist.** Each guard states one disqualifier and exits. A reader scans four lines and knows exactly what stops an order from shipping — versus mentally tracking four nested scopes and matching each `else` to its `if` (the 'arrow' shape, named for the indentation silhouette).\n- **The happy path sits at indentation zero.** The function's actual purpose — `ship(order)` — is no longer buried four levels deep.\n- **Edits get safer.** Adding a fifth precondition is one new guard line, not re-nesting the pyramid and re-matching else branches — the operation where bugs sneak in.\n\nObjections worth pre-empting: 'multiple returns are bad' is a fossil from languages with manual cleanup; in modern code, early exit *reduces* the state a reader must carry. If the guards repeat across functions, extract a validator. And the distinct-error variant — returning *why* it failed (or throwing typed errors) per guard — is the natural next step, much harder to retrofit onto the pyramid.\n\nThe transferable principle: **handle the exceptional cases first and get them out of the way; let the main logic breathe at the bottom.**"
  },
  {
    id: "int-044",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "HTTP is called a 'stateless' protocol. What does that mean, and how do logins work despite it?",
    code: null,
    options: {
      a: "The server keeps a persistent connection per user for their whole visit, which is where login state lives",
      b: "Each request is independent — the server retains no memory of previous requests from that client — so state is reintroduced explicitly: the client sends an identifier (session cookie or token) with every request, and the server looks up or verifies it each time",
      c: "Stateless means the server has no database",
      d: "It means HTTPS does not use cookies"
    },
    answer: "b",
    solution: "Correct: b. Statelessness means the protocol carries no memory between requests: request #2 arrives with no built-in connection to request #1 — a different server machine could handle it and nothing breaks. Logins therefore work by **putting the state in the request**: after authentication, the server issues a credential — a session ID in a cookie (browser auto-attaches it; server looks up the session) or a signed token like a JWT (server verifies the signature and reads the claims). Every request re-presents the credential; the server re-establishes 'who is this' each time, from scratch.\n\nWhy this design — the part that elevates the answer: statelessness is a *feature*. Because any server can handle any request, you get trivial **horizontal scaling** (no need to route a user to 'their' server), free **failover** (a dying server loses no conversation), and simpler caching and retries. The moment you violate it — sessions in one server's memory — you inherit sticky sessions and random logouts behind a load balancer, the classic scaling bug (fixed with a shared session store or stateless tokens).\n\nWhy the others are wrong: a — connections may be *reused* (keep-alive) for performance, but that's transport plumbing, not application state; requests on one connection are still independent; c — 'stateless' describes the protocol contract, not the absence of storage — the database is exactly where durable state belongs; d — HTTPS is encryption, orthogonal to cookies.\n\nInterview soundbite: 'HTTP forgets you after every request; the cookie is how you reintroduce yourself.'"
  },
  {
    id: "int-045",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "Walk me through the software development lifecycle — what actually happens to a feature between 'someone has an idea' and 'users are using it'?",
    code: null,
    options: null,
    answer: null,
    solution: "Tell it as the life of one feature; the stages matter more than any methodology's labels. **(1) Requirements/discovery**: someone — PM, customer, support tickets — articulates the problem; the team sharpens it into something buildable, asking the clarifying questions now that are 10× cheaper than after code exists ('export to CSV — which fields? how big can it get? who's allowed?'). Acceptance criteria get written: how we'll *know* it works. **(2) Design**: for small features, a quick think and maybe a short doc — data model changes, API shape, edge cases, security review for anything touching auth/money/PII; for larger ones, team review to catch problems while they're still drawings. **(3) Implementation**: branch, code, *tests written alongside* (not 'after, if there's time'), self-review, PR. **(4) Review & integration**: code review for correctness and maintainability; CI runs tests, linters, builds; merge to main. **(5) Verification beyond unit tests**: staging deployment, maybe QA or exploratory testing, the product owner checking against acceptance criteria. **(6) Release**: deploy — modern practice favors small, frequent, low-drama releases, often behind feature flags, sometimes rolled out gradually (canary/percentage rollouts) with monitoring watching error rates. **(7) Operate & learn**: monitoring, alerts, logs in production; bug reports and usage data feed the next cycle — maintenance is where most of a feature's life is actually spent. Two framing points that signal maturity: this is a **loop, not a line** — agile just means small fast loops instead of one giant waterfall pass; and the cheapest place to fix a mistake is as far left as possible (a requirements misunderstanding caught in stage 1 costs a conversation; caught in production it costs an incident). Interview tip: narrate it as a story ('say the ticket is CSV export...') — concreteness beats reciting stage names, and pausing on 'I'd ask these clarifying questions first' is exactly what they're listening for in juniors."
  },
  {
    id: "int-046",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Which set of REST endpoint designs follows convention?",
    code: null,
    options: {
      a: "`GET /getUsers`, `POST /createUser`, `POST /deleteUser?id=5`",
      b: "`GET /users`, `GET /users/5`, `POST /users`, `PUT /users/5`, `DELETE /users/5`, `GET /users/5/orders`",
      c: "`POST /users/list`, `POST /users/get`, `POST /users/update`",
      d: "`GET /api?action=listUsers`, `GET /api?action=deleteUser&id=5`"
    },
    answer: "b",
    solution: "Correct: b. REST convention: **URLs name resources (nouns); HTTP methods supply the verbs.** `/users` is the collection, `/users/5` one member; GET reads, POST creates (on the collection), PUT/PATCH updates, DELETE deletes — the same URL meaning different operations depending on the method. Nesting expresses relationships: `/users/5/orders` is user 5's orders (kept shallow — one level is plenty). Plural nouns throughout, IDs in the path, filters and pagination in the query string: `/users?role=admin&page=2`.\n\nWhy the others are wrong:\n- a: verbs in URLs duplicate what the method already says (`GET /getUsers`), and `POST /deleteUser` actively lies — tooling that assumes method semantics (caches cache GETs, retry logic re-sends idempotent methods, audit proxies) misbehaves when delete travels as POST.\n- c: RPC-over-POST. Everything being POST forfeits HTTP's built-in semantics: no caching of reads, no idempotent retries, status codes lose meaning.\n- d: the query-string action dispatcher — one URL for everything defeats caching, logging, routing, and permissions-by-route.\n\nThe deeper point worth saying: conventions matter because **the ecosystem is built on them** — caches, browsers, load balancers, monitoring, and every developer's expectations. A conventional API is one nobody has to read docs to guess. Completing the picture: correct status codes (201 on create, 404 on a missing member), 405 for unsupported methods, and consistency above all — a predictable 'wrong' convention beats a mix of styles."
  },
  {
    id: "int-047",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Mini system design: build a URL shortener (like bit.ly). Walk me through your design — API, data model, the short-code generation, and what changes when it gets popular.",
    code: null,
    options: null,
    answer: null,
    solution: "The interviewer wants structure, not brilliance — walk the standard ladder. **Requirements first** (always): shorten a long URL to a short code; redirect visitors; codes shouldn't be guessable-sequential (debatable — ask!); maybe custom aliases, expiry, click counts. Scale assumption: reads (redirects) vastly outnumber writes (creations) — say 100:1; this asymmetry drives the whole design. **API**: `POST /shorten` with `{url}` → `{code, shortUrl}` (validate the URL! reject your own domain to prevent redirect loops); `GET /:code` → **301 or 302 redirect** to the long URL — and the choice is a real discussion: 301 (permanent) lets browsers cache and skip your server entirely (faster, but you lose click analytics and can't change the target); 302 keeps every hit visible. **Data model**: one table — `code (PK), long_url, created_at, expires_at, owner, click_count`. **Code generation** — the heart of the question: take an auto-incrementing ID and **base62-encode** it (a–z, A–Z, 0–9): 62⁷ ≈ 3.5 trillion codes in 7 characters, no collisions by construction; downside, sequential = enumerable, so either accept it, scramble the ID, or generate random 7-char codes and retry on the rare collision (both answers are fine — *naming the trade-off* is the point). Hashing the URL (truncated SHA) also works but must handle collisions and decide same-URL-same-code semantics. **When it gets popular**: the read path is hot and trivially cacheable — the code→URL mapping is small and immutable, perfect for **Redis** and/or CDN-edge caching; database read replicas next; the write path scales much later. Single biggest risk: one viral code — cache handles it. Sweeteners if time remains: rate-limit creation (abuse), malware-URL scanning, analytics via an async event stream rather than synchronous DB increments, expiry cleanup as a background job. Interview tip: requirements → API → data → algorithm → scaling, *in that order, out loud* — the ladder is what's being graded; a junior who asks '301 or 302 — do we need analytics?' has already passed."
  },
  {
    id: "int-048",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "This code is headed to production. Security review time: find at least three distinct problems.",
    code: "const ADMIN_PASSWORD = \"sup3rsecret!\";\nconst stripeKey = \"sk_live_51Habc123...\";\n\napp.post(\"/admin/discount\", (req, res) => {\n  if (req.body.password === ADMIN_PASSWORD) {\n    const pct = req.body.percent;\n    db.query(`UPDATE products SET price = price * (1 - ${pct} / 100)`);\n    console.log(`Discount applied: ${pct}%, by user ${req.body.email}, pw=${req.body.password}`);\n    res.send(\"ok\");\n  } else {\n    res.status(401).send(\"wrong password\");\n  }\n});",
    options: null,
    answer: null,
    solution: "At least five problems live here:\n\n1. **Hardcoded secrets in source code** — the admin password and a *live* Stripe key are in the repo: visible to everyone with read access, in git history forever (rotation required, not just deletion), and shipped to every environment. Secrets belong in environment variables or a secret manager, loaded at runtime.\n\n2. **SQL injection** — `pct` is interpolated straight into the query. A crafted `percent` value rewrites the statement. Use parameterized queries: `db.query(\"UPDATE products SET price = price * (1 - ? / 100)\", [pct])` — *and* validate `pct` is a number in a sane range (0–100), because even parameterized, `percent: 5000` is a business-logic disaster.\n\n3. **Secrets logged** — the console.log writes the submitted password into logs, which are broadly readable, shipped to third-party log services, and retained. Never log credentials or tokens; log the *event*, not the secret.\n\n4. **Shared-password 'authentication' with no identity** — one static password: no user accounts, no way to revoke one person's access, no audit trail of *who* (the self-reported `req.body.email` is attacker-controlled fiction). Real auth: individual accounts, hashed passwords, sessions/tokens, role-based authorization on admin routes.\n\n5. **No rate limiting / brute-force protection** on a password check — and the unbounded discount touches *every product* with no confirmation, transaction, or audit record.\n\nThe meta-lesson for review: money-touching endpoints get the harshest scrutiny — secrets out of code, all input validated *and* parameterized, identity + authorization (not a shared password), and logs that tell the story without leaking it."
  },
  {
    id: "int-049",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Rank these data access methods from fastest to slowest: reading from RAM, reading from a local SSD, a round trip to a server in the same datacenter, a round trip across an ocean.",
    code: null,
    options: {
      a: "They're all within about 2× of each other on modern hardware",
      b: "RAM (~100 ns) ≪ SSD (~100 µs) ≪ same-datacenter round trip (~0.5 ms) ≪ transoceanic round trip (~100+ ms) — each step is roughly orders of magnitude slower",
      c: "Network is faster than SSD now, so the order is RAM, network, SSD, ocean",
      d: "SSD is faster than RAM for sequential reads"
    },
    answer: "b",
    solution: "Correct: b. The 'latency numbers every programmer should know' ladder, rounded for memory: RAM reference ~100 **nanoseconds**; SSD random read ~100 **microseconds** (≈1,000× RAM); same-datacenter network round trip ~500 µs; cross-ocean round trip ~100+ **milliseconds** (physics — the speed of light in fiber sets a floor no engineering can beat). Each rung is orders of magnitude, not percentages — which is why intuition fails and why these numbers are worth memorizing approximately.\n\nWhat the ladder explains, concretely:\n- **Caching exists at every level** because each layer is so much slower than the one above: CPU caches over RAM, RAM (Redis) over disk, CDN edge over ocean.\n- **N+1 queries hurt**: 50 sequential same-DC round trips ≈ 25 ms of pure waiting — versus one query. Across an ocean, 50 round trips is 5+ seconds.\n- **Chatty APIs and request waterfalls** dominate page load: front-end performance is mostly about round-trip *count* on the critical path.\n- **CDNs work** by deleting the ocean: moving content thousands of km closer cuts ~50+ ms per round trip, and pages make many.\n- Latency you can't reduce, you can overlap: batch, pipeline, parallelize.\n\nWhy the others are wrong: a — the spread is ~6 orders of magnitude; c — RAM-vs-network is no contest, and 'network beats SSD' fails as a general claim; d — RAM beats SSD by ~1,000×.\n\nInterview soundbite: 'nanoseconds, microseconds, milliseconds, *hundred* milliseconds — RAM, SSD, datacenter, ocean.'"
  },
  {
    id: "int-050",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "The team is fed up with a messy legacy module. Half want to refactor it incrementally; half want to rewrite it from scratch. How do you think about that decision?",
    code: null,
    options: null,
    answer: null,
    solution: "Start with the asymmetry the industry learned the hard way: **rewrites are systematically underestimated, and the old code is smarter than it looks.** That mess encodes years of bug fixes and edge cases nobody remembers ('why is there a special case for February invoices?' — because of the incident in 2021). A rewrite discards that embedded knowledge and must rediscover it, in production, as regressions — while the team maintains *two* systems and feature work freezes (Joel Spolsky's 'things you should never do' essay and the Netscape rewrite are the canonical cautionary tale). So the default is **incremental refactoring**: improve the worst parts in place, each step shippable and reversible — characterization tests around existing behavior first, then extract functions/modules, then untangle. For replacement-scale work, the **strangler fig pattern** keeps it incremental: build the new implementation alongside, route traffic to it slice by slice, retire the old code once nothing calls it; at every moment you have one working system and a rollback path. When is a true rewrite right? When the *foundation*, not the structure, is the problem: dead platform/language (you can't hire for it), architecture fundamentally wrong for current requirements (single-tenant design needs multi-tenancy), security model unsalvageable — and even then, scoped to the smallest unit that can ship independently, not 'the whole system'. The questions that decide it in practice: Do tests exist (or can we write characterization tests) to pin current behavior? Can the replacement ship incrementally or is it big-bang? What features stall meanwhile, and will the business tolerate that for the *realistic* (2–3× estimated) duration? Who holds the old system's knowledge? Interview tip: lead with 'the mess contains undocumented fixes — a rewrite re-learns them as production bugs', offer the strangler fig as the middle path, and you've demonstrated the scar tissue this question screens for."
  },
  {
    id: "int-051",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "What is an ORM (like Prisma, Sequelize, Hibernate, or Django's ORM), and which statement about the trade-offs is most accurate?",
    code: null,
    options: {
      a: "ORMs make SQL knowledge unnecessary, which is their main selling point",
      b: "An ORM maps database rows to objects in your language, eliminating repetitive query/mapping boilerplate and helping prevent injection — but it can hide expensive queries (N+1), and complex queries often still need raw SQL, so you need SQL anyway to use one responsibly",
      c: "ORMs are always slower than raw SQL and should be avoided in production",
      d: "An ORM is a database engine that replaces PostgreSQL or MySQL"
    },
    answer: "b",
    solution: "Correct: b. An ORM (Object-Relational Mapper) bridges two worlds: tables/rows on one side, your language's objects on the other. Instead of hand-writing `SELECT ... WHERE id = ?`, binding parameters, and copying columns into fields, you write `User.findById(5)` and get a typed object — with relationships (`user.orders`), migrations, and parameterization handled. The genuine wins: massive reduction in repetitive CRUD boilerplate, parameterized-by-default queries (injection protection unless you go out of your way), schema migrations as versioned code, and (in typed stacks) compile-time checking of queries against the schema.\n\nThe costs that option b names: **abstraction hides cost** — the classic is N+1, where an innocent loop over `user.orders` lazily fires one query per user; the ORM made the expensive thing *invisible* (fix: eager loading / explicit joins, and watching the query log). Complex reporting queries — window functions, CTEs, vendor-specific tuning — fight the abstraction; every serious ORM has a raw-SQL escape hatch *because you'll need it*. And debugging requires reading the generated SQL, which means... knowing SQL.\n\nWhy the others are wrong: a — the seductive lie; ORMs *reduce SQL typing*, not SQL understanding — devs who can't read the generated queries ship N+1s and table scans; c — overcorrection: for typical CRUD the overhead is negligible and the productivity real; the craft is knowing when to drop down; d — it's a layer *over* your database, not a database.\n\nInterview framing: 'ORMs for the boring 90%, SQL literacy for the hot 10% — and the query log open while developing.'"
  },
  {
    id: "int-052",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Strong consistency versus eventual consistency: explain the difference with a real example, and how systems choose between them.",
    code: null,
    options: null,
    answer: null,
    solution: "**Strong consistency**: after a write completes, every subsequent read — anywhere in the system — sees that write; the system behaves as if there's one copy of the data. **Eventual consistency**: after a write, replicas converge *eventually* (usually milliseconds, sometimes longer); until then, reads may return stale values. The everyday contrast: change your profile photo and a friend sees the old one for a minute — harmless, eventual. Withdraw money — the balance check and the debit must see the same truth, or you double-spend: strong. Why anyone tolerates staleness: **physics and availability**. Once data is replicated across machines (for scale and fault tolerance), keeping every replica synchronously in lockstep means every write waits on network coordination — slower writes — and if replicas can't reach each other (a network partition), you must choose: refuse writes (stay consistent, lose availability) or accept them and reconcile later (stay available, go eventually consistent). That's the **CAP theorem** in one sentence: during a partition, consistency or availability — pick one. How real systems choose — *per feature, not system-wide*: money movements, inventory decrements, username uniqueness → strong (transactions, single-writer, quorum reads); social feeds, like counts, analytics, search indexes, DNS, CDN content → eventual, because stale-for-a-second costs nothing and the scalability payoff is enormous. The practical shapes juniors actually meet: a read replica lagging the primary (user updates email, the replica still serves the old one — fix with read-your-own-writes: route that user's reads to the primary briefly); caches with TTLs (deliberately eventual); and 'it works on refresh' bug reports that are really replication lag. Vocabulary that elevates: 'read-your-writes' and 'monotonic reads' are named guarantees between the extremes. Interview tip: profile photo vs bank balance is the whole concept in one contrast — then 'per-feature choice, not per-system' shows real architectural sense."
  },
  {
    id: "int-053",
    category: "interview",
    difficulty: "basic",
    type: "code",
    question: "A teammate reports: 'calling `applyDiscount` somehow corrupted my original cart!' Predict what the two `console.log` calls print and explain the bug and the fix.",
    code: "function applyDiscount(cart) {\n  for (const item of cart.items) {\n    item.price = item.price * 0.9;\n  }\n  cart.total = cart.items.reduce((s, i) => s + i.price, 0);\n  return cart;\n}\n\nconst myCart = {\n  items: [{ name: \"Book\", price: 20 }],\n  total: 20,\n};\n\nconst discounted = applyDiscount(myCart);\n\nconsole.log(myCart.items[0].price, myCart.total);\nconsole.log(discounted === myCart);",
    options: null,
    answer: null,
    solution: "Output:\n\n18 18\ntrue\n\nThe 'original' cart is corrupted because **there is no original anymore** — `applyDiscount` mutated the object it was given. Objects are passed as references: `cart` inside the function and `myCart` outside are the same object, so `item.price = ...` and `cart.total = ...` rewrite the caller's data in place. Returning `cart` completes the illusion of a 'new' cart, but `discounted === myCart` is `true` — one object, two names.\n\nWhy this bug class hurts: the corruption happens far from where it's observed. The caller later uses `myCart` for the order summary, sees wrong numbers, and nothing at *that* line looks suspicious — spooky action at a distance. Any code holding a reference (an undo feature, a comparison against the pre-discount price, React state) silently breaks.\n\nThe fix — make the function **pure**: take data, return *new* data, touch nothing:\n\nfunction applyDiscount(cart) {\n  const items = cart.items.map((i) => ({ ...i, price: i.price * 0.9 }));\n  return {\n    ...cart,\n    items,\n    total: items.reduce((s, i) => s + i.price, 0),\n  };\n}\n\nNote the copy must reach the depth you change: `{ ...cart }` alone still *shares* the items array (shallow copy), so mapping to fresh item objects is what makes it safe.\n\nThe team rules that prevent it: functions either return new values *or* are explicitly named as mutators; never mutate parameters; document the convention. This is also exactly why React state updates and Redux reducers demand new objects — reference equality is how change is detected."
  },
  {
    id: "int-054",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "An API request includes the header `Authorization: Bearer eyJhbGciOi...`. What is this?",
    code: null,
    options: {
      a: "Basic authentication — the string is the base64 of username:password",
      b: "The standard way to send a token (often a JWT) proving the client's identity/permissions: the 'Bearer' scheme means 'whoever bears this token gets its access' — which is also why tokens must be protected like passwords and sent only over HTTPS",
      c: "A CSRF token that the browser attaches automatically",
      d: "An encrypted copy of the user's password, decrypted by the server on arrival"
    },
    answer: "b",
    solution: "Correct: b. The `Authorization` header is HTTP's standard slot for credentials, and `Bearer <token>` is the dominant modern scheme (from OAuth 2.0): the client obtained a token earlier — by logging in, via an OAuth flow, or as an API key from a dashboard — and presents it on every request. The `eyJ...` prefix is the giveaway of a base64url-encoded JWT (it's `{\"alg\":...` encoded), which the server verifies by signature and reads claims from (user id, expiry, scopes) without a database lookup; opaque random tokens that the server looks up are the alternative flavor.\n\nThe word **bearer** is doing real work: possession *is* authorization — anyone holding the token can use it, like cash. That single fact generates the security rules: HTTPS only (a token sniffed in transit is a stolen identity), short expiries plus refresh tokens to bound the damage window, never put tokens in URLs (they land in logs and history), store carefully on the client (XSS that can read your storage can steal your token), and have a revocation story (stateless JWTs can't be un-issued without denylists or short lifetimes).\n\nWhy the others are wrong: a — Basic auth is a different scheme, literally `Authorization: Basic <base64(user:pass)>` — mostly legacy/internal now; c — CSRF tokens counter the browser's *automatic* attaching of cookies; Bearer headers must be attached by your code, which is incidentally why header-token auth largely sidesteps CSRF; d — passwords are sent once at login (over TLS) and never travel again; the token *replaces* the password thereafter."
  },
  {
    id: "int-055",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "You're asked to review a teammate's pull request. Walk me through how you actually do a good review — what you look for, in what order, and how you write the feedback.",
    code: null,
    options: null,
    answer: null,
    solution: "Start with intent, not lines: read the ticket/description first — a review judges 'does this change accomplish its goal safely?', which you can't assess without knowing the goal. (If the description is empty, that's the first feedback.) Then layered passes, big to small: **(1) Shape** — does the approach make sense? Right layer for the logic, no architecture surprises, reasonable size (a 2,000-line PR gets a respectful request to split — review quality collapses with size). Raising approach concerns *first* beats nitpicking commas on code that needs restructuring. **(2) Correctness** — walk the logic with hostile inputs in mind: edge cases (empty, null, huge, concurrent), error paths (what happens when the API call fails?), off-by-ones at boundaries. Check the *tests*: do they cover the change, would they fail if the logic broke, do they test behavior rather than implementation? **(3) Safety** — anything touching auth, money, PII, SQL, or user input gets the security squint: injection, validation at boundaries, secrets, permissions. Migrations and config: reversible? **(4) Maintainability** — naming that tells the truth, functions of sane size, no reinvention of existing utilities, comments where the *why* is non-obvious. Style nits a linter should own... should be owned by a linter, not your review. Writing the feedback: be specific and actionable ('this throws on empty array — add a guard?' beats 'fragile'); distinguish severity explicitly — blocking issues vs 'nit:' suggestions vs questions; ask genuine questions instead of issuing verdicts ('was there a reason not to reuse X?' — sometimes there was, and you just learned something); praise the good parts (it's signal too); and remember the goal is the *code* improving, not you being right — the author keeps ownership of their solution. Approve when it's good enough, not perfect: 'better than main, no defects I can see' is the merge bar. Interview tip: the ordering — intent, approach, correctness, security, style-last-and-automated — plus 'I separate blocking from nit' is precisely the answer this question wants; it shows you review like a colleague, not a linter with opinions."
  },
  {
    id: "int-056",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your startup wants to use two open-source libraries in its closed-source commercial product: one is MIT-licensed, one is GPL-licensed. Which statement is correct?",
    code: null,
    options: {
      a: "Both are open source, so both can be used freely in closed-source products with no obligations at all",
      b: "The MIT library can be used in the proprietary product with minimal obligations (keep the copyright notice); the GPL library is 'copyleft' — distributing software that incorporates it generally requires releasing your source under the GPL too, so it needs a real legal/architectural decision",
      c: "Neither may ever be used commercially",
      d: "GPL code may be used freely as long as you don't modify it"
    },
    answer: "b",
    solution: "Correct: b. Open-source licenses split into two families. **Permissive** (MIT, Apache 2.0, BSD): do nearly anything — use, modify, sell, keep your product closed — with light obligations (preserve the license/copyright notice; Apache adds an explicit patent grant). That's why MIT/Apache dominate corporate dependency lists. **Copyleft** (GPL family): you get the same freedoms, but the license is 'viral' — *distributing* a work based on GPL code requires offering the combined work's source under the GPL. Linking a GPL library into your proprietary app and shipping it generally triggers that — so for a closed-source product it means open-sourcing, finding an alternative, or buying a commercial dual-license from the author. Nuances that separate informed answers: **LGPL** is the middle child — dynamically linking an LGPL library is generally fine for proprietary apps (modifications to the library itself must be shared); the GPL's trigger is **distribution** — server-side use without shipping binaries traditionally doesn't trigger it, and the **AGPL** exists specifically to close that SaaS loophole (which is why many companies ban AGPL dependencies outright); and 'no license' on GitHub means *all rights reserved* — not free to use.\n\nWhy the others are wrong: a — 'open source' ≠ 'no obligations'; the obligations are exactly what differs; c — both explicitly allow commercial use; d — modification is irrelevant to the GPL's distribution trigger.\n\nThe practical takeaway: dependency licenses are a real engineering checklist item (CI tooling scans for them at most companies), and 'MIT/Apache: yes; GPL: ask; AGPL: escalate' is a serviceable junior heuristic — with a lawyer for the real calls."
  },
  {
    id: "int-057",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What problem does Docker (containerization) actually solve? Explain images vs containers, and why 'works on my machine' stops being an excuse.",
    code: null,
    options: null,
    answer: null,
    solution: "The problem: software doesn't run in isolation — it needs an OS, a runtime at the right version, system libraries, environment variables, config — and every machine has a *different* pile of those. 'Works on my machine' is the symptom: dev has Node 20 and one version of libssl, production has Node 18 and another, and the bug lives in the difference. Docker's answer: **package the application together with its entire environment** into an image, and run that same image everywhere. An **image** is the frozen, immutable blueprint — built from a `Dockerfile` (a script: start from a base image like `node:20-alpine`, copy the code, install dependencies, declare the start command), layered and shareable via registries. A **container** is a *running instance* of an image — isolated process(es) with their own filesystem, network, and process space. Class vs object is the standard analogy: one image, many identical containers. The key technical distinction from a VM: containers **share the host's kernel** and isolate at the process level (namespaces/cgroups), so they start in milliseconds and weigh megabytes, where VMs boot a whole guest OS — that lightness is why your app, database, and cache can run as three containers on a laptop. What it changes in practice: dev/prod parity (the image that passed CI is byte-for-byte what production runs — the same artifact moves through the pipeline, not a rebuilt approximation); onboarding (`docker compose up` replaces a day of install instructions); dependency isolation (two apps needing conflicting library versions stop fighting); and clean horizontal scaling (need capacity? start more identical containers — the substrate orchestrators like Kubernetes manage: scheduling, restarts, rollouts). Honest limits: 'same kernel' means containers aren't full security boundaries like VMs; images go stale (rebuild for security patches); and stateful things (databases) need care — data lives in volumes, not the disposable container layer. Interview tip: 'we ship the environment with the app — image is the blueprint, container is the running copy, and production runs the identical artifact CI tested' is the complete core; the kernel-sharing-vs-VM distinction is the depth check that usually follows."
  },
  {
    id: "int-058",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Fill in the three blanks in this CI pipeline config so it does the conventional thing: install dependencies reproducibly, fail the build on test failures, and only deploy from main after tests pass.",
    code: "name: CI\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ____        # install exactly what the lockfile says\n      - run: npm ____         # run the test suite; non-zero exit fails the job\n\n  deploy:\n    runs-on: ubuntu-latest\n    ____: test               # only run if the test job succeeded\n    if: github.ref == 'refs/heads/main'\n    steps:\n      - run: ./deploy.sh",
    options: null,
    answer: null,
    solution: "The blanks are `ci`, `test`, and `needs`:\n\n- run: npm ci\n- run: npm test\n...\ndeploy:\n  needs: test\n  if: github.ref == 'refs/heads/main'\n\nWhy each is the conventional choice:\n- **`npm ci`** (not `npm install`): installs *exactly* what `package-lock.json` specifies — deletes node_modules first, never updates the lockfile, fails if lockfile and package.json disagree. CI builds must be reproducible; `npm install` can resolve newer versions and silently mutate the lockfile, making 'CI passed' mean something different from 'works locally'. (It's also faster on clean machines.)\n- **`npm test`**: the conventional script entry point. The mechanism worth saying out loud: CI judges success by **exit codes** — the test runner exits non-zero on any failure, the step fails, the job fails, the PR gets a red X. That's the entire contract between test frameworks and CI systems.\n- **`needs: test`**: declares the dependency between jobs, so deploy waits for tests and is skipped if they fail. Combined with the `if:` ref check, deployment happens only for green builds of main — PRs run tests but never deploy. Without `needs`, jobs run in *parallel* and you could deploy code whose tests were still failing.\n\nThe concepts this config encodes — and what's really being tested: pipelines are gates (each stage must pass to proceed), PR validation vs deploy-on-main is the standard flow, and reproducibility (lockfile-exact installs, pinned runtime versions) is what makes a green checkmark trustworthy. Natural extensions: a lint step, dependency caching for speed, building the artifact once and deploying *that artifact*, and environment secrets for the deploy step — never hardcoded."
  },
  {
    id: "int-059",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Your product is expanding from English-only to multiple languages and regions. What is internationalization (i18n) versus localization (l10n), and what code-level traps await a team doing this for the first time?",
    code: null,
    options: null,
    answer: null,
    solution: "**Internationalization (i18n)** is the engineering work of making the codebase *capable* of supporting any language/region — extracting strings, handling formats, removing assumptions. **Localization (l10n)** is producing the content for each specific locale — translations, regional formats, cultural adaptation. i18n is built once by engineers; l10n happens per language, largely by translators. (The abbreviations count the letters between first and last.) The traps, learned by every team the hard way: **(1) Hardcoded and concatenated strings** — every user-visible string must live in resource files keyed by ID, *but* extraction isn't enough: `\"You have \" + n + \" items\"` breaks because **word order differs across languages** — translations need the full sentence as a template (`\"You have {n} items\"`) so translators can move the placeholder. **(2) Plurals** — English has 2 forms; Russian has 3 rules, Arabic 6; `item(s)` hacks don't survive. Use the i18n library's plural API (ICU MessageFormat), never if/else on n===1. **(3) Dates, numbers, currency** — 03/04/2026 is March or April depending on locale; 1,500.00 vs 1.500,00; currency symbols and *where* they go. Never format by string-mashing — use `Intl.DateTimeFormat`/`Intl.NumberFormat` (or equivalents) with the user's locale; store data normalized (UTC timestamps, amounts in minor units + currency code) and localize only at display. **(4) Text expansion** — German runs ~30% longer and breaks your buttons; UIs need to flex. **(5) RTL** — Arabic/Hebrew mirror the whole layout: CSS logical properties (`margin-inline-start`) make this nearly free; hardcoded left/right makes it a rewrite. **(6) Encoding and string ops** — UTF-8 end to end; `toUpperCase()` is locale-sensitive (the Turkish dotless-ı bug is famous), and sorting needs locale collation (`localeCompare`), not code-point order. **(7) Translation workflow** — translations are content with a pipeline: keys, context/screenshots for translators (the string 'Book' — noun or verb?), missing-key fallbacks. Process advice that shows experience: doing i18n *before* you need it is cheap; retrofitting 3,000 hardcoded strings is a quarter-long slog — and pseudo-localization (fake accented expanded text) in CI catches hardcoded strings and layout breakage early. Interview tip: i18n-vs-l10n in one line, then the concatenation/plural/RTL trio — those are the traps every interviewer who's done this work checks you've met."
  },
  {
    id: "int-060",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your web app's database user account has full admin rights 'because it was easier to set up'. Which security principle does this violate, and what's the real-world consequence?",
    code: null,
    options: {
      a: "Defense in depth — the fix is adding a second admin password",
      b: "Least privilege — every component should have only the permissions its job requires; with DB admin rights, any SQL injection or app compromise escalates instantly to full database takeover (DROP TABLE, reading every user's data) instead of being contained",
      c: "Security through obscurity — the fix is renaming the admin account",
      d: "It violates nothing as long as the password is strong"
    },
    answer: "b",
    solution: "Correct: b. The **principle of least privilege**: grant each user, service, and component the minimum access its function requires — nothing more. The app needs SELECT/INSERT/UPDATE/DELETE on its own schema; it does not need DROP, GRANT, superuser, or access to other databases. Why it matters is all about **blast radius**: security design assumes *some* component will eventually be compromised; privileges determine what the attacker gets when it is. With least privilege, a SQL injection in the products search can read/modify app tables — bad, but bounded; with admin rights, the same injection drops tables, reads password hashes from every schema, and pivots deeper. The principle didn't prevent the breach — it **contained** it.\n\nWhere the same principle applies daily (the pattern-recognition this question checks): cloud IAM roles scoped to specific buckets/actions instead of `*:*`; API tokens with read-only scopes when read is all that's needed; CI deploy keys that can deploy one service; containers not running as root; engineers having read-only prod access by default with break-glass escalation. The companion habit: granting is easy, *revoking* is forgotten — periodic permission audits are part of the practice.\n\nWhy the others are wrong: a — defense in depth (multiple overlapping layers) is a real and related principle, but the violation *here* is excess privilege, and 'second password' isn't a layer; c — obscurity (renaming) changes nothing about capability; d — password strength is irrelevant to what happens *after* compromise via injection or a leaked credential — the privileges are the problem.\n\nSoundbite: 'least privilege doesn't stop the break-in; it decides whether the burglar gets one room or the whole building.'"
  }
];
