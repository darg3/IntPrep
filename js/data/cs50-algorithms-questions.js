window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["cs50-algorithms"] = [
  {
    id: "csa-001",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "An algorithm's running time is described as O(n). What does that actually tell you?",
    code: null,
    options: {
      a: "The algorithm performs exactly n steps for an input of size n",
      b: "The running time grows at most linearly with the input size — it is an upper bound on growth",
      c: "The algorithm is always faster than any O(log n) algorithm",
      d: "The algorithm needs n bytes of memory to run"
    },
    answer: "b",
    solution: "Correct answer: b. Big-O describes an upper bound on how the running time grows as the input size grows, ignoring constants and lower-order terms. O(n) means the time grows at most proportionally to n.\n\nWhy the others are wrong:\n- a: Big-O is about growth rate, not an exact step count — 3n + 7 steps is still O(n).\n- c: For small inputs or with large constants, an O(n) algorithm can beat an O(log n) one; Big-O only compares behavior as n gets large.\n- d: Big-O here describes time, not memory; space complexity is stated separately."
  },
  {
    id: "csa-002",
    category: "cs50",
    difficulty: "basic",
    type: "open",
    question: "Compare linear search and binary search. What does each one require, and what are their running times?",
    code: null,
    options: null,
    answer: null,
    solution: "Linear search walks through the elements one by one from the start until it finds the target or runs out of elements. It works on any collection, sorted or not, and its worst case is O(n) — you might check every element. Its best case is Omega(1), when the target happens to be first.\n\nBinary search requires the array to be sorted. It compares the target with the middle element: if the target is smaller it discards the right half, if larger it discards the left half, and repeats. Each comparison halves the remaining search space, so the worst case is O(log n) — for a million elements that is only about 20 comparisons instead of up to a million.\n\nThe trade-off: binary search is dramatically faster, but if the data is unsorted you must sort first (typically O(n log n)), so for a single search on unsorted data, linear search can actually be the better choice.\n\nInterview tip: always say the precondition out loud — \"binary search only works on sorted data\" is the detail interviewers listen for."
  },
  {
    id: "csa-003",
    category: "cs50",
    difficulty: "basic",
    type: "code",
    question: "What is the time complexity of this code, and how many lines does it print when `n` is 4?",
    code: "for (int i = 0; i < n; i++)\n{\n  for (int j = 0; j < n; j++)\n  {\n    printf(\"%i %i\\n\", i, j);\n  }\n}",
    options: null,
    answer: null,
    solution: "Answer: O(n^2), and it prints 16 lines when n is 4.\n\nExplanation: the outer loop runs n times, and for every single outer iteration the inner loop runs n more times. Total work is n * n = n^2 print statements — 4 * 4 = 16 for n = 4.\n\nThe general rule: nested loops that each depend on n multiply (n * n = O(n^2)), while sequential loops one after another add (n + n = O(2n) = O(n)). If the inner loop ran a fixed number of times (say, always 10), the code would be O(n), because constants are dropped."
  },
  {
    id: "csa-004",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "Which list orders these complexity classes from fastest (best) to slowest (worst) as `n` grows large?",
    code: null,
    options: {
      a: "O(1), O(n), O(log n), O(n log n), O(n^2), O(2^n)",
      b: "O(log n), O(1), O(n), O(n^2), O(n log n), O(2^n)",
      c: "O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n)",
      d: "O(1), O(log n), O(n log n), O(n), O(n^2), O(2^n)"
    },
    answer: "c",
    solution: "Correct answer: c. From fastest to slowest growth: constant O(1), logarithmic O(log n), linear O(n), linearithmic O(n log n), quadratic O(n^2), exponential O(2^n).\n\nWhy the others are wrong:\n- a: puts O(n) before O(log n) — logarithmic growth is much slower than linear (log of 1,000,000 is about 20).\n- b: nothing grows slower than constant time, so O(1) must come first; it also puts O(n^2) before O(n log n).\n- d: puts O(n log n) before O(n) — n log n is n multiplied by an extra growing factor, so it grows faster than plain n.\n\nAnchor examples: hash table lookup O(1), binary search O(log n), linear search O(n), merge sort O(n log n), bubble sort O(n^2), naive recursive Fibonacci O(2^n)."
  },
  {
    id: "csa-005",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "You hear engineers talk about Big-O, Big-Omega, and Big-Theta. What is the difference between the three?",
    code: null,
    options: null,
    answer: null,
    solution: "Big-O is an upper bound on growth — in practice we use it to describe the worst case: the algorithm takes at most this long. Big-Omega is a lower bound — in practice the best case: the algorithm takes at least this long. Big-Theta is a tight bound: when the upper and lower bounds match, the algorithm is Theta of that function in every case.\n\nConcrete examples from CS50: linear search is O(n) — worst case the target is last or missing — but Omega(1), because you might get lucky and find it immediately. Since those differ, there is no single Theta for linear search. Selection sort, on the other hand, always does the same number of comparisons whether the input is sorted or reversed, so it is Theta(n^2) — its O and Omega are both n^2.\n\nInterview tip: in casual conversation \"Big-O\" usually just means \"worst-case running time\", but knowing the formal distinction is a nice differentiator."
  },
  {
    id: "csa-006",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "You run binary search on a sorted array of about 1,000,000 elements. Roughly how many comparisons does it make in the worst case?",
    code: null,
    options: {
      a: "About 20",
      b: "About 1,000",
      c: "About 500,000",
      d: "About 1,000,000"
    },
    answer: "a",
    solution: "Correct answer: a. Binary search halves the search space on every comparison, so the worst case is log2(n) comparisons. 2^20 is about 1,048,576, so a million elements take roughly 20 comparisons. This is why O(log n) is such a powerful complexity class — doubling the data adds just one extra step.\n\nWhy the others are wrong:\n- b: about 1,000 is sqrt(n), which would describe a square-root algorithm, not halving.\n- c: 500,000 is what you would get from halving the data only once, but binary search keeps halving repeatedly.\n- d: a million comparisons is linear search's worst case, O(n)."
  },
  {
    id: "csa-007",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "Fill in the blank so this binary search works correctly. Also: what precondition must `arr` satisfy for this function to be correct at all?",
    code: "int binary_search(int arr[], int n, int target)\n{\n  int lo = 0;\n  int hi = n - 1;\n  while (lo <= hi)\n  {\n    int mid = ____;\n    if (arr[mid] == target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}",
    options: null,
    answer: null,
    solution: "Answer: `mid = lo + (hi - lo) / 2;` (the simpler `(lo + hi) / 2` is also accepted in most interviews). The precondition is that `arr` must be sorted in ascending order.\n\nExplanation: `mid` must be the midpoint of the current window [lo, hi]. Writing it as `lo + (hi - lo) / 2` avoids the classic integer-overflow bug where `lo + hi` exceeds the maximum int value on huge arrays — a famous bug that lived in Java's standard library for years, and a great detail to mention.\n\nIf the array is not sorted, the comparisons `arr[mid] < target` tell you nothing about which half to discard, so the algorithm can confidently walk away from the element it is looking for. Each iteration halves the window, giving O(log n) worst-case time."
  },
  {
    id: "csa-008",
    category: "cs50",
    difficulty: "basic",
    type: "open",
    question: "Walk me through how bubble sort works. What are its best-case and worst-case running times, and where does the best case come from?",
    code: null,
    options: null,
    answer: null,
    solution: "Bubble sort repeatedly walks through the array comparing each pair of adjacent elements and swapping them when they are out of order. After one full pass the largest element has \"bubbled up\" to the end, so each subsequent pass can ignore one more element at the back. You repeat passes until a pass completes with zero swaps, which means the array is sorted.\n\nWorst case is O(n^2): on a reverse-sorted array you need about n passes of about n comparisons each. The best case is Omega(n), but only if you implement the early-exit optimization: keep a flag counting swaps, and if a full pass makes no swaps, stop. On an already-sorted array that is a single O(n) pass. Without that flag, even sorted input costs O(n^2).\n\nFor contrast, selection sort — which repeatedly selects the smallest remaining element and swaps it to the front — is Theta(n^2): it always scans the whole remainder, so a sorted input does not help it at all.\n\nInterview tip: mention the no-swap early exit unprompted; it shows you understand why best and worst cases can differ."
  },
  {
    id: "csa-009",
    category: "cs50",
    difficulty: "advanced",
    type: "mcq",
    question: "Your input array is already sorted (or very nearly sorted). Which statement about sorting algorithms is TRUE?",
    code: null,
    options: {
      a: "Selection sort finishes in O(n) because it detects the array is sorted",
      b: "Merge sort drops to O(n) on sorted input",
      c: "Bubble sort without any optimization still finishes in O(n) on sorted input",
      d: "Insertion sort runs in O(n) on an already-sorted array"
    },
    answer: "d",
    solution: "Correct answer: d. Insertion sort takes each element and shifts it left into position among the already-sorted elements before it. If the array is already sorted, every element needs zero shifts — just one comparison each — so the whole run is a single O(n) pass. That is why insertion sort is the practical choice for nearly-sorted data and for tiny arrays.\n\nWhy the others are wrong:\n- a: Selection sort always scans the entire unsorted remainder to find the minimum, sorted or not — it is Theta(n^2) and has no way to notice the input is sorted.\n- b: Merge sort always splits down to single elements and merges back up, doing Theta(n log n) work in best, average, and worst cases (its consistency, at the cost of O(n) extra memory for merging, is its selling point).\n- c: Plain bubble sort runs all its passes regardless; only the version with the \"no swaps this pass\" early exit achieves O(n) on sorted input."
  },
  {
    id: "csa-010",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "What does calling `count(3)` print, and why does the output come out in that order?",
    code: "void count(int n)\n{\n  if (n <= 0)\n  {\n    return;\n  }\n  count(n - 1);\n  printf(\"%i \", n);\n}\n\n// in main: count(3);",
    options: null,
    answer: null,
    solution: "Answer: it prints `1 2 3`.\n\nExplanation: the recursive call happens BEFORE the print. So `count(3)` first calls `count(2)`, which calls `count(1)`, which calls `count(0)`. `count(0)` hits the base case (`n <= 0`) and returns without printing. Now the call stack unwinds: `count(1)` resumes after its recursive call and prints 1, then `count(2)` prints 2, then `count(3)` prints 3.\n\nThe key insight is that each paused call waits on the call stack and resumes in reverse order (last in, first out). If you moved the `printf` line ABOVE the recursive call, the output would be `3 2 1` instead — printing on the way down rather than on the way back up. Tracing this on paper is a classic interview move worth practicing."
  },
  {
    id: "csa-011",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "What is recursion? In your answer, explain the base case, the recursive case, and what happens on the call stack if the base case is missing or never reached.",
    code: null,
    options: null,
    answer: null,
    solution: "Recursion is when a function solves a problem by calling itself on a smaller version of the same problem. Every recursive function needs two parts: a base case — the smallest input it can answer directly without recursing — and a recursive case, which does a little work and delegates the rest to a call on smaller input that moves toward the base case.\n\nFactorial is the classic example: factorial(1) = 1 is the base case, and factorial(n) = n * factorial(n - 1) is the recursive case. Merge sort is recursive too: sort each half (recursive case) until you reach a one-element array (base case, trivially sorted), then merge.\n\nEach call gets its own frame on the call stack holding its parameters and locals; frames pop off in reverse order as calls return. If the base case is missing — or the input never moves toward it — the function recurses forever, frames pile up until the stack runs out of room, and the program crashes: a stack overflow (in C this typically shows up as a segmentation fault; Python raises RecursionError instead).\n\nInterview tip: whenever you write a recursive solution, state the base case first, out loud, before the recursive case."
  },
  {
    id: "csa-012",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "Why is looking up a key in a hash table O(1) on average?",
    code: null,
    options: {
      a: "The keys are stored in sorted order, so it can binary search them",
      b: "It only ever stores a small, fixed number of keys",
      c: "A hash function computes the key's bucket index directly, so it jumps straight to the right location",
      d: "All of its values are kept in the CPU cache"
    },
    answer: "c",
    solution: "Correct answer: c. A hash table runs the key through a hash function that deterministically converts it into an array index, then goes directly to that bucket — no searching or scanning. Computing the hash and indexing the array are constant-time operations, so the average lookup is O(1) regardless of how many keys are stored.\n\nThe \"on average\" caveat: different keys can hash to the same bucket (a collision). With a good hash function and enough buckets, each bucket holds only a few items, keeping lookups effectively constant; in the degenerate worst case where everything collides into one bucket, lookup decays to O(n).\n\nWhy the others are wrong:\n- a: keeping keys sorted describes a sorted array or tree (O(log n) lookups), not a hash table — hash tables are unordered.\n- b: hash tables hold arbitrarily many keys; O(1) comes from the hashing, not a size limit.\n- d: CPU caching is a hardware detail, unrelated to the algorithmic complexity."
  },
  {
    id: "csa-013",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "This Python program crashes. What is the bug, what error does Python report, and what is the one-line fix?",
    code: "def factorial(n):\n  return n * factorial(n - 1)\n\nprint(factorial(5))",
    options: null,
    answer: null,
    solution: "Answer: the function has no base case, so it recurses forever — Python kills it with `RecursionError: maximum recursion depth exceeded`. The fix is to add a base case at the top of the function:\n\nif n <= 1:\n  return 1\n\nExplanation: factorial(5) calls factorial(4), then 3, 2, 1, 0, -1, -2, ... — nothing ever stops the descent. Each call adds a frame to the call stack; Python caps the stack at about 1,000 frames and raises RecursionError rather than crashing. In C the same bug would keep consuming stack memory until the program dies with a stack overflow / segmentation fault.\n\nWith the fix, the calls unwind correctly: factorial(1) returns 1, then 2 * 1 = 2, 3 * 2 = 6, 4 * 6 = 24, 5 * 24 = 120. Every recursive function needs a base case AND inputs that provably move toward it."
  },
  {
    id: "csa-014",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "You have a `students` table and a `loans` table (library loans). You want a row for EVERY student — including students who have never borrowed a book — with loan details filled in where they exist. Starting from `SELECT ... FROM students ... loans ON students.id = loans.student_id`, which JOIN do you use?",
    code: null,
    options: {
      a: "INNER JOIN",
      b: "LEFT JOIN",
      c: "RIGHT JOIN",
      d: "CROSS JOIN"
    },
    answer: "b",
    solution: "Correct answer: b. `students LEFT JOIN loans` keeps every row from the left table (students) and attaches matching loan rows where the ON condition holds; students with no loans still appear once, with the loan columns as NULL. That NULL pattern is also how you find students who never borrowed anything: add `WHERE loans.id IS NULL`.\n\nWhy the others are wrong:\n- a: INNER JOIN returns only rows with a match in BOTH tables, silently dropping students with zero loans — exactly the rows we were told to keep.\n- c: RIGHT JOIN keeps every row of the right table (loans) instead, so loan-less students vanish; it answers the mirrored question.\n- d: CROSS JOIN pairs every student with every loan regardless of any condition — a cartesian product, not a lookup.\n\nBonus: FULL OUTER JOIN keeps unmatched rows from both sides; SQLite (used in CS50) historically lacked it, which is a fun detail to drop."
  },
  {
    id: "csa-015",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "What is SQL injection, and how do you prevent it?",
    code: null,
    options: null,
    answer: null,
    solution: "SQL injection is an attack where user input is pasted directly into a SQL string, letting the user's text be executed as SQL code instead of being treated as data. The classic example: a login form builds `SELECT * FROM users WHERE username = '...' AND password = '...'` by string concatenation, and an attacker types `' OR 1=1 --` — the quote closes the string early, `OR 1=1` makes the condition always true, and `--` comments out the rest, so they log in without a password. Injection can also read, modify, or delete entire tables.\n\nThe fix is parameterized queries (prepared statements): write the SQL with placeholders, like `SELECT * FROM users WHERE username = ?`, and pass the user input separately as a parameter. The database driver then treats the input strictly as a value — quotes and SQL keywords inside it have no power. In CS50's Python library that looks like `db.execute(\"... WHERE username = ?\", username)`.\n\nSecondary defenses include input validation and least-privilege database accounts, but the core rule is absolute: never build SQL by concatenating or f-string-formatting user input.\n\nInterview tip: saying \"escape the input\" is the weak answer; \"parameterized queries\" is the one interviewers want to hear."
  },
  {
    id: "csa-016",
    category: "cs50",
    difficulty: "basic",
    type: "code",
    question: "Given the `shows` table below, what rows does this query return, and in what order?",
    code: "-- shows:\n-- id | title         | year\n-- 1  | The Office    | 2005\n-- 2  | Breaking Bad  | 2008\n-- 3  | Friends       | 1994\n-- 4  | The Crown     | 2016\n\nSELECT title FROM shows\nWHERE year > 2000\nORDER BY year DESC;",
    options: null,
    answer: null,
    solution: "Answer: three rows, in this order — The Crown, Breaking Bad, The Office.\n\nExplanation, in the order SQL actually applies the clauses:\n1. FROM picks the `shows` table.\n2. WHERE keeps only rows with `year > 2000` — Friends (1994) is filtered out. Note `>` is strict, so a show from exactly 2000 would also be excluded.\n3. SELECT keeps just the `title` column.\n4. ORDER BY `year DESC` sorts newest first: 2016, 2008, 2005. (Default order is ASC; without any ORDER BY the row order is not guaranteed at all.)\n\nIf you instead wanted counts per year you would reach for `GROUP BY year` with an aggregate like `COUNT(*)` — worth mentioning as the natural follow-up."
  },
  {
    id: "csa-017",
    category: "cs50",
    difficulty: "advanced",
    type: "mcq",
    question: "Your query `SELECT * FROM shows WHERE title = 'The Office'` is slow on a table with millions of rows, so you run `CREATE INDEX title_index ON shows (title);`. Which statement is TRUE?",
    code: null,
    options: {
      a: "Lookups filtering on `title` get much faster because the index is a B-tree the database can search in O(log n), but inserts and updates get slightly slower and the index costs extra disk space",
      b: "The index speeds up every query on the table, no matter which column the WHERE clause uses",
      c: "The index physically re-sorts the table in place, so it needs no additional storage",
      d: "Indexes make both reads and writes faster, so you should index every column by default"
    },
    answer: "a",
    solution: "Correct answer: a. An index is a separate B-tree (a wide, shallow, sorted tree structure) keyed on the indexed column, with each entry pointing back at its table row. Instead of a full table scan — O(n), reading millions of rows — the database walks the tree in O(log n), like binary-searching the index of a book rather than reading every page. The costs: every INSERT, UPDATE, or DELETE must also update the tree, and the tree occupies extra disk space.\n\nWhy the others are wrong:\n- b: an index only helps queries that filter (or sort/join) on the indexed column; `WHERE year = 2005` would still scan unless `year` is indexed too.\n- c: the index is an additional structure stored alongside the table — the table itself stays put, and the extra space is precisely the price you pay.\n- d: writes get slower, not faster, since each index must be maintained; indexing every column bloats storage and drags down write performance, which is why you index selectively, based on actual query patterns."
  },
  {
    id: "csa-018",
    category: "cs50",
    difficulty: "advanced",
    type: "open",
    question: "CS50 starts in C and then switches to Python. Compare the two languages: compiled versus interpreted, static versus dynamic typing, performance, and productivity. When would you reach for each?",
    code: null,
    options: null,
    answer: null,
    solution: "C is compiled: a compiler (clang in CS50) translates the whole program ahead of time into machine code the CPU executes directly, so errors like type mismatches are caught at compile time and the result runs very fast. Python is interpreted: the interpreter reads and executes your source at runtime, which adds overhead per operation but means no separate compile step — you edit and run instantly.\n\nTyping follows the same split. C is statically typed: every variable's type is declared up front and fixed, so a whole class of bugs is caught before the program ever runs. Python is dynamically typed: a variable can hold an int now and a string later, which is flexible and concise but pushes type errors to runtime.\n\nThe trade-off in practice: C gives you raw speed and fine-grained control, which is why it powers operating systems, embedded systems, and performance-critical code — but you write more lines and manage more details yourself. Python trades CPU time for developer time: one line like `print(input().capitalize())` replaces dozens of lines of C, and its enormous library ecosystem makes it the default for scripting, web backends, and data work. Tellingly, many Python libraries are themselves written in C underneath — you get C's speed where it matters with Python's ergonomics on top.\n\nInterview tip: frame it as \"optimize for developer time unless the profiler says otherwise\" — that is the judgment interviewers are probing for."
  },
  {
    id: "csa-019",
    category: "cs50",
    difficulty: "advanced",
    type: "code",
    question: "This is the core of CS50's Caesar cipher. Fill in the blank to rotate uppercase letters, and explain why the `% 26` is essential.",
    code: "char rotate(char c, int key)\n{\n  if (isupper(c))\n  {\n    return ____;\n  }\n  else if (islower(c))\n  {\n    return 'a' + (c - 'a' + key) % 26;\n  }\n  return c;\n}",
    options: null,
    answer: null,
    solution: "Answer: `'A' + (c - 'A' + key) % 26`\n\nExplanation, piece by piece:\n- `c - 'A'` converts the character into an alphabet position 0-25 (chars are just numbers, so 'C' - 'A' = 2). This works for any shift math regardless of where letters sit in the character set.\n- `+ key` applies the shift in that 0-25 space.\n- `% 26` wraps around the end of the alphabet: with key 3, 'Y' is position 24, 24 + 3 = 27, and 27 % 26 = 1, which is 'B'. Without the modulo you would walk past 'Z' into punctuation and other non-letter characters.\n- `+ 'A'` converts the 0-25 position back into an actual uppercase character.\n\nThe lowercase branch is the same formula anchored at 'a' — you cannot mix anchors, because uppercase and lowercase letters live in different ranges. Non-letters fall through unchanged, which is why \"Hello, World!\" keeps its comma and spaces. The same convert-shift-wrap-convert pattern shows up in any circular/wrap-around problem, so it is worth knowing cold."
  },
  {
    id: "csa-020",
    category: "cs50",
    difficulty: "advanced",
    type: "mcq",
    question: "Apply a Luhn-style checksum (CS50's Credit problem) to the number 1234: starting from the second-to-last digit and moving left, double every other digit (summing the digits of any two-digit product), add the untouched digits, and check the total. What total do you get, and does 1234 pass?",
    code: null,
    options: {
      a: "Total 10 — valid",
      b: "Total 20 — valid",
      c: "Total 8 — invalid",
      d: "Total 14 — invalid"
    },
    answer: "d",
    solution: "Correct answer: d. Work from the right: 4 is untouched, 3 gets doubled (6), 2 is untouched, 1 gets doubled (2). Doubled products: 6 + 2 = 8. Untouched digits: 4 + 2 = 6. Total: 8 + 6 = 14. Luhn validity requires the total to end in 0 (total % 10 == 0); 14 ends in 4, so 1234 is invalid.\n\nWhy the others are wrong:\n- a: 10 is what you get by just summing all digits (1+2+3+4) and forgetting to double — and it would deceptively look \"valid\" since it ends in 0.\n- b: 20 comes from doubling EVERY digit (2+4+6+8) instead of every other one.\n- c: 8 is only the doubled products — forgetting to add the untouched digits back in.\n\nTwo classic gotchas to mention: when doubling produces a two-digit number (e.g., 8 doubled is 16), you add its digits separately (1 + 6), not the product itself; and the doubling pattern is anchored at the right end (second-to-last digit), so you must work from the right, not the left."
  },
  {
    id: "csa-021",
    category: "cs50",
    difficulty: "advanced",
    type: "open",
    question: "Computing Fibonacci with the naive recursive definition is painfully slow. Why, and how can trading memory for speed fix it?",
    code: null,
    options: null,
    answer: null,
    solution: "Naive recursive Fibonacci — fib(n) = fib(n-1) + fib(n-2) — is slow because it recomputes the same subproblems over and over. fib(50) calls fib(49) and fib(48), but fib(49) ALSO computes fib(48) from scratch, and the duplication compounds at every level. The call tree roughly doubles each level down, giving exponential O(2^n) time; fib(50) takes minutes while the answer itself is trivial to store.\n\nThe fix is memoization: spend memory to remember answers. Keep a cache — a Python dictionary or an array indexed by n — and before computing fib(n), check the cache; after computing it, store it. Every subproblem is now computed exactly once, so time collapses from O(2^n) to O(n), at the cost of O(n) extra space. Same idea bottom-up: just loop from 2 to n keeping the last two values.\n\nThis is the time-space trade-off in general: you can often buy speed with memory. A hash table answers lookups in O(1) by holding a big bucket array where a plain sorted array gets O(log n) nearly for free in space; web caches store responses to skip recomputation; database indexes spend disk to make reads fast.\n\nInterview tip: the phrase \"overlapping subproblems\" plus a dictionary-based memo is exactly the bridge interviewers want to see toward dynamic programming."
  },
  {
    id: "csa-022",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "Which statement about Python dictionaries is TRUE?",
    code: null,
    options: {
      a: "Keys must be hashable (strings, numbers, tuples), because a dict is a hash table under the hood",
      b: "Looking up a key is O(log n), because dicts keep their keys in sorted order",
      c: "A list can be used as a dictionary key as long as it is not empty",
      d: "Checking `key in my_dict` scans every key one by one, so it is O(n)"
    },
    answer: "a",
    solution: "Correct answer: a. A Python dict is a hash table: each key is run through a hash function to find its slot, which is why keys must be hashable — immutable types like strings, numbers, and tuples qualify. That hashing is also exactly why dict (and set) lookups are O(1) on average.\n\nWhy the others are wrong:\n- b: keys are stored by hash, not sorted; lookup is average O(1), not O(log n). (Since Python 3.7 dicts do preserve insertion order, but that is ordering of iteration, not sorting, and it is not how lookups work.)\n- c: lists are mutable and therefore unhashable — using one as a key raises `TypeError: unhashable type: 'list'`, regardless of its contents. Use a tuple instead.\n- d: `in` on a dict uses the hash table, so it is average O(1); it is `in` on a LIST that scans linearly in O(n). Swapping a list for a dict or set to speed up membership checks is one of the most common practical optimizations in Python."
  },
  {
    id: "csa-023",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "Which description matches **selection sort**?",
    code: null,
    options: {
      a: "Repeatedly swap adjacent out-of-order pairs, bubbling large values to the end each pass",
      b: "On each pass, scan the unsorted portion for its smallest element and swap it into the next position of the sorted portion",
      c: "Take elements one at a time and slide each leftward into its correct spot among the already-sorted prefix",
      d: "Split the array in half, sort each half recursively, and merge the sorted halves"
    },
    answer: "b",
    solution: "Correct: b. Selection sort *selects* the minimum of what's left and puts it where it belongs: find the smallest of all n, swap into slot 0; find the smallest of the remaining n−1, swap into slot 1; repeat. After pass k, the first k slots are finally, permanently correct.\n\nThe other options are its classmates: a is **bubble sort**, c is **insertion sort**, d is **merge sort** — being able to tell the three quadratic sorts apart by their one-line summaries is exactly what this question tests.\n\nThe facts that distinguish selection sort in a follow-up:\n- Always Θ(n²) comparisons — even on sorted input, it must scan to *prove* each minimum (no early exit; bubble and insertion both have O(n) best cases on sorted data).\n- But only **O(n) swaps** — at most one per pass — historically relevant when writes were expensive.\n- Not stable in its usual form (the long-range swap can reorder equal elements).\n- In-place, O(1) extra memory.\n\nMnemonics: bubble = neighbors swap, values *bubble up*; selection = *select* the min, place it; insertion = like sorting cards in your hand, *insert* each new card into place. CS50's sorting lecture is built on exactly these three plus merge sort as the divide-and-conquer upgrade."
  },
  {
    id: "csa-024",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "Walk me through merge sort. Why is it O(n log n), and what does it pay for that speed?",
    code: null,
    options: null,
    answer: null,
    solution: "Merge sort is divide-and-conquer in its purest form, and it's two ideas. **Divide**: split the array in half, recursively sort each half — the recursion bottoms out at single elements, which are sorted by definition. **Merge**: combine two *sorted* halves into one sorted whole by walking both with a finger on each front, repeatedly taking the smaller of the two front elements. Merging is the workhorse, and it's O(n) per level: each element gets looked at and placed once. Why O(n log n) overall: halving repeatedly produces **log₂ n levels** of recursion (1,000,000 elements → ~20 levels), and **every level merges n elements total** — so n work × log n levels = n log n. The intuition to say out loud: 'each level costs n; there are log n levels.' And the scale of the win: for a million elements, n² ≈ 10¹² operations versus n log n ≈ 2×10⁷ — fifty-thousand-fold, the difference between hours and milliseconds. What it pays: **O(n) extra memory** — merging needs a scratch array to merge into, unlike bubble/insertion/selection which shuffle in place. (In-place merge variants exist but are impractical.) The other properties worth knowing: it's **stable** (equal elements keep their order — take from the left half on ties), its O(n log n) is **guaranteed** — best, average, and worst case — with no adversarial input (quicksort's worst case is O(n²); merge sort has no bad days), and its sequential access pattern makes it the backbone of **external sorting** (data too big for RAM) and of real-world hybrids: Python's and Java's standard sort, Timsort, is a merge-sort descendant. Interview tip: draw the triangle — splits going down, merges coming back up — and label the two dimensions 'n per level' and 'log n levels'; that picture *is* the proof."
  },
  {
    id: "csa-025",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "Fill in the two blanks to complete the merge step of merge sort in Python: merging two already-sorted lists into one sorted list.",
    code: "def merge(left, right):\n    result = []\n    i, j = 0, 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            ____\n        else:\n            result.append(right[j])\n            j += 1\n    # one of the two lists may have elements remaining\n    result.extend(left[i:])\n    result.extend(____)\n    return result",
    options: null,
    answer: null,
    solution: "The blanks are `i += 1` and `right[j:]`:\n\nwhile i < len(left) and j < len(right):\n    if left[i] <= right[j]:\n        result.append(left[i])\n        i += 1\n    else:\n        result.append(right[j])\n        j += 1\nresult.extend(left[i:])\nresult.extend(right[j:])\n\nHow it works — the two-finger walk: `i` and `j` point at the current front of each list. Each iteration copies the *smaller* front into the result and advances only that finger. When one list runs out, the loop exits, and the tail of the other list — already sorted and all ≥ everything placed so far — is appended wholesale. (One of the two extends is always a no-op on an empty slice; writing both keeps the code branch-free.)\n\nDetails that show mastery:\n- Every element is examined and placed exactly once → the merge is **O(n)** — the fact the whole n log n analysis rests on.\n- The `<=` (not `<`) makes the sort **stable**: on ties, the left element goes first, preserving original order — the difference matters when sorting records by one field after another.\n- The leftover-tail step is the classic forgotten piece when people write this on a whiteboard; the slice idiom `left[i:]` handles it in one line.\n- Wrapped in the recursive shell — `if len(lst) <= 1: return lst` as base case, then `return merge(merge_sort(lst[:mid]), merge_sort(lst[mid:]))` — this is complete merge sort in ~15 lines, a fair whiteboard ask."
  },
  {
    id: "csa-026",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "Which of these operations is O(log n)?",
    code: null,
    options: {
      a: "Finding the largest value in an unsorted array",
      b: "Searching a balanced binary search tree for a key",
      c: "Looking up a key in a hash table with a good hash function",
      d: "Printing every element of a linked list"
    },
    answer: "b",
    solution: "Correct: b. In a *balanced* BST, every comparison at a node eliminates half the remaining tree — go left or go right — so reaching any key takes at most the tree's height, which balance keeps at O(log n). It's binary search expressed as a structure: a million nodes, ~20 steps.\n\nWhy the others have different complexities:\n- a: O(n) — in an *unsorted* array nothing lets you skip elements; you must look at all of them to be sure.\n- c: O(1) average — the hash function jumps straight to the right bucket with no comparisons against other keys at all. *Faster* than log n, which is exactly the hash table's selling point (and what it trades away: no ordering, no efficient range queries, no 'next largest' — the BST keeps those).\n- d: O(n) — visiting every node is linear by definition.\n\nThe pattern to internalize: **log n appears whenever each step discards a constant fraction (usually half) of the candidates** — binary search on a sorted array, balanced BST descent, and the per-level count in merge sort's recursion. The 'balanced' qualifier is load-bearing: insert sorted data naively into a BST and it degenerates into a linked list with O(n) search, which is why production trees self-balance (AVL, red-black — the structure under many ordered containers) and why CS50's BST lecture ends on exactly that cautionary note."
  },
  {
    id: "csa-027",
    category: "cs50",
    difficulty: "advanced",
    type: "open",
    question: "Why can no comparison-based sorting algorithm beat O(n log n) in the worst case? And how do counting sort and friends seemingly break this law?",
    code: null,
    options: null,
    answer: null,
    solution: "The argument is information-theoretic and elegant enough to give in full. A comparison sort learns about its input *only* by asking yes/no questions ('is a[i] < a[j]?'). n distinct elements can arrive in **n! different orders**, and the algorithm must behave differently for every one of them — each permutation needs a different sequence of swaps to become sorted. A sequence of k yes/no answers can distinguish at most **2^k** different situations. So correctness demands 2^k ≥ n!, i.e. k ≥ log₂(n!), and by Stirling's approximation log₂(n!) ≈ n log₂ n − 1.44n = **Θ(n log n)**. No cleverness escapes this: it's a lower bound on the *problem* (for comparison-based algorithms), not on any particular algorithm — some input will always force ~n log n comparisons. That's why merge sort and heapsort, at O(n log n) worst case, are asymptotically *optimal* comparison sorts, and why no one will ever invent a general comparison sort that's fundamentally faster. The 'law-breakers' don't break it — they **refuse to play the comparison game**. Counting sort never compares elements: if keys are small integers in a known range k, it just tallies how many of each value exist (one array pass) and rewrites the array from the tallies — **O(n + k)**, genuinely linear when k is modest (sorting exam scores 0–100, bytes, ages). Radix sort extends the trick to bigger keys by counting-sorting digit by digit: O(d·(n + k)) for d-digit keys. Bucket sort assumes a known distribution. The trade: they exploit *structure in the keys* (bounded integers, fixed digits) and pay memory for counters, while comparison sorts work on anything with an ordering — strings, dates, custom objects. Interview tip: the chain 'n! orders, 2^k outcomes, so k ≥ log(n!) ≈ n log n' is four sentences and one of the few lower-bound proofs you can deliver entirely from memory — doing so is a strong-signal moment; then 'counting sort wins by not comparing' completes the picture."
  },
  {
    id: "csa-028",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "What does `mystery(6)` print, and what well-known sequence is this? What goes wrong if you call `mystery(1)` — and `mystery(0)`?",
    code: "def mystery(n):\n    if n <= 0:\n        return\n    print(n)\n    mystery(n - 2)\n    print(n)\n\nmystery(6)",
    options: null,
    answer: null,
    solution: "Output of `mystery(6)`:\n\n6\n4\n2\n6 → wait, carefully: the prints AFTER the recursive call come back in reverse. Full trace:\n\nmystery(6): prints 6, calls mystery(4)\n  mystery(4): prints 4, calls mystery(2)\n    mystery(2): prints 2, calls mystery(0)\n      mystery(0): n <= 0, returns immediately\n    mystery(2) resumes: prints 2\n  mystery(4) resumes: prints 4\nmystery(6) resumes: prints 6\n\nSo the printed sequence is: **6 4 2 2 4 6** — descending on the way down, ascending on the way back up. A palindrome shape: the first prints happen *before* each recursive call (descent), the second prints happen *after*, in reverse order, as the call stack unwinds — each suspended frame resumes in LIFO order. This before/after-the-call distinction is the entire lesson: code after a recursive call runs in *unwinding* order, the trick behind printing a linked list backwards or reversing traversals without extra memory.\n\n`mystery(1)`: prints 1, calls mystery(−1), which hits `n <= 0` and returns, then prints 1 again → output `1 1`. Fine — *because* the base case is `n <= 0`, not `n == 0`.\n\n`mystery(0)`: hits the base case instantly, prints nothing. Also fine.\n\nThe design point: a base case of `n == 0` would have sent `mystery(1)` → `mystery(-1)` → `mystery(-3)` → ... infinitely (in practice: `RecursionError: maximum recursion depth exceeded`, Python's ~1000-frame limit). Writing base cases as inequalities (`<=`) instead of exact equality is cheap insurance against inputs that step over the exact value — a habit worth stating in any recursion interview."
  },
  {
    id: "csa-029",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "What does it mean that an algorithm uses O(1) extra space versus O(n) extra space — and which pairing below is correct?",
    code: null,
    options: {
      a: "Bubble sort uses O(1) extra space (it swaps in place); merge sort uses O(n) extra space (it needs a scratch array to merge into)",
      b: "All sorting algorithms use O(n) extra space, since they store the array",
      c: "Merge sort uses O(1) extra space because it splits the array instead of copying it",
      d: "Space complexity counts CPU registers, so every algorithm is O(1)"
    },
    answer: "a",
    solution: "Correct: a. Space complexity (in the usual 'auxiliary space' sense) counts the *extra* memory an algorithm needs beyond the input itself. Bubble, insertion, and selection sort rearrange elements with swaps inside the original array plus a few loop variables — O(1) auxiliary, called **in-place**. Merge sort's merge step needs somewhere to merge *into*: a scratch buffer proportional to the input — O(n) auxiliary. That's merge sort's tax for its guaranteed O(n log n) time, and the time/space trade-off in miniature.\n\nWhy the others are wrong: b — the input array isn't counted as 'extra'; c — splitting describes the recursion, but merging still requires the buffer (truly in-place merge sort is a known hard problem, not the standard algorithm); d — register count is fixed hardware, not what the analysis measures.\n\nCompleting the map of common cases: quicksort is in-place for data but uses O(log n) stack for recursion (average); **any recursive algorithm carries its maximum call-stack depth as space** — naive recursive Fibonacci is O(n) deep; hash-table-based tricks (like duplicate detection with a set) spend O(n) space to win time; and memoization is literally buying time with memory. Why anyone cares when RAM is cheap: embedded systems, sorting near-RAM-sized datasets (an O(n) scratch array means you can only sort half your memory), cache behavior, and interview follow-ups — 'what's the space complexity?' is the standard second question after you've nailed the time."
  },
  {
    id: "csa-030",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "What is a greedy algorithm? Explain CS50's coin-change example, why greedy works for US coins — and a coin system where it fails.",
    code: null,
    options: null,
    answer: null,
    solution: "A greedy algorithm builds a solution step by step, always taking the **locally best-looking option** and never reconsidering. No backtracking, no look-ahead — which makes greedy algorithms fast and simple, and *sometimes wrong*. CS50's Cash problem: make change using the fewest coins. Greedy strategy: always take the largest coin that fits. For 67¢ with US coins (25, 10, 5, 1): two quarters (50), one dime (60), one nickel (65), two pennies — six coins, and provably optimal. Why greedy is *correct* for US-style coins: the denominations form what's called a **canonical system** — each coin is 'compatible' with the larger ones in a way that guarantees the big-coin choice never paints you into a corner (informally: 25 = 2×10+5, 10 = 2×5, 5 = 5×1; small coins compose into larger ones cleanly, so skipping a large coin never helps). Where it fails: coins **{1, 3, 4}** making 6 — greedy takes 4, then 1, then 1: three coins; optimal is 3+3: **two**. The locally best first move (grab the 4) was globally wrong. With such systems you need dynamic programming, which considers all options. The interview-grade summary: greedy is correct only when the problem has the *greedy-choice property* (a locally optimal choice is always extendable to a global optimum) — true for US change, Dijkstra's shortest paths (non-negative weights), Huffman coding, and interval scheduling by earliest end time; false for general change-making, 0/1 knapsack, and most scheduling variants. Practical heuristic: greedy is the first thing to *try* and the first thing to *distrust* — verify with small counterexample hunting before believing it. Interview tip: the {1,3,4}→6 counterexample is eleven words and instantly proves you understand the limits, not just the recipe."
  },
  {
    id: "csa-031",
    category: "cs50",
    difficulty: "basic",
    type: "code",
    question: "Fill in the two blanks to complete CS50's greedy change-making in Python: count the fewest coins (25, 10, 5, 1) for a given number of cents.",
    code: "def coins_needed(cents):\n    count = 0\n    for coin in [25, 10, 5, 1]:\n        count += cents ____ coin   # how many of this coin fit?\n        cents = cents ____ coin    # what remains afterwards?\n    return count\n\nprint(coins_needed(67))  # should print 6",
    options: null,
    answer: null,
    solution: "The blanks are `//` (floor division) and `%` (modulo):\n\nfor coin in [25, 10, 5, 1]:\n    count += cents // coin   # how many whole coins of this size fit\n    cents = cents % coin     # the remainder still owed\n\nTrace for 67: quarters — 67//25 = 2 coins, 67%25 = 17 left; dimes — 17//10 = 1, 7 left; nickels — 7//5 = 1, 2 left; pennies — 2//1 = 2, 0 left. Total **6**.\n\nThe div/mod pair is the idiom to internalize: **`//` answers 'how many whole times does it fit', `%` answers 'what's left over'** — together they decompose a quantity, which is the same trick behind extracting digits (n%10 is the last digit, n//10 drops it), converting seconds to h:m:s, base conversion, and 2D-grid index math (row = i//width, col = i%width). In C the same code is `/` (integer division happens automatically with ints) and `%`.\n\nTwo notes that show care: iterating the list **largest first** is what makes it greedy — and the order is load-bearing (smallest first would count all pennies); and the loop is cleaner than CS50's four repeated while-loops, but identical in behavior. Connect it back: greedy is optimal *for this coin system*; with denominations like {1, 3, 4} this same code returns a wrong (non-minimal) answer for 6 — the algorithm's correctness lives in the input's structure, not the code."
  },
  {
    id: "csa-032",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "Given a table `shows (title, year, genre)`, what does this query return?\n\n```\nSELECT genre, COUNT(*) AS n\nFROM shows\nWHERE year >= 2020\nGROUP BY genre\nHAVING COUNT(*) >= 10\nORDER BY n DESC;\n```",
    code: null,
    options: {
      a: "Every show from 2020 on, with a running count next to each row",
      b: "One row per genre — counting only shows from 2020 onward — keeping just the genres with at least 10 such shows, sorted most-numerous first",
      c: "It fails: you cannot use WHERE and HAVING in the same query",
      d: "One row per genre counting all shows ever, because WHERE is ignored when GROUP BY is present"
    },
    answer: "b",
    solution: "Correct: b. Reading it in execution order (which is *not* the writing order): **FROM** shows → **WHERE** filters individual rows first (only year ≥ 2020 survive) → **GROUP BY** collapses the survivors into one bucket per genre → **COUNT(*)** computes per bucket → **HAVING** filters the *buckets* (only genres with ≥ 10 recent shows remain) → **SELECT** picks the output columns → **ORDER BY** sorts the final rows by count, descending.\n\nThe distinction this question exists to test: **WHERE filters rows before grouping; HAVING filters groups after aggregation**. That's why `WHERE COUNT(*) >= 10` is an error (no groups exist yet when WHERE runs) and why pushing conditions into WHERE when possible is both correct and faster — fewer rows reach the grouping stage.\n\nWhy the others are wrong: a — GROUP BY collapses rows; you get one row per genre, not per show; c — WHERE + HAVING together is the standard, intended pattern; d — WHERE is very much applied, before grouping.\n\nSupporting cast worth knowing: the other aggregates (`SUM`, `AVG`, `MIN`, `MAX`); `COUNT(*)` counts rows while `COUNT(col)` skips NULLs; every selected column must be either grouped-by or aggregated (SQLite is lax about this, real databases are not); and `AS n` aliases the aggregate so ORDER BY can reference it readably."
  },
  {
    id: "csa-033",
    category: "cs50",
    difficulty: "basic",
    type: "open",
    question: "What are primary keys and foreign keys in a relational database? Use CS50's `students` / `houses` example and explain what a JOIN has to do with them.",
    code: null,
    options: null,
    answer: null,
    solution: "A **primary key** is a column (or combination) that uniquely identifies each row in its table — no duplicates, no NULLs. Typically an auto-incrementing integer `id`: `houses(id, name)` where id 1 = Gryffindor. A **foreign key** is a column in one table that *refers to* a primary key in another: `students(id, name, house_id)` — each student's `house_id` holds the id of their house. The foreign key is how relational databases express relationships: instead of writing \"Gryffindor\" into every student row, you store the number 1 and keep the house's details in exactly one place. The payoffs: **no duplication** (the house name exists once — rename it with a one-row update, not a million-row sweep), **no inconsistency** (no rows saying \"Gryfindor\" with a typo), smaller storage, and — with the constraint declared (`FOREIGN KEY (house_id) REFERENCES houses(id)`) — **referential integrity**: the database refuses a `house_id` pointing at a house that doesn't exist, and can cascade or block deletes of a house that still has students. This whole discipline of splitting data into related tables is **normalization**. The **JOIN** is the read-side counterpart: it stitches the split data back together by matching foreign key to primary key — `SELECT students.name, houses.name FROM students JOIN houses ON students.house_id = houses.id` walks each student row to its house row. One-to-many (a house has many students) needs just the foreign key; many-to-many (students ↔ courses) needs a third *junction table* (`enrollments(student_id, course_id)`) holding two foreign keys. Interview tip: 'primary key = identity, foreign key = reference to another table's identity, JOIN = follow the reference' — then say 'normalization means update one row, not a million' as the why."
  },
  {
    id: "csa-034",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "Fill in the three blanks: list each genre alongside how many shows it has, but only counting shows rated 8.0 or higher, with the most popular genre first.\n\nTables: `shows (id, title, genre)` and `ratings (show_id, rating)`.",
    code: "SELECT shows.genre, COUNT(*) AS n\nFROM shows\n____ ratings ON shows.id = ratings.____\nWHERE ratings.rating >= 8.0\nGROUP BY shows.____\nORDER BY n DESC;",
    options: null,
    answer: null,
    solution: "The blanks are `JOIN`, `show_id`, and `genre`:\n\nSELECT shows.genre, COUNT(*) AS n\nFROM shows\nJOIN ratings ON shows.id = ratings.show_id\nWHERE ratings.rating >= 8.0\nGROUP BY shows.genre\nORDER BY n DESC;\n\nPiece by piece:\n- **JOIN ... ON** pairs each show with its rating rows by matching the primary key (`shows.id`) to the foreign key (`ratings.show_id`) — the standard key-to-key stitch. (Plain `JOIN` is INNER: shows with no rating rows vanish from the result; if unrated shows should appear with a count of 0, that's `LEFT JOIN` plus `COUNT(ratings.show_id)` — the NULL-skipping count — a classic follow-up.)\n- **WHERE** trims the joined rows to ratings ≥ 8.0 *before* any grouping.\n- **GROUP BY shows.genre** collapses to one row per genre; `COUNT(*)` sizes each group.\n- **ORDER BY n DESC** sorts by the aliased aggregate, biggest first. (Add `LIMIT 5` for a top-5 — LIMIT is the final step of the pipeline.)\n\nThe mental model worth stating in interviews: a query is a pipeline — *join → filter rows → group → aggregate → filter groups (HAVING) → sort → limit* — and each clause has exactly one job in it. Most SQL confusion (why can't WHERE see the count? why did unrated shows disappear?) dissolves once you place the clauses on that pipeline."
  },
  {
    id: "csa-035",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "In Python, what is the key difference between a list and a tuple?",
    code: null,
    options: {
      a: "Lists are mutable and tuples are immutable — so tuples can serve as dict keys and set members, while lists cannot",
      b: "Tuples can hold mixed types; lists must be homogeneous",
      c: "Lists preserve insertion order; tuples are unordered like sets",
      d: "Tuples are just lists that cannot exceed two elements"
    },
    answer: "a",
    solution: "Correct: a. **Mutability is the entire difference.** A list can be changed after creation — `append`, `remove`, `lst[0] = x`, `sort()` — while a tuple is frozen at birth: `t[0] = 5` raises `TypeError`. Everything else follows from that one fact:\n- **Hashability**: dict keys and set members must be hashable, which requires immutability. `locations[(40.7, -74.0)] = \"NYC\"` works with a tuple key; a list key raises `TypeError: unhashable type`. (Caveat for honesty points: a tuple *containing* a list is unhashable — immutability must go all the way down.)\n- **Intent**: a tuple says 'fixed-shape record' — an (x, y) point, an (r, g, b) color, a row from a CSV or database; a list says 'collection that grows and shrinks'. Python returns tuples for multiple values (`return name, age`), and unpacking (`name, age = person`) plus swap (`a, b = b, a`) are tuple syntax.\n- Minor perks: tuples are slightly smaller and cheaper, and immutability prevents accidental aliasing mutations.\n\nWhy the others are wrong: b — both hold mixed types freely; c — *both* preserve order (unordered is sets and pre-3.7 dicts); d — tuples can be any length, including one (`(5,)` — the comma, not the parens, makes the tuple; `(5)` is just the number 5 in parentheses, a real gotcha).\n\nRule of thumb to close with: heterogeneous fixed structure → tuple; homogeneous variable-length sequence → list."
  },
  {
    id: "csa-036",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "What are list comprehensions in Python? Translate a filter-and-transform loop into one, and say when you'd refuse to use a comprehension.",
    code: null,
    options: null,
    answer: null,
    solution: "A list comprehension builds a list from an iterable in a single expression: `[expression for item in iterable if condition]` — transform on the left, source in the middle, filter on the right. The translation this question wants:\n\nsquares = []\nfor n in numbers:\n    if n % 2 == 0:\n        squares.append(n * n)\n\nbecomes\n\nsquares = [n * n for n in numbers if n % 2 == 0]\n\nSame behavior, one line, and arguably *more* readable once your eye learns the shape — 'squares of the even numbers' reads almost like the sentence. The family: **dict comprehensions** `{u.id: u.name for u in users}`, **set comprehensions** `{w.lower() for w in words}`, and **generator expressions** — the same syntax in parentheses, `sum(n*n for n in numbers)` — which produce values lazily without materializing a list (the right choice when feeding an aggregator or streaming something large). When to refuse: (1) **side effects** — a comprehension whose expression calls `print()` or mutates state abuses the construct; comprehensions are for *building values*, loops are for *doing things*; (2) **complexity** — nested comprehensions with multiple `for`s and `if`s (`[x for row in grid for x in row if ...]` is the readable limit; beyond that, an explicit loop with named intermediates wins); (3) when you need `break`/early exit or exception handling per item. Performance footnote: comprehensions are modestly faster than append-loops (the append lookup is gone), but readability, not speed, is the reason to use them. Interview tip: write the before/after pair above and volunteer the 'no side effects, no triple nesting' refusal rule — knowing a tool's limits reads as more senior than knowing its syntax."
  },
  {
    id: "csa-037",
    category: "cs50",
    difficulty: "advanced",
    type: "code",
    question: "This Python function has one of the language's most famous traps. Predict the three printed results and explain what's going on.",
    code: "def add_item(item, items=[]):\n    items.append(item)\n    return items\n\nprint(add_item(\"a\"))\nprint(add_item(\"b\"))\nprint(add_item(\"c\", []))",
    options: null,
    answer: null,
    solution: "Output:\n\n['a']\n['a', 'b']     ← the trap\n['c']\n\nThe mutable default argument problem: **default values are evaluated once, at function *definition* time — not per call.** That single `[]` becomes part of the function object itself, and every call that omits `items` shares *the same list*. Call 1 appends \"a\" to it; call 2 appends \"b\" to the *same* list, so \"a\" is still there. Call 3 passes its own fresh list, so the shared default isn't touched (and the shared one still holds ['a', 'b'] for any future default call). You can even see the state: `add_item.__defaults__` shows the accumulating list.\n\nThe idiomatic fix — use a sentinel and create the list inside the body, which *does* run per call:\n\ndef add_item(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\n\nWhy the language works this way: `def` is an executable statement; the defaults are computed when it executes, once. Immutable defaults (`0`, `\"\"`, `None`, tuples) are safe — sharing them is harmless because they can't be mutated, which is why the rule of thumb is **never use a mutable value (list, dict, set) as a default**. Linters flag it (`B006`), and the same once-evaluated logic occasionally surprises in the other direction: a default of `time.time()` is frozen at import time. Interview tip: this is a top-three Python gotcha question; the words that show understanding are 'defaults evaluate at definition time and live on the function object' — followed immediately by the `None` sentinel fix."
  },
  {
    id: "csa-038",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "What does it mean for a sorting algorithm to be *stable*, and when does it matter?",
    code: null,
    options: {
      a: "It never crashes, even on empty input",
      b: "Elements that compare as equal keep their original relative order — which matters when you sort by one field after another, e.g. sorting by grade keeps each grade's students in the previous alphabetical order",
      c: "Its running time is the same on every input",
      d: "It uses O(1) extra memory"
    },
    answer: "b",
    solution: "Correct: b. Stability is about ties: if two records compare equal under the sort key, a stable sort leaves them in the order they arrived. The canonical scenario: sort students alphabetically, *then* stable-sort by grade — within each grade, students remain alphabetical. You've effectively sorted by (grade, name) using two simple passes (the multi-key trick: sort by the *secondary* key first, then stable-sort by the primary). With an unstable sort, the second pass scrambles each grade's internal order and the alphabetical work is destroyed.\n\nWhere it shows up: spreadsheet column sorting (users expect clicking 'sort by date' to preserve the existing order among equal dates), paginated leaderboard ties, and any UI where re-sorting shouldn't shuffle equal items unpredictably.\n\nThe scorecard worth memorizing: **stable** — merge sort, insertion sort, bubble sort, counting sort (implemented right), and Python's built-in `sorted()`/Timsort (stability is *guaranteed* by the language docs — the practical fact this question usually leads to). **Not stable** (as commonly implemented) — quicksort, heapsort, selection sort. Any algorithm can be *made* stable by decorating elements with their original index as a tiebreaker, at O(n) extra space.\n\nWhy the others are wrong: a is robustness, c is about complexity variance (and describes selection sort's always-Θ(n²), which is unstable anyway), d is the definition of in-place — all real properties, none of them stability."
  },
  {
    id: "csa-039",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "Predict the output of each of the five `print` calls — Python sequence indexing and slicing.",
    code: "word = \"algorithms\"\nnums = [10, 20, 30, 40, 50]\n\nprint(word[0], word[-1])\nprint(word[2:6])\nprint(nums[:2])\nprint(nums[::2])\nprint(nums[::-1])",
    options: null,
    answer: null,
    solution: "Output:\n\na s\ngori\n[10, 20]\n[10, 30, 50]\n[50, 40, 30, 20, 10]\n\nThe rules at work:\n- `word[0]` is \"a\"; **negative indices count from the end** — `word[-1]` is the last character \"s\", `[-2]` second-to-last, etc. No more `word[len(word) - 1]`.\n- `word[2:6]` — slices are **start-inclusive, stop-exclusive**: indices 2, 3, 4, 5 → \"gori\". The half-open convention means `word[:k] + word[k:]` reassembles perfectly and the slice length is simply stop − start.\n- `nums[:2]` — omitted start defaults to 0: first two elements. Likewise `nums[2:]` is 'from index 2 on' and `nums[:]` copies the whole list (a real idiom: shallow copy).\n- `nums[::2]` — the third number is the **step**: every second element, indices 0, 2, 4.\n- `nums[::-1]` — step −1 walks backwards: a reversed *copy*, the famous reversal one-liner (works on strings too: `word[::-1]` is \"smhtirogla\").\n\nThree footnotes that earn credit: slicing never raises IndexError — out-of-range slices just truncate (`nums[3:99]` is `[40, 50]`), unlike direct indexing (`nums[99]` raises); slices return *new* objects, so mutating a slice copy doesn't touch the original; and the same syntax powers deletion (`del nums[1:3]`) and replacement on lists. Strings being immutable, every string slice is necessarily a new string."
  },
  {
    id: "csa-040",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "Breadth-first search (BFS) versus depth-first search (DFS) on a graph: which statement is correct?",
    code: null,
    options: {
      a: "BFS explores level by level using a queue and finds shortest paths in unweighted graphs; DFS dives down one path using a stack (or recursion) and backtracks",
      b: "BFS uses a stack and DFS uses a queue",
      c: "DFS always finds the shortest path between two nodes",
      d: "BFS only works on trees, never on graphs with cycles"
    },
    answer: "a",
    solution: "Correct: a. The two traversals differ in exactly one design choice — the data structure holding the frontier — and everything else follows. **BFS** uses a **queue** (FIFO): start node, then all its neighbors, then *their* neighbors — expanding in rings, level by level. Because it reaches every node via the fewest possible edges, BFS finds **shortest paths in unweighted graphs** — its defining superpower (degrees of separation, fewest moves in a puzzle, shortest subway route by stops; CS50's 'Six Degrees of Kevin Bacon' problem is BFS verbatim). **DFS** uses a **stack** — explicitly, or implicitly via recursion — diving along one path as deep as it goes, then backtracking. It's the natural shape for exhaustive exploration: maze solving, cycle detection, topological sorting, connected components, and anything phrased as 'try this path fully before trying another' (backtracking puzzles like Sudoku).\n\nWhy the others are wrong: b — exactly backwards, and the swap *is* the difference; c — DFS can wander arbitrarily far before stumbling onto the target (no shortest-path guarantee); d — both handle cycles fine *provided you track visited nodes* — the visited set is what prevents infinite loops, and forgetting it is the classic implementation bug.\n\nShared facts: both run O(V + E), visiting each vertex and edge once. Memory differs by graph shape: BFS holds a whole level (wide graphs hurt); DFS holds one path (deep graphs hurt — and recursion depth limits apply). For *weighted* shortest paths, neither suffices — that's Dijkstra, which is BFS upgraded with a priority queue. 'Queue = level by level = shortest hops; stack = deep dive = backtracking' is the whole answer in one breath."
  },
  {
    id: "csa-041",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "Design question: how would you check whether an array of n numbers contains any duplicates? Give more than one approach and compare their time and space complexity.",
    code: null,
    options: null,
    answer: null,
    solution: "This is the classic time/space trade-off question, and strong answers present a menu. **(1) Brute force**: compare every pair — two nested loops. O(n²) time, O(1) space. Correct, trivial to write, and unusable at scale (a million elements → ~half a trillion comparisons). **(2) Sort first**: after sorting, any duplicates are *adjacent* — sort, then one linear scan comparing neighbors. O(n log n) time, and space depends on the sort (in-place sort → O(1) extra, but it mutates the input; sorting a copy costs O(n)). Great when you're allowed to reorder, when memory is tight, or when the data is *already* sorted (then it's just the O(n) scan). **(3) Hash set**: walk the array, checking 'have I seen this?' before inserting — `seen.has(x)` / `x in seen`. O(n) average time, O(n) space. The default right answer in practice: one pass, early exit on the first duplicate found. In Python the idiomatic whole-array check is `len(set(arr)) != len(arr)`; the loop version wins when duplicates are likely early. **(4) Special-structure bonus**: if values are known integers in a small range 0..k, a boolean array of size k beats hashing (no hash overhead); and the cute pigeonhole observation — n+1 values in range 1..n *must* contain a duplicate before you even look. The comparison table to say out loud: n² / 1, n log n / 1 (mutates), n / n — then pick by constraints: 'memory-rich and want speed → hash set; can't allocate or can't hash → sort; tiny n → whatever's simplest.' Interview tip: this question is rarely about the answer — it's about whether you *volunteer* multiple approaches with their costs and choose by constraint. Name all three before being asked, and mention early-exit; that's the senior-shaped behavior being screened for."
  },
  {
    id: "csa-042",
    category: "cs50",
    difficulty: "basic",
    type: "code",
    question: "Fill in the two blanks to count word frequencies in Python — the `.get` idiom for 'increment, defaulting to zero the first time'.",
    code: "text = \"the quick brown fox jumps over the lazy dog the end\"\n\ncounts = {}\nfor word in text.____():\n    counts[word] = counts.____(word, 0) + 1\n\nprint(counts[\"the\"])  # should print 3",
    options: null,
    answer: null,
    solution: "The blanks are `split` and `get`:\n\ncounts = {}\nfor word in text.split():\n    counts[word] = counts.get(word, 0) + 1\n\nHow it works:\n- `text.split()` with no arguments splits on *any run of whitespace* (spaces, tabs, newlines) and drops empties — more robust than `split(\" \")` for real text.\n- `counts.get(word, 0)` returns the current count **or 0 if the word isn't a key yet** — neatly dodging the `KeyError` that `counts[word] + 1` would raise on first sight of a word. One line replaces the clunky `if word in counts: ... else: ...` dance.\n\nThis counting pattern is everywhere: word frequencies, vote tallies, histogram building, grouping by category — and it's a hash-table showcase: each of the n words costs an O(1) average lookup+store, so the whole count is O(n). (The C-and-CS50 contrast worth drawing: doing this without a dict means sorting first or nested scanning — the dict is what makes it a three-liner.)\n\nThe standard-library escalator, for bonus points:\n\nfrom collections import Counter\ncounts = Counter(text.split())\ncounts.most_common(3)   # top 3 words with counts\n\n`Counter` is the purpose-built tool — missing keys count as 0 automatically, and `most_common` answers the usual follow-up question for free. `collections.defaultdict(int)` is the middle option (`counts[word] += 1` just works). Knowing all three rungs — get-idiom, defaultdict, Counter — and *when each is overkill* is exactly the fluency this exercise checks."
  },
  {
    id: "csa-043",
    category: "cs50",
    difficulty: "advanced",
    type: "mcq",
    question: "Two users click 'buy' on the last item in stock at the same moment. Both requests read `stock = 1`, both decide the purchase is valid, both write `stock = 0` — and the store has sold two units. In database terms, what is this and what is the fix?",
    code: null,
    options: {
      a: "A SQL injection attack; the fix is prepared statements",
      b: "A race condition on a read-then-write sequence; the fix is making the check-and-update atomic — a transaction with appropriate locking, or a single conditional UPDATE",
      c: "A foreign-key violation; the fix is adding ON DELETE CASCADE",
      d: "Normal behavior that databases cannot prevent"
    },
    answer: "b",
    solution: "Correct: b. This is a textbook **race condition**: two interleaved read-then-write sequences, where each decision was based on a value that was stale by the time of the write. CS50 teaches it with twin examples — this one and the 'two roommates both check the fridge, both buy milk' story. The window between *checking* and *acting* is the vulnerability.\n\nThe fix is **atomicity** — make check-and-update one indivisible step:\n\n-- Option 1: push the check into the write itself\nUPDATE products SET stock = stock - 1\nWHERE id = ? AND stock > 0;\n-- then check 'rows affected': 1 = sale, 0 = sold out\n\n-- Option 2: a transaction with locking\nBEGIN TRANSACTION;\nSELECT stock FROM products WHERE id = ? FOR UPDATE;  -- locks the row\n-- decide, then UPDATE\nCOMMIT;\n\nThe single conditional UPDATE is the elegant version: the database applies the WHERE check and the write atomically, so two concurrent attempts serialize — one succeeds, one matches zero rows. Transactions generalize it: BEGIN...COMMIT makes a *group* of statements all-or-nothing (the A in **ACID**), and row locks (`FOR UPDATE`) prevent concurrent readers from acting on doomed data. The same hazard appears in code as 'check-then-act' bugs (`if file doesn't exist → create it`) — the lesson transfers beyond SQL.\n\nWhy the others are wrong: a — injection is about untrusted input in queries, absent here; c — no foreign keys involved; d — preventing exactly this is a core reason transactional databases exist."
  },
  {
    id: "csa-044",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "Memoization versus bottom-up tabulation in dynamic programming: using Fibonacci or climbing-stairs as your example, explain both, and when each is preferable.",
    code: null,
    options: null,
    answer: null,
    solution: "Both are dynamic programming — solving a problem whose recursion recomputes the same subproblems exponentially many times, by ensuring **each subproblem is solved once**. They differ only in direction. **Memoization (top-down)**: keep the natural recursive shape, add a cache. `fib(n)` checks the cache first; on a miss it recurses, then stores the result. The first `fib(50)` call tree collapses from 2⁵⁰-ish calls to 50 distinct ones — O(n) time, O(n) space for cache plus recursion stack. In Python it's literally one decorator: `@functools.lru_cache` above the naive function. **Tabulation (bottom-up)**: eliminate recursion; fill a table from the base cases upward — `dp[0], dp[1]`, then `dp[i] = dp[i-1] + dp[i-2]` in a loop until `dp[n]`. Same O(n) time, but no recursion stack — and it unlocks the **space squeeze**: computing `dp[i]` needs only the previous two values, so two variables suffice — O(1) space, the optimal Fibonacci. When to prefer which: *memoization* wins when the recursive structure is complex or you only need a sparse subset of subproblems (it computes exactly what's demanded, nothing more), and it's the five-minute transformation of code you already have — but it carries recursion-depth limits (Python's ~1000 frames make memoized fib(5000) crash where tabulation shrugs) and per-call overhead. *Tabulation* wins for performance (loops beat function calls), for deep problems, and whenever the evaluation order is easy to see — and it's the form that admits rolling-array space optimizations. The general DP recipe to recite: identify overlapping subproblems and optimal substructure → define the state (`dp[i]` = answer for size i) → write the recurrence → pick top-down or bottom-up → optimize space if only recent states are needed. Interview tip: implement memoized first (fast to write, hard to get wrong), then *offer* the bottom-up O(1)-space version — that sequence demonstrates both fluency and judgment."
  }
];
