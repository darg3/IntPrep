window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS["interview-behavioral"] = [
  {
    id: "intb-001",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "Tell me about yourself — walk me through your background.",
    code: null,
    options: null,
    answer: null,
    solution: "Use a present-past-future arc and keep it under 90 seconds. Model answer: \"I'm a junior developer focused on JavaScript and web fundamentals — right now I'm finishing a flashcard app I built in vanilla JS with no framework, which forced me to really understand the DOM, events, and state management. Before that I came from [previous field/study], where I learned to work with deadlines and communicate with non-technical people, and I taught myself programming through CS50 and building projects end to end. What pulls me toward this role specifically is that you ship [product/tech] and invest in mentoring juniors, and I'm looking for a team where I can contribute quickly on real tickets while learning from code review. I'm happy to go deeper on any of my projects.\" The structure is: who you are professionally now, the one or two past steps that explain how you got here, and why this role is the logical next step. Do not recite your CV chronologically, do not start with your childhood, and do not go past two minutes. Interview tip: this answer sets the agenda — every project you name here is an invitation for the interviewer to ask about it, so only mention things you can discuss in depth."
  },
  {
    id: "intb-002",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "What is your greatest weakness?",
    code: null,
    options: null,
    answer: null,
    solution: "Name a real weakness that does not disqualify you for the role, then spend most of the answer on the concrete system you use to manage it. Model answer: \"I tend to go down rabbit holes — when I hit a bug I can spend two hours trying to solve it alone because asking for help feels like admitting defeat. On my last project that cost me most of a day on a CORS issue a teammate could have explained in five minutes. So I now use a hard timebox: 45 minutes of focused debugging, and if I'm still stuck I write up what I tried and what I expected, and post it in the team channel. The write-up alone solves it about a third of the time, and when it doesn't, the person helping me can see my reasoning immediately. It's still my instinct to grind alone, but the timebox catches it.\" The formula: real weakness + specific cost it had + active mitigation + honest admission it is ongoing. Avoid humblebrags like \"I'm a perfectionist\" or \"I work too hard\" — interviewers hear those daily and read them as evasion. Interview tip: a weakness with a working mitigation signals self-awareness and coachability, which is exactly what junior hiring is screening for."
  },
  {
    id: "intb-003",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "You are mid-story about a group project when the interviewer interrupts: \"Can you be more specific — what did YOU do?\" What are they actually probing for?",
    code: null,
    options: {
      a: "They suspect you are lying about the project and want to catch you in a contradiction.",
      b: "They want more technical detail about the architecture and the stack you used.",
      c: "They want your individual actions and decisions — \"I\" statements instead of vague \"we\" statements — because they are evaluating you, not your team.",
      d: "They are signaling that your answer is too long and you should wrap up quickly."
    },
    answer: "c",
    solution: "Correct: c. \"Be specific\" almost always means your answer drifted into \"we built, we decided, we fixed\" and the interviewer cannot tell what your personal contribution was. In STAR terms, they want you to expand the Action section — roughly 60% of a good answer — with concrete first-person steps: \"I noticed the API calls were duplicated, I proposed caching them, I wrote the wrapper and the tests.\" Vague team answers are one of the most cited red flags in behavioral interview rubrics. Why the others are wrong: (a) it is a standard coaching prompt, not an accusation — they are helping you give a gradeable answer. (b) they may ask technical follow-ups later, but this phrasing targets ownership, not architecture. (d) length can be an issue, but the cue for that is \"in the interest of time...\", not \"what did you do\"."
  },
  {
    id: "intb-004",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "Why do you want to work here, specifically at our company?",
    code: null,
    options: null,
    answer: null,
    solution: "This question tests whether you did 20 minutes of research, so the answer must contain details that could only apply to this company. Build it from three parts: something specific about their product or engineering culture, a genuine connection to your own experience or goals, and what you bring. Model answer: \"Three things drew me in. First, I actually used your product when I was [context], and I noticed [specific detail] — I went and read your engineering blog post about how you built it. Second, your job posting emphasized code review and pairing for juniors, and structured feedback is exactly how I improve fastest. Third, you're working in [domain/tech], which lines up with the projects I've been building — so I'd be motivated by the problem itself, not just the job.\" Before any interview: read the company's engineering blog or GitHub, know their product, and find one recent launch or post you can reference by name. The fatal version of this answer is one that works for any company — \"great culture, exciting growth opportunities\" tells them you didn't look. Interview tip: naming one specific blog post, repo, or product decision beats ten generic compliments."
  },
  {
    id: "intb-005",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Tell me about a time you disagreed with a teammate or a more senior engineer. How did you handle it?",
    code: null,
    options: null,
    answer: null,
    solution: "Interviewers want to see that you disagree directly, with evidence, in private first — and that you can lose gracefully. Model answer (STAR): \"On a group project, a more experienced teammate wanted to store user sessions in localStorage; I'd just read about XSS and thought httpOnly cookies were safer. Instead of arguing in the group chat, I asked him for 15 minutes one-on-one and came with a short written comparison — two links and a concrete attack scenario, not just 'I read somewhere that...'. He pointed out constraints I hadn't considered, but agreed the token shouldn't be readable by JS. We ended up with a middle path, and he later asked me to review the auth PR. What I took from it: disagree early and privately, bring evidence instead of opinions, and attack the problem, not the person.\" Key behaviors graders look for: you raised it directly rather than complaining to others, you stayed curious about their reasoning, and the relationship got stronger afterward. Red flags: stories where you simply caved, stories where you went over someone's head immediately, or stories where the other person was a cartoon villain. Interview tip: picking a disagreement you partially lost is fine — coachability scores higher than being right."
  },
  {
    id: "intb-006",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "Describe a time you received tough feedback on your code in review. How did you react?",
    code: null,
    options: null,
    answer: null,
    solution: "This is a coachability check: they want to see you separate your ego from your code. Model answer: \"On my first sizeable PR, a reviewer left over twenty comments — naming, a missed edge case, and a 'this whole function should not exist, use the library helper'. My honest first reaction was defensiveness, so I deliberately didn't reply for an hour. Then I went through every comment and sorted them: things I simply didn't know (the helper), things that were judgment calls, and one thing I still disagreed with. I fixed the first group, asked one clarifying question on the judgment call, and explained my reasoning on the disagreement — the reviewer convinced me anyway. I also wrote the missed edge case into a test so it could never come back. Since then I self-review my diff before requesting review, which roughly halved the comments I get.\" The pattern interviewers reward: pause before reacting, treat comments as data, ask questions instead of arguing thread-by-thread, and show a changed habit afterward. Interview tip: \"the most helpful feedback I ever got\" is a common follow-up — have one ready that genuinely changed how you work."
  },
  {
    id: "intb-007",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "First phone screen for a junior role, and the recruiter asks: \"What are your salary expectations?\" Which response serves you best?",
    code: null,
    options: {
      a: "Give a single low number so you don't price yourself out of the running.",
      b: "Refuse to discuss compensation at all until you have a written offer in hand.",
      c: "Say \"whatever you typically pay juniors is fine with me\" to show flexibility.",
      d: "Ask for the budgeted range for the role; if pressed, give a researched range based on market data for this role, level, and location."
    },
    answer: "d",
    solution: "Correct: d. The strong move is to deflect once, politely — \"Could you share the budgeted range for this role?\" — because many companies will, and some jurisdictions require it. If they insist, give a range you researched on Levels.fyi, Glassdoor, or local salary surveys for junior roles in that market, and anchor slightly above your true target: \"Based on my research, junior roles like this in [city] tend to land between X and Y — does that fit your band?\" This signals preparation without locking you into a number. Why the others are wrong: (a) a lowball number anchors the entire negotiation down and is hard to recover from — recruiters rarely correct you upward. (b) flat refusal early on reads as adversarial and can end screens at some companies; deflecting gracefully is different from stonewalling. (c) \"whatever you pay\" surrenders all leverage and can read as not knowing your market value, which juniors are specifically tested on."
  },
  {
    id: "intb-008",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Tell me about a deadline you missed. What happened, and what did you do about it?",
    code: null,
    options: null,
    answer: null,
    solution: "The grading criteria here are ownership, early communication, and a changed process — not whether you missed the deadline. Model answer: \"In my final project, I committed to delivering the search feature by Friday's demo. I underestimated it badly: I'd only budgeted for the happy path and lost two days to handling pagination and empty states. The mistake I really own is that I knew by Wednesday I was behind and said nothing, hoping to catch up. Thursday evening I finally told the team — too late to adjust the demo. We showed it with mocked search results and I shipped the real thing the following Tuesday. Two things changed permanently: I now raise the flag the moment my estimate looks wrong, because a Wednesday warning is a planning problem but a Friday surprise is a trust problem; and I break estimates into named subtasks, which exposes the hidden work up front.\" Never blame teammates, vague \"scope creep\", or the deadline being unfair — interviewers specifically screen for deflection on this question. Interview tip: the sentence \"the mistake I really own is...\" followed by something genuinely yours is the strongest moment of this answer."
  },
  {
    id: "intb-009",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Walk me through a time something you shipped broke production or a live demo. What did you do, step by step?",
    code: null,
    options: null,
    answer: null,
    solution: "Structure the story as: detect, communicate, mitigate, fix, prevent — in that order, because that is the order professionals work in. Model answer: \"I merged a change that renamed a config key, and within minutes of deploy the signup flow started failing — my change only worked locally because my .env still had the old key. First, I told the team immediately in the channel: 'signup is broken, it's my deploy, I'm on it.' Second, we rolled back rather than trying to hotfix forward, because rollback was the fastest path to a working state. Then I reproduced the failure properly, fixed the key handling so missing config fails loudly at startup instead of silently at runtime, and added the variable to the example env file. Afterward I wrote a short blameless summary of the timeline. The lesson that stuck: announce the breakage before you're sure of the cause — the team losing 20 minutes to confusion is worse than me being embarrassed 5 minutes early.\" Red flags interviewers watch for: hiding the mistake, blaming the reviewer or QA, or fixing it without telling anyone. Interview tip: \"rolled back first, debugged second\" marks you as someone who has internalized how production incidents actually work."
  },
  {
    id: "intb-010",
    category: "interview",
    difficulty: "medium",
    type: "mcq",
    question: "In the review call for your take-home assignment, the interviewer asks: \"Did you use AI tools like Copilot or ChatGPT on this?\" You did. What is the strongest response?",
    code: null,
    options: {
      a: "Deny it — admitting AI use will disqualify your submission.",
      b: "Be honest and specific: explain which parts AI helped with, how you verified and modified its output, and offer to walk through any line of the code.",
      c: "Say \"everyone uses AI now, so it doesn't really matter how the code was produced.\"",
      d: "Redirect the conversation to the parts you wrote entirely by hand and avoid the question."
    },
    answer: "b",
    solution: "Correct: b. By 2025-2026 many companies explicitly expect AI use on take-homes — what they are testing is whether you can own the result. A strong answer sounds like: \"Yes — I used Copilot for boilerplate and asked ChatGPT to suggest edge cases for the parser. Its first version mishandled empty input, so I rewrote that part and added tests for it. Happy to walk through any line.\" That demonstrates honesty, verification habits, and the ability to critique AI output — the exact skills teams need from juniors working with these tools. Why the others are wrong: (a) lying is the one instant disqualifier, and interviewers verify by asking you to explain your own code — unexplainable copy-paste is the red flag, not AI use. (c) dismissing the question dodges what they actually asked: whether YOU understand and stand behind this code. (d) visible evasion reads the same as denial, and a follow-up question about the AI-assisted section will expose it anyway."
  },
  {
    id: "intb-011",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "Where do you see yourself in five years?",
    code: null,
    options: null,
    answer: null,
    solution: "They are checking that your ambitions are realistic, that this role fits your trajectory, and that you'll stay long enough to be worth training. Model answer: \"In five years I want to be a solid mid-level engineer that teammates trust with meaningful features end to end — someone who can take a vague ticket, scope it, build it, and review other people's code well. Short term that means going deep rather than wide: mastering the stack you use here, learning your codebase, and getting genuinely good at testing and debugging. Around year three or four I'd like to start mentoring newer juniors, because explaining things is how I cement my own understanding. I'm not fixated on a title — I care more about the trajectory: each year I want to need less hand-holding and be trusted with more ambiguity.\" Avoid two failure modes: \"I want your job\" or \"running my own startup\" (signals you'll leave), and \"I haven't thought about it\" (signals no drive). Tie the growth to things this company can actually offer. Interview tip: \"trusted with more ambiguity each year\" is concrete, modest, and exactly the growth curve managers want to hear from a junior."
  },
  {
    id: "intb-012",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "You pick up a ticket that just says \"users should be able to export their data.\" The PM is in meetings all day. How do you handle ambiguous requirements like this?",
    code: null,
    options: null,
    answer: null,
    solution: "Show a repeatable process: extract what is known, form clarifying questions, state assumptions explicitly, and de-risk by starting with what is unlikely to change. Model answer: \"First I'd mine the existing context — the ticket's history, related tickets, how competitors or other parts of our app handle export — so my questions are informed, not lazy. Then I'd send the PM one async message with my top three questions: which data exactly, what format — CSV, JSON, PDF — and whether it's a download now or an emailed link, plus any privacy constraints. Crucially, I'd also write my working assumptions in the same message: 'Unless you say otherwise, I'll assume CSV of the user's own records, triggered from settings.' That way their silence doesn't block me but my direction is on record. While waiting, I'd build the parts every interpretation needs — the data query layer, the settings entry point — and keep the format-specific code isolated so it's cheap to change. What I would not do is guess silently and present a finished wrong feature three days later.\" Interview tip: the phrase \"state assumptions explicitly and proceed on the cheap-to-reverse parts\" is precisely the behavior this question screens for."
  },
  {
    id: "intb-013",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "The interviewer closes with \"Do you have any questions for us?\" Which question makes the strongest impression from a junior candidate?",
    code: null,
    options: {
      a: "\"No, I think you've covered everything really thoroughly — thank you.\"",
      b: "\"How does code review and mentorship work for juniors on this team, and what would success look like for this role in the first six months?\"",
      c: "\"How quickly could I get promoted, and how often are raises given out?\"",
      d: "\"Can you tell me a bit about what your company actually does day to day?\""
    },
    answer: "b",
    solution: "Correct: b. Questions about code review culture, mentorship structure, and concrete success criteria signal that you intend to grow, contribute, and be measured — the three things teams want from a junior hire. Always walk in with at least three prepared questions across themes like team process (how work gets planned and reviewed), support (onboarding, pairing, mentorship), and expectations (what a great first six months looks like); some will get answered during the interview, so three is the minimum buffer. Why the others are wrong: (a) \"no questions\" is read as low interest or low curiosity — it is one of the most commonly cited soft red flags in interviewer write-ups. (c) compensation and promotion questions are legitimate but belong with the recruiter or at offer stage; leading with them in a team interview misreads the room. (d) asking what the company does reveals you skipped the most basic preparation and can sink an otherwise good interview."
  },
  {
    id: "intb-014",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Tell me about a time you had to learn something fast under pressure — a new technology or an unfamiliar codebase with a clock ticking.",
    code: null,
    options: null,
    answer: null,
    solution: "They want your strategy for compressed learning, not proof that you know everything. Model answer (STAR): \"Two weeks before our project demo, we discovered the free tier of our backend service was being discontinued, and I volunteered to migrate us to a different provider I'd never touched. I had about three days. My approach: first I timeboxed half a day to do the official quickstart end to end, untouched, so I'd see the happy path working before mixing in our complexity. Then, instead of reading docs linearly, I wrote a tiny throwaway prototype of just our riskiest piece — auth — because if that didn't work, nothing else mattered. I kept a running notes file of every error and fix, which became the migration guide for my teammates. I also deliberately asked for help once: a 20-minute call with a friend who'd used the platform saved me from a wrong architectural turn. We migrated with a day to spare. The takeaway: under time pressure, learn by building the riskiest slice first, and treat docs as a reference, not a curriculum.\" Interview tip: naming the deliberate technique — quickstart, riskiest-slice prototype, notes file — turns \"I crammed\" into \"I have a method.\""
  },
  {
    id: "intb-015",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "It's Monday morning: you have a bug a customer escalated, a PR your teammate is blocked on, and a feature due Wednesday. Everything feels urgent. How do you prioritize?",
    code: null,
    options: null,
    answer: null,
    solution: "Show a framework plus the humility to confirm with your lead. Model answer: \"First I'd do a five-minute triage on impact and urgency rather than starting with whatever shouted loudest. The blocked teammate usually comes first if the review is quick — fifteen minutes of my time unblocks hours of theirs, so unblocking others is the highest-leverage move. Then the customer bug: I'd assess severity — is it data loss for many users or a cosmetic issue for one? — because 'escalated' doesn't automatically mean 'critical'. The Wednesday feature has the most slack today, but I'd check whether my estimate still holds. Then the key junior move: I'd post my intended order with one-line reasoning to my lead — 'Plan: review Sam's PR now, then the bug, feature after lunch; bug looks like single-user edge case, shout if you disagree.' That costs thirty seconds and catches the case where the bug is secretly a board-level fire. Through the day I'd batch interruptions instead of context-switching on every ping.\" The two behaviors being screened: you distinguish urgent from important, and you make your prioritization visible instead of silently guessing. Interview tip: \"unblock others first, then verify severity, then communicate the plan\" is a complete answer in one line."
  },
  {
    id: "intb-016",
    category: "interview",
    difficulty: "basic",
    type: "mcq",
    question: "You're in a live-coding interview and you've been silently stuck on the same step for several minutes. What is the best move?",
    code: null,
    options: {
      a: "Start narrating your thinking: restate the problem, say what you've ruled out, propose the brute-force version, and ask whether the interviewer wants you to pursue it.",
      b: "Stay quiet and keep grinding — interrupting your focus to talk will only make you slower and look less competent.",
      c: "Ask to switch to a different problem since this one clearly isn't going well.",
      d: "Start typing plausible-looking code quickly so it at least appears that you're making progress."
    },
    answer: "a",
    solution: "Correct: a. Live coding grades your process at least as much as your solution, and silence is the single most common self-inflicted wound — the interviewer can't give partial credit, or a hint, for reasoning they can't hear. The recovery script: restate the problem to confirm understanding, say out loud what you've considered and why you rejected it, then offer the brute-force solution explicitly: \"I can do this in O(n^2) with nested loops — want me to code that first and optimize after?\" Interviewers almost always say yes, and a working brute force plus a discussed optimization beats an unfinished clever attempt. The same strategy applies to the whole interview: clarify inputs and edge cases before coding, think aloud throughout, and test your code with a small example at the end. Why the others are wrong: (b) extended silence reads as being lost, and it forfeits the hints interviewers are usually willing to give. (c) asking to switch signals you fold under difficulty — pushing through with help is the better look. (d) interviewers immediately recognize performative typing, and incoherent code is worse than an honest \"here's where I'm stuck.\""
  },
  {
    id: "intb-017",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Why should we hire you over the other candidates we're interviewing for this junior role?",
    code: null,
    options: null,
    answer: null,
    solution: "You can't compare yourself to candidates you've never met, so don't try — instead, match two or three of your concrete strengths to what this role needs, with evidence. Model answer: \"I can't speak to the other candidates, but I can tell you what you'd get with me. First, I ship complete things: my flashcard app isn't a tutorial clone — it's built from scratch in vanilla JS, which means when something broke, I had no framework to blame and had to actually understand the platform. Second, I'm specifically strong at the junior failure modes: I ask questions early instead of spinning for days, and I take review feedback as free coaching — my pull request history shows that. Third, my background in [previous field] means I'm comfortable talking to non-engineers, which matters for a role like this that touches support tickets. I won't be your fastest engineer on day one, but I'll be noticeably better every month, and I'll never be the person you have to chase for a status update.\" Confidence without trash-talking others, claims with evidence, and an honest acknowledgment of where you are. Interview tip: \"here's what you get with me\" plus three evidenced strengths is the entire formula — never rank yourself against people you haven't met."
  },
  {
    id: "intb-018",
    category: "interview",
    difficulty: "basic",
    type: "open",
    question: "Give me an example of how you've worked effectively as part of a team.",
    code: null,
    options: null,
    answer: null,
    solution: "The trap in this question is answering entirely in \"we\" — pick a team story but make your individual contribution the spine of it. Model answer (STAR): \"In a four-person group project we were building a recipe app, and halfway in we were stepping on each other constantly — merge conflicts daily, two of us accidentally built the same component. I proposed a lightweight process: a ten-minute daily check-in message where each of us posted what we were touching, and a rule that every feature got its own branch and a quick review from one other person before merge. I set up the branch protection and wrote the two-paragraph workflow doc. Conflicts basically disappeared, and the quieter teammate later said the written check-ins made it easier for her to flag a blocker she'd been sitting on. My takeaway: being good in a team isn't just doing your tickets — it's noticing the friction between people and volunteering to fix it.\" The graders want: a specific personal action that helped the team function, awareness of teammates' different working styles, and a real outcome. Interview tip: process contributions — improving how the team works — score as highly as technical ones, and far fewer juniors think to mention them."
  },
  {
    id: "intb-019",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "In a design review you argue for approach A, but the senior engineer and the team choose approach B. You still believe A is better. The decision is made and the sprint starts. What does strong professional behavior look like now?",
    code: null,
    options: {
      a: "Implement your parts using approach A anyway — if you're right, the results will speak for themselves.",
      b: "Go along with B in your code, but make your skepticism clear in standups and PR comments so you're on record when it fails.",
      c: "Commit fully to making B succeed; if concrete evidence of problems emerges later, raise it once through the proper channel with data, and accept the outcome.",
      d: "Escalate to the engineering manager immediately, since letting a flawed technical decision stand would be negligent."
    },
    answer: "c",
    solution: "Correct: c. This is \"disagree and commit\": you owed the team your honest argument before the decision — which you gave — and after the decision you owe it your full effort, because a half-heartedly executed B fails in a way that proves nothing about A versus B. Committing doesn't mean silence forever: if real evidence accumulates (latency numbers, bug counts), bring it once, with data, to the person who owns the decision — that's revisiting based on new information, not relitigating based on ego. Interviewers at many companies probe this directly, and the answer they want has both halves: genuine commitment AND a principled mechanism for reopening with evidence. Why the others are wrong: (a) silently building A is insubordination dressed as initiative — it fractures the codebase and torches trust regardless of who was right. (b) visible foot-dragging and \"I told you so\" breadcrumbs poison morale while taking no responsibility; you're sabotaging B's chances while staying technically compliant. (d) escalating over the team's head, immediately, without new evidence, signals you treat every lost argument as a crisis — save escalation for safety, security, or ethics issues."
  },
  {
    id: "intb-020",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "Tell me about a time you had to work with a difficult colleague or an unresponsive stakeholder. How did you keep things moving?",
    code: null,
    options: null,
    answer: null,
    solution: "The hidden grading criterion: do you stay professional and curious, or do you trash the other person? Model answer (STAR): \"In a group project, one teammate went quiet for over a week while owning the API layer we all depended on. My first instinct was frustration, but I tried assuming there was a reason before assuming bad faith. I messaged him directly — privately, not in the group channel — with something specific and easy to answer: 'Are you blocked on the auth piece? Happy to pair for 30 minutes.' It turned out he was overwhelmed at work and embarrassed to admit he was behind. We split his task: he kept the part he'd started, I took the endpoints nothing depended on yet. I also changed how I worked with him — instead of big vague asks, I sent small concrete ones with dates: 'Can you review this one file by Thursday?' He responded to those. Only if that had failed would I have raised it with the team, framed as a schedule risk rather than a complaint about him.\" Key beats: assume good faith first, go direct and private, make asks smaller and concrete, escalate as a project risk and only as a last resort. Interview tip: ending with what you learned about adapting to different working styles turns a complaint-shaped story into a growth story."
  },
  {
    id: "intb-021",
    category: "interview",
    difficulty: "medium",
    type: "open",
    question: "This role is remote-first. How do you make sure you stay visible and effective when nobody can see you working?",
    code: null,
    options: null,
    answer: null,
    solution: "Remote juniors fail by going invisible, so the answer is a set of concrete overcommunication habits. Model answer: \"My default is to overcommunicate state, because remote teammates can't see me struggling or progressing. Concretely: I post a short async update at the end of each day — what moved, what's next, what's blocked — so my lead never has to wonder or ask. I make my work visible early: draft PRs from day one of a feature rather than a surprise 800-line PR on Friday. When I'm blocked, I apply a timebox — around 45 minutes — then post a written description of the problem, what I tried, and what I expected; writing it often solves it, and if not, anyone in any timezone can pick it up without a meeting. I bias toward async-first — a written question someone can answer between meetings — but I'll suggest a quick call when a thread passes three or four confused back-and-forths, and I post a one-line summary of any call's decisions back in the channel so there's a record. And I keep my calendar and status honest, so people know when I'm reachable.\" Interview tip: \"in remote work, silence reads as absence — so I make my progress, blockers, and decisions visible in writing by default\" summarizes the entire skill in one sentence."
  },
  {
    id: "intb-022",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "We're sending you a take-home assignment with a suggested time limit of four hours. Walk me through how you'd approach it — what do you think we're actually evaluating?",
    code: null,
    options: null,
    answer: null,
    solution: "Strong answer: you know the code is only half the evaluation — the other half is judgment, communication, and professionalism. Model answer: \"First I'd read the brief twice and email back any genuine ambiguity early — asking one good clarifying question is a feature, not a weakness. Then I'd spend the first half hour planning so the four hours go to the right things: a working core flow beats five half-finished features. I'd make my commit history tell the story — small commits with real messages like 'add input validation for empty cart', not one giant 'final version' dump, because reviewers absolutely read the history to see how I think. I'd write tests for the core logic — not exhaustive coverage, but enough to show I test by default. The README is where I'd spend the last 30 minutes, and I'd treat it as the most-read file: how to run it, the decisions I made and why, the trade-offs I accepted because of the timebox, and what I'd do next with more time. That 'what I'd improve' section shows self-awareness — it turns every shortcut into a conscious decision rather than a blind spot. If I used AI tools, I'd say so in the README and be ready to defend every line. And I'd respect the timebox honestly, because spending twenty hours on a four-hour task signals poor scoping, not dedication.\" Interview tip: reviewers open the README and the commit log before the code — polish those in proportion."
  },
  {
    id: "intb-023",
    category: "interview",
    difficulty: "advanced",
    type: "mcq",
    question: "Demo is tomorrow morning. Your feature's core flow works, but you haven't written tests for the new payment-adjacent module and two edge cases are unhandled. Your lead asks: \"Are we good to ship?\" What's the strongest response?",
    code: null,
    options: {
      a: "\"The core flow works, but the payment module has no tests and two known unhandled edge cases — here's my list. I'd suggest we ship behind a flag or demo on staging, and I'll have tests on the risky path by Thursday. Your call.\"",
      b: "\"Yes, we're good\" — the happy path works, the demo will be fine, and you can quietly backfill the tests next week.",
      c: "\"No — I can't put my name on anything that ships without full test coverage. We need to move the demo.\"",
      d: "Say yes, then stay up all night writing every missing test yourself so that it becomes true by morning."
    },
    answer: "a",
    solution: "Correct: a. The question \"are we good to ship?\" is really asking for an honest risk picture, and the shipping-versus-quality tension is resolved by surfacing trade-offs to the decision owner, not by silently absorbing them. Answer (a) does everything right: it states what works, names the specific risks (payment-adjacent code is exactly where untested code is least acceptable), proposes options that de-risk the demo (flag, staging), commits to a dated follow-up, and leaves the call with the lead, who owns the broader context. That is how engineers convert \"technical debt\" from a silent landmine into a managed decision. Why the others are wrong: (b) saying \"yes\" while hiding known risks in payment-adjacent code destroys the only thing a junior really has — trust in their reports; if an edge case fires, the failure is now a surprise. (c) refusing absolutely confuses a means (coverage) with the goal (acceptable risk); engineering is trade-offs, and demanding perfection misses that a flag or staging demo can be perfectly sound. (d) heroic all-nighters hide the real state of the project, produce exhausted 3 a.m. tests of dubious quality, and set an unsustainable precedent — the system should never depend on secret heroics."
  },
  {
    id: "intb-024",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Say we hire you. Walk me through your plan for your first 90 days — how would you ramp up and how would we know it's working?",
    code: null,
    options: null,
    answer: null,
    solution: "Show a phased plan with concrete deliverables and a feedback loop — this question separates candidates who've thought about the job from those who've only thought about the interview. Model answer: \"Roughly in three phases. Days 1-30: absorb and contribute small — get the dev environment running and improve the setup docs as I go, since I'm the freshest eyes the onboarding docs will ever get; read the codebase along real tickets, not abstractly; ship several small, low-risk changes early because nothing teaches a pipeline like using it; and meet the team — I'd ask my manager who the go-to people are and book short intros. Days 31-60: take complete small features end to end — scoping, building, tests, review, deploy — while asking fewer but better questions, and start reviewing teammates' PRs, mostly to learn but also to contribute. Days 61-90: own a meaningful piece of work with light supervision, and be useful sideways — picking up bug triage or improving a flaky test. Throughout, I'd ask my manager for a quick feedback check at 30 and 60 days, so any course correction happens early. How you'd know it's working: my PRs need fewer review rounds, my questions move from 'how does this work' to 'which of these approaches do you prefer', and by day 90 something user-visible has my name on it.\" Interview tip: \"docs improvements in month one, end-to-end features in month two, light ownership in month three\" plus a 30/60-day feedback ask is a complete, memorable skeleton."
  },
  {
    id: "intb-025",
    category: "interview",
    difficulty: "advanced",
    type: "open",
    question: "Every junior on this team will sit next to engineers with ten more years of experience. Honestly — how do you deal with feeling out of your depth?",
    code: null,
    options: null,
    answer: null,
    solution: "The credible answer admits the feeling exists and shows working mechanisms — claiming you never feel it reads as either dishonest or lacking self-awareness. Model answer: \"Honestly, I expect to feel out of my depth regularly, and I've stopped treating that as a signal that something's wrong — a junior who feels fully comfortable is probably not learning. What I have are mechanisms, not immunity. First, I separate 'I don't know this yet' from 'I can't learn this' — the gap between me and a senior engineer is mostly years of reps, not a different kind of brain. Second, I keep a 'wins and learned' log — bugs fixed, concepts that finally clicked — because imposter feelings erase memory of progress, and the log is evidence my feelings can't argue with. Third, I ask my questions out loud anyway, because the worst version of imposter syndrome is the silent version: the junior who won't ask, falls behind, and then really does have a problem. And fourth, I remind myself that being unfinished is literally the job description of a junior — you're not hiring me for what I know today, but for my slope. The feeling visits; I just don't let it make my decisions.\" Interview tip: \"mechanisms, not immunity\" is the framing — it shows maturity without pretending to confidence you haven't earned."
  }
];
