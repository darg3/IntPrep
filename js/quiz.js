/* quiz.js — multiple-choice rendering and answer checking */
"use strict";

var Quiz = {
  LETTERS: ["a", "b", "c", "d"],

  renderOptions: function (question, container) {
    var saved = State.progressFor(question.id);
    var answered = !!(saved && saved.choice);

    Quiz.LETTERS.forEach(function (letter) {
      if (!question.options || question.options[letter] == null) { return; }
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.dataset.letter = letter;
      btn.innerHTML =
        '<span class="option-letter">' + letter + ")</span>" +
        "<span>" + Utils.formatText(question.options[letter]) + "</span>";
      btn.addEventListener("click", function () {
        Quiz.answer(question, letter);
      });
      container.appendChild(btn);
    });

    if (answered) {
      Quiz.markAnswered(question, saved.choice, container);
    }
  },

  answer: function (question, letter) {
    var container = document.querySelector(".options");
    if (!container || container.dataset.locked === "true") { return; }
    var result = letter === question.answer ? "correct" : "wrong";
    State.record(question.id, { result: result, choice: letter });
    Quiz.markAnswered(question, letter, container);
    Flashcards.onAnswered();
  },

  /* Lock the options and paint correct/wrong state. */
  markAnswered: function (question, chosen, container) {
    container.dataset.locked = "true";
    var buttons = container.querySelectorAll(".option");
    buttons.forEach(function (btn) {
      var letter = btn.dataset.letter;
      btn.disabled = true;
      if (letter === question.answer) {
        btn.classList.add("is-correct");
      } else if (letter === chosen) {
        btn.classList.add("is-wrong");
      } else {
        btn.classList.add("is-dimmed");
      }
    });
  },

  /* Keyboard support: press A-D to answer the current multiple-choice card. */
  answerByKey: function (letter) {
    var question = State.current();
    if (!question || question.type !== "mcq") { return; }
    var saved = State.progressFor(question.id);
    if (saved && saved.choice) { return; }
    if (Quiz.LETTERS.indexOf(letter) === -1) { return; }
    if (!question.options || question.options[letter] == null) { return; }
    Quiz.answer(question, letter);
  }
};
