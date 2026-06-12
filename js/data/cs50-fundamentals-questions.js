window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["cs50-fundamentals"] = [
  {
    id: "csf-001",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "CS50 teaches that \"compiling\" a C program is really four separate steps. Which option lists them in the correct order?",
    code: null,
    options: {
      a: "compiling, preprocessing, linking, assembling",
      b: "preprocessing, assembling, compiling, linking",
      c: "preprocessing, compiling, assembling, linking",
      d: "linking, preprocessing, compiling, assembling"
    },
    answer: "c",
    solution: "Correct: c. The four steps are preprocessing, compiling, assembling, linking.\n\nPreprocessing handles directives like `#include` and `#define` by literally pasting header contents into your source. Compiling translates the resulting C code into assembly. Assembling turns that assembly into machine code (object code). Linking combines your object file with the object code of libraries like the C standard library into one executable.\n\nWhy the others are wrong: (a) compiling cannot come before preprocessing because headers must be expanded first. (b) you cannot assemble before compiling because no assembly exists yet. (d) linking is necessarily last, since it needs every object file already produced."
  },
  {
    id: "csf-002",
    category: "cs50",
    difficulty: "basic",
    type: "open",
    question: "Why do computers store everything as binary, and how do we get from raw bits all the way to letters and emoji on the screen?",
    code: null,
    options: null,
    answer: null,
    solution: "Computers are built from transistors, which are tiny switches that are either on or off, so the natural alphabet of hardware has exactly two symbols: 0 and 1. A single 0-or-1 is a bit, and we group 8 bits into a byte, which can represent 2^8 = 256 different values. To display text, we simply agree on a mapping from numbers to characters: ASCII says 65 means 'A', 97 means 'a', and 48 means the character '0'. ASCII covers only 128 standard codes, which is enough for English but not for other alphabets or emoji. Unicode extends the same idea to well over 100,000 code points, and encodings like UTF-8 store each code point using a variable number of bytes, so 'A' is still the single byte 65 while an emoji takes four bytes. The key insight to say out loud: bits have no inherent meaning. The same pattern of bits could be the letter 'A', the integer 65, or part of a pixel's color; the context or type tells the computer how to interpret it.\n\nInterview tip: ending with \"data is just bits, interpretation gives them meaning\" shows you understand abstraction, which is exactly what this question is probing."
  },
  {
    id: "csf-003",
    category: "cs50",
    difficulty: "basic",
    type: "code",
    question: "Look at this C program. What exactly does it print, and why?",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  char c = 'A';\n  printf(\"%c %i\\n\", c, c);\n  printf(\"%c\\n\", c + 1);\n}",
    options: null,
    answer: null,
    solution: "Output:\nA 65\nB\n\nIn C, a `char` is just a one-byte integer, and 'A' is the number 65 in ASCII. Printing the same variable with `%c` interprets the number as a character (A), while `%i` interprets it as an integer (65). Because chars are numbers, arithmetic works on them: `c + 1` is 66, which is the ASCII code for 'B', so the second printf prints B. This duality is exactly how CS50 explains ASCII: the bits do not change, only the format specifier changes how they are interpreted."
  },
  {
    id: "csf-004",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "In C, which `printf` format specifier prints a floating-point number such as 3.14?",
    code: null,
    options: {
      a: "%i",
      b: "%f",
      c: "%c",
      d: "%s"
    },
    answer: "b",
    solution: "Correct: b. `%f` prints a `float` or `double` (you can control decimals with forms like `%.2f`).\n\nThe basic pairings to memorize: `%i` (or `%d`) for `int`, `%f` for `float`/`double`, `%c` for a single `char`, `%s` for a string, `%li` for a `long`, and `%p` for a pointer.\n\nWhy the others are wrong: (a) `%i` prints whole numbers and would misinterpret the bits of a float. (c) `%c` prints exactly one character. (d) `%s` expects a pointer to a null-terminated string and would likely crash or print garbage given a number."
  },
  {
    id: "csf-005",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "What is a pointer in C? Show me how you would declare one, take the address of a variable, and dereference it — and explain why C needs pointers for a function like `swap` to work.",
    code: null,
    options: null,
    answer: null,
    solution: "A pointer is a variable whose value is a memory address — it stores where something lives rather than the thing itself. If I have `int x = 50;`, then `int *p = &x;` declares a pointer to int and stores the address of `x` in it: `&` is the address-of operator. The `*` operator does double duty: in a declaration it means \"this is a pointer,\" and in an expression `*p` dereferences the pointer, meaning \"go to that address and use the value there,\" so `*p = 60;` actually changes `x`. The reason pointers matter is that C is strictly pass-by-value: when you call a function, it receives copies of the arguments. That is why `swap(a, b)` written with plain ints swaps only the copies and leaves the caller's variables untouched. The fix is to pass addresses — `swap(&a, &b)` with the signature `void swap(int *a, int *b)` — so the function can follow the pointers and modify the caller's actual memory. This is how C simulates pass-by-reference, and it is the same reason `scanf` takes `&x`.\n\nInterview tip: drawing two boxes — one for the variable, one holding an arrow to it — is the fastest way to show you truly get this."
  },
  {
    id: "csf-006",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "A student wrote this swap function. What does the program print, and how would you fix it?",
    code: "#include <stdio.h>\nvoid swap(int a, int b)\n{\n  int tmp = a;\n  a = b;\n  b = tmp;\n}\n\nint main(void)\n{\n  int x = 1, y = 2;\n  swap(x, y);\n  printf(\"x = %i, y = %i\\n\", x, y);\n}",
    options: null,
    answer: null,
    solution: "Output: x = 1, y = 2 — the swap silently fails.\n\nC is pass-by-value: `swap` receives copies of `x` and `y` in its own stack frame. The function dutifully swaps the copies, then its frame is destroyed on return, and the originals in `main` are untouched.\n\nThe fix is to pass pointers so the function can reach into the caller's memory:\n\nvoid swap(int *a, int *b)\n{\n  int tmp = *a;\n  *a = *b;\n  *b = tmp;\n}\n\nand call it as `swap(&x, &y);`. Then the output is x = 2, y = 1. This is the canonical demonstration of why C uses pointers to emulate pass-by-reference."
  },
  {
    id: "csf-007",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "Which statement correctly describes the stack and the heap in a running C program?",
    code: null,
    options: {
      a: "Local variables live on the stack; memory you request with `malloc` comes from the heap",
      b: "Local variables live on the heap; `malloc` hands out stack memory",
      c: "Everything lives on the stack; the heap is only used by the operating system",
      d: "The stack grows when you call `malloc` and shrinks when you call `free`"
    },
    answer: "a",
    solution: "Correct: a. Each function call gets a stack frame holding its local variables and parameters; the frame is created on call and destroyed automatically on return. `malloc` allocates from the heap, a separate region whose memory survives until you explicitly call `free` — that persistence is exactly why you use it.\n\nWhy the others are wrong: (b) is exactly backwards. (c) the heap is a normal part of every process's memory, not an OS-only area. (d) `malloc`/`free` manage the heap, not the stack; the stack grows and shrinks with function calls and returns."
  },
  {
    id: "csf-008",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "What is a memory leak, how does one happen in C, and how would you use valgrind to find it?",
    code: null,
    options: null,
    answer: null,
    solution: "A memory leak is heap memory your program allocated with `malloc` but never released with `free`, so the program can never reuse it. It happens when you lose every pointer to a block — for example, reassigning the only pointer that held a malloc'd address, or returning from a function without freeing what it allocated. A short-lived program may get away with it, but in a long-running server the leaked memory accumulates until the process slows down or is killed. The rule of thumb: every `malloc` should have exactly one matching `free`, and after freeing it is good practice not to touch the pointer again. Valgrind is the tool CS50 teaches for this: you run `valgrind ./program` and it tracks every allocation, then reports a leak summary such as \"definitely lost: 40 bytes in 1 blocks\" along with the stack trace of the exact line that allocated the lost memory. Valgrind also catches related bugs — invalid reads/writes past the end of a block, and use of memory after it was freed — which makes it the first thing to reach for when a C program misbehaves.\n\nInterview tip: mentioning that you would run valgrind before even guessing at the bug signals real debugging habits."
  },
  {
    id: "csf-009",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "This program compiles cleanly, but valgrind complains loudly. Spot the bug.",
    code: "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main(void)\n{\n  char *s = malloc(6);\n  if (s == NULL)\n    return 1;\n  strcpy(s, \"CS50\");\n  free(s);\n  printf(\"%s\\n\", s);\n}",
    options: null,
    answer: null,
    solution: "The bug: `printf` uses `s` AFTER `free(s)` — a use-after-free through a dangling pointer.\n\nOnce you call `free`, that heap block is returned to the allocator and may be reused or poisoned at any moment; the pointer still holds the old address, but dereferencing it is undefined behavior. It might appear to print \"CS50\", might print garbage, or might crash — which is what makes this class of bug so dangerous. Valgrind reports it as an \"invalid read\" and points at the printf line.\n\nThe fix is to print first, then free:\n\nstrcpy(s, \"CS50\");\nprintf(\"%s\\n\", s);\nfree(s);\n\nGood hygiene after freeing is `s = NULL;`, so any accidental later use fails fast and obviously instead of silently corrupting memory."
  },
  {
    id: "csf-010",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "Which of these C mistakes is most likely to cause a segmentation fault the moment the line runs?",
    code: null,
    options: {
      a: "Forgetting to call `free` on memory you malloc'd",
      b: "Adding 1 to an `int` that already holds the maximum int value",
      c: "Comparing two strings with `==` instead of `strcmp`",
      d: "Dereferencing a pointer that is `NULL`"
    },
    answer: "d",
    solution: "Correct: d. A segmentation fault means the program touched memory it is not allowed to access. Dereferencing `NULL` (address 0) is the classic immediate segfault, which is why you always check `malloc`'s return value before using it. Other common segfault causes: dereferencing an uninitialized pointer, and writing past the end of an array or buffer.\n\nWhy the others are wrong: (a) is a memory leak — wasteful, but it does not crash on that line. (b) is integer overflow — the value typically wraps around to a negative number silently, with no crash. (c) compiles and runs fine; it just compares addresses instead of contents, giving wrong logic rather than a crash."
  },
  {
    id: "csf-011",
    category: "cs50",
    difficulty: "basic",
    type: "open",
    question: "In C there is no built-in string type. What actually is a string, and why does comparing two strings with `==` not do what beginners expect?",
    code: null,
    options: null,
    answer: null,
    solution: "In C, a string is just an array of `char`s ending with a special null terminator byte, written `\\0`, whose value is zero. So \"hi\" actually occupies three bytes: 'h', 'i', and `\\0`. The terminator is how functions know where the string ends — `strlen` literally walks the array counting characters until it hits `\\0`, and `printf(\"%s\", ...)` prints until it finds it. CS50's `string` type is really `char *`: a pointer to the first character. That pointer view explains the `==` trap: comparing two strings with `==` compares the two addresses, not the characters, so two identical strings stored at different locations compare as unequal. The correct tool is `strcmp(s, t)`, which walks both arrays comparing character by character and returns 0 when they match. Similarly, copying with `t = s` only copies the pointer — both names then refer to the same array — while `strcpy` (with enough allocated space, including room for the `\\0`) copies the actual characters. Forgetting that extra byte for the terminator is one of the most common C bugs.\n\nInterview tip: saying \"strings are a convention, not a type — the convention is char array plus null terminator\" sums it up well."
  },
  {
    id: "csf-012",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "What does this program print? The two numbers are different — explain why.",
    code: "#include <stdio.h>\n#include <string.h>\n\nint main(void)\n{\n  char s[] = \"CS50\";\n  printf(\"%zu\\n\", strlen(s));\n  printf(\"%zu\\n\", sizeof(s));\n}",
    options: null,
    answer: null,
    solution: "Output:\n4\n5\n\n`strlen(s)` returns 4: it counts characters starting at `s` until it reaches the null terminator, and \"CS50\" has four visible characters. `sizeof(s)` returns 5: `s` is a true array here, and the compiler sized it from the string literal as five bytes — 'C', 'S', '5', '0', plus the hidden `\\0` terminator that ends every C string.\n\nTwo takeaways interviewers want to hear: every string really does carry one extra invisible byte, and `strlen` is a runtime walk through memory while `sizeof` is a compile-time size. Bonus point: if `s` were a `char *` instead of an array, `sizeof(s)` would give the size of a pointer (typically 8), not the string's length."
  },
  {
    id: "csf-013",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "You want a single variable that stores a person's name and phone number together, like in CS50's phonebook. Which C feature do you use?",
    code: null,
    options: {
      a: "A two-dimensional array holding both values",
      b: "A `struct`, typically wrapped in a `typedef`",
      c: "A `union` containing a name and a number",
      d: "C's built-in dictionary type"
    },
    answer: "b",
    solution: "Correct: b. A struct groups related variables of different types into one custom type:\n\ntypedef struct\n{\n  string name;\n  string number;\n}\nperson;\n\nThen `person p; p.name = \"David\"; p.number = \"+1-617-495-1000\";` — fields are accessed with the dot operator (or `->` through a pointer). Structs are also the building block of linked lists, where each node struct holds a value and a pointer to the next node.\n\nWhy the others are wrong: (a) arrays hold elements of one type and tie data together only by parallel indices, which is fragile. (c) a union stores only ONE of its members at a time, so you could not keep name and number simultaneously. (d) C has no built-in dictionary — you would build a hash table yourself."
  },
  {
    id: "csf-014",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "Arrays versus linked lists: how do they differ in memory, and when would you pick one over the other?",
    code: null,
    options: null,
    answer: null,
    solution: "An array is one contiguous block of memory, so the computer can jump straight to any element by computing its address from the index — random access is instant, and contiguity also makes arrays cache-friendly. The price is rigidity: the size is fixed up front, growing means allocating a bigger block and copying everything over, and inserting or deleting in the middle requires shifting all the elements after it. A linked list flips those tradeoffs: each node is allocated separately on the heap and holds a value plus a pointer to the next node, so the list grows one node at a time and inserting at the front is just a couple of pointer assignments. But there is no jumping to element i — you must walk from the head node by node — and every node costs extra memory for its pointer. So I would choose an array when I know roughly how much data I have or need fast access by index, and a linked list when the size is unpredictable and I am constantly inserting and deleting, especially at the ends. A useful one-liner: arrays buy fast reads at the cost of slow restructuring; linked lists buy cheap restructuring at the cost of slow reads.\n\nInterview tip: also note that arrays enable binary search precisely because of random access, while a sorted linked list cannot be binary searched efficiently."
  },
  {
    id: "csf-015",
    category: "cs50",
    difficulty: "advanced",
    type: "code",
    question: "Here `node` is the usual singly linked list struct with an `int value` and a `struct node *next` pointer. Fill in the two blanks so this function reverses the list iteratively and returns the new head.",
    code: "node *reverse(node *head)\n{\n  node *prev = NULL;\n  node *curr = head;\n  while (curr != NULL)\n  {\n    node *next = ____;\n    curr->next = ____;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}",
    options: null,
    answer: null,
    solution: "The blanks are:\n\nnode *next = curr->next;\ncurr->next = prev;\n\nThis is the classic three-pointer dance. At each step you must first save where you were going (`next = curr->next`) because the very next line destroys that link; then you flip the current node's arrow to point backwards (`curr->next = prev`); finally you slide both trackers forward (`prev = curr; curr = next;`). When `curr` falls off the end as NULL, `prev` is sitting on the old tail — the new head — so you return it. The function runs in O(n) time with O(1) extra space, visiting each node exactly once.\n\nThis is the single most-asked linked list exercise in junior interviews, so it is worth being able to write it cold and to dry-run it on a three-node list out loud: 1->2->3 becomes 3->2->1."
  },
  {
    id: "csf-016",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "A browser's back button and a printer's job line are textbook examples of two different data structures. Which pairing is right?",
    code: null,
    options: {
      a: "Back button: stack (LIFO); printer jobs: queue (FIFO)",
      b: "Back button: queue (FIFO); printer jobs: stack (LIFO)",
      c: "Both are stacks, since both handle the newest item first",
      d: "Both are queues, since both handle items in arrival order"
    },
    answer: "a",
    solution: "Correct: a. A stack is last-in, first-out: `push` adds to the top and `pop` removes from the top. The back button is a stack because the page you visited most recently is the first one you return to — like a stack of cafeteria trays or an undo history. A queue is first-in, first-out: `enqueue` adds at the back and `dequeue` removes from the front. Print jobs are a queue because the document submitted first prints first — like a line at a store.\n\nWhy the others are wrong: (b) reverses both behaviors. (c) printers that served the newest job first would starve the first person who clicked print. (d) a back button in arrival order would take you to the OLDEST page first. Either structure can be implemented with an array or a linked list; what defines them is the order discipline, not the storage."
  },
  {
    id: "csf-017",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "Explain how a hash table works — and what happens when two keys hash to the same spot?",
    code: null,
    options: null,
    answer: null,
    solution: "A hash table combines an array with a hash function. The hash function takes a key — say, a word — and deterministically converts it into a number, which is used as an index into the array of buckets; deterministic matters because the same key must always land in the same bucket or you could never find it again. That direct jump is what makes lookups essentially constant time on average: instead of searching everything, you compute where the item should be and go straight there. But with more possible keys than buckets, two different keys will inevitably hash to the same index — a collision. There are two standard ways to handle it. Separate chaining, the approach CS50's speller uses, makes each bucket the head of a linked list, so colliding items simply chain together and a lookup walks that short list. Open addressing (probing) instead keeps everything in the array: on collision you step to the next open slot following some probe sequence, and lookups retrace those steps. The quality of the hash function is everything — a good one spreads keys uniformly so chains stay short, while a bad one piles keys into few buckets and lookups degrade toward a linear scan.\n\nInterview tip: a great closer is \"a hash table trades a little memory and a good hash function for near-instant lookup.\""
  },
  {
    id: "csf-018",
    category: "cs50",
    difficulty: "advanced",
    type: "mcq",
    question: "Your hash table uses separate chaining, but the hash function is broken and returns 0 for every key. After inserting n items, what is a lookup actually doing?",
    code: null,
    options: {
      a: "Still constant time — chaining guarantees O(1) no matter what",
      b: "Binary searching within bucket 0",
      c: "Walking one linked list containing all n items — effectively a linear search",
      d: "Failing — chaining cannot store two keys with the same hash value"
    },
    answer: "c",
    solution: "Correct: c. If every key hashes to index 0, all n items chain into a single linked list hanging off that one bucket. A lookup then walks that list node by node, which is just linear search — the hash table has degenerated into a linked list with extra steps. This is the key insight about hash tables: the O(1) average lookup is conditional on the hash function distributing keys evenly across buckets.\n\nWhy the others are wrong: (a) chaining handles collisions correctly but cannot make a terrible distribution fast. (b) linked lists have no random access, so you cannot binary search a chain. (d) storing same-hash keys is exactly what chaining is designed to do — it works, just slowly here. Real-world note: attackers have exploited this by crafting keys that all collide, which is why languages use randomized hash seeds."
  },
  {
    id: "csf-019",
    category: "cs50",
    difficulty: "advanced",
    type: "open",
    question: "What is a trie, how does a lookup actually work, and when would a trie beat a hash table?",
    code: null,
    options: null,
    answer: null,
    solution: "A trie — short for retrieval, also called a prefix tree — is a tree that stores strings character by character. Each node contains an array of child pointers, one slot per possible character (26 for lowercase English), plus a flag marking whether the path from the root to this node spells a complete word. To look up \"cat\", you start at the root, follow the 'c' child, then 'a', then 't', and check the is-word flag — three steps, one per character. That makes lookup O(k), where k is the length of the key, completely independent of how many words are stored: whether the trie holds a hundred words or a million, looking up \"cat\" is still three hops, and there are no collisions to worry about. The superpower is prefixes: every word starting with \"ca\" lives in the subtree under the 'a' node, so autocomplete is just \"walk the prefix, then explore that subtree.\" A hash table cannot do that — hashing scatters \"car\", \"cat\", and \"cart\" to unrelated buckets, so prefix queries would require scanning every key. The cost is memory: each node carries a whole array of mostly-NULL child pointers, so tries are hungry compared to hash tables. So my rule: hash table for pure exact-match lookups, trie when I need prefix search — autocomplete, spell-check suggestions, dictionary apps.\n\nInterview tip: \"when would a trie beat a hash table?\" has a one-word killer answer — autocomplete."
  },
  {
    id: "csf-020",
    category: "cs50",
    difficulty: "advanced",
    type: "mcq",
    question: "You insert the values 1, 2, 3, 4, 5 into an empty binary search tree, in that order. What does the resulting tree look like, and what does that do to search time?",
    code: null,
    options: {
      a: "A perfectly balanced tree — BSTs distribute keys evenly regardless of order",
      b: "The tree rebalances itself automatically after each insert",
      c: "Insertion order never affects a BST's shape, only its size",
      d: "A straight chain to the right — effectively a linked list, so search degrades from O(log n) to O(n)"
    },
    answer: "d",
    solution: "Correct: d. In a BST, every new key goes left if smaller, right if larger. Inserting already-sorted data means each new value is larger than everything before it, so it always becomes the rightmost child — producing a degenerate tree that is just a chain. Searching it inspects every node in the worst case, O(n), exactly like a linked list. The O(log n) search a BST promises only holds when the tree stays roughly balanced, which is why self-balancing variants (AVL trees, red-black trees) exist: they rotate nodes on insert to keep the height logarithmic.\n\nWhy the others are wrong: (a) a plain BST does nothing to distribute keys — shape depends entirely on insertion order. (b) automatic rebalancing is a feature of AVL/red-black trees, not vanilla BSTs. (c) order absolutely determines shape; inserting 3, 1, 4, 2, 5 gives a bushy tree, while 1..5 in order gives a chain.\n\nBonus property worth mentioning: an in-order traversal of any BST visits keys in sorted order."
  },
  {
    id: "csf-021",
    category: "cs50",
    difficulty: "advanced",
    type: "code",
    question: "Predict the output of this program — and explain the result to someone who insists that 0.1 + 0.2 is obviously 0.3.",
    code: "#include <stdio.h>\n\nint main(void)\n{\n  double x = 0.1;\n  double y = 0.2;\n  if (x + y == 0.3)\n    printf(\"equal\\n\");\n  else\n    printf(\"not equal: %.17f\\n\", x + y);\n}",
    options: null,
    answer: null,
    solution: "Output:\nnot equal: 0.30000000000000004\n\nThis is floating-point imprecision. A `double` stores numbers in binary with a finite number of bits, and 0.1 in binary is a repeating fraction — just like 1/3 is 0.333... in decimal — so it cannot be stored exactly; the computer keeps the closest representable value. The tiny errors in 0.1 and 0.2 survive the addition, and the sum lands a hair above 0.3, so the `==` comparison is false.\n\nPractical rules: never compare floating-point values with `==` — compare against a small tolerance instead, like `fabs(a - b) < 1e-9`; and never use floats for money — count integer cents. This is a favorite CS50 Week 1 gotcha precisely because the code looks unimpeachable."
  },
  {
    id: "csf-022",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "What is the hexadecimal value `0xFF` in decimal?",
    code: null,
    options: {
      a: "100",
      b: "155",
      c: "255",
      d: "256"
    },
    answer: "c",
    solution: "Correct: c. Hexadecimal is base 16, with digits 0-9 then A-F, where F is 15. So `0xFF` = 15 x 16 + 15 = 240 + 15 = 255.\n\nThe reason programmers love hex: one hex digit represents exactly 4 bits, so two hex digits represent exactly one byte (0x00 to 0xFF covers 0 to 255). That is why memory addresses are written in hex (0x7ffe...), and why web colors use pairs like #FF0000 — FF means the red byte is maxed at 255.\n\nWhy the others are wrong: (a) and (b) come from misreading hex as decimal-ish digits. (d) 256 is the COUNT of values one byte can hold (2^8), but the maximum value itself is 255, since counting starts at 0."
  },
  {
    id: "csf-023",
    category: "cs50",
    difficulty: "advanced",
    type: "open",
    question: "A program stores a counter in a 32-bit `int`, and after months of running, the counter suddenly goes negative. What happened — and what other numeric surprise should every C programmer be ready to explain?",
    code: null,
    options: null,
    answer: null,
    solution: "That is integer overflow. A 32-bit signed int has 32 bits, one of which effectively encodes sign, so its maximum value is 2,147,483,647 — about 2.1 billion. When the counter passes that ceiling, there is no 33rd bit to carry into, so the value wraps around to a huge negative number (and for signed ints this is formally undefined behavior, so the compiler is allowed to do anything). This bites real systems: Gangnam Style's view count approached the 2,147,483,647 limit and famously forced YouTube to upgrade its counter to a 64-bit integer, the Boeing 787 had to be rebooted every 248 days because a counter of hundredths of a second would overflow a signed 32-bit int, and the Year 2038 problem is a 32-bit Unix timestamp running out of room. Defenses: use a wider type like `long` or `int64_t` for anything that grows, use unsigned types when negatives are impossible, and check bounds before arithmetic you cannot afford to get wrong. The sibling gotcha is floating-point imprecision: floats and doubles have finite bits, so values like 0.1 are stored only approximately, which is why 0.1 + 0.2 != 0.3 and why you compare doubles with a tolerance and store money as integer cents. Both surprises have the same root cause, and saying so is the strong-answer move: finite memory means every numeric type has limits, and good engineers know where those limits are.\n\nInterview tip: having one real-world overflow story ready (787 or Y2038) instantly elevates this answer."
  },
  {
    id: "csf-024",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "In C, what does the expression `x << 3` compute (for a small positive integer `x`)?",
    code: null,
    options: {
      a: "x multiplied by 8 — each left shift by one bit doubles the value",
      b: "x divided by 3",
      c: "x raised to the 3rd power",
      d: "x with its lowest 3 bits set to 1"
    },
    answer: "a",
    solution: "Correct: a. `<<` shifts the bits left, filling with zeros on the right. Each position is worth a power of two, so shifting left by one doubles the value, and `x << 3` multiplies by 2³ = 8. Example: 5 is `101`; `5 << 3` is `101000` = 40. The mirror image: `x >> 3` shifts right, dividing by 8 (discarding the remainder for unsigned values).\n\nThe rest of the bitwise toolbox, with their classic idioms:\n- `&` (AND) — masking: `x & 0xFF` keeps only the low byte; `x & 1` tests odd/even.\n- `|` (OR) — setting flags: `flags | FLAG_VISIBLE` turns a bit on.\n- `^` (XOR) — toggling: `x ^ mask` flips the masked bits; `x ^ x` is always 0.\n- `~` (NOT) — inverts every bit.\n\nWhy the others are wrong: b — division would be a *right* shift (by log₂(3), which isn't whole anyway); c — C has no exponent operator (`pow()` is a library function); d — setting low bits would be `x | 0b111`.\n\nGotchas worth one sentence each: don't confuse `&`/`|` with the logical `&&`/`||`; shifting a signed negative value or shifting by ≥ the type's width is undefined behavior; and in practice compilers already turn `x * 8` into a shift — write the multiplication for clarity unless you're genuinely doing bit manipulation."
  },
  {
    id: "csf-025",
    category: "cs50",
    difficulty: "advanced",
    type: "open",
    question: "How are negative integers represented in binary? Explain two's complement and why it won out over the more obvious sign-bit approach.",
    code: null,
    options: null,
    answer: null,
    solution: "Two's complement represents a negative number as: flip every bit of the positive value, then add 1. In 8 bits: +5 is `00000101`; flip → `11111010`; add 1 → `11111011` = −5. The top bit tells you the sign (1 = negative), and the range is asymmetric: −128 to +127 for 8 bits, because zero takes one of the 'positive-side' patterns. Why it beat the naive sign-and-magnitude scheme (just reserve the top bit for sign): first, sign-magnitude has **two zeros** (`00000000` and `10000000`), which complicates every comparison; second — the killer feature — **addition just works**: the same binary adder circuit handles positive and negative numbers with no special cases. Check it: 5 + (−5) = `00000101` + `11111011` = `1 00000000` — the carry falls off the end, leaving exactly 0. Subtraction becomes 'negate and add', so the hardware needs one adder, period. A good way to internalize it: in two's complement, the top bit's place value is *negative* — for 8 bits the weights are −128, 64, 32, 16, 8, 4, 2, 1 — every other bit is normal. This representation is why integer overflow wraps to negative (incrementing `01111111` = +127 gives `10000000` = −128), why `(unsigned)x` reinterprets rather than converts the bits, and why the maximum int is 2,147,483,647 for 32 bits. Interview tip: do the −5 example and say 'one adder circuit, no special cases, single zero' — that's the entire 'why' in one breath."
  },
  {
    id: "csf-026",
    category: "cs50",
    difficulty: "basic",
    type: "code",
    question: "This C program is supposed to print the 5 scores, but it sometimes prints a garbage 6th number — or crashes. Spot the bug.",
    code: "#include <stdio.h>\n\nint main(void)\n{\n    int scores[5] = {90, 85, 70, 95, 80};\n\n    for (int i = 0; i <= 5; i++)\n    {\n        printf(\"%i\\n\", scores[i]);\n    }\n}",
    options: null,
    answer: null,
    solution: "The bug is `i <= 5` — a classic **off-by-one** error. Valid indices for a 5-element array are 0 through 4; the loop also runs with `i == 5`, and `scores[5]` reads one slot *past the end* of the array.\n\nThe fix: `for (int i = 0; i < 5; i++)` — the idiomatic C loop shape is `i = 0; i < N`, which runs exactly N times and never touches index N.\n\nWhy the symptom is so erratic: C performs **no bounds checking** — `scores[5]` just computes 'address of scores + 5 ints' and reads whatever memory lives there. Usually that's some other stack value (garbage number), sometimes it's memory the process can't touch (segfault), and writing out of bounds is worse: it silently corrupts neighboring variables or the function's return address — the mechanism behind buffer-overflow exploits. This 'works on my machine, crashes on yours' nondeterminism is the signature of undefined behavior.\n\nHow you'd catch it: valgrind flags the invalid read instantly; compiling with `-fsanitize=address` aborts with a precise report; and code review should flag any `<=` against an array length on sight.\n\nHardening habit: don't repeat the magic 5 — `for (int i = 0; i < sizeof(scores) / sizeof(scores[0]); i++)` derives the length, so the loop can't drift out of sync when the array grows."
  },
  {
    id: "csf-027",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "What does the `sizeof` operator report, and which of these is TRUE on a typical 64-bit system?",
    code: null,
    options: {
      a: "`sizeof(char)` is 1, `sizeof(int)` is typically 4, and `sizeof` of any pointer type is typically 8",
      b: "`sizeof(int)` is always 2 on every platform",
      c: "`sizeof` returns the number of *elements* in any array, even one passed to a function",
      d: "`sizeof(char)` depends on the machine and is often 4"
    },
    answer: "a",
    solution: "Correct: a. `sizeof` yields the size *in bytes* of a type or object, computed at compile time. The anchors: `sizeof(char)` is **1 by definition** (the C standard defines a byte as the size of char); `int` is typically 4 bytes (32 bits) on modern systems; `double` 8; and every pointer — `int *`, `char *`, `struct node *` — is the size of an address, 8 bytes on a 64-bit system. That pointer fact is why a 64-bit machine is called that: addresses are 64 bits wide.\n\nWhy the others are wrong:\n- b: the standard only guarantees *minimums* (int ≥ 16 bits) and ordering (char ≤ short ≤ int ≤ long); 4 is convention, not law — which is why portable code uses `int32_t`/`int64_t` from `<stdint.h>` when exact width matters.\n- c: two errors — `sizeof(arr)` gives total *bytes*, not elements (elements = `sizeof(arr) / sizeof(arr[0])`), and it only works in the scope where the array is declared. Passed to a function, an array **decays to a pointer**, so `sizeof` reports 8 — the single most common sizeof trap, and the reason array-taking functions need a separate length parameter.\n- d: char is 1, always.\n\nWhere this knowledge gets used daily in C: `malloc(n * sizeof(int))`, the element-count idiom above, and reasoning about struct sizes (which include alignment padding — `sizeof` a struct can exceed the sum of its members)."
  },
  {
    id: "csf-028",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "When do you need `malloc` instead of an ordinary local variable in C? Walk through the rules for using `malloc` and `free` correctly.",
    code: null,
    options: null,
    answer: null,
    solution: "Local variables live on the **stack**: created when the function is called, automatically destroyed when it returns. That's perfect — until it isn't. You need `malloc` (heap allocation) in three situations: (1) the data must **outlive the function** that creates it — returning a pointer to a local is a classic dangling-pointer bug, because that stack memory is reclaimed at return; (2) the size is **only known at runtime** — reading n records when n comes from user input (C99 VLAs exist but risk stack overflow for large n); (3) the data is **large** — stacks are small (commonly ~1–8 MB), so a million-element buffer belongs on the heap. The contract: `int *p = malloc(n * sizeof(int));` requests bytes; you must (a) **check for NULL** — malloc returns NULL when memory is unavailable, and dereferencing NULL is a segfault; (b) remember malloc'd memory is **uninitialized** garbage (use `calloc` to get zeros); (c) call **`free(p)` exactly once** when done. The failure modes each have names: never freeing = **memory leak** (long-running programs slowly eat RAM); freeing twice = **double free** (heap corruption, exploitable); using after freeing = **use-after-free** (reads garbage or worse); and after free, set `p = NULL` so a stray use fails loudly. Discipline that scales: every malloc has one clearly identified owner responsible for the free; valgrind or `-fsanitize=address` in your test runs catches all four failure modes. Interview tip: the three *whens* (outlives, runtime-sized, large) followed by 'check NULL, free once, never use after' is the complete expected shape."
  },
  {
    id: "csf-029",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "This program tries to make an independent copy of the string, but editing the 'copy' changes the original too. Why, and how do you fix it?",
    code: "#include <stdio.h>\n#include <string.h>\n\nint main(void)\n{\n    char original[] = \"hello\";\n    char *copy = original;       // make a copy?\n\n    copy[0] = 'H';\n    printf(\"%s\\n\", original);    // prints \"Hello\" ?!\n}",
    options: null,
    answer: null,
    solution: "`char *copy = original;` copies **the pointer, not the characters**. In C a string is just the address of its first character, so after this line both `original` and `copy` refer to the *same* six bytes (`h e l l o \\0`) in memory — there is only one string with two names. `copy[0] = 'H'` therefore edits the shared bytes, and the 'original' prints \"Hello\". This is CS50's famous lesson that strings are pointers in disguise.\n\nA real copy needs new memory plus a character-by-character copy:\n\nchar copy[6];                       // or: char *copy = malloc(strlen(original) + 1);\nstrcpy(copy, original);             // copies chars INCLUDING the '\\0'\n\ncopy[0] = 'H';\nprintf(\"%s %s\\n\", original, copy);  // \"hello Hello\"\n\nThe details that earn points:\n- The `+ 1` in `malloc(strlen(s) + 1)` — `strlen` does *not* count the terminating `'\\0'`; forgetting the +1 truncates the terminator and `printf` reads into the weeds.\n- If you malloc'd, check for NULL and `free(copy)` when done.\n- Safer variants exist (`strncpy`, or `strdup` which mallocs and copies in one call — POSIX, now in C23).\n\nThe transferable idea: assignment in C copies *values*, and a pointer's value is an address — the same shallow-copy-vs-deep-copy distinction that reappears with structs containing pointers, and in every higher-level language with reference types."
  },
  {
    id: "csf-030",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "Why must you check `malloc`'s return value before using it, as in `if (p == NULL) { return 1; }`?",
    code: null,
    options: {
      a: "Because malloc returns NULL roughly 1% of the time at random, by design",
      b: "Because when memory cannot be allocated, malloc returns NULL — and dereferencing NULL crashes the program (segfault) instead of failing gracefully",
      c: "Because malloc requires the check before it actually reserves the memory",
      d: "It's only needed on 32-bit systems"
    },
    answer: "b",
    solution: "Correct: b. `malloc` returns NULL when the allocation fails — the system is out of memory, the process hit a limit, or you accidentally requested an absurd size (a negative number converted to a huge unsigned value is the classic accident). NULL is address 0, deliberately unmapped, so reading or writing through it is an immediate segmentation fault. The check converts an uncontrolled crash into a controlled exit or error path:\n\nint *p = malloc(n * sizeof(int));\nif (p == NULL)\n{\n    return 1;   // or print an error, clean up, etc.\n}\n\nWhy the others are wrong:\n- a: failure isn't random; it reflects an actual inability to allocate.\n- c: malloc reserves the memory during the call itself; the check just inspects the result.\n- d: pointer width is irrelevant — any platform's malloc can fail.\n\nHonest context interviewers appreciate: on desktop Linux with overcommit, small mallocs essentially never return NULL in practice — but the check is still non-negotiable in C culture, because embedded systems, containers with memory limits, and huge allocations fail for real, and the cost of the check is one line. CS50 deducts style/correctness points for skipping it, and so do real code reviews. Related discipline: the same applies to `fopen` (NULL on failure), `realloc` (assign to a temp first, or a failure leaks the original block) — C reports errors through return values, and ignoring them is how crashes are born."
  },
  {
    id: "csf-031",
    category: "cs50",
    difficulty: "basic",
    type: "open",
    question: "What are `argc` and `argv` in `int main(int argc, char *argv[])`? If a user runs `./caesar 13`, what exactly is in them — and what type is the `13`?",
    code: null,
    options: null,
    answer: null,
    solution: "They carry the command-line arguments into your program. `argc` (argument count) is how many words were on the command line *including the program name itself*; `argv` (argument vector) is an array of strings, one per word. For `./caesar 13`: `argc` is 2, `argv[0]` is `\"./caesar\"`, `argv[1]` is `\"13\"`, and by convention `argv[argc]` is NULL. The trap the question is really about: **everything in argv is a string** — `argv[1]` is the two characters '1' and '3' plus a terminator, not the number 13. Doing arithmetic with it requires conversion: `int key = atoi(argv[1]);` (or `strtol` for error-aware parsing — atoi returns 0 for garbage input, indistinguishable from a real \"0\"). Forgetting this gives you nonsense like `argv[1] + 1`, which is pointer arithmetic (the string \"3\"), not 14. The second discipline: **validate argc before touching argv** — `if (argc != 2) { printf(\"Usage: ./caesar key\\n\"); return 1; }` — because if the user passed no argument, `argv[1]` is NULL and using it segfaults. The `return 1` matters too: main's return value is the program's **exit status**, 0 meaning success and non-zero meaning failure, which is what shell scripts and CI systems check (`echo $?`). CS50's caesar/substitution problems are built exactly around these three beats: check argc, validate the string, convert with atoi. Interview tip: 'argv[1] is a string, argv[0] is the program name, validate argc first' — those three facts are the whole expected answer."
  },
  {
    id: "csf-032",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "This function reads a username into a fixed buffer. It compiles and usually works — but it contains the most famous security bug in C. What is it, and how do you fix it?",
    code: "#include <stdio.h>\n#include <string.h>\n\nvoid greet(const char *input)\n{\n    char name[16];\n    strcpy(name, input);          // copy the user's input\n    printf(\"Hello, %s!\\n\", name);\n}",
    options: null,
    answer: null,
    solution: "The bug is a **buffer overflow**: `name` holds 16 bytes, but `strcpy` copies until it finds the source's `'\\0'`, *however far that is*. Input longer than 15 characters (+ terminator) writes past the end of `name` — onto whatever lives next on the stack, which includes the function's saved **return address**. Overwrite that with attacker-chosen bytes and the function 'returns' to attacker-chosen code: this is the mechanism of classic stack-smashing exploits, and why `strcpy`-into-fixed-buffer is the most audited pattern in C history.\n\nFixes, in order of preference:\n\n// 1. Bounded copy with guaranteed termination\nchar name[16];\nsnprintf(name, sizeof(name), \"%s\", input);\n\n// 2. strncpy — but it does NOT null-terminate on truncation; you must add it\nstrncpy(name, sizeof_name_minus_1...); name[15] = '\\0';\n\n// 3. Size the buffer dynamically: malloc(strlen(input) + 1) + strcpy\n\nAnd at the design level: validate input length at the boundary and reject oversized input outright.\n\nRelated facts that round out the answer: `gets()` was so unfixable it was *removed from the C standard* (use `fgets(buf, sizeof(buf), stdin)`, which takes a size); modern defenses — stack canaries, ASLR, non-executable stacks — make exploitation harder but don't make the code correct; and tools like `-fsanitize=address` catch the overflow in testing. The principle to state: **every copy into a fixed buffer must know the buffer's size**."
  },
  {
    id: "csf-033",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "What does this code do?\n\n```\nint *p = malloc(sizeof(int));\n*p = 42;\nfree(p);\nprintf(\"%i\\n\", *p);\n```",
    code: null,
    options: {
      a: "Prints 42 reliably — free only marks the memory as available; the value stays until overwritten",
      b: "Always prints 0, because free zeroes the memory",
      c: "It is a use-after-free: undefined behavior that may print 42, print garbage, or crash — and tools like valgrind flag it as an invalid read",
      d: "It does not compile, because p cannot be used after free"
    },
    answer: "c",
    solution: "Correct: c. After `free(p)`, the pointer still *holds the same address* — but the program no longer owns that memory. Reading through it is **use-after-free**, one of C's canonical undefined behaviors. In practice it often *does* print 42 (the allocator hasn't reused the block yet), which is exactly what makes it dangerous: the bug sits silent until an allocation pattern changes, then manifests as garbage values, corrupted data structures, or crashes far from the actual mistake. In security terms, use-after-free is a top exploited vulnerability class in browsers and kernels.\n\nWhy the others are wrong:\n- a: 'usually prints 42' is true-ish; '*reliably*' is the lie. Undefined behavior means no guarantees — the compiler may even optimize assuming it never happens.\n- b: free does not zero memory (that would cost time; some debug allocators poison it deliberately).\n- d: it compiles cleanly — the compiler doesn't track pointer lifetimes; that's the programmer's job (and the gap that Rust's borrow checker famously closes).\n\nThe term for `p` after free is a **dangling pointer**. Defenses: set `p = NULL` immediately after freeing (a NULL dereference crashes *loudly and immediately* — debuggable), establish single clear ownership of every allocation, and run valgrind / AddressSanitizer in tests — both report this exact snippet as an invalid read of freed memory with the allocation and free stack traces."
  },
  {
    id: "csf-034",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "What happens, step by step, between writing `#include <stdio.h>` in your code and having a runnable program that can call `printf`? Explain what header files actually contain and what the linker does.",
    code: null,
    options: null,
    answer: null,
    solution: "The key realization: `#include <stdio.h>` does **not** pull in printf's code. A header file contains **declarations** — function *prototypes* like `int printf(const char *format, ...);`, plus types and macros. During **preprocessing** (the first compilation step), `#include` is literal text substitution: the header's contents are pasted into your file. Now the **compiler** knows printf's signature, so it can type-check your call (right argument types, right return type) and compile your file to an object file — which contains your machine code plus a note saying 'I call a function named printf that lives elsewhere'. The actual *implementation* of printf is in the **C standard library**, already compiled. The **linker**'s job is to resolve those notes: it connects your call sites to the library's printf (the C library is linked by default; other libraries need flags like `-lm` for the math library — forgetting it gives the classic 'undefined reference to sqrt' *linker* error, notably different from a compiler error). The result is the executable. This declaration/definition split explains everyday phenomena: why you can call a function defined in another .c file as long as a prototype is in scope; why CS50 requires `-lcs50` to link the cs50 library even though you included cs50.h; why headers use include guards (`#ifndef`/`#define`) to survive being pasted twice; and why 'implicit declaration of function' warnings appear when you forget an include — the compiler is guessing the signature. Interview tip: the crisp formulation is 'headers = promises (declarations), libraries = fulfillment (definitions), the linker matches promises to fulfillment' — then name the undefined-reference error as the symptom of a broken match."
  },
  {
    id: "csf-035",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "Predict the output of this program, and explain the relationship it demonstrates between arrays, pointers, and the `[]` operator.",
    code: "#include <stdio.h>\n\nint main(void)\n{\n    int arr[] = {10, 20, 30, 40};\n    int *p = arr;\n\n    printf(\"%i\\n\", *p);\n    printf(\"%i\\n\", *(p + 2));\n    printf(\"%i\\n\", p[1]);\n    printf(\"%i\\n\", *(arr + 3));\n}",
    options: null,
    answer: null,
    solution: "Output:\n\n10\n30\n20\n40\n\nLine by line:\n- `*p` — p points at the first element (an array name in this context *decays* into a pointer to its first element, so `int *p = arr` needs no `&`). Dereferencing gives 10.\n- `*(p + 2)` — **pointer arithmetic is scaled by the element type**: `p + 2` doesn't add 2 bytes, it adds 2 *ints* (8 bytes), landing on the third element: 30.\n- `p[1]` — the revelation this exercise exists for: `x[i]` is *defined* as `*(x + i)`. The brackets are pointer arithmetic in costume, and they work identically on a pointer: 20.\n- `*(arr + 3)` — and the same identity in reverse: the array name used in arithmetic, giving the fourth element, 40.\n\nThe mental model: `arr[i]` ≡ `*(arr + i)` — array indexing and pointer dereference are the same operation. This is why C does no bounds checking (indexing is just address math), why an array parameter in a function is *really* a pointer (`void f(int arr[])` is identical to `void f(int *arr)` — and `sizeof(arr)` inside f is the pointer size, 8, not the array size), and why arrays and pointers feel interchangeable yet aren't identical (you can't reassign an array name; `sizeof` differs in the defining scope).\n\nParty trick that proves the point: `2[arr]` is legal and equals `arr[2]`, because `*(2 + arr)` ≡ `*(arr + 2)`. Knowing *why* that works is knowing the whole lesson."
  },
  {
    id: "csf-036",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "Which of these is the classic 'double free' bug, and what does it cause?",
    code: null,
    options: {
      a: "Calling `free(p)` twice on the same allocation — it corrupts the allocator's bookkeeping, causing crashes or exploitable heap corruption; the second free is undefined behavior",
      b: "Calling free on two different pointers in the same function — always an error",
      c: "Freeing memory that was declared on the stack — harmless but wasteful",
      d: "Forgetting to call free — the program crashes immediately"
    },
    answer: "a",
    solution: "Correct: a. The heap allocator keeps metadata about each block (size, free/in-use, links to neighboring free blocks), typically stored *adjacent to the block itself*. The first `free(p)` returns the block to the free list. Calling `free(p)` again hands the allocator a block it already thinks is free — it may link the block into the free list twice, after which two future `malloc` calls can return *the same memory*, and two unrelated parts of the program silently overwrite each other. That's why double free is both a crash generator ('free(): double free detected' aborts, when you're lucky) and a serious, historically exploited security vulnerability class (when you're not).\n\nWhy the others are wrong:\n- b: freeing two *different* allocations is normal, correct cleanup.\n- c: freeing a stack address is also undefined behavior, but it's a *different* bug (and not harmless).\n- d: forgetting free is a memory *leak* — no crash, just gradual memory growth; the opposite failure mode.\n\nDefenses: set the pointer to NULL right after freeing — `free(p); p = NULL;` — because `free(NULL)` is defined as a harmless no-op, so an accidental second free through that pointer becomes safe; keep ownership unambiguous (exactly one place is responsible for each allocation's free); and valgrind / AddressSanitizer both report double frees with stack traces of *both* frees, making diagnosis trivial in test environments."
  },
  {
    id: "csf-037",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "Singly versus doubly linked lists: what does the extra `prev` pointer buy you, and what does it cost? Where does CS50-style insertion at the head fit in?",
    code: null,
    options: null,
    answer: null,
    solution: "A singly linked node carries data plus one pointer (`next`); a doubly linked node adds `prev`, pointing at the node before it. What `prev` buys: **O(1) deletion given a pointer to the node itself** — in a singly linked list, deleting a node requires knowing its *predecessor* (to reroute its next), which costs an O(n) walk from the head unless you happened to track it; with `prev` you have the predecessor instantly. It also gives **backward traversal** (browser history that goes both ways, a playlist's previous button, an LRU cache moving recently-used nodes to the front — the textbook real use), and lets you keep a `tail` pointer useful in both directions, making it the natural structure for a **deque** (push/pop at both ends in O(1)). The costs: an extra pointer per node (8 bytes on 64-bit — a third more memory for an int payload), and roughly double the pointer bookkeeping on every insert/delete: each operation must maintain *four* links instead of two, and the classic bugs are forgetting to update `prev` on a neighbor or mishandling the head/tail edge cases where neighbors are NULL. Insertion at the head — CS50's idiom — is O(1) in both variants: `new->next = head; head = new;` for singly (plus `head->prev = new` fixups for doubly), and it's why building a list by prepending is fast but yields reversed input order. Rules of thumb: singly when you only ever walk forward and insert at the head (hash-table chains, simple stacks); doubly when you delete from the middle frequently or need both directions (LRU caches, deques, most general-purpose library lists). Interview tip: 'prev buys O(1) delete-at-node and backward walks; it costs memory and double the link surgery' — then name the LRU cache as the canonical place the trade is worth it."
  },
  {
    id: "csf-038",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "Fill in the two blanks so this function inserts a new value at the head of the linked list and returns the new head. Why must the two lines be in exactly this order?",
    code: "typedef struct node\n{\n    int value;\n    struct node *next;\n} node;\n\nnode *insert(node *head, int value)\n{\n    node *n = malloc(sizeof(node));\n    if (n == NULL)\n    {\n        return head;\n    }\n    n->value = value;\n    n->next = ____;\n    return ____;\n}",
    options: null,
    answer: null,
    solution: "The blanks are `head` and `n`:\n\nn->next = head;   // new node points at the old first node\nreturn n;         // the new node IS the new head\n\nWhy the order is sacred: the only thing that knows where the rest of the list lives is `head`. `n->next = head` saves that connection *first*; only then is it safe for the caller to treat `n` as the new head. Write it the other way around in the common in-place variant —\n\nhead = n;         // ❌ first\nn->next = head;   // now points at ITSELF — list orphaned, memory leaked\n\n— and you've overwritten your only reference to the entire existing list: every old node is unreachable (leaked), and the new node's next points at itself (infinite loop on traversal). 'Connect the new node before you move the head' is the linked-list golden rule, and this two-line dance is the single most-asked linked-list interview moment.\n\nThe supporting details: insertion at the head is O(1) — no traversal, regardless of list length (vs O(n) to append at the tail without a tail pointer); the function works for the empty list too (`head` is NULL, the new node's next becomes NULL — correct); the NULL check after malloc keeps an allocation failure from crashing; and the caller must use the return value (`list = insert(list, 5);`) — forgetting that is the other classic bug, since the function can't modify the caller's pointer without a `node **` parameter (worth mentioning that variant exists)."
  },
  {
    id: "csf-039",
    category: "cs50",
    difficulty: "basic",
    type: "mcq",
    question: "How many distinct values can n bits represent — and so, what is the range of one byte (8 bits) interpreted as an unsigned number?",
    code: null,
    options: {
      a: "n² values; a byte holds 0–64",
      b: "2ⁿ values; a byte holds 0–255",
      c: "2ⁿ values; a byte holds 1–256",
      d: "2n values; a byte holds 0–16"
    },
    answer: "b",
    solution: "Correct: b. Each bit doubles the number of possible patterns — 1 bit gives 2, 2 bits give 4, 3 give 8 — so n bits give **2ⁿ** distinct patterns. Eight bits give 2⁸ = 256 patterns, and since counting starts at zero, the unsigned range is **0 through 255**, not 1–256. (Off-by-one alert: 256 *values*, max value 255.)\n\nThis one fact radiates through everything in computing:\n- RGB color channels are one byte each: 0–255, hence `rgb(255, 0, 0)` and the hex pair `FF`.\n- IPv4 addresses are four bytes: each segment of `192.168.0.1` maxes at 255.\n- Classic ASCII fits in 7 bits (128 codes); a byte covers it with room to spare.\n- A 32-bit unsigned int tops out at 2³² − 1 = 4,294,967,295 (~4.3 billion) — and that's also why 32-bit systems address at most 4 GB of RAM.\n- Signed types sacrifice one pattern-bit's worth to negatives: a signed byte spans −128 to +127, a signed 32-bit int caps at 2,147,483,647.\n- Doubling capacity per bit is the same math behind binary search halving and why log₂ shows up everywhere: 20 questions can distinguish 2²⁰ ≈ a million possibilities.\n\nWhy the others are wrong: a and d confuse exponential with polynomial growth — the entire point of binary is that capacity grows *exponentially* in bits; c is the off-by-one."
  },
  {
    id: "csf-040",
    category: "cs50",
    difficulty: "advanced",
    type: "open",
    question: "What is endianness? If the 4-byte integer 0x12345678 is stored at some address, what do little-endian and big-endian machines actually put in memory — and when does a programmer genuinely have to care?",
    code: null,
    options: null,
    answer: null,
    solution: "Endianness is the byte *order* a machine uses when storing multi-byte values in memory. For 0x12345678 stored at address A: a **big-endian** machine writes the most significant byte first — `12 34 56 78` at A, A+1, A+2, A+3 — reading like the number looks on paper. A **little-endian** machine writes the *least* significant byte first: `78 56 34 12`. x86/x64 and (in practice) modern ARM are little-endian, so your laptop almost certainly stores them 'backwards'. Within a byte, bits don't have addressable order — endianness is strictly about bytes. Why little-endian won on commodity CPUs: address A holds the lowest-order byte regardless of whether you read the value as 1, 2, or 4 bytes — convenient for hardware and for casting between integer widths. When you genuinely care: (1) **Network protocols** — the wire format ('network byte order') is big-endian, which is exactly what `htons`/`htonl`/`ntohs`/`ntohl` convert to and from; forget them and your port number 80 (0x0050) arrives as 20480 (0x5000). (2) **Binary file formats** — a file written by one machine and read by another must pin down its byte order (format specs always state it; BMP is little-endian, PNG big-endian). (3) **Type-punning and debugging** — casting `int*` to `char*` and inspecting bytes, or reading a hex dump in a debugger, shows the 'reversed' little-endian layout, a rite-of-passage confusion. (4) Cross-architecture data exchange generally — which is why portable code serializes explicitly (shifting bytes out with `>> 8` masks works on *any* endianness) instead of memcpy-ing structs to the network. When you don't care: pure in-memory arithmetic — the CPU presents values consistently; endianness only becomes visible at the byte-inspection boundary. Interview tip: write the two byte layouts for 0x12345678 and say 'htons exists because the network is big-endian and your CPU probably isn't' — that's the full expected answer."
  },
  {
    id: "csf-041",
    category: "cs50",
    difficulty: "medium",
    type: "code",
    question: "This program is supposed to report the lengths of the string and the array. Predict the four printed values (64-bit system) and explain the two traps it demonstrates.",
    code: "#include <stdio.h>\n#include <string.h>\n\nvoid check(int arr[])\n{\n    printf(\"%zu\\n\", sizeof(arr));            // line 3\n}\n\nint main(void)\n{\n    char word[] = \"hi\";\n    int nums[10];\n\n    printf(\"%zu\\n\", strlen(word));           // line 1\n    printf(\"%zu\\n\", sizeof(word));           // line 2\n    printf(\"%zu\\n\", sizeof(nums));           // line 4 (prints before line 3's call below)\n    check(nums);\n}",
    options: null,
    answer: null,
    solution: "Output, in execution order:\n\n2     // strlen(word)  — line 1\n3     // sizeof(word)  — line 2\n40    // sizeof(nums)  — line 4\n8     // sizeof(arr) inside check — line 3\n\nTrap 1 — **strlen vs sizeof on a string**: `strlen` counts characters up to (not including) the `'\\0'`: 2. `sizeof(word)` is the size of the whole array *including* the terminator: 3 bytes. They differ by exactly the terminator — and confusing them causes both off-by-one allocations (`malloc(strlen(s))` is one byte short for a copy!) and overlong loops. Also note `strlen` is O(n) — it *walks* the string looking for `'\\0'`; calling it in a loop condition (`for (i = 0; i < strlen(s); i++)`) re-scans the string every iteration, CS50's favorite style comment.\n\nTrap 2 — **array decay in function parameters**: in `main`, `sizeof(nums)` sees a real array: 10 × 4 bytes = 40. But a function parameter declared `int arr[]` is *actually* `int *arr` — the array **decays to a pointer** at the call — so inside `check`, `sizeof(arr)` is the size of a pointer: 8. (Good compilers even warn: 'sizeof on array function parameter'.) Consequence: a function receiving an array *cannot* discover its length; C APIs always pass the length separately (`void f(int *arr, size_t n)`), which is exactly why `main` is `(int argc, char *argv[])` — count and vector travel together."
  },
  {
    id: "csf-042",
    category: "cs50",
    difficulty: "advanced",
    type: "open",
    question: "What is 'undefined behavior' in C? How is it different from an ordinary bug, why does the language have it at all, and what are the everyday examples to avoid?",
    code: null,
    options: null,
    answer: null,
    solution: "Undefined behavior (UB) is a category written into the C standard: for certain operations, the language makes **no promises whatsoever** about what happens — not 'an error occurs', not 'you get garbage', but literally *anything is permitted*. The famous examples: out-of-bounds array access, dereferencing NULL or dangling pointers, use-after-free and double free, signed integer overflow, data races, reading uninitialized variables, and shifting by more than a type's width. What makes UB categorically worse than a normal bug is its **non-locality and non-determinism**: the program may work perfectly in every test, then break when you change compiler flags, because the optimizer is explicitly allowed to *assume UB never happens*. A real consequence: the compiler may delete your safety check — `if (x + 1 < x)` as an overflow test for signed x can be optimized to `if (false)`, because signed overflow 'cannot happen'. Code with UB isn't 'working with a quirk'; it's meaningless, and today's correct-looking output is a coincidence. Why C has it: performance and portability. Defining every behavior would force runtime checks (bounds checks on every access) or favor one architecture's behavior; UB lets the compiler generate maximally fast code for the happy path and made C portable across wildly different 1970s–80s hardware. The modern toolbox accepts the trade but adds detection: compile with `-Wall -Wextra`, test under **sanitizers** (`-fsanitize=address,undefined` — they catch most of the list above at runtime with precise reports), run valgrind, and fuzz the parsers. And the language-design postscript worth one sentence: eliminating UB while keeping C-level performance is precisely Rust's pitch — safe Rust has no UB by construction. Interview tip: the sentence that shows real understanding is 'the optimizer assumes UB can't happen, so UB can delete your own safety checks' — follow it with the signed-overflow-check example."
  },
  {
    id: "csf-043",
    category: "cs50",
    difficulty: "basic",
    type: "code",
    question: "Fill in the two blanks to implement `my_strlen`, which returns the number of characters in a C string (not counting the terminator). What property of C strings makes this loop possible?",
    code: "int my_strlen(const char *s)\n{\n    int n = 0;\n    while (s[n] != ____)\n    {\n        ____;\n    }\n    return n;\n}",
    options: null,
    answer: null,
    solution: "The blanks are `'\\0'` and `n++`:\n\nint my_strlen(const char *s)\n{\n    int n = 0;\n    while (s[n] != '\\0')\n    {\n        n++;\n    }\n    return n;\n}\n\nThe property that makes it possible: C strings are **null-terminated**. A string carries no length field — it's just consecutive characters in memory ending with the sentinel byte `'\\0'` (value 0). The only way to learn a string's length is to walk it until the terminator, which is exactly what this loop (and the real `strlen`) does — and why `strlen` is **O(n)**, a fact with practical teeth: `for (int i = 0; i < strlen(s); i++)` rescans the whole string on every iteration (O(n²) total); hoist it out (`int len = strlen(s);`) — CS50's classic style fix.\n\nDetails worth narrating:\n- `'\\0'` is a character with value 0, not the digit '0' (which is 48); writing `while (s[n])` is the equivalent idiom you'll see in real code, since 0 is falsy.\n- `const char *s` documents that the function only reads — good API hygiene.\n- Everything depends on the terminator actually being there: a buffer that lost its `'\\0'` sends strlen marching through memory until it finds a zero byte or crashes — the root cause behind many overflow bugs.\n- The null terminator is also why \"hi\" needs 3 bytes, why `malloc(strlen(s) + 1)` has the +1, and a design contrast worth mentioning: most modern languages store length explicitly, making length O(1) and removing the entire class of missing-terminator bugs."
  },
  {
    id: "csf-044",
    category: "cs50",
    difficulty: "medium",
    type: "mcq",
    question: "Why does CS50 (and most real-world code) use `double` rather than `float` for floating-point work, and what does neither type fix?",
    code: null,
    options: {
      a: "double is twice as fast; both types store decimals exactly",
      b: "double carries ~15–16 significant decimal digits versus float's ~7, so rounding errors are far smaller — but both are binary approximations, so classics like 0.1 + 0.2 ≠ 0.3 remain",
      c: "float cannot represent negative numbers",
      d: "double stores numbers as exact decimal fractions, eliminating rounding entirely"
    },
    answer: "b",
    solution: "Correct: b. A `float` is 32 bits (≈7 significant decimal digits); a `double` is 64 bits (≈15–16 digits). Both follow IEEE 754: a value is stored as sign × binary fraction × 2^exponent. More bits means rounding errors are millions of times smaller and accumulate far more slowly — which is why `double` is the sensible default (and why C's literals like `3.14` are doubles already; floats mostly appear where memory bandwidth rules, like graphics and ML). But the *kind* of error is identical: many tidy decimal fractions — 0.1, 0.2 — are infinite repeating fractions in binary, the same way 1/3 repeats in decimal. They get cut off at the type's precision, so `0.1 + 0.2 == 0.3` is false in both float and double, just false by a smaller margin in double.\n\nWhy the others are wrong: a — exactness is precisely what neither has (and double is generally no faster); c — both have a sign bit; d — that describes decimal types (like C#'s decimal or Python's Decimal), which C doesn't build in.\n\nThe operational rules this implies: never compare floats with `==` — compare `fabs(a - b) < epsilon`; never store money in floating point — use integer cents; and expect printf with `%.55f` to reveal the stored approximation (CS50 does this demo: 0.1 prints as 0.1000000000000000055511...). Bonus vocabulary: float-spacing grows with magnitude, so above 2⁵³ a double can't even represent every integer — large IDs don't belong in doubles (the same fact behind JavaScript's MAX_SAFE_INTEGER)."
  },
  {
    id: "csf-045",
    category: "cs50",
    difficulty: "medium",
    type: "open",
    question: "Your C program compiles but crashes with 'Segmentation fault (core dumped)' somewhere. Walk me through how you would actually find the bug — what tools and in what order?",
    code: null,
    options: null,
    answer: null,
    solution: "A segfault means the program touched memory it doesn't have rights to — the usual suspects are NULL dereference, out-of-bounds access, use-after-free, or stack overflow from runaway recursion. The hunt, in tool order: **(1) Recompile with debug info and warnings**: `clang -g -Wall -Wextra` — `-g` embeds line numbers for the tools below, and the warnings alone catch a surprising share (using uninitialized variables, implicit declarations). **(2) Run under a debugger**: `gdb ./program` then `run` — when it crashes, `bt` (backtrace) shows the exact file:line and the chain of calls that got there. That alone often ends the hunt. From there: `print ptr` to inspect variables (is it NULL? garbage?), breakpoints (`break file.c:42`) and stepping (`next`/`step`) to watch the state evolve. **(3) Run valgrind**: `valgrind ./program` — its superpower is reporting the *first* invalid memory operation, which is often well before the crash: 'Invalid read of size 4 ... 0 bytes after a block of size 40' is an off-by-one caught red-handed, with the allocation site included. A crash is where the damage *manifested*; valgrind shows where it *originated*. **(4) AddressSanitizer** as the modern alternative: `-fsanitize=address` makes the program self-report overflows and use-after-free at the faulting line with both stacks — faster than valgrind, standard in CI. **(5) The humble fallbacks**: printf bisection ('made it to checkpoint 3') to corner the crash region, `assert()` to make assumptions explicit, and rubber-duck reading of the suspect ten lines. Two segfault-specific heuristics: instant-crash-on-launch smells like NULL or argv misuse; crash-only-on-large-input smells like stack overflow or a buffer sized to the small case. Interview tip: name the trio — compiler warnings, gdb backtrace, valgrind/ASan — and the sentence 'valgrind finds where the corruption started, not just where it crashed'; that ordering is what 'knows how to debug' sounds like."
  },
  {
    id: "csf-046",
    category: "cs50",
    difficulty: "basic",
    type: "open",
    question: "In C, what is the difference between `=` and `==`, and why is `if (x = 5)` one of the most dangerous typos in the language? How do you guard against it?",
    code: null,
    options: null,
    answer: null,
    solution: "`=` is **assignment** (store a value), `==` is **comparison** (test equality). The danger: in C, an assignment is an *expression with a value* — the value assigned — and any non-zero value is 'true'. So `if (x = 5)` doesn't compare x to 5: it **sets x to 5**, evaluates to 5, and the branch is *always taken*. Two bugs in one keystroke: the condition is wrong, and the variable has been silently corrupted. It compiles without error because it's perfectly legal C. The guards, from most to least effective: **(1) Compiler warnings** — `-Wall` enables `-Wparentheses`, which flags assignment-as-condition and suggests doubled parens if intentional; with `-Werror` it can't slip through. This catches it in practice and is the main reason always to compile with warnings on. **(2) Yoda conditions** — writing `if (5 == x)`: the typo'd version `if (5 = x)` tries to assign to a constant, a hard compile error. Some legacy codebases mandate this style; modern taste mostly considers compiler warnings sufficient and Yoda order less readable. **(3) Const discipline** — `const int expected = 5;` and comparing variables against constants you can't assign to. The same trap generalizes: `while (c = getchar())` vs `while ((c = getchar()) != EOF)` — assignment in conditions is sometimes *idiomatic* C, which is exactly why the compiler asks for explicit extra parentheses to say 'yes, I meant assignment'. Languages designed later closed the hole: Python makes `if x = 5:` a syntax error (introducing the explicit `:=` walrus for when you mean it), and JavaScript linters flag it. Interview tip: explain *why* it's legal ('assignment is an expression; non-zero is truthy') rather than just 'it's a typo' — the mechanism is what's being tested."
  }
];
