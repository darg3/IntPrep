/* data/index.js — aggregates the question banks into one deck; loaded after all bank files */
"use strict";

window.CATEGORIES = [
  { key: "all", label: "All" },
  { key: "html", label: "HTML" },
  { key: "css", label: "CSS" },
  { key: "javascript", label: "JavaScript" },
  { key: "cs50", label: "CS50" },
  { key: "ai", label: "AI Prompts" },
  { key: "interview", label: "Interview" }
];

(function () {
  var banks = window.QUESTION_BANKS || {};
  var order = [
    "html",
    "css",
    "js-basics",
    "js-advanced",
    "cs50-fundamentals",
    "cs50-algorithms",
    "ai-prompts",
    "interview",
    "interview-web",
    "interview-systems",
    "interview-practices",
    "interview-behavioral"
  ];

  var all = [];
  order.forEach(function (key) {
    if (banks[key]) { all = all.concat(banks[key]); }
  });

  /* Pick up any extra banks added later without touching this file. */
  Object.keys(banks).forEach(function (key) {
    if (order.indexOf(key) === -1) { all = all.concat(banks[key]); }
  });

  window.ALL_QUESTIONS = all;
})();
