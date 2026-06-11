/* validate-data.js — loads every question bank in a sandbox and checks the schema.
   Run from the project root:  node tools/validate-data.js */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const dataDir = path.join(__dirname, "..", "js", "data");
const bankFiles = fs.readdirSync(dataDir)
  .filter((f) => f.endsWith(".js") && f !== "index.js")
  .sort();

const sandbox = { window: {} };
vm.createContext(sandbox);

const errors = [];
const warnings = [];

for (const file of bankFiles) {
  const source = fs.readFileSync(path.join(dataDir, file), "utf8");
  try {
    vm.runInContext(source, sandbox, { filename: file });
  } catch (err) {
    errors.push(`${file}: failed to execute — ${err.message}`);
  }
}

const banks = sandbox.window.QUESTION_BANKS || {};
const CATEGORIES = new Set(["html", "css", "javascript", "cs50", "ai", "interview"]);
const DIFFICULTIES = new Set(["basic", "medium", "advanced"]);
const TYPES = new Set(["mcq", "open", "code"]);
const LETTERS = ["a", "b", "c", "d"];

const seenIds = new Set();
let total = 0;
const byCategory = {};
const byType = {};
const byDifficulty = {};

for (const [bankKey, questions] of Object.entries(banks)) {
  if (!Array.isArray(questions)) {
    errors.push(`${bankKey}: bank is not an array`);
    continue;
  }
  total += questions.length;

  questions.forEach((q, i) => {
    const where = `${bankKey}[${i}] (${q && q.id ? q.id : "no id"})`;

    if (!q || typeof q !== "object") { errors.push(`${where}: not an object`); return; }
    if (typeof q.id !== "string" || !q.id) { errors.push(`${where}: bad id`); }
    if (seenIds.has(q.id)) { errors.push(`${where}: duplicate id`); }
    seenIds.add(q.id);

    if (!CATEGORIES.has(q.category)) { errors.push(`${where}: bad category "${q.category}"`); }
    if (!DIFFICULTIES.has(q.difficulty)) { errors.push(`${where}: bad difficulty "${q.difficulty}"`); }
    if (!TYPES.has(q.type)) { errors.push(`${where}: bad type "${q.type}"`); }
    if (typeof q.question !== "string" || q.question.length < 8) { errors.push(`${where}: missing/short question`); }
    if (typeof q.solution !== "string" || q.solution.length < 20) { errors.push(`${where}: missing/short solution`); }
    if (q.code !== null && typeof q.code !== "string") { errors.push(`${where}: code must be string or null`); }

    if (q.type === "mcq") {
      if (!q.options || typeof q.options !== "object") {
        errors.push(`${where}: mcq without options`);
      } else {
        for (const letter of LETTERS) {
          if (typeof q.options[letter] !== "string" || !q.options[letter]) {
            errors.push(`${where}: option "${letter}" missing or empty`);
          }
        }
      }
      if (!LETTERS.includes(q.answer)) { errors.push(`${where}: mcq answer "${q.answer}" not a-d`); }
    } else {
      if (q.options !== null) { warnings.push(`${where}: non-mcq should have options: null`); }
      if (q.answer !== null) { warnings.push(`${where}: non-mcq should have answer: null`); }
      if (q.type === "code" && !q.code) { errors.push(`${where}: type "code" without a code snippet`); }
    }

    byCategory[q.category] = (byCategory[q.category] || 0) + 1;
    byType[q.type] = (byType[q.type] || 0) + 1;
    byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
  });

  console.log(`  ${bankKey}: ${questions.length} questions`);
}

console.log(`\nTotal: ${total} questions in ${Object.keys(banks).length} banks`);
console.log(`By category: ${JSON.stringify(byCategory)}`);
console.log(`By type: ${JSON.stringify(byType)}`);
console.log(`By difficulty: ${JSON.stringify(byDifficulty)}`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  WARN ${w}`));
}
if (errors.length) {
  console.log(`\n${errors.length} error(s):`);
  errors.forEach((e) => console.log(`  FAIL ${e}`));
  process.exit(1);
}
console.log("\nAll banks valid.");
