/* app.js — bootstrap, navigation wiring, keyboard shortcuts, touch swipe */
"use strict";

var App = {
  touchStartX: 0,
  touchStartY: 0,

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
      if (State.next()) { Flashcards.render(); } else if (State.deckComplete) { Flashcards.render(); }
    });

    document.addEventListener("keydown", App.onKeydown);
    document.addEventListener("touchstart", App.onTouchStart, false);
    document.addEventListener("touchend", App.onTouchEnd, false);
  },

  onKeydown: function (event) {
    var tag = (event.target && event.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "select" || tag === "textarea") { return; }
    if (event.ctrlKey || event.metaKey || event.altKey) { return; }

    var key = event.key.toLowerCase();
    if (event.key === "ArrowRight") {
      if (State.next()) { Flashcards.render(); } else if (State.deckComplete) { Flashcards.render(); }
    } else if (event.key === "ArrowLeft") {
      if (State.prev()) { Flashcards.render(); }
    } else if (key === "s") {
      Flashcards.toggleSolution();
    } else if (key === "a" || key === "b" || key === "c" || key === "d") {
      Quiz.answerByKey(key);
    }
  },

  onTouchStart: function (event) {
    if (event.touches && event.touches.length > 0) {
      App.touchStartX = event.touches[0].clientX;
      App.touchStartY = event.touches[0].clientY;
    }
  },

  onTouchEnd: function (event) {
    if (!event.changedTouches || event.changedTouches.length === 0) { return; }
    var touchEndX = event.changedTouches[0].clientX;
    var touchEndY = event.changedTouches[0].clientY;
    var deltaX = touchEndX - App.touchStartX;
    var deltaY = Math.abs(touchEndY - App.touchStartY);

    if (Math.abs(deltaX) > 50 && deltaY < 80) {
      event.preventDefault();
      if (deltaX > 0) {
        if (State.prev()) { Flashcards.render(); }
      } else {
        if (State.next()) { Flashcards.render(); } else if (State.deckComplete) { Flashcards.render(); }
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", App.init);
