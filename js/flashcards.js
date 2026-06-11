/* flashcards.js — renders the current card: question, code, options, solution panel */
"use strict";

var Flashcards = {
  TYPE_LABELS: { mcq: "Multiple choice", open: "Open question", code: "Code snippet" },
  STATUS_LABELS: {
    correct: "✓ Correct",
    wrong: "✗ Wrong",
    known: "✓ Got it",
    review: "↻ Review again"
  },

  solutionVisible: false,

  render: function () {
    var area = document.getElementById("card-area");
    var question = State.current();
    Flashcards.solutionVisible = false;

    if (!question) {
      area.innerHTML =
        '<div class="empty-state">' +
        "<h2>No questions here</h2>" +
        "<p>" + (State.all.length === 0
          ? "The question banks could not be loaded. Check that the files in <code>js/data/</code> exist."
          : "No questions match the current filters. Try a different category, difficulty or type.") + "</p>" +
        "</div>";
      Flashcards.updateChrome();
      return;
    }

    var card = document.createElement("article");
    card.className = "card";
    card.appendChild(Flashcards.buildMeta(question));

    var text = document.createElement("p");
    text.className = "question-text";
    text.innerHTML = Utils.formatText(question.question);
    card.appendChild(text);

    if (question.code) {
      var pre = document.createElement("pre");
      pre.className = "code-block";
      var codeEl = document.createElement("code");
      codeEl.textContent = question.code;
      pre.appendChild(codeEl);
      card.appendChild(pre);
    }

    if (question.type === "mcq") {
      var options = document.createElement("div");
      options.className = "options";
      Quiz.renderOptions(question, options);
      card.appendChild(options);
    }

    var actions = document.createElement("div");
    actions.className = "card-actions";
    var solutionBtn = document.createElement("button");
    solutionBtn.type = "button";
    solutionBtn.className = "btn btn-primary";
    solutionBtn.id = "solution-btn";
    solutionBtn.textContent = "Show solution";
    solutionBtn.addEventListener("click", Flashcards.toggleSolution);
    actions.appendChild(solutionBtn);
    card.appendChild(actions);

    card.appendChild(Flashcards.buildSolution(question));
    area.innerHTML = "";
    area.appendChild(card);
    Flashcards.updateChrome();
  },

  buildMeta: function (question) {
    var meta = document.createElement("div");
    meta.className = "card-meta";
    meta.innerHTML =
      '<span class="badge badge-category">' + Utils.escapeHtml(App.categoryLabel(question.category)) + "</span>" +
      '<span class="badge badge-' + question.difficulty + '">' + question.difficulty + "</span>" +
      '<span class="badge badge-type">' + Flashcards.TYPE_LABELS[question.type] + "</span>";

    var saved = State.progressFor(question.id);
    if (saved && saved.result) {
      var pill = document.createElement("span");
      pill.className = "status-pill status-" + saved.result;
      pill.id = "status-pill";
      pill.textContent = Flashcards.STATUS_LABELS[saved.result];
      meta.appendChild(pill);
    }
    return meta;
  },

  buildSolution: function (question) {
    var panel = document.createElement("div");
    panel.className = "solution is-hidden";
    panel.id = "solution-panel";

    var label = document.createElement("span");
    label.className = "solution-label";
    label.textContent = "Solution & explanation";
    panel.appendChild(label);

    if (question.type === "mcq" && question.answer && question.options) {
      var answerLine = document.createElement("p");
      answerLine.className = "solution-answer";
      answerLine.innerHTML = "Correct answer: " + question.answer.toUpperCase() + ") " +
        Utils.formatText(question.options[question.answer]);
      panel.appendChild(answerLine);
    }

    var body = document.createElement("p");
    body.className = "solution-body";
    body.innerHTML = Utils.formatText(question.solution);
    panel.appendChild(body);

    /* Open and code cards are self-assessed after reading the solution. */
    if (question.type !== "mcq") {
      var assess = document.createElement("div");
      assess.className = "assess";
      assess.appendChild(Flashcards.buildAssessButton(question, "known", "✓ I got it"));
      assess.appendChild(Flashcards.buildAssessButton(question, "review", "↻ Review again"));
      panel.appendChild(assess);
    }
    return panel;
  },

  buildAssessButton: function (question, result, labelText) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn " + (result === "known" ? "btn-known" : "btn-review");
    btn.textContent = labelText;
    var saved = State.progressFor(question.id);
    if (saved && saved.result === result) {
      btn.classList.add("is-active");
    }
    btn.addEventListener("click", function () {
      State.record(question.id, { result: result });
      Flashcards.render();
      Flashcards.showSolutionPanel(); /* keep the solution open after self-assessing */
    });
    return btn;
  },

  toggleSolution: function () {
    if (Flashcards.solutionVisible) {
      Flashcards.hideSolutionPanel();
    } else {
      Flashcards.showSolutionPanel();
    }
  },

  showSolutionPanel: function () {
    var panel = document.getElementById("solution-panel");
    var btn = document.getElementById("solution-btn");
    if (!panel) { return; }
    panel.classList.remove("is-hidden");
    if (btn) { btn.textContent = "Hide solution"; }
    Flashcards.solutionVisible = true;
  },

  hideSolutionPanel: function () {
    var panel = document.getElementById("solution-panel");
    var btn = document.getElementById("solution-btn");
    if (!panel) { return; }
    panel.classList.add("is-hidden");
    if (btn) { btn.textContent = "Show solution"; }
    Flashcards.solutionVisible = false;
  },

  /* Called by Quiz after an answer is recorded. */
  onAnswered: function () {
    var question = State.current();
    if (!question) { return; }
    var meta = document.querySelector(".card-meta");
    var saved = State.progressFor(question.id);
    if (meta && saved && saved.result && !document.getElementById("status-pill")) {
      var pill = document.createElement("span");
      pill.className = "status-pill status-" + saved.result;
      pill.id = "status-pill";
      pill.textContent = Flashcards.STATUS_LABELS[saved.result];
      meta.appendChild(pill);
    }
    Flashcards.updateChrome();
  },

  /* Counter, nav buttons, progress bar, header stats. */
  updateChrome: function () {
    var counter = document.getElementById("card-counter");
    var prevBtn = document.getElementById("prev-btn");
    var nextBtn = document.getElementById("next-btn");
    var total = State.order.length;

    counter.textContent = total === 0 ? "0 / 0" : (State.index + 1) + " / " + total;
    prevBtn.disabled = State.index <= 0;
    nextBtn.disabled = State.index >= total - 1;

    var deck = State.statsFor(State.order);
    var fill = document.getElementById("progress-fill");
    fill.style.width = deck.total === 0 ? "0%" : Math.round((deck.mastered / deck.total) * 100) + "%";

    document.getElementById("progress-stats").textContent =
      deck.mastered + " of " + deck.total + " mastered in this deck · " +
      deck.correct + " correct · " + deck.wrong + " wrong · " + deck.review + " to review";

    var overall = State.statsFor(State.all);
    document.getElementById("header-stats").innerHTML =
      "<strong>" + overall.mastered + " / " + overall.total + "</strong> questions mastered";
  }
};
