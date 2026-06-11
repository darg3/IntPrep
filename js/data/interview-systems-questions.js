window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["interview-systems"] = [
  {
    id: "ints-001",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "Your `transferMoney` function debits account A and credits account B. The database guarantees that either both updates happen or neither does — even if the server crashes between them. Which ACID property is that?",
    code: null,
    options: {
      a: "Consistency",
      b: "Atomicity",
      c: "Isolation",
      d: "Durability"
    },
    answer: "b",
    solution: "Correct: b. Atomicity means a transaction is all-or-nothing: if any step fails, every step is rolled back, so money can never be debited without being credited.\n\nWhy the others are wrong:\n- a) Consistency means the database moves from one valid state to another (constraints, foreign keys hold) — it relies on atomicity but is not the all-or-nothing guarantee itself.\n- c) Isolation is about concurrent transactions not seeing each other's half-finished work.\n- d) Durability means once committed, the change survives a crash — it says nothing about partial failure mid-transaction."
  },
  {
    id: "ints-002",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "What is a database transaction, and what does it mean to roll one back? Give me a situation where you would definitely want one.",
    code: null,
    options: null,
    answer: null,
    solution: "A transaction is a group of database operations that the database treats as one indivisible unit: you open it with BEGIN, and nothing inside is permanent until you COMMIT. If anything goes wrong before the commit — an error, a constraint violation, a crash — you ROLLBACK, and the database restores every row to the state it was in before the transaction started, as if nothing happened. The classic situation is a money transfer: debit one account, credit another. Those are two separate UPDATE statements, and without a transaction a failure between them silently destroys money. Inside a transaction, a failure on the second update rolls back the first one too. You also want transactions any time several writes must agree with each other — creating an order plus its order items, or deducting inventory plus recording the sale.\n\nInterview tip: say \"all-or-nothing\" and give the transfer example unprompted — that one concrete example is what the interviewer is listening for."
  },
  {
    id: "ints-003",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Spot the bug. In production, users report that money sometimes leaves their account but never arrives at the destination. What is wrong, and how do you fix it?",
    code: "function transfer(fromId, toId, amount) {\n  db.run(\n    \"UPDATE accounts SET balance = balance - ? WHERE id = ?\",\n    [amount, fromId]\n  );\n  notifyUser(fromId, amount); // calls an external service, can throw\n  db.run(\n    \"UPDATE accounts SET balance = balance + ? WHERE id = ?\",\n    [amount, toId]\n  );\n}",
    options: null,
    answer: null,
    solution: "The bug: the two UPDATEs are not wrapped in a transaction, and a fallible external call sits between them. If `notifyUser` throws (or the process dies), the debit has already been applied but the credit never runs — money vanishes.\n\nThe fix has two parts:\n1) Wrap both UPDATEs in a single transaction (BEGIN ... COMMIT, with ROLLBACK in the error path) so they are atomic — either both apply or neither does.\n2) Move the notification out of the transaction entirely, after the COMMIT — ideally onto a message queue. You never want a slow or flaky network call inside a transaction: it holds locks longer and its failure should not undo a valid money movement.\n\nGeneral rule: keep transactions short and free of external side effects (email, HTTP, queues)."
  },
  {
    id: "ints-004",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "A `users` table has 10 million rows. Why does adding an index on `email` make `SELECT * FROM users WHERE email = ?` dramatically faster?",
    code: null,
    options: {
      a: "The index keeps a full copy of the table in RAM so no disk reads are needed",
      b: "The index compresses the table so there is less data to scan",
      c: "The index caches the results of previously executed queries",
      d: "The index is a sorted structure (typically a B-tree) that lets the database jump straight to matching rows instead of scanning every row"
    },
    answer: "d",
    solution: "Correct: d. An index is like the index at the back of a book: a separate, sorted structure (usually a B-tree) mapping column values to row locations. Lookup becomes roughly O(log n) tree descent instead of an O(n) full table scan of 10 million rows.\n\nWhy the others are wrong:\n- a) Indexes live on disk like tables do; they are not a RAM copy of the table.\n- b) Indexes add storage, they do not compress anything.\n- c) Result caching is a different mechanism entirely; an index speeds up finding rows, it does not remember past query results.\n\nWorth saying unprompted: the trade-off is that every INSERT/UPDATE/DELETE must also maintain the index — indexes speed reads but slow writes and cost storage."
  },
  {
    id: "ints-005",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "This report endpoint times out. What single change would you make first, and what cost does that change introduce?",
    code: "-- orders table: 8 million rows\n-- This query takes 12 seconds:\nSELECT id, total, created_at\nFROM orders\nWHERE customer_email = 'sam@example.com'\nORDER BY created_at DESC;\n\n-- EXPLAIN output: Seq Scan on orders\n--   rows examined: 8,000,000",
    options: null,
    answer: null,
    solution: "First change: add an index on the filter column —\n\nCREATE INDEX idx_orders_email ON orders (customer_email);\n\nEven better, a composite index ON orders (customer_email, created_at DESC) lets the database both find the customer's rows and return them already sorted, eliminating the sort step too. The EXPLAIN output is the giveaway: \"Seq Scan\" with 8,000,000 rows examined means the database reads the entire table to find a handful of rows.\n\nThe cost: every future INSERT, UPDATE of those columns, and DELETE on `orders` must also update the index, so writes get slightly slower, and the index consumes disk space. On a write-heavy table you index deliberately, not on every column. Always confirm the fix by re-running EXPLAIN and seeing an Index Scan."
  },
  {
    id: "ints-006",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A `contacts` table stores phone numbers in one column like this: `phones = '555-1001,555-1002,555-1003'`. Which normal form does this design violate first?",
    code: null,
    options: {
      a: "1NF — every column must hold a single atomic value, not a list",
      b: "2NF — every non-key column must depend on the whole primary key",
      c: "3NF — non-key columns must not depend on other non-key columns",
      d: "It violates nothing, as long as the column is indexed"
    },
    answer: "a",
    solution: "Correct: a. First Normal Form requires atomic values: one value per column per row. A comma-separated list crammed into one column breaks that — you cannot index, join, or validate individual numbers, and searching means fragile LIKE '%555-1002%' hacks. The fix is a separate `contact_phones` table with one row per number.\n\nWhy the others are wrong:\n- b) 2NF is about partial dependency on part of a composite key — a different problem, and you only get to 2NF after 1NF holds.\n- c) 3NF is about transitive dependencies (e.g., storing `city` and `zip_code` where city depends on zip) — also not this.\n- d) An index cannot help: the database sees one opaque string, not three values."
  },
  {
    id: "ints-007",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "School teaches you to normalize everything, but in real codebases you will find deliberately denormalized tables. When would you denormalize on purpose, and what new problems do you sign up for?",
    code: null,
    options: null,
    answer: null,
    solution: "Normalization removes duplication so every fact lives in exactly one place — that protects you from update anomalies. But it means reads often need joins, and joins across large tables get expensive. I would denormalize deliberately when a read-heavy path is provably slow: for example, storing `order_count` or `last_order_date` directly on the `users` row instead of counting orders on every profile load, or copying the product name into `order_items` so historical orders show what the product was called at purchase time, or building a flattened reporting table for dashboards. The problems I sign up for: the same fact now lives in two places, so I must keep them in sync — via application code, triggers, or background jobs — and any bug there causes silent data drift that is painful to detect and repair. It also costs extra storage and makes writes more complex.\n\nMy rule: normalize by default, denormalize only with a measurement in hand, and document where each duplicated value is maintained.\n\nInterview tip: the phrase \"normalize until it hurts, denormalize until it works\" lands well — if you can explain what it means."
  },
  {
    id: "ints-008",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "This page works fine in development but hammers the database in production. How many queries does it run for 50 posts, what is this problem called, and how do you fix it?",
    code: "const posts = await db.query(\"SELECT * FROM posts LIMIT 50\");\n\nfor (const post of posts) {\n  post.author = await db.query(\n    \"SELECT * FROM users WHERE id = ?\",\n    [post.authorId]\n  );\n}",
    options: null,
    answer: null,
    solution: "It runs 51 queries: 1 for the posts plus 1 per post for the author. This is the N+1 query problem — the query count grows linearly with the result size, and each query pays network round-trip and parsing overhead, so the database drowns under load even though each individual query is fast.\n\nFixes (any one of these):\n1) A JOIN: SELECT posts.*, users.name FROM posts JOIN users ON users.id = posts.author_id LIMIT 50 — one query.\n2) Batching: collect the author IDs and run one SELECT * FROM users WHERE id IN (...) — two queries total, then stitch in memory.\n3) If using an ORM, turn on eager loading (`include` in Sequelize/Prisma, `with` in Laravel, `select_related`/`prefetch_related` in Django) instead of lazy loading.\n\nIt hides in development because 51 queries against a local database with 10 rows feels instant. Watch your ORM's query log."
  },
  {
    id: "ints-009",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your API opens a brand-new database connection for every incoming request and closes it afterward. Under load, response times spike badly. Why is a connection pool the standard fix?",
    code: null,
    options: {
      a: "Pools encrypt the connection once so later requests skip security checks",
      b: "A pool lets many queries run in parallel over one shared connection",
      c: "Opening a connection is expensive (TCP handshake, TLS, authentication, server-side session setup), so the pool keeps a set of connections open and lends them out for reuse",
      d: "Pools cache query results so repeated queries never hit the database"
    },
    answer: "c",
    solution: "Correct: c. Establishing a database connection costs several network round trips — TCP handshake, TLS negotiation, authentication — plus the database allocating session state (Postgres even forks a process per connection). Paying that on every request can take longer than the query itself. A pool opens, say, 10-20 connections at startup, requests borrow one and return it, and the setup cost is paid once.\n\nWhy the others are wrong:\n- a) Pools reuse connections; they do not let anyone \"skip\" security — each connection authenticated once and stays authenticated.\n- b) One connection generally handles one query at a time; the pool provides multiple connections, not parallelism on a single one.\n- d) Result caching is a separate layer (e.g., Redis); pools reuse the pipe, not the answers.\n\nBonus point: pools also cap total connections, protecting the database from being overwhelmed."
  },
  {
    id: "ints-010",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Your `GET /products/:id` endpoint hits the database on every request and is slow under load. Walk me through adding a Redis cache: what do you store, what TTL do you pick, and what is the hardest part?",
    code: null,
    options: null,
    answer: null,
    solution: "I would use the cache-aside pattern. On each request: check Redis for a key like `product:123`; on a hit, return the cached JSON immediately; on a miss, query the database, store the serialized result in Redis with a TTL, and return it. Redis is in-memory, so hits return in well under a millisecond versus a database query.\n\nThe TTL depends on how stale the data can afford to be: for a product page, something like 5-10 minutes is often fine; for prices or stock counts, much shorter, or do not cache them at all. The TTL is my safety net — even if everything else goes wrong, wrong data expires on its own.\n\nThe hardest part is invalidation: when a product is updated, the cache still holds the old version. So every code path that writes a product must also delete (or overwrite) `product:123`, and it is easy to miss one. I would also mention eviction: Redis has finite memory, so it evicts old entries under a policy like LRU — least recently used — which is usually what you want for a cache.\n\nInterview tip: quoting \"there are only two hard things in computer science: cache invalidation and naming things\" shows you know where the bodies are buried."
  },
  {
    id: "ints-011",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "A user changes their email address, but the app keeps showing the old one — sometimes for days. Spot the bug and give two fixes.",
    code: "async function getUser(id) {\n  const cached = await redis.get(\"user:\" + id);\n  if (cached) return JSON.parse(cached);\n\n  const user = await db.findUser(id);\n  await redis.set(\"user:\" + id, JSON.stringify(user));\n  return user;\n}\n\nasync function updateEmail(id, newEmail) {\n  await db.updateUser(id, { email: newEmail });\n}",
    options: null,
    answer: null,
    solution: "The bug: `updateEmail` writes to the database but never touches the cache, and the cache entry was written with no TTL — so the stale user object lives in Redis forever (until eviction). Reads keep hitting the stale cache entry and never reach the database again.\n\nTwo fixes, and you really want both:\n1) Invalidate on write: in `updateEmail`, after the DB update, call `await redis.del(\"user:\" + id)` so the next read repopulates fresh data. (Alternatively write-through: overwrite the cache entry with the new value.)\n2) Always set a TTL: `redis.set(\"user:\" + id, json, \"EX\", 300)` — five minutes. The TTL is the safety net that bounds staleness when some write path forgets to invalidate.\n\nThis is the classic cache invalidation failure mode: caching added on the read path while the write path was forgotten."
  },
  {
    id: "ints-012",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your `POST /signup` endpoint takes 6 seconds because it sends a welcome email through an SMTP provider before responding. What is the standard architectural fix?",
    code: null,
    options: {
      a: "Raise the HTTP timeout on the client so the request stops failing",
      b: "Push a \"send welcome email\" job onto a message queue, respond to the user immediately, and let a background worker send the email",
      c: "Move the email sending into the frontend so the browser sends it after redirect",
      d: "Cache the email response in Redis so later signups reuse it"
    },
    answer: "b",
    solution: "Correct: b. Sending the email is slow, not essential to complete before responding, and retriable — the textbook profile for a message queue. The endpoint enqueues a small job ({type: 'welcome_email', userId}) and returns in milliseconds; a worker consumes the queue and sends the email. Bonus properties: if the SMTP provider is down, jobs wait and retry instead of failing signups; a spike of 10,000 signups becomes a backlog the workers drain at their own pace (load leveling); and the web tier is decoupled from the email tier.\n\nWhy the others are wrong:\n- a) Hides the symptom; users still wait 6 seconds and the server thread is still tied up.\n- c) The browser cannot and should not talk to your SMTP provider — that would expose credentials and dies if the user closes the tab.\n- d) Caching is for repeated reads; every welcome email is a distinct send, not a cacheable response."
  },
  {
    id: "ints-013",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "What is the difference between TCP and UDP, and give me one real example where you would pick each.",
    code: null,
    options: null,
    answer: null,
    solution: "TCP is connection-oriented and reliable: it does a handshake to establish a connection, numbers every segment, acknowledges receipt, retransmits anything lost, and delivers bytes in order. You pay for that with latency and overhead. UDP is connectionless fire-and-forget: it just sends datagrams with no handshake, no acknowledgment, no retransmission, no ordering guarantee — much lower overhead and latency, but packets can vanish or arrive out of order.\n\nPick TCP when correctness matters more than latency: loading a web page, calling an API, transferring a file, sending email — a missing byte corrupts the result, so HTTP runs on TCP. Pick UDP when freshness matters more than completeness: a video call or live game — if a frame is lost, you do not want it retransmitted, because by the time it arrives it is obsolete; you would rather skip it and stay live. DNS also uses UDP for its tiny query-response exchanges.\n\nInterview tip: the line \"in a video call, a late packet is worse than a lost packet\" shows you understand the why, not just the definitions."
  },
  {
    id: "ints-014",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "One server at IP `203.0.113.7` runs both a web server and a Postgres database. When a packet arrives, what does the port number (443 vs 5432) actually identify?",
    code: null,
    options: {
      a: "Which physical network card on the machine should receive the packet",
      b: "The geographic region the packet was routed through",
      c: "Which version of the encryption protocol to use",
      d: "Which application (process) on that machine the traffic is for"
    },
    answer: "d",
    solution: "Correct: d. The IP address gets the packet to the right machine; the port gets it to the right program on that machine. The OS keeps a table of which process is listening on which port: here the web server listens on 443 and Postgres on 5432, so two services share one IP without interfering. An apartment building is the standard analogy: IP is the street address, port is the apartment number.\n\nWhy the others are wrong:\n- a) Network interfaces are selected by IP/routing, not by port.\n- b) Routing concerns IP addresses; ports are invisible to geographic routing.\n- c) Encryption is negotiated by the protocol (e.g., TLS) after the connection arrives — port 443 is conventionally HTTPS, but the number itself selects the listener, not a cipher.\n\nWorth knowing cold: 80 HTTP, 443 HTTPS, 22 SSH, 5432 Postgres, 3306 MySQL, 6379 Redis."
  },
  {
    id: "ints-015",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "Concurrency and parallelism get used interchangeably, but they are not the same thing. Explain the difference.",
    code: null,
    options: null,
    answer: null,
    solution: "Concurrency is about dealing with many things at once; parallelism is about doing many things at the same instant. A concurrent system structures work so multiple tasks are in progress simultaneously — but they may be interleaved on a single core, taking turns. Parallelism means tasks literally execute at the same moment on different cores. The kitchen analogy: one chef juggling three dishes — chopping while the sauce simmers — is concurrency; three chefs each cooking their own dish is parallelism. So you can have concurrency without parallelism: Node.js handles thousands of simultaneous requests on one thread by interleaving work whenever a task is waiting on I/O. And you can have parallelism without much concurrency structure: splitting one big array across 8 cores to sum it. Rule of thumb: concurrency is the right tool when tasks spend time waiting (network, disk); parallelism is the right tool when tasks are pure computation and you have multiple cores to throw at them.\n\nInterview tip: Rob Pike's line — \"concurrency is about structure, parallelism is about execution\" — is the crisp summary interviewers hope to hear."
  },
  {
    id: "ints-016",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A mutex and a semaphore both control access to shared resources. What is the key difference?",
    code: null,
    options: {
      a: "A mutex is a lock with single ownership — only the thread that locked it may unlock it, and only one holder exists at a time; a counting semaphore admits up to N threads, and any thread may signal it",
      b: "A mutex works across processes while a semaphore only works inside one thread",
      c: "A semaphore is simply a faster implementation of a mutex",
      d: "A mutex automatically prevents deadlock while semaphores cause it"
    },
    answer: "a",
    solution: "Correct: a. A mutex (mutual exclusion) is a key to a single-occupancy room: exactly one thread holds it, and that same thread must release it — ownership is part of the contract. A counting semaphore is a counter of available slots, like a parking lot with N spaces: it lets up to N threads proceed at once, and the signal can come from a different thread than the one that waited.\n\nConcrete uses: a mutex protects a shared data structure so only one thread mutates it at a time; a semaphore initialized to 10 caps you at 10 concurrent connections to a rate-limited API. A binary semaphore (N=1) looks like a mutex but still lacks the ownership rule.\n\nWhy the others are wrong:\n- b) Both can be either intra-process or cross-process depending on the OS primitive used.\n- c) They are different tools, not a speed difference.\n- d) Neither prevents deadlock; misusing either one can produce it."
  },
  {
    id: "ints-017",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Java, JavaScript, and Python all have garbage collection. What does the GC actually do for you — and what kinds of leaks can you still create in a garbage-collected language?",
    code: null,
    options: null,
    answer: null,
    solution: "The garbage collector automatically frees memory occupied by objects that have become unreachable — meaning no chain of references leads to them from the program's roots (globals, stack variables, active closures). You no longer call free() by hand, and a whole class of bugs from manual memory management — use-after-free, double-free — disappears.\n\nWhat it does NOT save you from: anything still reachable cannot be collected, even if you will never use it again. Classic leaks in GC'd languages: a global map or cache that only ever grows; event listeners registered but never removed, which keep their captured objects alive; long-lived closures over large structures; queues nobody drains. The GC sees a live reference and correctly keeps the object — the leak is in your logic.\n\nAlso, GC manages memory only. File handles, sockets, and database connections are OS resources the GC does not promptly release — you must close them explicitly (try-with-resources in Java, `with` in Python, `using` in C#). A program can run out of file descriptors with plenty of free memory.\n\nInterview tip: \"GC frees the unreachable, but reachability is decided by my code — so leaks become a logic bug instead of a bookkeeping bug.\""
  },
  {
    id: "ints-018",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Is JavaScript compiled or interpreted? Where do modern engines like V8 — or Java's JVM — actually sit on that spectrum?",
    code: null,
    options: {
      a: "Purely interpreted: the engine executes the source text line by line every time",
      b: "Fully compiled ahead of time to machine code, like C",
      c: "A hybrid: code is first parsed/compiled to bytecode and interpreted, then a JIT compiler translates hot paths into optimized machine code at runtime",
      d: "Transpiled to C and then compiled by a C compiler"
    },
    answer: "c",
    solution: "Correct: c. The compiled/interpreted line blurred long ago. V8 parses JavaScript to bytecode, an interpreter (Ignition) starts running it immediately, and the engine profiles execution; functions that run hot get compiled to optimized machine code by the JIT (TurboFan) — with the ability to de-optimize if assumptions break. Java is similar with one extra step: javac compiles to bytecode ahead of time, then the JVM interprets and JIT-compiles hot spots. You get fast startup (no full AOT compile wait) plus near-native speed on hot loops, informed by real runtime behavior.\n\nWhy the others are wrong:\n- a) Described 1995 JavaScript; no modern engine re-reads source line by line.\n- b) C-style AOT produces a machine-code binary before running; JS/Java do their final compilation at runtime.\n- d) Transpiling targets other high-level languages (TypeScript to JS); neither V8 nor the JVM goes through C."
  },
  {
    id: "ints-019",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "You are engineer #3 at a startup building a brand-new product. The CTO asks: monolith or microservices? Make the call and defend it.",
    code: null,
    options: null,
    answer: null,
    solution: "Monolith — without hesitation, for a team of three. Microservices buy you independent deployment and scaling per service and team autonomy, but they charge for it in distributed-systems tax: every function call becomes a network call that can fail or time out, debugging needs distributed tracing across services, local development needs orchestration of many processes, and keeping data consistent across services is genuinely hard. Those costs solve problems we do not have: three engineers do not need team autonomy boundaries, and a new product has no scale to isolate. Worse, microservice boundaries drawn before you understand the domain are usually wrong, and moving a boundary between deployed services is far more painful than moving code between modules.\n\nWhat I would actually do: a well-structured \"modular monolith\" — one deployable, one database, but with clean internal module boundaries (billing, auth, catalog) that do not reach into each other's tables. If one piece later needs independent scaling or the team grows past what one codebase supports, those seams make extraction into a service tractable. Microservices solve an organizational scaling problem; we should earn that problem first.\n\nInterview tip: citing that even AWS's Prime Video team famously merged microservices back into a monolith for cost shows you follow real-world engineering, not hype."
  },
  {
    id: "ints-020",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "Your load balancer round-robins across 3 identical servers, but server 2 keeps maxing out — some requests are long-running report exports that pile up on it. Which change addresses this best?",
    code: null,
    options: {
      a: "Enable sticky sessions so each user always lands on the same server",
      b: "Switch to least-connections routing, which sends each new request to the server with the fewest in-flight requests",
      c: "Switch to random selection instead of round robin",
      d: "Move load balancing to DNS round robin so the browser picks the server"
    },
    answer: "b",
    solution: "Correct: b. Round robin counts requests, not load: it deals out requests 1-2-3-1-2-3 regardless of how long each takes, so a server stuck with several slow exports keeps receiving its \"fair share\" on top. Least connections uses in-flight request count as a live proxy for load — a server bogged down with long-running exports holds many open connections, so new traffic flows to the idle servers until it drains.\n\nWhy the others are wrong:\n- a) Sticky sessions pin users to servers, which concentrates load further — it is a workaround for stateful servers, not a load-distribution strategy.\n- c) Random has exactly round robin's flaw: it ignores how busy each server currently is.\n- d) DNS round robin is round robin with extra problems — clients cache DNS answers, so distribution is even less responsive to load.\n\nEven better long-term: move the report exports onto a queue/worker so the web tier never holds long requests at all."
  },
  {
    id: "ints-021",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Your app keeps logged-in sessions in server memory. It worked fine on one server, but after scaling to three servers behind a load balancer, users get randomly logged out. What is happening, and how do you fix it properly?",
    code: null,
    options: null,
    answer: null,
    solution: "The session lives in the RAM of whichever server handled the login. The load balancer then routes the user's next request to a different server, which has never heard of that session — so the user looks logged out. It is intermittent because sometimes the user happens to land on the original server.\n\nThe quick workaround is sticky sessions: the load balancer pins each user to one server. But that is a band-aid — sessions still die whenever that server restarts or is replaced during a deploy, load distributes unevenly, and scaling down kills users' sessions.\n\nThe proper fix is making the servers stateless: no request-spanning state in server memory. Two standard ways: (1) externalize sessions into a shared store — Redis is the classic choice — so every server reads the same session by ID from the cookie; or (2) signed tokens like JWTs, where the session data travels in the token itself and any server can verify the signature without a lookup. Once servers are stateless they become interchangeable: any server can serve any request, so horizontal scaling, rolling deploys, and replacing a dead instance all become trivial.\n\nInterview tip: the one-liner is \"scaling stateless services is easy because every server is identical — state is what makes scaling hard, so push it to the edges (database, Redis, token).\""
  },
  {
    id: "ints-022",
    category: "interview",
    difficulty: "basic",
    type: "code",
    question: "You are reviewing this pull request for a Node.js service. What is wrong here, and how should these values be handled instead?",
    code: "const db = connect(\n  \"postgres://admin:Pr0dPassw0rd@db.internal:5432/shop\"\n);\n\nconst stripe = new Stripe(\"sk_live_51HxR2pK9...\");\n\nconst API_URL = \"https://api.myapp.com\";",
    options: null,
    answer: null,
    solution: "The problem: secrets (the database password, the live Stripe key) and environment-specific config (the DB host, the API URL) are hard-coded into source. Consequences: the secrets are now in git history forever — visible to anyone with repo access and to every laptop that ever cloned it; the same build cannot run against dev, staging, and production since the values are baked in; and rotating a leaked key requires a code change and redeploy.\n\nThe fix: read configuration from environment variables —\n\nconst db = connect(process.env.DATABASE_URL);\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY);\n\nLocally, a `.env` file (listed in `.gitignore`) supplies them via dotenv; in production they come from the platform's secret manager (AWS Secrets Manager, Vault, or the host's env config). This is the twelve-factor principle: config lives in the environment, so the exact same code runs everywhere and secrets never enter version control. One more thing a reviewer must say: these specific credentials are already burned — rotate the database password and Stripe key now, because deleting the line does not delete the git history."
  },
  {
    id: "ints-023",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "Transaction A updates a row but has not committed. Transaction B reads the new uncommitted value and acts on it. Then A rolls back. What is this anomaly called, and which isolation level first prevents it?",
    code: null,
    options: {
      a: "A non-repeatable read; only SERIALIZABLE prevents it",
      b: "A phantom read; REPEATABLE READ prevents it",
      c: "A lost update; READ UNCOMMITTED prevents it",
      d: "A dirty read; READ COMMITTED (and every level above it) prevents it"
    },
    answer: "d",
    solution: "Correct: d. Reading another transaction's uncommitted changes is a dirty read — B acted on data that, after A's rollback, officially never existed. READ COMMITTED, the lowest commonly used level (and Postgres's default), guarantees you only ever see committed data, eliminating dirty reads.\n\nThe ladder, weakest to strongest: READ UNCOMMITTED (allows dirty reads) -> READ COMMITTED (no dirty reads) -> REPEATABLE READ (additionally, re-reading the same row within a transaction gives the same value) -> SERIALIZABLE (transactions behave as if run one at a time; no phantoms).\n\nWhy the others are wrong:\n- a) A non-repeatable read is re-reading a row and getting a different committed value — not reading uncommitted data — and REPEATABLE READ already prevents it.\n- b) A phantom read is a re-run query matching new rows; also a different anomaly.\n- c) A lost update is two transactions overwriting each other's writes, and READ UNCOMMITTED prevents nothing — it is the weakest level.\n\nThe trade-off to mention: stronger isolation means more locking/version checks — safer, but slower and more retries."
  },
  {
    id: "ints-024",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "Predict the output of both `console.log` calls, and explain what this bug looks like to a user.",
    code: "// Node.js\nconst bytes = Buffer.from(\"café\", \"utf8\");\n\nconsole.log(bytes.length);\nconsole.log(bytes.toString(\"latin1\"));",
    options: null,
    answer: null,
    solution: "Output:\n5\ncafÃ©\n\nWhy: \"café\" is 4 characters but 5 bytes in UTF-8 — the first three letters are one byte each, but é (U+00E9) encodes as the two-byte sequence 0xC3 0xA9. So `bytes.length` is 5, not 4: byte length and character length are different things. The second line decodes those same bytes as Latin-1, where every byte is its own character: 0xC3 becomes Ã and 0xA9 becomes © — producing the garbled \"cafÃ©\".\n\nThis is mojibake, and users see it as names like GarcÃ­a or MÃ¼ller in your UI. The root cause is always the same: text encoded with one encoding, decoded with another. The fix is discipline, not cleverness: use UTF-8 everywhere explicitly — when reading files, in HTTP Content-Type charset, in the database connection and column encoding — and never rely on a platform default encoding. Bonus point in interviews: this is also why you must not truncate strings by byte count — you can slice a multi-byte character in half and corrupt the text."
  },
  {
    id: "ints-025",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "This code schedules a daily 9:00 AM reminder by adding 24 hours each day. A user in New York reports that starting March 8, 2026, the reminder fires at 10:00 AM. Spot the bug.",
    code: "// server configured in America/New_York\nlet next = new Date(\"2026-03-07T09:00:00\"); // parsed as local time\n\nfunction scheduleNext() {\n  const DAY_MS = 24 * 60 * 60 * 1000;\n  next = new Date(next.getTime() + DAY_MS);\n  console.log(next.toString());\n}\n\nscheduleNext(); // expected: Mar 08 2026 09:00:00\n                // actual:   Mar 08 2026 10:00:00",
    options: null,
    answer: null,
    solution: "The bug: the code assumes every day is exactly 24 hours. On March 8, 2026, US daylight saving time begins — clocks jump from 2:00 AM straight to 3:00 AM, so that calendar day is only 23 hours long. Adding 24 * 60 * 60 * 1000 milliseconds to 9:00 AM EST lands on 10:00 AM EDT. (At the fall transition the reminder would drift to 8:00 AM instead.) A second bug compounds it: \"2026-03-07T09:00:00\" has no timezone designator, so it is parsed in whatever zone the server happens to run in — the user's actual timezone never enters the picture.\n\nThe fix: never do calendar math by adding fixed milliseconds. Use a timezone-aware library (the Temporal API, Luxon, date-fns-tz) and say what you mean: \"9:00 AM on the next calendar day in America/New_York\" — the library handles DST. Store the user's IANA zone name (\"America/New_York\", never a fixed offset like -05:00, because the offset itself changes twice a year). General rule: store timestamps as UTC instants, store the user's zone separately, and convert only at the edges for display and for local-time rules like \"9 AM daily\"."
  }
];
