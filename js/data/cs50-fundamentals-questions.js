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
  }
];
