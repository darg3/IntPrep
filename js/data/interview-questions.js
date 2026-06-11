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
  }
];
