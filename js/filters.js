/* filters.js — category chips, difficulty/type selects, shuffle and reset controls */
"use strict";

var Filters = {
  build: function () {
    Filters.buildCategoryChips();

    var difficulty = document.getElementById("difficulty-select");
    var type = document.getElementById("type-select");
    difficulty.value = State.filters.difficulty;
    type.value = State.filters.type;

    difficulty.addEventListener("change", function () {
      State.filters.difficulty = difficulty.value;
      State.applyFilters();
      Flashcards.render();
    });

    type.addEventListener("change", function () {
      State.filters.type = type.value;
      State.applyFilters();
      Flashcards.render();
    });

    var shuffleBtn = document.getElementById("shuffle-btn");
    Filters.syncShuffle(shuffleBtn);
    shuffleBtn.addEventListener("click", function () {
      State.shuffled = !State.shuffled;
      State.applyFilters();
      Filters.syncShuffle(shuffleBtn);
      Flashcards.render();
    });

    document.getElementById("reset-btn").addEventListener("click", function () {
      var sure = window.confirm("Reset all progress? Your answers and self-assessments will be cleared.");
      if (!sure) { return; }
      State.resetProgress();
      Flashcards.render();
    });
  },

  buildCategoryChips: function () {
    var row = document.getElementById("category-chips");
    var counts = State.categoryCounts();
    row.innerHTML = "";

    (window.CATEGORIES || []).forEach(function (cat) {
      var count = counts[cat.key] || 0;
      if (cat.key !== "all" && count === 0) { return; }
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (State.filters.category === cat.key ? " is-active" : "");
      chip.dataset.category = cat.key;
      chip.innerHTML = Utils.escapeHtml(cat.label) +
        '<span class="chip-count">' + count + "</span>";
      chip.addEventListener("click", function () {
        State.filters.category = cat.key;
        State.applyFilters();
        Filters.syncChips();
        Flashcards.render();
      });
      row.appendChild(chip);
    });
  },

  syncChips: function () {
    var chips = document.querySelectorAll("#category-chips .chip");
    chips.forEach(function (chip) {
      chip.classList.toggle("is-active", chip.dataset.category === State.filters.category);
    });
  },

  syncShuffle: function (btn) {
    btn.classList.toggle("is-active", State.shuffled);
    btn.setAttribute("aria-pressed", String(State.shuffled));
  }
};
