window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["interview-practices"] = [
  {
    id: "intp-001",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "A teammate pushed a bad commit to the shared `main` branch an hour ago, and several people have already pulled it. What is the safest way to undo it?",
    code: null,
    options: {
      a: "Run `git reset --hard HEAD~1` and force-push so the bad commit disappears completely",
      b: "Run `git revert <commit>` to create a new commit that undoes the change, then push normally",
      c: "Delete the `main` branch on the remote and re-create it from the last good commit",
      d: "Run `git checkout <commit>` to move the branch back to the previous commit"
    },
    answer: "b",
    solution: "Correct: b. `git revert` creates a brand-new commit that applies the inverse of the bad commit. History only moves forward, so everyone who already pulled just gets one more commit on their next pull — nothing breaks. That is why revert is the safe undo on shared branches.\n\nWhy the others are wrong:\n- a: `reset --hard` plus force-push rewrites shared history; everyone who pulled now has divergent history and gets confusing errors (or silently re-introduces the bad commit when they push).\n- c: Deleting and re-creating the branch is just history rewriting with extra steps, and it also wipes branch protection context.\n- d: `git checkout <commit>` only moves YOUR working copy into a detached HEAD state; it changes nothing on the remote and undoes nothing.\n\nRule of thumb: `reset` is fine for commits that only exist locally; once a commit is pushed to a shared branch, use `revert`."
  },
  {
    id: "intp-002",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "You are halfway through a feature when an urgent bug report comes in on the same repository. Explain what `git stash` does, walk me through stashing your work and getting it back, and tell me the difference between `git stash pop` and `git stash apply`.",
    code: null,
    options: null,
    answer: null,
    solution: "Model answer: `git stash` takes my uncommitted changes — both staged and unstaged modifications to tracked files — and saves them on a stack, leaving the working directory clean. So when the urgent bug comes in, I run `git stash`, switch to a fresh branch from `main`, fix and push the bug, then come back to my feature branch and restore my work. To restore it I use `git stash pop`, which re-applies the changes and removes the entry from the stash, or `git stash apply`, which re-applies them but keeps the entry in the stash. I prefer `apply` when I might want to apply the same changes somewhere else or I am not sure the apply will go cleanly — if `pop` hits a conflict the stash entry is kept anyway, but `apply` makes the intent explicit. A few useful extras: `git stash list` shows everything stashed, `git stash -u` also includes untracked files (new files are not stashed by default), and `git stash push -m \"wip cart totals\"` adds a label so I can find it later.\n\nInterview tip: mentioning that untracked files need `-u` signals you have actually used stash, not just read about it."
  },
  {
    id: "intp-003",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "Each block below starts from the same point: `feature.js` was modified, staged, and committed. Describe where the changes from `feature.js` end up after state A, state B, and state C.",
    code: "git add feature.js\ngit commit -m \"Add feature\"\n\ngit reset --soft HEAD~1    # state A\n\ngit reset --mixed HEAD~1   # state B (run from a fresh commit)\n\ngit reset --hard HEAD~1    # state C (run from a fresh commit)",
    options: null,
    answer: null,
    solution: "Exact answer:\n- State A (`--soft`): the commit is undone, but the changes stay STAGED (still in the index). `git status` shows them as \"changes to be committed\". Perfect for redoing a commit message or squashing.\n- State B (`--mixed`, the default): the commit is undone AND unstaged. The changes are still in your working directory but you would need `git add` again. Good for re-splitting work into different commits.\n- State C (`--hard`): the commit is undone and the changes are wiped from the working directory too. The work appears gone — though the commit is still reachable via `git reflog` for a grace period.\n\nExplanation: git tracks three \"trees\": HEAD (last commit), the index (staging area), and the working directory. `--soft` moves only HEAD, `--mixed` moves HEAD and resets the index, `--hard` moves all three. That is also why `--hard` is the only one that can destroy uncommitted work — say that out loud in an interview and you have answered the follow-up before it is asked."
  },
  {
    id: "intp-004",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "While reviewing a junior's first PR you notice it adds a `.env` file containing the production database password. What is the right call?",
    code: null,
    options: {
      a: "Approve it — the repository is private, so only the team can see the password",
      b: "Ask them to rename it to `env.backup` so automated scanners do not flag it",
      c: "Have them remove the file, add `.env` to `.gitignore`, and rotate the leaked password because it now lives in git history",
      d: "Have them delete the file in a follow-up commit, which removes it from the repository history"
    },
    answer: "c",
    solution: "Correct: c. Secrets must never be committed: once a commit containing the password exists, it is part of git history forever (clones, forks, CI caches). The fix is three steps: remove the file from tracking, ignore it via `.gitignore` (commit a safe `.env.example` template instead), and — critically — rotate the credential, because you must assume it is compromised.\n\nWhy the others are wrong:\n- a: \"Private repo\" is not a secret store — access changes, repos get forked, laptops get stolen, and CI logs leak. Secrets belong in environment variables or a secrets manager.\n- b: Renaming hides it from humans and scanners but the secret is still committed — that is worse, not better.\n- d: A follow-up delete commit removes the file from the latest snapshot, but every previous commit still contains it; anyone can `git checkout` an old commit and read it.\n\nBonus things that belong in `.gitignore`: `node_modules/`, build output (`dist/`), editor junk, and any local config with credentials."
  },
  {
    id: "intp-005",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "You realize you accidentally made a commit on `main` that was meant for your feature branch. What is `git cherry-pick`, and how would you use it to fix this? When else is cherry-picking useful?",
    code: null,
    options: null,
    answer: null,
    solution: "Model answer: `git cherry-pick <hash>` copies a single commit from anywhere in the repository onto my current branch as a new commit with the same changes but a new hash. To fix the wrong-branch mistake: first I grab the commit hash with `git log`, then `git switch feature-branch` and `git cherry-pick <hash>` — now the work lives where it belongs. Then I clean up `main`: if I had not pushed yet, `git switch main && git reset --hard HEAD~1` removes it locally; if it was already pushed to the shared branch, I use `git revert <hash>` instead so I do not rewrite shared history. Cherry-pick is also the standard tool for hotfixes: a bug is fixed on `main` and you cherry-pick just that one commit onto the supported release branch without dragging along unrelated work. Two caveats worth saying: the copied commit gets a new hash, so the \"same\" change now exists twice in history, and cherry-picks can hit conflicts just like merges. It is a scalpel for moving individual commits — if I find myself cherry-picking constantly, the branching strategy is probably wrong.\n\nInterview tip: walking through BOTH halves (move the commit, then clean up the source branch safely) is what separates a complete answer."
  },
  {
    id: "intp-006",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "A bug exists on `HEAD` but not in release `v2.1.0`, roughly 160 commits back. Explain what this session is doing, why 160 commits only take \"roughly 7 steps\", and how `git bisect run npm test` would improve it.",
    code: "git bisect start\ngit bisect bad HEAD\ngit bisect good v2.1.0\n# Bisecting: 80 revisions left to test after this (roughly 7 steps)\nnpm test               # tests pass on the checked-out commit\ngit bisect good\n# Bisecting: 40 revisions left to test after this (roughly 6 steps)\nnpm test               # tests fail\ngit bisect bad\n# ...a few more rounds...\n# abc1234 is the first bad commit",
    options: null,
    answer: null,
    solution: "Exact answer: `git bisect` runs a binary search over the commit range to find the first commit where the bug appears. You tell it one known-bad commit (`HEAD`) and one known-good commit (`v2.1.0`); it checks out the commit in the middle, you test and report `good` or `bad`, and each answer eliminates half of the remaining range. That is why 160 commits take about 7 steps: each step halves the search space, so you need about log2(160) ≈ 7.3 checks instead of testing 160 commits one by one.\n\n`git bisect run npm test` automates the whole loop: git checks out each midpoint commit and runs the command itself, treating exit code 0 as good and codes 1-127 as bad (with one special case: 125 means \"skip this commit, it cannot be tested\" — useful for commits that do not build), then prints the first bad commit with zero manual steps. You finish either way with `git bisect reset` to return to your original branch.\n\nWhy interviewers love this question: it shows you can find a regression without reading 160 diffs — and it quietly rewards teams that keep commits small and the test suite runnable at every commit, because bisect is useless if half the historical commits do not build."
  },
  {
    id: "intp-007",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "What is the difference between `git fetch` and `git pull`?",
    code: null,
    options: {
      a: "`git fetch` downloads new commits from the remote without changing your local branch; `git pull` is a fetch followed by a merge (or rebase) into your current branch",
      b: "`git fetch` only downloads new branch names; `git pull` is what actually downloads the commits",
      c: "They are identical — `pull` is simply the modern name for `fetch`",
      d: "`git pull` downloads commits without touching your branch; `git fetch` downloads and merges them into your branch"
    },
    answer: "a",
    solution: "Correct: a. `git fetch` updates your remote-tracking refs (like `origin/main`) so you can SEE what changed upstream — your own branches and working directory are untouched. `git pull` does that fetch and then immediately integrates the result into your current branch via merge (or rebase with `git pull --rebase`).\n\nWhy the others are wrong:\n- b: Fetch downloads full commits, trees, and tags — not just branch names.\n- c: They are different commands; pull is literally fetch + integrate.\n- d: This is the definition reversed.\n\nPractical takeaway to say in an interview: \"I fetch when I want to review incoming changes first — `git fetch` then `git log main..origin/main` — and pull when I am ready to actually update my branch.\" Fetch is always safe; pull can start a merge or conflict at a moment you did not choose."
  },
  {
    id: "intp-008",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What branching strategies do you know? Compare GitFlow, GitHub Flow, and trunk-based development — and what does it mean when the team says `main` is a protected branch?",
    code: null,
    options: null,
    answer: null,
    solution: "Model answer: GitFlow is the heavyweight classic: a long-lived `develop` branch for integration, `feature/*` branches off it, plus dedicated `release/*` and `hotfix/*` branches, with `main` only holding tagged releases. It suits products with scheduled, versioned releases — desktop or mobile apps — but the long-lived branches invite big painful merges. GitHub Flow is much simpler: `main` is always deployable, every change is a short-lived feature branch, opened as a PR, reviewed, CI-checked, merged, and deployed — this fits most web teams doing continuous delivery. Trunk-based development goes furthest: everyone integrates into the trunk at least daily via tiny branches or direct commits, unfinished work hides behind feature flags, and the whole thing depends on fast, trustworthy CI. The trade-off across the three is essentially isolation versus integration speed: longer-lived branches feel safer but merge pain and drift grow with branch age.\n\nA protected `main` means the platform enforces rules on it: no direct pushes, no force-pushes or deletion, and merges only through a PR with passing CI checks and at least one approving review. It is how a team guarantees the deployable branch stays deployable.\n\nInterview tip: name the one YOU actually used (\"my team used GitHub Flow — short branches, PR review, merge to a protected main\") — interviewers grade real workflow experience over taxonomy."
  },
  {
    id: "intp-009",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "Your team has CI configured on the repository. What actually happens when you push a commit to your pull-request branch?",
    code: null,
    options: {
      a: "The code is deployed to production so testers can try the change immediately",
      b: "A teammate is automatically assigned to manually review and approve the commit",
      c: "Nothing happens until you log into the CI dashboard and trigger a build by hand",
      d: "A CI server checks out your branch and runs the pipeline — install dependencies, lint, build, run tests — and marks the commit green or red on the PR"
    },
    answer: "d",
    solution: "Correct: d. Continuous integration means every push triggers an automated pipeline on a clean server: check out the code, install dependencies from the lockfile, run linters, compile/build, and run the test suite. The result is reported as a status check on the commit/PR — green means safe to merge, red blocks the merge on a protected branch.\n\nWhy the others are wrong:\n- a: Deploying is CD territory, and deploying every unreviewed push to production is exactly what CI exists to prevent.\n- b: Reviewer assignment is a separate repo setting — CI is about automated checks, not humans.\n- c: The entire point of CI is that it runs automatically on every push; manual triggering would let broken code slip through.\n\nWhy builds fail even when code \"works on your machine\": failing or flaky tests, lint/format violations, type or compile errors, a dependency you installed locally but never saved to the manifest, or environment differences (Node version, missing env vars). First debugging step: read the CI log for the first error, then reproduce with the same clean steps locally (`npm ci && npm test`)."
  },
  {
    id: "intp-010",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "I see CI/CD on your resume. Explain the difference between continuous integration, continuous delivery, and continuous deployment.",
    code: null,
    options: null,
    answer: null,
    solution: "Model answer: Continuous integration is the practice of merging small changes into the shared branch frequently — at least daily — with an automated pipeline that builds and tests every push, so integration problems surface in minutes instead of during a giant merge weeks later. Continuous delivery builds on that: every change that passes the pipeline is packaged into a deployable artifact, so the software is always in a releasable state — but the final push to production is still a human decision, often one click. Continuous deployment removes even that click: every change that goes green ships to production automatically, which demands excellent test coverage, monitoring, and usually feature flags as the safety net. So the ladder is: CI = always integrated and tested; delivery = always releasable, deploy on demand; deployment = every green commit reaches users automatically. The reason teams climb this ladder is batch size: small, frequent releases mean each deploy contains less risk, failures are easier to attribute, and rollback is trivial.\n\nInterview tip: if you have a GitHub Actions workflow on any personal project — even just \"run tests on push\" — mention it; one concrete sentence beats the whole textbook definition."
  },
  {
    id: "intp-011",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "A feature works on your machine and CI is green, but your team still insists on verifying it in the staging environment before release. What is staging for?",
    code: null,
    options: {
      a: "It is a backup copy of production kept in sync for disaster recovery",
      b: "It is a production-like environment where the release candidate is exercised against realistic configuration, infrastructure, and data before real users ever see it",
      c: "It is each developer's personal sandbox with mocked services and seed data",
      d: "It is the environment where paying customers opt in to beta-test unreleased features"
    },
    answer: "b",
    solution: "Correct: b. The typical promotion path is dev → staging → production. Dev is for fast iteration with mocks and fake data; staging mirrors production as closely as possible — same infrastructure shape, same env-var style config, realistic (but never real-PII) data — so you catch the class of bugs that unit tests and a laptop cannot: misconfigured environment variables, missing migrations, reverse-proxy/CORS issues, third-party API credentials, performance under realistic data volume.\n\nWhy the others are wrong:\n- a: Disaster-recovery replicas are an ops concern; staging is for pre-release verification, not failover.\n- c: A personal sandbox describes the dev environment, the opposite end of the pipeline.\n- d: Customer beta programs run in production (behind flags or canary rollouts), not in staging — staging has no real users by definition.\n\nKey sentence for interviews: \"Each environment trades realism for safety — dev is safest and least realistic, production is the most realistic and least safe, staging is the rehearsal in between.\""
  },
  {
    id: "intp-012",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Your team merges a half-finished checkout redesign into `main` behind a feature flag. What is the main benefit over keeping the work on a long-lived feature branch?",
    code: null,
    options: {
      a: "The code integrates continuously and can ship to production turned off, then be enabled gradually and rolled back instantly with a toggle — no big-bang merge, no redeploy to recover",
      b: "Feature flags make the application faster because the compiler strips out disabled code paths",
      c: "Feature flags remove the need to test the new code path before releasing it",
      d: "Feature flags let product managers modify the feature's code directly without involving developers"
    },
    answer: "a",
    solution: "Correct: a. A feature flag separates DEPLOY from RELEASE. The unfinished code merges early and often (avoiding months of branch drift and a terrifying final merge), ships to production dark, and is then enabled for internal users, then 5% of traffic, then everyone. If something breaks, you flip the flag off in seconds — versus reverting and redeploying. This is also what makes trunk-based development possible.\n\nWhy the others are wrong:\n- b: A runtime flag is just an `if` — both paths ship; nothing is stripped or faster.\n- c: Both paths need testing; in fact flags ADD a small testing burden (on and off states).\n- d: Flags toggle behavior; they do not let anyone edit code. (Letting PMs control the toggle for a release is a real benefit, but that is releasing, not coding.)\n\nWorth volunteering the trade-off: stale flags become technical debt — dead `if` branches nobody remembers — so good teams treat flag removal as part of finishing the feature."
  },
  {
    id: "intp-013",
    category: "interview",
    difficulty: "basic",
    type: "code",
    question: "Fill in the blanks under semantic versioning (MAJOR.MINOR.PATCH). Then tell me: what exactly does a major bump promise to the users of your library?",
    code: "// Your library is at version 2.3.1.\n// Each release below is made independently, starting from 2.3.1.\n\n// Release A: fix a typo in an error message            -> 2.3.2\n// Release B: add a new optional `timeout` parameter    -> ____\n// Release C: remove the deprecated `fetchAll()` method -> ____\n// Release D: pure internal refactor, same public API   -> ____",
    options: null,
    answer: null,
    solution: "Exact answers: B -> 2.4.0, C -> 3.0.0, D -> 2.3.2.\n\nExplanation: PATCH (x.y.Z) is for backward-compatible bug fixes and invisible internal changes — both the typo fix and the pure refactor qualify — only the last number increments, nothing resets. MINOR (x.Y.0) is for new functionality that is backward compatible — an optional `timeout` parameter adds capability without breaking any existing caller, and patch resets to 0. MAJOR (X.0.0) is for breaking changes — removing `fetchAll()` breaks every caller that still uses it, even though it was deprecated.\n\nWhat a major bump promises: \"upgrading may break your code — read the changelog and migrate deliberately.\" Conversely, staying within a major version promises safety, which is what dependency ranges rely on: `^2.3.1` in `package.json` accepts 2.4.0 and 2.3.2 automatically but refuses 3.0.0. That trust is the whole point of semver — and shipping a breaking change as a minor release is how libraries break half the internet on a Tuesday."
  },
  {
    id: "intp-014",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "A teammate suggests adding `package-lock.json` to `.gitignore` because it keeps causing \"annoying merge conflicts\". Why is that a bad idea?",
    code: null,
    options: {
      a: "The lockfile contains the project's API keys, so ignoring it would leak them",
      b: "npm refuses to run `npm install` at all when the repository has no lockfile",
      c: "Without a lockfile, git starts tracking the `node_modules` directory instead",
      d: "The lockfile pins the exact resolved version of every direct AND transitive dependency, so every developer and the CI server install identical trees — without it, ranges like `^1.2.0` can resolve differently over time and cause works-on-my-machine bugs"
    },
    answer: "d",
    solution: "Correct: d. `package.json` declares version RANGES (`^1.2.0` means \"any 1.x at or above 1.2.0\"), so two installs a week apart can produce different dependency trees when packages publish new versions. The lockfile records the exact version (and integrity hash) of everything that was actually resolved — including dependencies of dependencies — making installs reproducible across machines and time. That is why it must be committed, and why CI should use `npm ci`, which installs exactly what the lockfile says and fails if it disagrees with `package.json`.\n\nWhy the others are wrong:\n- a: Lockfiles contain version and registry metadata, never secrets.\n- b: npm happily installs without a lockfile — it just resolves fresh (and generates a new one), which is precisely the reproducibility problem.\n- c: `node_modules` is ignored by its own `.gitignore` entry; the two files are unrelated.\n\nThe merge conflicts are real but solvable: take either side and re-run `npm install` to regenerate a consistent lockfile — never hand-edit it."
  },
  {
    id: "intp-015",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "What is test-driven development? Walk me through the red-green-refactor cycle and tell me what benefits you would honestly expect from it.",
    code: null,
    options: null,
    answer: null,
    solution: "Model answer: TDD inverts the usual order — you write the test before the code it tests, in a tight loop. Red: write a small failing test that describes the next bit of behavior, and run it to watch it fail — that proves the test can actually fail and that I am testing the right thing. Green: write the simplest code that makes it pass, resisting the urge to build more than the test demands. Refactor: with the test now protecting me, clean up the implementation — better names, remove duplication — re-running the tests after each change. Then repeat with the next test. The benefits I would honestly claim: it forces me to define what \"done\" means before coding; it pressures the design toward small, decoupled units, because hard-to-test code reveals itself immediately; coverage exists by construction rather than as an afterthought; and the suite becomes a regression net that makes later refactoring safe. I would also be honest about limits: it shines for logic-heavy code with clear requirements and is awkward for exploratory work or UI layout, so I do not treat it as dogma. The one place I always apply it is bug fixing — first write a failing test that reproduces the bug, then fix it, so that bug can never silently return.\n\nInterview tip: that bug-fix example is the most credible TDD story a junior can tell."
  },
  {
    id: "intp-016",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "In a test for `OrderService`, you replace the real payment gateway with an object that records calls, and the test asserts that `charge()` was called exactly once with the right amount. What kind of test double is that?",
    code: null,
    options: {
      a: "A stub — it exists to return canned data to the code under test",
      b: "A fake — it is a lightweight but genuinely working implementation",
      c: "A mock — it captures interactions and the test verifies that the expected calls happened",
      d: "A dummy — it is passed in only to satisfy the parameter list and is never actually used"
    },
    answer: "c",
    solution: "Correct: c. The defining feature of a mock is that the TEST'S ASSERTION is about the interaction itself — which methods were called, how many times, with what arguments. Here the test verifies `charge()` was called once with the right amount, which is behavior verification, i.e. mocking.\n\nWhy the others are wrong:\n- a: A stub feeds canned ANSWERS in (e.g., `getRate()` always returns 0.2) so the code under test can run; you then assert on the resulting state or output, not on calls made to the stub.\n- b: A fake actually works — the classic example is an in-memory repository standing in for a real database; nobody asserts on its internals.\n- d: A dummy is a placeholder (like `null` or an empty object) passed only because the signature demands it.\n\nWhen to use which: stub/fake when you care about the OUTPUT given some inputs (state testing); mock when the call itself IS the requirement — charging a card, sending an email — because there is no return value that proves it happened. Caution worth voicing: over-mocking couples tests to implementation details, so they break on harmless refactors."
  },
  {
    id: "intp-017",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Your tech lead proposes requiring 100% test coverage before any PR can merge. What does coverage actually measure, what does it not tell you, and what would you recommend instead?",
    code: null,
    options: null,
    answer: null,
    solution: "Model answer: Coverage measures which lines (or branches) of code were EXECUTED while the tests ran — nothing more. It does not tell you whether anything meaningful was ASSERTED: a test that calls every function and asserts nothing can score 100% while catching zero bugs. It also says nothing about the inputs you never tried — edge cases, error paths with weird data, concurrency — and nothing about whether the requirements themselves are tested. So 100% as a gate tends to backfire: people write low-value tests for trivial code (getters, glue, config) just to satisfy the number, those tests calcify the codebase against refactoring, and the metric stops meaning anything once it becomes the target. What I would recommend: use coverage as a flashlight, not a gate — review the coverage report to find genuinely untested risky areas, hold critical business logic (payments, auth, money math) to a high bar, and accept lower coverage on trivial glue. A moderate overall threshold (say 70-80%) to catch regressions in discipline is reasonable, paired with reviewing test QUALITY in code review: does each test assert real behavior, would it fail if the logic broke? If the lead wants a stronger signal, mutation testing — which checks whether tests actually fail when the code is deliberately broken — measures what coverage only pretends to.\n\nInterview tip: the sentence \"high coverage with weak assertions is false confidence\" lands very well here."
  },
  {
    id: "intp-018",
    category: "interview",
    difficulty: "basic",
    type: "code",
    question: "This test passes, but a senior asks you to restructure it using the AAA pattern. What is arrange-act-assert, and what is wrong with this test's structure?",
    code: "test(\"applies bulk discount\", () => {\n  const cart = new Cart();\n  expect(cart.total()).toBe(0);\n  cart.add({ price: 10 }, 12);\n  const total = cart.total();\n  expect(total).toBe(108);\n  cart.add({ price: 5 }, 1);\n  expect(cart.total()).toBe(113);\n});",
    options: null,
    answer: null,
    solution: "Exact answer: AAA = Arrange (set up the objects and data), Act (perform the ONE action under test), Assert (verify the outcome). The problem here is that one test is really three tests braided together: it asserts the empty-cart total, then the bulk-discount behavior, then adding a non-bulk item — multiple acts with asserts interleaved between them.\n\nWhy that matters: when this test goes red, the name says \"applies bulk discount\" but the failure could be any of the three behaviors, so you debug instead of just reading. Asserts placed mid-test also mean an early failure hides whether the later behaviors work. The fix is one test per behavior, each shaped as AAA:\n\ntest(\"applies 10% discount when buying 12 or more\", () => {\n  // Arrange\n  const cart = new Cart();\n  // Act\n  cart.add({ price: 10 }, 12);\n  // Assert\n  expect(cart.total()).toBe(108);\n});\n\nplus separate small tests for \"new cart totals zero\" and \"adds regular items at full price\". Rule of thumb: one act per test; if you feel the urge to keep acting after an assert, that is a new test asking to exist."
  },
  {
    id: "intp-019",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "Asked to add a simple \"sort by price\" dropdown, a junior instead builds a generic sorting framework with pluggable comparators, config-file-driven sort orders, and support for fields the product does not even have yet. Which principle does this most directly violate?",
    code: null,
    options: {
      a: "YAGNI — they built speculative capability nobody asked for, instead of the simplest thing that satisfies the actual requirement",
      b: "DRY — the pluggable comparators inevitably repeat each other's logic",
      c: "Single Responsibility — a dropdown component should never be allowed to trigger sorting",
      d: "Encapsulation — putting sort orders in a config file exposes private fields"
    },
    answer: "a",
    solution: "Correct: a. YAGNI — \"You Aren't Gonna Need It\" — says do not build for hypothetical future requirements, because you pay for the complexity today (more code to write, test, review, and maintain) while the imagined future usually arrives differently or never. The requirement was one dropdown sorting one field; a one-line `items.sort((a, b) => a.price - b.price)` behind a handler satisfies it. If a second sort field genuinely arrives later, generalize THEN, when the real shape of the need is known.\n\nWhy the others are wrong:\n- b: DRY is about not duplicating the same knowledge in multiple places — nothing here is duplicated; it is over-built, not repeated.\n- c: SRP is about a module having one reason to change; a dropdown triggering a sort is perfectly normal UI behavior.\n- d: Encapsulation concerns hiding internal state behind an interface; config files do not inherently expose private fields.\n\nThe family resemblance worth stating: KISS (\"keep it simple\") is the general taste, YAGNI is its rule for FUTURE features, and DRY is about duplicated KNOWLEDGE — and over-applying DRY to coincidentally-similar code creates exactly this kind of premature framework."
  },
  {
    id: "intp-020",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "An interviewer shows you this Express route handler and asks: which design principle does it strain, and how would you restructure it?",
    code: "async function registerUser(req, res) {\n  if (!req.body.email.includes(\"@\")) {\n    return res.status(400).send(\"bad email\");\n  }\n  const hash = await bcrypt.hash(req.body.password, 10);\n  const user = await db.query(\n    \"INSERT INTO users (email, hash) VALUES ($1, $2) RETURNING *\",\n    [req.body.email, hash]\n  );\n  await smtp.send(req.body.email, \"Welcome!\", welcomeHtml(user));\n  analytics.track(\"signup\", { plan: \"free\" });\n  res.status(201).json(user);\n}",
    options: null,
    answer: null,
    solution: "Exact answer: it strains the Single Responsibility Principle — this one function handles HTTP parsing/responses, input validation, password hashing, database persistence, transactional email, and analytics. SRP says a unit should have one reason to change; this one has at least five (validation rules change, schema changes, email provider changes, analytics changes, API shape changes).\n\nRestructure: keep the handler as a thin HTTP adapter and push the work down — `validateRegistration(body)` for input rules, a `userService.register(email, password)` that owns hashing + persistence, and a notification step for the welcome email and analytics. The handler then just translates: parse request, call service, map result/errors to status codes.\n\nWhy it is worth the effort: you can now unit-test registration logic without spinning up HTTP or SMTP; the service is reusable from a CLI seed script or another route; and you can fix a real bug hiding here — if `smtp.send` throws, the user IS created in the database but the client receives a 500 and likely retries, hitting a duplicate. A welcome email should not be able to fail a signup: fire it after responding, or push it to a queue. Spotting that consequence — SRP as a correctness issue, not just tidiness — is the senior-sounding part of the answer."
  },
  {
    id: "intp-021",
    category: "interview",
    difficulty: "medium",
    type: "code",
    question: "This function works and has passing tests. In code review, what would you ask to change, and why do naming and function size matter so much in a team codebase?",
    code: "function proc(d, f) {\n  let r = 0;\n  for (let i = 0; i < d.length; i++) {\n    if (d[i].t === 1 && d[i].a > 0) {\n      r += d[i].a * 0.2;\n    } else if (d[i].t === 2 && f) {\n      r += d[i].a * 0.1;\n    }\n  }\n  return r;\n}",
    options: null,
    answer: null,
    solution: "Exact answer — the review asks:\n1. Rename everything to reveal intent: `proc(d, f)` becomes something like `calculateTotalDiscount(lineItems, hasLoyaltyCard)`; `r` becomes `totalDiscount`; `d[i].t` and `d[i].a` need real property names (`type`, `amount`).\n2. Replace magic values with named constants: `const ITEM_TYPE = { SALE: 1, REGULAR: 2 }` and `const SALE_DISCOUNT_RATE = 0.2`, `LOYALTY_DISCOUNT_RATE = 0.1`. Right now `t === 1` is a fact you must reverse-engineer or ask someone about.\n3. Extract the per-item rule into a small helper like `discountForItem(item, hasLoyaltyCard)` and reduce the loop to a sum — each piece becomes readable and testable alone.\n\nWhy it matters: code is read far more often than it is written, and in a team the reader is usually NOT the author — or is the author six months later. Good names make the code self-documenting, so reviews go faster and comments do not drift out of date. Small single-purpose functions shrink the amount a reader must hold in their head, give stack traces meaningful names, and make each rule testable in isolation. Since tests already pass, this is a pure refactor: rename and extract in small steps, running the tests after each — behavior identical, cost of every future change lower."
  },
  {
    id: "intp-022",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "You have inherited a 400-line function that you need to modify. How do you refactor it safely, without changing its behavior?",
    code: null,
    options: null,
    answer: null,
    solution: "Model answer: My first rule is that refactoring without tests is just rewriting and hoping. So step one: check what tests exist. If there are none — common with code like this — I write characterization tests first: feed the function a representative set of inputs, capture whatever it currently returns (even behavior that looks wrong), and pin that down. The goal is to lock in current behavior, not ideal behavior. Step two: refactor in small, mechanical, reversible steps — extract a block into a named function, rename a variable, replace a magic number — one step at a time, running the tests after every single one. I lean on IDE-automated refactorings like extract-function and rename, because the tool is far less likely to fumble a reference than I am at line 380. Step three: commit after each green step, so when something breaks I bisect minutes, not hours. Step four — the discipline that actually keeps it safe: never mix refactoring and behavior change in the same commit. I refactor until the change I need becomes easy, commit that, and only then make the easy change with its own new test. Finally I keep the PRs small enough to review; a 400-line mechanical reshuffle plus a sneaky logic change is unreviewable.\n\nInterview tip: the phrase \"make the change easy, then make the easy change\" (Kent Beck) is worth dropping here — it is precisely this workflow."
  },
  {
    id: "intp-023",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "What is technical debt? Is taking it on ever the right call, and how would you handle it on a real project?",
    code: null,
    options: null,
    answer: null,
    solution: "Model answer: Technical debt is the future cost you accept when you take a shortcut today — hardcoding a value, skipping tests, bolting a feature onto a design that does not fit. Like financial debt it charges interest: every later change in that area is slower and riskier until you pay down the principal by cleaning it up. And yes, taking it on is sometimes exactly right: shipping a deliberate shortcut to hit a launch that validates whether the product should exist at all, or hardcoding for the demo that wins the contract — speed now is genuinely worth cost later. The distinction I care about is deliberate versus accidental: deliberate debt is a conscious, visible decision (\"we know, here is the ticket\"), while accidental debt silently accumulates from rushed reviews and unclear requirements until velocity quietly dies. How I would handle it on a real team: make it visible — when we cut a corner, a ticket goes in the backlog, not just a TODO that no one greps; pay it down continuously with the boy-scout rule, leaving touched code slightly cleaner; prioritize by interest rate, cleaning the high-churn files we modify weekly and leaving ugly-but-stable code alone; and argue for bigger paydowns with evidence — bug counts and slowing estimates in that area — not aesthetics, because \"this module caused 6 of our last 10 bugs\" wins the planning discussion that \"this code is ugly\" loses.\n\nInterview tip: saying debt can be a rational, deliberate tool — not just a sin — is what separates a thoughtful answer."
  },
  {
    id: "intp-024",
    category: "interview",
    difficulty: "advanced",
    type: "code",
    question: "This function runs in production. Critique its error handling and its logging — what would you change before shipping it?",
    code: "async function getInvoice(id) {\n  try {\n    const res = await fetch(\"/api/invoices/\" + id);\n    const data = await res.json();\n    console.log(\"got data!!!\", data);\n    return data;\n  } catch (e) {\n    console.log(\"error\");\n    return null;\n  }\n}",
    options: null,
    answer: null,
    solution: "Exact answer — three classes of problems:\n\n1. Swallowed errors. The catch block discards the exception and returns `null`, so every failure — network down, bad JSON, a typo'd URL — looks identical to the caller, which will crash with a null reference somewhere far from the real cause, or worse, render an empty invoice as if that were truth. Fail fast instead: only catch where you can genuinely handle the situation (retry, fallback, user-facing message); otherwise let it propagate, or rethrow a meaningful error like `throw new InvoiceFetchError(id, e)` that preserves the cause.\n\n2. Missing HTTP check. `fetch` does not reject on 404 or 500 — it only rejects on network failure. This code happily parses an error page's body as if it were an invoice. Add `if (!res.ok) throw new Error(\"GET /invoices/\" + id + \" failed: \" + res.status)`.\n\n3. Console spam instead of logging. `console.log(\"got data!!!\")` on every success is noise that drowns out signal, may dump sensitive invoice data into logs, and `console.log(\"error\")` records a failure with zero context — no id, no error, no stack. Use a structured logger with levels: `logger.debug({ invoiceId: id }, \"invoice fetched\")` for development-level detail, and in the error path `logger.error({ invoiceId: id, err: e }, \"invoice fetch failed\")`. Levels (debug/info/warn/error) let production run at info+ while structured JSON fields make the one failing invoice searchable at 2 a.m. — which is the entire point of logs."
  },
  {
    id: "intp-025",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "At 2 a.m. your API starts returning 500s. Which statement best describes the roles of monitoring/alerting versus logs in handling the incident?",
    code: null,
    options: {
      a: "Logs page the on-call engineer the moment errors occur; monitoring dashboards are what you read afterwards to find the root cause",
      b: "Once a team has good dashboards and alerts, logging becomes redundant and can be turned off in production",
      c: "Monitoring watches aggregate signals — error rate, latency, saturation — and alerts you THAT something is wrong; logs hold the detailed per-request records you then search to find out WHY",
      d: "They are the same data: an alert is simply any log line that contains the word ERROR"
    },
    answer: "c",
    solution: "Correct: c. Monitoring is the smoke detector, logs are the security-camera footage. Monitoring aggregates metrics over time — request rate, error percentage, p95 latency, CPU/memory — and an alert fires when a threshold or anomaly is crossed (\"error rate above 5% for 5 minutes\"), waking a human. That tells you something is wrong and roughly where; it cannot tell you why. Logs are the per-event record — this request, this user, this stack trace — that you query next: filter to ERROR level around the alert timestamp, find the exception, trace the failing dependency.\n\nWhy the others are wrong:\n- a: Reversed — nobody can read raw logs fast enough to be paged by them; alerting on metrics is what wakes you, logs are the after-the-page investigation.\n- b: Metrics are aggregates; the WHY lives only in the detail that aggregation throws away. Turning off production logging blinds the investigation.\n- d: Alerts can derive from log patterns, but monitoring is fundamentally aggregated time-series data with thresholds, not individual lines.\n\nGood practice to mention: alert on user-facing symptoms (error rate, latency), not on every individual error — alert fatigue is how real outages get ignored."
  }
];
