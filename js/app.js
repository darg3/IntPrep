/* app.js — bootstrap, navigation wiring, keyboard shortcuts */
"use strict";

var App = {
  categoryLabel: function (key) {
    var cats = window.CATEGORIES || [];
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].key === key) { return cats[i].label; }
    }
    return Utils.capitalize(key);
  },

  init: function () {
    State.init(window.ALL_QUESTIONS || [], Store.load());
    Filters.build();
    Flashcards.render();

    document.getElementById("prev-btn").addEventListener("click", function () {
      if (State.prev()) { Flashcards.render(); }
    });

    document.getElementById("next-btn").addEventListener("click", function () {
      if (State.next()) { Flashcards.render(); }
    });

    document.addEventListener("keydown", App.onKeydown);
  },

  onKeydown: function (event) {
    var tag = (event.target && event.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "select" || tag === "textarea") { return; }
    if (event.ctrlKey || event.metaKey || event.altKey) { return; }

    var key = event.key.toLowerCase();
    if (event.key === "ArrowRight") {
      if (State.next()) { Flashcards.render(); }
    } else if (event.key === "ArrowLeft") {
      if (State.prev()) { Flashcards.render(); }
    } else if (key === "s") {
      Flashcards.toggleSolution();
    } else if (key === "a" || key === "b" || key === "c" || key === "d") {
      Quiz.answerByKey(key);
    }
  }
};

document.addEventListener("DOMContentLoaded", App.init);
