/* filters.js — category chips, difficulty/type selects, shuffle and reset controls */
"use strict";

var Filters = {
  searchDebounce: null,

  build: function () {
    SetsUI.build();
    Filters.buildCategoryChips();
    SetsUI.render();

    var difficulty = document.getElementById("difficulty-select");
    var type = document.getElementById("type-select");
    var status = document.getElementById("status-select");
    var search = document.getElementById("search-input");

    difficulty.value = State.filters.difficulty;
    type.value = State.filters.type;
    if (status) { status.value = State.filters.status; }
    if (search) { search.value = State.filters.search; }

    difficulty.addEventListener("change", function () {
      State.setDifficulty(difficulty.value);
      Filters.syncChips();
      Flashcards.render();
    });

    type.addEventListener("change", function () {
      State.setType(type.value);
      Filters.syncChips();
      Flashcards.render();
    });

    if (status) {
      status.addEventListener("change", function () {
        State.setStatus(status.value);
        Filters.syncChips();
        Flashcards.render();
      });
    }

    if (search) {
      search.addEventListener("input", function () {
        clearTimeout(Filters.searchDebounce);
        Filters.searchDebounce = setTimeout(function () {
          State.setSearch(search.value);
          Filters.syncChips();
          Flashcards.render();
        }, 200);
      });
    }

    var shuffleBtn = document.getElementById("shuffle-btn");
    Filters.syncShuffle(shuffleBtn);
    shuffleBtn.addEventListener("click", function () {
      State.shuffled = !State.shuffled;
      State.applyFilters();
      Filters.syncShuffle(shuffleBtn);
      Flashcards.render();
    });

    document.getElementById("reset-btn").addEventListener("click", function () {
      var sure = window.confirm("Reset all progress? Your answers, self-assessments and training time will be cleared.");
      if (!sure) { return; }
      State.resetProgress();
      Timer.reset();
      Filters.syncChips();
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
        State.setCategory(cat.key);
        Filters.syncChips();
        Flashcards.render();
      });
      row.appendChild(chip);
    });
  },

  updateChips: function () {
    var row = document.getElementById("category-chips");
    var counts = State.categoryCounts();
    var chips = row.querySelectorAll(".chip");
    chips.forEach(function (chip) {
      var cat = chip.dataset.category;
      var count = counts[cat] || 0;
      chip.querySelector(".chip-count").textContent = count;
    });
  },

  syncChips: function () {
    var chips = document.querySelectorAll("#category-chips .chip");
    chips.forEach(function (chip) {
      chip.classList.toggle("is-active", chip.dataset.category === State.filters.category);
    });
    Filters.updateChips();
  },

  syncShuffle: function (btn) {
    btn.classList.toggle("is-active", State.shuffled);
    btn.setAttribute("aria-pressed", String(State.shuffled));
  }
};
