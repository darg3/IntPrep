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
  }
];
