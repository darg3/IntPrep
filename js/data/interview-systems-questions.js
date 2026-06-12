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
  },
  {
    id: "ints-026",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Which statement correctly distinguishes a primary key from a unique index, and a clustered from a non-clustered index?",
    code: null,
    options: {
      a: "A primary key and a unique index are the same in every way; clustered and non-clustered indexes are also identical",
      b: "A primary key uniquely identifies a row and cannot be NULL (and there's one per table); a unique index enforces uniqueness on a column but may allow a NULL. A clustered index determines the physical row order on disk (one per table); non-clustered indexes are separate structures pointing back to the rows",
      c: "Primary keys allow duplicates; unique indexes do not",
      d: "Clustered indexes are slower than non-clustered indexes in all cases"
    },
    answer: "b",
    solution: "Correct: b. A **primary key** is the row's canonical identity: unique, non-NULL, one per table — and most databases automatically back it with a unique index plus (in many engines) make it the clustered index. A **unique index** also enforces uniqueness but is more flexible: you can have several per table, it can permit a NULL (NULLs are often treated as distinct), and it expresses 'this column must be unique' without claiming to be the row's identity (e.g. a unique index on `email` alongside an integer primary key). The **clustered** vs **non-clustered** distinction is about physical storage: a clustered index *is* the table — rows are stored on disk in the index's order, so there can be only one (in InnoDB it's the primary key by default). Range scans and lookups by the clustered key are very fast because the data is right there in order. A **non-clustered index** is a separate structure (sorted keys + pointers to the rows), so a lookup finds the key then follows the pointer to fetch the row — an extra step.\n\nWhy the others are wrong: a — they differ in nullability, count, and physical meaning; c — both forbid duplicates (that's the point of 'unique'); d — clustered lookups by the clustering key are typically *faster*, not slower; the trade-off is more nuanced (clustered indexes make the *clustering column* fast but can slow inserts that don't append in order).\n\nThe practical upshot: choosing a primary/clustered key that matches your most common access pattern (and that inserts roughly in order, like an auto-increment id) is a real performance lever, which is why random UUIDs as the clustered key can hurt insert performance."
  },
  {
    id: "ints-027",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What is a deadlock? Give the four conditions required for one, and the common strategies to prevent or recover from deadlocks.",
    code: null,
    options: null,
    answer: null,
    solution: "A deadlock is a standstill where two or more processes (or threads, or database transactions) are each waiting for a resource the other holds, so none can proceed — forever, without intervention. The textbook example: thread A locks resource 1 and wants resource 2; thread B locks resource 2 and wants resource 1; both wait. The **four Coffman conditions**, all of which must hold simultaneously: **(1) Mutual exclusion** — at least one resource is held in a non-shareable mode (only one holder at a time). **(2) Hold and wait** — a process holds at least one resource while waiting to acquire more. **(3) No preemption** — resources can't be forcibly taken away; they're released only voluntarily. **(4) Circular wait** — a cycle of processes each waiting for a resource held by the next. Break *any one* and deadlock becomes impossible — which is exactly how prevention works. The strategies: **Prevention** — attack a condition: most practically, impose a **global lock ordering** (always acquire locks in the same order, e.g. always lock the lower account id first in a money transfer) to make circular wait impossible — the single most common real-world fix; or acquire all needed locks at once (no hold-and-wait), or use lock timeouts (a form of preemption). **Avoidance** — algorithms like Banker's that grant a request only if the system stays in a 'safe' state (theoretically elegant, rarely used in practice — requires knowing resource needs upfront). **Detection and recovery** — let deadlocks happen, detect cycles in the wait-for graph, and break them by killing/rolling back a 'victim' — which is what databases do: they detect a deadlock, abort one transaction with a deadlock error, and expect your application to retry it (so retry-on-deadlock is standard in DB code). The related-but-distinct hazard worth naming: **livelock** (processes keep responding to each other but make no progress — two people stepping side to side in a hallway) and **starvation** (a process is perpetually denied a resource it needs, e.g. low-priority work never scheduled). Interview tip: 'two parties each holding what the other needs' for the definition, then 'consistent lock ordering breaks the circular wait' as the fix you'd actually ship, and 'databases detect and kill a victim, so retry' for the DB case — that trio covers what's asked."
  },
  {
    id: "ints-028",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Two account-transfer requests run concurrently and the app deadlocks under load. Each grabs a lock on the 'from' account, then the 'to' account. What's the fix?",
    code: "function transfer(fromId, toId, amount) {\n  lock(fromId);\n  lock(toId);\n  // ... move the money ...\n  unlock(toId);\n  unlock(fromId);\n}\n\n// Thread 1: transfer(A, B, 100)   // locks A, waits for B\n// Thread 2: transfer(B, A, 50)    // locks B, waits for A\n// -> deadlock",
    options: null,
    answer: null,
    solution: "This is a classic **circular wait** deadlock: thread 1 holds A and wants B; thread 2 holds B and wants A; neither can proceed. It only manifests under concurrency with crossing transfers, so it passes every single-threaded test and surfaces in production — the signature of a lock-ordering bug.\n\nThe fix is a **consistent global lock ordering**: always acquire locks in the same deterministic order regardless of the operation's direction, so a cycle can never form.\n\nfunction transfer(fromId, toId, amount) {\n  // Always lock the lower id first:\n  const [first, second] = fromId < toId ? [fromId, toId] : [toId, fromId];\n  lock(first);\n  lock(second);\n  try {\n    // ... move the money ...\n  } finally {\n    unlock(second);\n    unlock(first);\n  }\n}\n\nNow both threads try to lock A (the lower id) *first*: one wins and proceeds, the other waits for just that one lock — no cycle, no deadlock. Ordering by any stable, total criterion (id, address, name) works; the only requirement is that *everyone* agrees on it.\n\nWhy this is the right approach: it eliminates one of the four required deadlock conditions (circular wait) by construction, so the deadlock is *impossible* rather than merely *unlikely*. Details worth voicing: release in reverse order; use `try/finally` so a thrown error can't leak a held lock (a held-forever lock is its own outage); and consider lock timeouts as a backstop. In a database the analogous fix is the same — touch rows in a consistent order — and databases additionally detect deadlocks and abort a victim, so DB code should also **retry on deadlock errors**. Interview tip: naming 'circular wait' and proposing 'lock in a consistent order (lowest id first)' is exactly the expected answer."
  },
  {
    id: "ints-029",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "What does the OS scheduler do, and what does it mean that a thread is 'blocked' versus 'runnable'?",
    code: null,
    options: {
      a: "The scheduler runs every thread literally simultaneously on a single core",
      b: "The scheduler decides which runnable thread gets the CPU next and time-slices between them to create the illusion of concurrency; a 'runnable' thread is ready and waiting for a CPU, while a 'blocked' thread is waiting on something else (I/O, a lock, a timer) and won't be scheduled until that completes",
      c: "Blocked threads consume 100% CPU while waiting",
      d: "The scheduler only runs when the program explicitly calls it"
    },
    answer: "b",
    solution: "Correct: b. A single CPU core runs one thread at a time; the **scheduler** is the OS component that rapidly switches between threads (a **context switch** saves one thread's registers/state and loads another's), giving each a small **time slice** so that — across milliseconds — many threads appear to run at once. That's *concurrency* (interleaving) on one core; true *parallelism* needs multiple cores. Threads move through states: **running** (currently on a CPU), **runnable/ready** (able to run, just waiting its turn for a core), and **blocked/waiting** (parked because it needs something not yet available — disk or network I/O, a lock held by someone else, a `sleep` timer, a condition variable). The crucial efficiency point: a **blocked thread consumes no CPU** — the scheduler simply doesn't pick it until whatever it's waiting on signals readiness (the I/O completes, the lock frees), at which point it returns to runnable. This is *why* I/O-bound servers can handle thousands of concurrent connections: most threads are blocked on the network at any instant, so they cost nothing, and a few runnable ones share the cores.\n\nWhy the others are wrong: a — one core = one thread at a time; simultaneity is an illusion from fast switching (or real only across cores); c — the whole benefit of blocking is that it *yields* the CPU rather than busy-waiting (busy-waiting/spinlocks *do* burn CPU, which is exactly why blocking is preferred for anything but the briefest waits); d — scheduling is preemptive and continuous (timer interrupts), not something the program invokes.\n\nThe connection that elevates the answer: this state model is *why* async I/O and thread pools exist — keep threads off the blocked path, and a small number of them can serve enormous concurrency; and context switches aren't free (cache effects, kernel crossings), which is why spawning thousands of OS threads is worse than a pool plus async."
  },
  {
    id: "ints-030",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What is the difference between the stack and the heap in a running program? What lives in each, who manages them, and what failure modes belong to each?",
    code: null,
    options: null,
    answer: null,
    solution: "Both are regions of a process's memory, but they're organized and managed completely differently. The **stack** holds the call chain: each function call pushes a **stack frame** containing its parameters, local variables, and the return address; when the function returns, its frame is popped and that memory is instantly reclaimed. It's a LIFO structure, managed *automatically* by the compiler/runtime — you never free a local variable — and allocation is essentially free (just move the stack pointer). It's also small and fixed (commonly 1–8 MB per thread) and excellent for the CPU cache because it's contiguous and reused. Its failure mode is the **stack overflow**: too many nested frames — unbounded recursion or a huge local array — exhaust the fixed space. The **heap** is the pool for dynamic, long-lived, or large allocations whose size or lifetime isn't known at compile time, or that must outlive the function that created them. It's much larger (limited by available RAM), but allocation is more expensive (the allocator must find a suitable free block, dealing with fragmentation), access is less cache-friendly (objects scattered by address), and **lifetime management is the hard part** — in manual-memory languages (C/C++) you must `free`/`delete` exactly once, with the classic failure modes being **memory leaks** (never freeing — slow growth until exhaustion), **use-after-free** and **double-free** (freeing too eagerly — corruption/crashes/exploits), and **dangling pointers**. Garbage-collected languages (Java, JS, Python, Go) automate heap reclamation via reachability, trading those bugs for GC pauses and the subtler 'leak' of *unintentionally retained references*. The decision in practice: small, short-lived, known-size data → stack (a local `int`, a small struct, a function's working variables); data that must outlive the call, is large, or is dynamically sized → heap (anything you `new`/`malloc`, growable collections, returned objects). And the bridge concept worth naming: a variable can *live on the stack* while *pointing to* an object on the heap — `obj` (the reference) is a stack local, the object it references is on the heap. Interview tip: 'stack = automatic, LIFO, fast, small, for call-local data — overflows; heap = manual or GC'd, large, flexible-lifetime, for dynamic data — leaks and use-after-free' is the complete contrast, and the stack-pointer-to-heap-object distinction shows you understand how they interact."
  },
  {
    id: "ints-031",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "An app loops over 10 million records summing a field, and it's slow despite the CPU not being maxed out. A profiler shows most time in 'cache misses'. What does this most likely indicate, and what's a common fix?",
    code: null,
    options: {
      a: "The CPU is broken and should be replaced",
      b: "The data layout is cache-unfriendly: the program is chasing pointers across scattered memory (e.g. an array of pointers to objects, or a linked list), so the CPU stalls waiting on RAM. Storing the data contiguously (arrays of values, struct-of-arrays) improves cache locality and speed",
      c: "Cache misses are unrelated to performance",
      d: "Adding more threads always fixes cache misses"
    },
    answer: "b",
    solution: "Correct: b. Modern CPUs are vastly faster than main memory — a RAM access costs ~100 ns while an L1 cache hit is ~1 ns — so the CPU keeps small fast **caches** (L1/L2/L3) of recently and nearby used data. When the data the program needs isn't cached (a **cache miss**), the core *stalls* waiting on RAM, which is why you see low CPU utilization *and* slowness: the CPU isn't doing work, it's waiting. The cache loads memory in **cache lines** (~64 bytes) and prefetches sequential addresses, so the speed depends enormously on *data layout*. The slow pattern is pointer-chasing: a linked list, a tree, or an array of *pointers* to heap objects scatters the actual data all over memory, so each step is a cache miss and the prefetcher can't help. The fix is **cache locality**: store the data **contiguously** so iteration walks linear memory the prefetcher loves — an array of values instead of an array of pointers, or the **struct-of-arrays** layout (separate parallel arrays per field) instead of array-of-structs when you only touch one field, so you don't drag unused fields through the cache. This can be a multiple-x speedup with no algorithmic change — same Big-O, dramatically better constant factor, because Big-O ignores the memory hierarchy.\n\nWhy the others are wrong: a — the CPU is fine, it's waiting on memory by design; c — cache misses are often *the* dominant cost in data-heavy loops; d — more threads can even *worsen* it (cache contention, false sharing) and doesn't fix the underlying scattered layout.\n\nThe broader lesson interviewers like: algorithmic complexity is the first lever, but for hot data-processing loops, *memory access patterns* are the second — 'an O(n) loop over contiguous data beats an O(n) loop over a linked list by 10×' is a real and counterintuitive performance fact, and it's why game engines and high-performance code obsess over data-oriented design."
  },
  {
    id: "ints-032",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Predict the two printed lines and explain why the second is a problem in a long-running server.",
    code: "// A naive in-memory cache that never evicts\nconst cache = new Map();\n\nfunction getUser(id) {\n  if (!cache.has(id)) {\n    cache.set(id, fetchUserFromDb(id)); // big object\n  }\n  return cache.get(id);\n}\n\n// Over weeks of uptime, millions of distinct ids are requested\nconsole.log(\"works:\", getUser(1) !== undefined);\nconsole.log(\"cache size after millions of unique ids:\", cache.size);",
    options: null,
    answer: null,
    solution: "Output (conceptually):\n\nworks: true\ncache size after millions of unique ids: <millions>   // and climbing forever\n\nThe first line is fine — the cache works. The second is a **memory leak by unbounded growth**. This `Map` only ever *adds* entries and never removes them, so in a long-running server that sees many distinct ids over time, it grows without limit until the process exhausts memory and crashes (or triggers severe GC pressure / an out-of-memory kill). Note it's not a 'leak' in the classic dangling-pointer sense — every entry is perfectly reachable — which is exactly the subtle GC-language leak: **unintentionally retained reachability**. A cache that never forgets is a memory leak with good intentions.\n\nThe fixes, by situation:\n- **Bound the cache with an eviction policy** — most commonly **LRU** (least-recently-used): cap the size (say 10,000 entries) and evict the oldest-used when full. Libraries (`lru-cache`) do this; the size cap is the key idea.\n- **TTL expiration** — entries expire after N seconds, which also solves the *staleness* problem (a never-evicting cache also serves outdated data forever if the underlying record changes).\n- **An external cache** — Redis with `maxmemory` + an eviction policy moves the concern out of process and shares it across instances.\n- If keys are objects you don't otherwise retain, a **`WeakMap`** lets entries be garbage-collected when the key is no longer referenced elsewhere — but that doesn't apply to primitive ids like here.\n\nThe principle: **every cache needs a bound** — a max size, a TTL, or both. 'Cache' without an eviction story is just a slow memory leak. Interview tip: spotting unbounded growth and naming 'LRU eviction or a TTL' is the expected answer; adding 'and it also serves stale data' shows you see both failure modes."
  },
  {
    id: "ints-033",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Explain the CAP theorem in plain terms. Why is the 'choice' really only forced during a network partition, and how does this shape real database choices?",
    code: null,
    options: null,
    answer: null,
    solution: "CAP is about distributed systems that replicate data across nodes, and it names three properties: **Consistency** (every read sees the most recent write — all nodes agree), **Availability** (every request gets a non-error response), and **Partition tolerance** (the system keeps working when the network between nodes drops messages). The theorem: when a **partition** happens — nodes can't talk to each other — you can guarantee at most *two* of the three, and since partitions are a fact of life in any real network (cables fail, switches die, packets drop), partition tolerance isn't optional. So the real, forced choice during a partition is **C or A**. The often-missed subtlety, and the part interviewers probe: *when there's no partition*, you get both C and A — the trade-off only bites during the failure. So CAP isn't 'pick two forever'; it's 'decide how you behave when the network splits.' The two behaviors: a **CP** system, when partitioned, refuses or delays requests it can't make consistent — it sacrifices availability to never return wrong data (a bank balance must be right; better an error than a double-spend). A **CA-leaning / AP** system stays available, accepting writes on both sides of the partition and reconciling later — it sacrifices immediate consistency for uptime (a social feed, a shopping cart — better stale-but-up than down). This maps onto eventual vs strong consistency and drives database choices: traditional relational databases and strongly-consistent stores lean **CP** (correctness first); many NoSQL systems (Dynamo-style, Cassandra) lean **AP** (availability and scale first, eventual consistency, conflict resolution like last-write-wins or vector clocks). The mature framing that goes beyond the textbook: it's **per-operation, not per-system** — the *same* application makes payments CP and 'recently viewed' AP; and the **PACELC** extension adds the everyday dimension CAP ignores — *else* (when there's no partition) you still trade **L**atency vs **C**onsistency (synchronous replication for consistency is slower; async is faster but can read stale). Interview tip: define the three letters, then immediately say 'the choice is only forced *during a partition*, and it's really C-vs-A then' — that single correction is what separates someone who memorized CAP from someone who understands it; bank-balance-CP vs social-feed-AP makes it concrete."
  },
  {
    id: "ints-034",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your service writes to a database and then publishes an event to a message queue. Occasionally the DB write succeeds but the event is never published (the process crashed in between), leaving downstream systems out of sync. What pattern addresses this?",
    code: null,
    options: {
      a: "Wrap both operations in a try/catch and log errors",
      b: "The transactional outbox pattern: write the event into an 'outbox' table in the same database transaction as the business data, then a separate process reliably reads the outbox and publishes to the queue — so the event is guaranteed to be recorded atomically with the data and eventually delivered",
      c: "Publish to the queue first, then write to the database",
      d: "Retry the publish 3 times and give up"
    },
    answer: "b",
    solution: "Correct: b. The root problem is the **dual-write**: you're writing to two separate systems (database + message queue) that can't share a single atomic transaction, so any crash between them leaves them inconsistent — the DB says the order exists, the queue never heard about it, and downstream consumers never react. No amount of try/catch fixes this, because the failure is the process *dying* between the two writes, when no catch block runs. The **transactional outbox** pattern makes the event part of the *same* database transaction as the data: in one atomic commit you insert the business row *and* insert a row into an `outbox` table describing the event. Either both land or neither does — the database's ACID guarantee now covers the event's existence. Then a separate **relay/poller** (or change-data-capture tailing the DB log, e.g. Debezium) reads unpublished outbox rows and publishes them to the queue, marking them sent. If the relay crashes, it just re-reads and re-publishes on restart — which means delivery is **at-least-once**, so consumers must be **idempotent** (the same event may arrive twice). The result: atomic recording + eventually-guaranteed delivery, with the consistency window moved from 'lost forever' to 'delivered slightly later.'\n\nWhy the others are wrong: a — logging the error doesn't recover the lost event, and a crash skips the catch entirely; c — publishing first just inverts the failure (event published, but the DB write fails — now downstream acts on data that doesn't exist, often worse); d — bounded retries still lose the event if all attempts fail or the process dies mid-retry, and they don't help if the crash is *before* the publish call.\n\nThe family this belongs to: it's how you get reliable messaging without distributed transactions (two-phase commit), which are heavyweight and often unsupported across a DB and a queue. Related vocabulary worth dropping: the **saga** pattern for multi-service transactions, and **idempotency keys** for safe at-least-once processing."
  },
  {
    id: "ints-035",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What is virtual memory, and what problem does it solve? Briefly explain pages, swapping, and what 'thrashing' is.",
    code: null,
    options: null,
    answer: null,
    solution: "Virtual memory is the abstraction where every process gets its own large, contiguous **virtual address space** that the OS and CPU (via the MMU — memory management unit) transparently map onto actual physical RAM (and disk). It solves several problems at once. **Isolation/protection**: each process sees its own address space and literally *cannot* address another process's memory (process A's address 0x1000 maps to different physical memory than process B's 0x1000), so a buggy or malicious program can't read or corrupt others — a foundational security boundary. **Simplicity**: programs are written as if they own a clean, contiguous memory range starting at zero, regardless of where their pieces actually sit in fragmented physical RAM. **Overcommit**: the system can offer more virtual memory than physical RAM exists, because not all of it is used at once. The unit is the **page** (typically 4 KB): virtual memory is divided into pages, physical memory into frames, and a per-process **page table** records the mapping; the MMU translates on every access (cached in the TLB for speed). When physical RAM fills up, the OS **swaps** (pages out) less-recently-used pages to disk, freeing frames for what's needed now; touching a paged-out address triggers a **page fault**, and the OS pages it back in from disk — slow, because disk is ~100,000× slower than RAM, but invisible to the program except as a delay. **Thrashing** is the pathological state where the working set (the pages actively needed) exceeds physical RAM, so the system spends almost all its time swapping pages in and out rather than doing real work — the machine grinds to a near-halt, disk light solid, CPU mostly idle waiting on I/O. It's the 'my computer froze when I opened too many tabs' phenomenon, and the practical signal that you need more RAM or less concurrent memory pressure. The connections worth naming: this is *why* memory leaks eventually destroy performance (growing working set → swapping → thrashing → OOM kill); why the stack-vs-heap and cache-locality discussions matter (it's all the memory hierarchy — registers → cache → RAM → disk, each ~orders of magnitude slower); and why `mmap`, copy-on-write `fork`, and shared libraries are efficient (pages shared/lazily copied via the same mapping machinery). Interview tip: 'each process gets its own virtual address space mapped to physical RAM in pages, giving isolation and the illusion of contiguous memory; when RAM runs short the OS swaps pages to disk, and thrashing is when it's swapping so much nothing else gets done' is the complete, well-shaped answer."
  },
  {
    id: "ints-036",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Predict the output, and explain what's wrong with using floating-point for money — and what to do instead.",
    code: "let total = 0;\nfor (let i = 0; i < 10; i++) {\n  total += 0.1;\n}\nconsole.log(total);\nconsole.log(total === 1.0);\nconsole.log((0.1 + 0.2) === 0.3);",
    options: null,
    answer: null,
    solution: "Output:\n\n0.9999999999999999\nfalse\nfalse\n\nThe cause: `0.1` cannot be represented exactly in binary floating point (IEEE 754), any more than `1/3` can be written exactly in decimal — it's stored as the nearest representable value, slightly off. Each of the ten additions accumulates a tiny rounding error, so the sum lands just below 1.0, and the equality checks fail. `0.1 + 0.2` is famously `0.30000000000000004`. This isn't a JavaScript quirk — it's how nearly every language's `float`/`double` works (the same bits underlie C, Java, Python floats); JS just exposes it because all its numbers are doubles.\n\nWhy this is dangerous for money: a billing system that adds prices in floating point will, over many operations, produce totals that are off by a cent — and worse, comparisons like 'did the payment exactly equal the invoice?' silently fail, sums don't reconcile, and rounding for display hides errors that still compound underneath. Financial code cannot tolerate 'approximately.'\n\nWhat to do instead:\n- **Store money as integers in the smallest unit** — cents (or pennies, or even tenths-of-a-cent for tax math): `1999` cents instead of `19.99` dollars. Integer arithmetic is exact, and you divide by 100 only for display. This is the standard approach (and what Stripe's API does — amounts are integer cents).\n- **Use a decimal/big-number type** when integers are awkward — Java's `BigDecimal`, Python's `decimal.Decimal`, JS libraries like `decimal.js`, or a database `DECIMAL`/`NUMERIC` column (never `FLOAT`/`REAL` for money). These do exact base-10 arithmetic.\n- **Never compare floats with `===`** in general — use a tolerance (`Math.abs(a - b) < Number.EPSILON`) — but for money, avoid floats entirely rather than tolerating them.\n\nInterview tip: '0.1 isn't exact in binary, errors accumulate, so store money as integer cents or use a decimal type — and never `==` floats' is the complete answer; naming `BigDecimal`/`DECIMAL` columns shows production awareness."
  },
  {
    id: "ints-037",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "What is the N+1 query problem, and which fix is generally correct?",
    code: null,
    options: {
      a: "Running one query that's too complex; the fix is to split it into many small queries",
      b: "Fetching a list with 1 query, then firing 1 additional query per item to load its related data (N items → N+1 total queries) — usually from a loop or lazy-loaded ORM relationship; the fix is to load the related data in bulk (a JOIN, or a single 'WHERE id IN (...)' query, i.e. eager loading)",
      c: "A database that can only handle N+1 connections",
      d: "An indexing problem fixed by adding more indexes"
    },
    answer: "b",
    solution: "Correct: b. The N+1 problem: you fetch a list of N parent records with one query, then — often inside a loop, or triggered by an ORM's lazy-loaded relationship — you run *one more query per parent* to fetch each one's related data. Rendering 50 blog posts with their authors becomes 1 query for the posts + 50 queries for the authors = 51 round trips. It's insidious because it *works perfectly in development* (10 records, 11 fast queries on a local DB feels instant) and only melts down in production where 1,000 records means 1,001 round trips, each carrying network latency — the classic 'fast on my machine, times out in prod' bug. The ORM convenience that makes it easy (`post.author` transparently fires a query) is exactly what hides it. The fixes, all forms of loading the related data *in bulk*: **(1) Eager loading / a JOIN** — fetch posts and authors together in one query (`JOIN`), or the ORM's eager-load directive (`include`, `with`, `joinedload`, `prefetch_related`). **(2) The IN-query / batch approach** — fetch the posts, collect all their author ids, then one query `WHERE author_id IN (...)` and stitch in memory; this is what tools like GraphQL's DataLoader do automatically (batch + dedupe per request). Either way you go from N+1 queries to **2 (or 1)**.\n\nWhy the others are wrong: a — it's the opposite (too *many* small queries, not one big one — the fix consolidates, not splits); c — nothing to do with connection counts; d — indexes speed up *each* query but don't reduce the *number* of round trips, which is the actual problem (an N+1 of indexed queries is still N+1 round trips).\n\nThe detection-and-prevention note that shows experience: watch the **query log** in development (seeing the same query repeat with different ids is the fingerprint), use ORM query-count assertions in tests, and reach for eager loading by default on relationships you'll render. It's probably the single most common database performance bug juniors ship."
  },
  {
    id: "ints-038",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Process versus thread: what does each get its own copy of, what do they share, and what are the practical consequences for building concurrent software?",
    code: null,
    options: null,
    answer: null,
    solution: "A **process** is an instance of a running program with its *own* isolated memory address space (heap, stack, code, data), plus its own file descriptors and OS resources. A **thread** is a unit of execution *within* a process: a process can have many threads, and they **share** the process's memory (heap, globals, open files) while each gets its *own* stack and registers/program counter. That sharing-vs-isolation split drives every practical consequence. **Communication**: threads share memory, so they exchange data by simply reading/writing the same variables — fast and easy. Processes are isolated, so they must use explicit inter-process communication (IPC): pipes, sockets, message queues, or shared-memory segments — slower and more ceremony, but cleaner boundaries. **Safety/isolation**: a crash in one thread (segfault, corruption) takes down the *whole process* and all its threads, because they share memory; a crash in one process leaves siblings untouched — which is exactly why browsers run each tab in a separate process (one tab crashing doesn't kill the browser) and why robust servers often use a multi-process model. The flip side: shared thread memory means **race conditions** and the need for synchronization (mutexes, locks) — concurrency bugs that process isolation avoids by construction. **Cost**: creating a process is heavier (new address space, OS bookkeeping) and context-switching between processes is more expensive (the MMU must swap page tables, flushing caches/TLB); threads are lighter to create and switch. The practical decision: use **threads** for tightly-coupled work that shares lots of data and where the speed of shared memory matters (a server handling requests that touch shared caches), accepting the burden of synchronization; use **processes** for isolation, fault containment, or security boundaries (sandboxing untrusted work, the browser-tab model, or sidestepping a runtime's limits — e.g. Python's GIL means CPU-bound parallelism often needs multiple *processes*, not threads). The modern nuance worth adding: many high-concurrency systems avoid OS threads-per-task entirely, using **async I/O / event loops** (one thread, many concurrent I/O-bound operations via non-blocking calls) or lightweight green threads / goroutines, because OS threads have real memory and switching costs that don't scale to hundreds of thousands of connections. Interview tip: 'processes are isolated with separate memory (safe, but IPC to communicate); threads share the process's memory (fast communication, but races and a shared fate on crash)' is the core; the browser-tab example and 'Python GIL → use processes for CPU parallelism' are the details that land."
  },
  {
    id: "ints-039",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Spot the concurrency bug: two requests both try to register the username 'alice' at nearly the same moment, and both succeed, creating a duplicate. The check looks correct. What's wrong, and how do you fix it properly?",
    code: "async function register(username, password) {\n  const existing = await db.query(\n    \"SELECT id FROM users WHERE username = ?\", [username]\n  );\n  if (existing.length > 0) {\n    throw new Error(\"Username taken\");\n  }\n  await db.query(\n    \"INSERT INTO users (username, password_hash) VALUES (?, ?)\",\n    [username, hash(password)]\n  );\n}",
    options: null,
    answer: null,
    solution: "This is a **race condition** — specifically a check-then-act (TOCTOU: time-of-check to time-of-use) bug. Two concurrent requests both run the SELECT *before* either runs the INSERT, both see zero existing rows, both conclude the username is free, and both INSERT — creating a duplicate. The check is correct in isolation; the flaw is that the gap between checking and acting isn't atomic, so a competing request slips in. It passes every single-threaded test and only appears under concurrency, which is the signature.\n\nThe proper fix is to make the database enforce uniqueness, not the application logic:\n\n-- The real fix: a unique constraint the DB enforces atomically\nALTER TABLE users ADD CONSTRAINT uq_username UNIQUE (username);\n\nThen the code attempts the insert and *handles the constraint violation*:\n\ntry {\n  await db.query(\"INSERT INTO users (username, password_hash) VALUES (?, ?)\", [username, hash(password)]);\n} catch (e) {\n  if (e.code === \"ER_DUP_ENTRY\" /* or 23505 in Postgres */) {\n    throw new Error(\"Username taken\");\n  }\n  throw e;\n}\n\nWhy this works where the SELECT-then-INSERT doesn't: the unique constraint is checked **atomically** by the database at insert time, under its own locking — two concurrent inserts can't both win, the database guarantees it. One succeeds, the other gets a duplicate-key error you translate into the user-facing message. This is the 'let the database enforce invariants' principle: application-level checks are a UX nicety (a friendlier early error), but the *correctness guarantee* must live where the atomicity lives — in the DB constraint.\n\nThe general lessons: **check-then-act across a concurrency boundary is a bug**; push uniqueness/invariants into database constraints (unique indexes, foreign keys, CHECK constraints) rather than hoping application code wins the race; and the same pattern (atomic compare-and-set, conditional UPDATE, `INSERT ... ON CONFLICT`) recurs anywhere two requests contend. Interview tip: naming 'race condition / TOCTOU' and 'add a unique constraint and handle the violation' is exactly the expected answer — and noting that the app-level check is fine as a *first-line UX check* but not the guarantee shows real understanding."
  },
  {
    id: "ints-040",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "Your team debates whether to add a NoSQL document database alongside the existing relational database. Which statement best captures when a document store (like MongoDB) is a better fit than a relational database?",
    code: null,
    options: {
      a: "NoSQL is always faster and more modern, so it should replace relational databases everywhere",
      b: "Document stores fit data that's naturally hierarchical/self-contained and read together as a unit, with flexible/evolving schemas and a need for easy horizontal scaling — while relational databases win when data is highly relational with many-to-many joins, needs strong multi-row transactional integrity, and benefits from a rigid schema and ad-hoc querying",
      c: "Relational databases cannot scale at all, so NoSQL is required past a few thousand rows",
      d: "NoSQL databases don't support indexes or queries"
    },
    answer: "b",
    solution: "Correct: b. The choice is about *data shape and access patterns*, not newness. **Document stores** (MongoDB, DynamoDB-style) store self-contained documents (JSON-like) and shine when: the data is naturally **hierarchical and read/written as a unit** (a product with its nested variants, specs, and images; an event with all its properties) so you fetch the whole thing in one read without joins; the **schema is flexible or evolving** (different documents can have different fields — good for varied or rapidly-changing structures); and you want **straightforward horizontal scaling** (many are built to shard across nodes from the start, often choosing AP/eventual consistency for availability). **Relational databases** win when: the data is **highly relational** with lots of many-to-many relationships and you need real **JOINs** (users ↔ orders ↔ products ↔ categories); you need **strong transactional integrity across multiple rows/tables** (ACID — money movements, inventory, anything where partial updates are catastrophic); you benefit from a **rigid, enforced schema** (constraints, foreign keys catching bad data at write time); and you'll run **ad-hoc/analytical queries** the data model wasn't pre-shaped for (SQL's flexibility). The mature framing: it's **not either/or** — many systems use both (relational for the transactional core, a document or key-value store for a specific high-volume or flexible-schema workload — *polyglot persistence*), and the default for most apps is still a relational database because most business data *is* relational and most teams need transactions and ad-hoc queries; reach for NoSQL when a specific access pattern genuinely fights the relational model.\n\nWhy the others are wrong: a — 'always faster/more modern' is marketing, not engineering; the right tool depends on the workload, and NoSQL trades away joins and (often) strong consistency; c — relational databases scale to enormous size (with replicas, partitioning, caching) and serve the majority of large systems; d — document stores have rich indexing and query capabilities (they'd be useless without them) — the differences are in the *data model* and *consistency/scaling trade-offs*, not the existence of indexes."
  },
  {
    id: "ints-041",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What is an idempotent operation, why does idempotency matter so much in distributed systems and APIs, and how do you make a non-idempotent operation safe to retry?",
    code: null,
    options: null,
    answer: null,
    solution: "An operation is **idempotent** if performing it multiple times has the same effect as performing it once. `SET balance = 100` is idempotent (run it ten times, balance is 100); `ADD 100 to balance` is *not* (ten times adds 1000). In HTTP, GET, PUT, and DELETE are defined as idempotent (deleting an already-deleted resource leaves it deleted), while POST generally is not (each POST creates a new resource). Why it matters enormously: **networks are unreliable, so retries are unavoidable** — a client sends a request, the network drops the *response*, and the client genuinely cannot tell whether the operation happened. Its only safe move is to retry. If the operation is idempotent, retrying is harmless. If it isn't — say 'charge the card $50' — the retry might charge *twice*, because the first one may well have succeeded; the client just never heard back. This is *the* classic distributed-systems failure, and it's why 'just retry on timeout' is dangerous for non-idempotent operations. How to make a non-idempotent operation safe to retry: the standard technique is an **idempotency key** — the client generates a unique id for the *intended* operation (e.g. a UUID) and sends it with the request; the server records 'I processed key abc123 → result X' and, on seeing the same key again, *returns the original result without re-executing*. Now the client can retry freely: the first request charges the card and records the key; the retry finds the key and returns the same success, no double charge. (This is exactly how Stripe's API works — every charge takes an `Idempotency-Key` header.) Other approaches: design operations to be **naturally idempotent** where possible (use PUT-style 'set to this state' instead of 'increment'; use 'create with this client-supplied id' so a duplicate create is a no-op via a unique constraint); use **conditional operations** (compare-and-set, optimistic concurrency with a version number) so a stale retry is rejected; and at the messaging layer, deduplicate by message id since queues deliver **at-least-once**. The connections worth naming: idempotency is what makes safe **retries** possible (pairs with exponential backoff), what makes **at-least-once message delivery** workable (consumers dedupe), and a prerequisite for the **transactional outbox** and **saga** patterns. Interview tip: 'same effect no matter how many times you run it; it matters because dropped responses force retries and you can't tell if the first attempt worked; make it safe with an idempotency key the server dedupes on' — that three-part answer, plus the Stripe example, is exactly what's being probed."
  },
  {
    id: "ints-042",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Predict the printed output, and explain the integer-overflow bug and how you'd prevent it in a 32-bit context.",
    code: "// Pretend these are 32-bit signed integers (e.g. C int, or Java int)\nint a = 2000000000;\nint b = 2000000000;\nint sum = a + b;        // overflow!\nprintf(\"%d\\n\", sum);\n\n// Computing an array midpoint the naive way:\nint low = 1500000000, high = 2000000000;\nint mid = (low + high) / 2;\nprintf(\"%d\\n\", mid);",
    options: null,
    answer: null,
    solution: "Output (32-bit signed):\n\n-294967296\n-397483648\n\nA 32-bit signed integer maxes out at **2,147,483,647** (2³¹−1). Adding 2,000,000,000 + 2,000,000,000 = 4,000,000,000 exceeds that, so it **overflows** and **wraps around** to a negative number — there's no 33rd bit to carry into, and the high bit now reads as the sign bit. (In C, signed overflow is formally *undefined behavior*, so the compiler may do even stranger things; in Java it wraps deterministically.) The second case is the famous one: `(low + high) / 2` is the textbook way to compute a midpoint in **binary search**, and it harbors this exact bug — when `low + high` exceeds the int max, the sum wraps negative and the midpoint is garbage (often a negative index → crash or wrong result). This bug lived undetected in the Java standard library's binary search for *nine years*. The fixes:\n- **Compute the midpoint without overflowing**: `mid = low + (high - low) / 2`. `high - low` can't overflow (it's smaller than either operand for non-negative inputs), so this is the safe idiom — memorize it for binary search.\n- **Use a wider type**: compute in 64-bit (`long`/`int64_t`) when the sum might exceed 32 bits, then narrow if needed.\n- **Use unsigned** when negatives are impossible and you just need the extra bit (max ~4.3 billion) — though unsigned has its own wrap-around and comparison pitfalls.\n- **Checked arithmetic / overflow detection**: languages and libraries offer checked-add operations that throw or signal on overflow (Rust's `checked_add`, compiler builtins) for code where silent wrap is unacceptable.\n\nThe broader lessons: every fixed-width integer type has limits, and exceeding them wraps silently (the same root cause as the Year-2038 problem, the Boeing 787 reboot bug, and Gangnam Style breaking YouTube's view counter); choose types sized for your maximum possible value (counters that grow forever want 64-bit), and learn the overflow-safe midpoint formula because binary search is where it bites. Interview tip: spotting the wrap, knowing `low + (high - low) / 2`, and naming 'use a 64-bit type or checked arithmetic' is the complete answer."
  },
  {
    id: "ints-043",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "What is a load balancer, and what algorithms can it use to distribute traffic? What does 'health checking' add, and what's the catch with stateful sessions behind a load balancer?",
    code: null,
    options: null,
    answer: null,
    solution: "A load balancer sits in front of a pool of identical backend servers and distributes incoming requests across them, enabling **horizontal scaling** (add servers to add capacity) and **high availability** (one server dying doesn't take the service down). The distribution **algorithms**: **round-robin** (rotate through servers in order — simple, fair when requests are uniform); **least-connections** (send the next request to the server with the fewest active connections — better when request durations vary, since it avoids piling work on a server stuck with slow requests); **weighted** variants (give beefier servers a larger share); **IP hash / consistent hashing** (route based on a hash of the client IP or a key, so a given client consistently hits the same server — used for sticky sessions and for cache locality); and **least-response-time** (route to the fastest-responding server). **Health checking** is what makes it fault-tolerant: the load balancer periodically probes each backend (a TCP connect, or better an HTTP `GET /health` that exercises real dependencies) and **stops routing to any server that fails**, automatically resuming when it recovers. Without health checks, a crashed or hung server keeps receiving (and dropping) a third of traffic; with them, failures are routed around transparently — the foundation of zero-downtime deploys (drain a server, deploy, health-check, return it to rotation). The **stateful-session catch** is the big gotcha: if your app stores session data (logins, shopping carts) *in a server's local memory*, the load balancer's free distribution breaks it — request 1 creates a session on server A, request 2 gets routed to server B which has never heard of that session, and the user is randomly logged out. Two fixes: **sticky sessions / session affinity** (the load balancer pins each client to one server via a cookie or IP hash — simple, but it undermines even distribution, loses the session if that server dies, and complicates scaling), or — the better fix — **make the app stateless** by moving session state to a *shared* store (Redis, a database) or to stateless tokens (JWTs) the client carries, so *any* server can handle *any* request. The second is strongly preferred because it preserves the stateless-server property that makes load balancing, failover, and scaling clean. Related infrastructure: load balancers operate at **L4** (transport — fast, just forwards TCP/UDP) or **L7** (application — can route by URL path/host, terminate TLS, and inspect HTTP), and they're often the same box as the reverse proxy (nginx, HAProxy, Envoy, cloud ALBs). Interview tip: name two or three algorithms (round-robin, least-connections), explain health checks remove dead servers from rotation, and flag the stateful-session trap with 'store sessions in Redis or use stateless tokens, don't keep them in server memory' — that last point is the one that shows you've actually scaled something."
  },
  {
    id: "ints-044",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A transaction reads the same row twice within itself and gets two different values, because another transaction committed a change in between. What is this read anomaly called, and which isolation level prevents it?",
    code: null,
    options: {
      a: "Dirty read; prevented by READ UNCOMMITTED",
      b: "Non-repeatable read; prevented by REPEATABLE READ (or higher)",
      c: "Phantom read; prevented by READ COMMITTED",
      d: "Lost update; prevented by READ UNCOMMITTED"
    },
    answer: "b",
    solution: "Correct: b. A **non-repeatable read** is exactly this scenario: within one transaction you read a row, another transaction *commits* an update to it, and your second read of the same row returns a different value — the read isn't *repeatable*. It's prevented by the **REPEATABLE READ** isolation level (and SERIALIZABLE above it), which guarantees that rows you've read won't change underneath you for the transaction's duration.\n\nUnderstanding the answer requires the ladder of isolation levels and the anomalies each prevents (the standard SQL hierarchy, weakest to strongest):\n- **READ UNCOMMITTED** — allows **dirty reads**: you can see another transaction's *uncommitted* changes, which may then be rolled back, meaning you acted on data that never officially existed. Rarely used.\n- **READ COMMITTED** — you only see committed data (no dirty reads), but **non-repeatable reads** and phantoms are still possible. This is the *default* in many databases (Postgres, Oracle).\n- **REPEATABLE READ** — additionally prevents non-repeatable reads: rows you read stay stable. (MySQL/InnoDB's default.) Classic phantom reads may still occur in the standard, though some engines prevent them here too.\n- **SERIALIZABLE** — the strongest: transactions behave as if run one at a time, preventing all anomalies including **phantom reads** (where a *re-run query* returns new rows that another transaction inserted matching your WHERE clause — a non-repeatable read is about a *changed existing row*; a phantom is about *new/disappeared rows in a set*).\n\nWhy the others are wrong: a — a dirty read is seeing *uncommitted* data, and READ UNCOMMITTED *allows* it rather than preventing anything; c — a phantom read concerns rows appearing/disappearing in a range query (not a single row changing value), and READ COMMITTED doesn't prevent it; d — a lost update is a different concurrency hazard (two transactions overwrite each other's changes) and READ UNCOMMITTED prevents nothing.\n\nThe practical trade-off to voice: stronger isolation means more locking/serialization, hence less concurrency and throughput — so you pick the *weakest* level that prevents the anomalies your workload actually cares about, and reach for explicit locking (`SELECT ... FOR UPDATE`) or higher isolation only where correctness demands it (financial operations, inventory)."
  },
  {
    id: "ints-045",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "Predict the output and explain the closure-over-loop-variable bug, then give two fixes.",
    code: "// What does this print?\nvar callbacks = [];\nfor (var i = 0; i < 3; i++) {\n  callbacks.push(function () {\n    return i;\n  });\n}\nconsole.log(callbacks[0](), callbacks[1](), callbacks[2]());",
    options: null,
    answer: null,
    solution: "Output:\n\n3 3 3\n\nNot `0 1 2` as the author surely intended. The cause is the interaction of **closures** with **`var`'s function scope**. `var i` is a *single* variable shared by the whole loop — not a fresh variable per iteration. Each pushed function is a closure that captures the *variable* `i` (by reference), not its value at creation time. By the time any callback actually runs, the loop has finished and `i` holds its final value, `3` — so all three closures, looking at the same shared `i`, return `3`. This is one of the most famous JavaScript gotchas and a favorite interview question precisely because it tests whether you understand closures capture variables, not snapshots.\n\nFix 1 — use **`let`** instead of `var`:\n\nfor (let i = 0; i < 3; i++) {\n  callbacks.push(() => i);\n}\n// prints: 0 1 2\n\n`let` is **block-scoped**, and the loop creates a *new binding of `i` for each iteration* — so each closure captures its own distinct `i`. This is the modern fix and a major reason `let` was introduced; it's why 'always use `let`/`const`, never `var`' is standard advice.\n\nFix 2 — create a new scope per iteration with an **IIFE** (the pre-ES6 technique, worth knowing for legacy code):\n\nfor (var i = 0; i < 3; i++) {\n  (function (captured) {\n    callbacks.push(function () { return captured; });\n  })(i);\n}\n\nThe immediately-invoked function takes `i` *by value* as `captured`, giving each closure its own variable. (A `forEach`/`map` over an array achieves the same, since the callback parameter is a fresh variable each iteration.)\n\nThe transferable lessons: **closures capture variables, not values** (the variable's *current* value is read when the closure runs, not when it's created); **`var` is function-scoped, `let`/`const` are block-scoped** and that scoping difference is exactly what fixes the bug; and this pattern appears constantly in real code — loops attaching event handlers or `setTimeout` callbacks that all 'see' the last value. Interview tip: predicting `3 3 3`, explaining 'one shared `var i` captured by reference', and offering the `let` fix is the complete answer; knowing the IIFE version shows historical depth."
  },
  {
    id: "ints-046",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What does it mean to scale a database 'reads' versus 'writes', and why are read replicas a common first step while scaling writes is much harder?",
    code: null,
    options: null,
    answer: null,
    solution: "Most applications are **read-heavy** — they read data far more often than they write it (think 100:1 or more: every page view reads, only occasional actions write). That asymmetry is the key to the whole answer. **Scaling reads** is comparatively easy because reads don't change anything, so you can make *copies* of the data and spread read traffic across them. **Read replicas** are exactly this: one **primary** handles all writes, and its changes are continuously **replicated** to one or more read-only **replica** servers; the application sends writes to the primary and routes reads to the replicas, multiplying read capacity by adding replicas. It's a common first scaling step because it's mostly an infrastructure change — the data model and queries don't change, you just add replicas and route reads to them. The catch is **replication lag**: replication is usually asynchronous, so a replica may be milliseconds (sometimes more) behind the primary, producing **eventual consistency** — a user who writes and immediately reads might hit a replica that hasn't received the change yet and see stale data ('I updated my email but it still shows the old one'). The standard mitigation is **read-your-own-writes**: route a user's reads to the primary for a short window after they write, or to a replica known to be caught up. **Scaling writes** is fundamentally harder because writes *must* be coordinated — every write changes the authoritative state, and you can't just have many independent copies accepting conflicting writes without a reconciliation nightmare. The single primary becomes the bottleneck, and the options to get past it are all heavy: **vertical scaling** the primary (bigger machine — buys time, has a ceiling), **sharding** (partition the data across multiple primaries so each handles a slice of writes — powerful but introduces cross-shard query/transaction pain and a hard-to-change shard key, as discussed elsewhere), **batching/queueing writes** to smooth spikes, or **multi-primary** replication (multiple write nodes — but now you must resolve write conflicts, which is genuinely difficult and a source of consistency bugs). The strategic ladder to voice: cache hot reads (Redis) → add read replicas (scale reads) → optimize queries/indexes and connection pooling → vertical scaling → shard (scale writes, last resort). Interview tip: 'reads scale by copying (replicas), writes don't because they must be coordinated; replicas are easy but introduce replication lag / eventual consistency; scaling writes means sharding, which is hard' captures the asymmetry that's the heart of the question."
  },
  {
    id: "ints-047",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your monitoring shows the API's p99 latency is 2 seconds while the average (mean) latency is 80ms. Why is the p99 the more important number here, and what does it tell you?",
    code: null,
    options: {
      a: "The p99 is a measurement error; trust the average",
      b: "p99 means 99% of requests are faster than 2s but 1% are slower — averages hide tail latency, and that slow 1% represents real users having a bad experience (and at scale, 1% is a lot of requests); tail latency, not the mean, is what users actually feel",
      c: "p99 and average should always be equal; a gap means the data is corrupt",
      d: "The average is the only metric that matters for user experience"
    },
    answer: "b",
    solution: "Correct: b. **Percentiles** describe the distribution of latencies: p50 (median) is the midpoint, p99 means 99% of requests completed *faster* than that value and the slowest 1% were *slower*. The 25× gap between an 80ms mean and a 2s p99 tells you the distribution has a **long tail** — most requests are fast, but a meaningful slice are dramatically slow, and the average *hides* this because a few extreme values get diluted by the many fast ones. Why the tail is what matters: (1) **Averages lie about user experience** — 'average 80ms' sounds great while 1% of users wait 2 seconds; the average literally cannot show you that those users exist. (2) **At scale, 1% is enormous** — a service doing 10 million requests/day has 100,000 requests/day landing in that slow tail; those are real, frustrated users (and often your *most active* users, who make the most requests and so are *most likely* to hit the tail on at least one). (3) **Tail latency compounds** — a page that makes 20 backend calls and waits for all of them is slow if *any one* hits the tail, so a 1% per-call tail becomes a ~18% chance the page is slow (this is the 'tail at scale' effect that makes p99 of dependencies dominate user-facing latency). That's why SLOs and alerting are written against p95/p99/p99.9, not averages. What a high p99 with a low mean points to: intermittent slow paths — cache misses, occasional lock contention, GC pauses, a cold connection pool, slow queries on certain inputs, retries, or a struggling dependency — exactly the things that don't show up 'on average.'\n\nWhy the others are wrong: a — it's not an error, it's the most operationally important signal; c — a gap between mean and p99 is *normal and expected* for latency (which is right-skewed), not corruption; d — the average is precisely the metric that *masks* the user-facing problem here.\n\nInterview tip: 'averages hide the tail; p99 shows the slow 1% that real users feel, and at scale that 1% is a lot of requests and compounds across dependencies' is the complete answer — and knowing to set SLOs on percentiles rather than means signals operational maturity."
  },
  {
    id: "ints-048",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "This code reads a 5 GB log file to count error lines. It works on small files but crashes with 'out of memory' on the real file. What's wrong, and what's the fix?",
    code: "const fs = require(\"fs\");\n\nfunction countErrors(path) {\n  const content = fs.readFileSync(path, \"utf8\"); // load entire file\n  const lines = content.split(\"\\n\");\n  let count = 0;\n  for (const line of lines) {\n    if (line.includes(\"ERROR\")) count++;\n  }\n  return count;\n}",
    options: null,
    answer: null,
    solution: "The bug is that `fs.readFileSync(path)` loads the **entire 5 GB file into memory at once** (then `split(\"\\n\")` creates an array holding it *again* as millions of string objects — even more memory). A 5 GB file simply doesn't fit in the default heap, so the process throws 'JavaScript heap out of memory' and dies. It worked on small files because they fit; the approach doesn't *scale* with file size — memory use is O(file size) when it should be O(1).\n\nThe fix is **streaming**: process the file incrementally — read a chunk, process it, discard it, read the next — so memory stays bounded (proportional to one line/chunk, not the whole file) regardless of file size:\n\nconst fs = require(\"fs\");\nconst readline = require(\"readline\");\n\nasync function countErrors(path) {\n  const rl = readline.createInterface({\n    input: fs.createReadStream(path),   // a stream, not the whole file\n    crlfDelay: Infinity,\n  });\n  let count = 0;\n  for await (const line of rl) {        // one line at a time\n    if (line.includes(\"ERROR\")) count++;\n  }\n  return count;\n}\n\n`createReadStream` reads the file in small buffered chunks; `readline` yields it line by line; the `for await` loop processes each line and lets it be garbage-collected before the next — constant memory, any file size, even larger than RAM. This is the same principle as async iterators / backpressure: pull data through a pipe as you consume it rather than materializing it all.\n\nThe transferable lessons: **anything proportional to input size that could grow unbounded must stream, not buffer** — large files, big HTTP response bodies, database result sets (cursor/pagination instead of loading all rows), CSV/JSON processing of huge datasets. The 'works in dev, OOMs in prod' pattern is the signature: developers test with small inputs and the O(n)-memory approach passes, then real data blows the heap. Watch for the buffer-the-whole-thing functions (`readFileSync`, `.toArray()`, loading an entire query result) and prefer their streaming/paginated counterparts whenever the size isn't strictly bounded. Interview tip: 'it loads the whole file into memory — stream it line by line so memory is constant' is exactly the expected answer; connecting it to streaming DB results and HTTP bodies shows the principle generalizes."
  },
  {
    id: "ints-049",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What is eventual consistency in the context of caching, and what are the main cache invalidation strategies? Why is 'cache invalidation' famously one of the hard problems in computer science?",
    code: null,
    options: null,
    answer: null,
    solution: "A cache is a fast copy of data that lives somewhere slower (a database, an API, disk). The instant you keep a copy, you face the central tension: the source data can change, and now your cached copy is **stale** — it disagrees with the truth. **Eventual consistency** in caching means you accept that the cache may briefly hold stale data and will *eventually* reflect the latest value (when it expires or gets invalidated), in exchange for the huge performance win of not hitting the source every time. The strategies for keeping a cache acceptably fresh — i.e. **cache invalidation**: **(1) TTL (time-to-live) expiration** — each entry expires after N seconds, then the next read re-fetches from the source. Simple and self-healing, requires no coordination with writers — but it's a blunt trade-off: short TTL = fresher data but more source load; long TTL = better performance but staler data. You're literally tuning 'how wrong are we willing to be.' **(2) Write-through / write-around / write-back** — strategies for *when* the cache is updated relative to the write: write-through updates the cache and source together (consistent, slower writes); write-back updates the cache first and the source later (fast, risk of loss); write-around writes only to the source and lets the cache fill on read. **(3) Explicit invalidation / purging** — when the source data changes, actively delete or update the affected cache entries so the next read re-fetches. Most precise (no staleness window), but it's the *hard* one: the code that writes must know *every* cache key affected by that write, across every cache layer (browser, CDN, app-level Redis, database query cache), and reliably purge them — miss one and you serve stale data indefinitely. **(4) Event-driven invalidation** — publish change events that caches subscribe to, decoupling writers from cache knowledge. Why it's famously hard (the Phil Karlton quip: 'there are only two hard things in computer science: cache invalidation and naming things'): getting it *right* means perfectly tracking the dependency graph between source data and every derived cached representation, across multiple distributed cache layers, under concurrency — invalidate too eagerly and you lose the cache's benefit (and risk stampedes); invalidate too late or incompletely and you serve wrong data; and the bugs are *intermittent and timing-dependent*, so they're brutal to reproduce ('it shows the old value, but only sometimes'). The pragmatic stance to voice: prefer **TTL** as the default (self-healing, bounded staleness) and reserve **explicit invalidation** for data where staleness is genuinely unacceptable, accepting its complexity only where it pays. Interview tip: 'caching trades freshness for speed → eventual consistency; invalidate via TTL (simple, bounded staleness) or explicit purging (precise but you must track every affected key across every layer); it's hard because that dependency tracking across distributed caches under concurrency is error-prone and the bugs are intermittent' is the complete, well-rounded answer."
  },
  {
    id: "ints-050",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Spot the resource leak and the related bug in this database access code, and show the correct pattern.",
    code: "async function getUserOrders(userId) {\n  const conn = await pool.getConnection();\n  const orders = await conn.query(\n    \"SELECT * FROM orders WHERE user_id = ?\", [userId]\n  );\n  conn.release(); // return connection to the pool\n  return orders;\n}",
    options: null,
    answer: null,
    solution: "The bug is that `conn.release()` only runs if `conn.query(...)` **succeeds**. If the query throws — a SQL error, a timeout, a dropped connection, the database rejecting the request — the exception propagates *past* the `release()` line, which never executes. The connection is **leaked**: borrowed from the pool but never returned. Under normal operation everything looks fine; but every error leaks one connection, and once enough errors have occurred, the **pool is exhausted** — every connection is checked out and never coming back — so all subsequent requests **hang forever** waiting for a connection that will never free up. The whole service grinds to a halt, and the symptom (requests timing out) appears far from the cause (an unrelated query that started failing). This is one of the most common and most painful production outages.\n\nThe fix is **`try/finally`** — guarantee the release happens whether the query succeeds or throws:\n\nasync function getUserOrders(userId) {\n  const conn = await pool.getConnection();\n  try {\n    return await conn.query(\n      \"SELECT * FROM orders WHERE user_id = ?\", [userId]\n    );\n  } finally {\n    conn.release(); // ALWAYS runs — success or exception\n  }\n}\n\nThe `finally` block runs on every exit path — normal return, thrown error, even an early return inside the `try` — so the connection always goes back to the pool. (Note we deliberately *don't* catch the error here — we let it propagate to a caller that can handle it; `finally` is about *cleanup*, not error handling, and the two are separate concerns.)\n\nThe transferable principle: **any acquired resource that must be released — database connections, file handles, locks, sockets — must be released in a `finally` block (or a language equivalent: Python's `with`/context manager, C#'s `using`, Go's `defer`, RAII in C++, try-with-resources in Java)** so that an exception on the happy path can't skip the cleanup. The same shape prevents leaked file descriptors, held-forever mutexes (which cause deadlocks), and unclosed sockets. Interview tip: spotting that the release is skipped on error, naming 'connection leak → pool exhaustion → hangs', and reaching for `try/finally` (or the language's automatic resource-management construct) is exactly the expected answer — and noting that pool exhaustion manifests as *unrelated* requests hanging shows you've debugged it for real."
  }
];
