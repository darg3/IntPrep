/* state.js — application state: filters, deck order, position, per-question progress */
"use strict";

var State = {
  all: [],
  order: [],
  index: 0,
  shuffled: false,
  filters: { category: "all", difficulty: "all", type: "all" },

  /* progress[id] = { result: "correct"|"wrong"|"known"|"review", choice: "a"|"b"|"c"|"d"|null } */
  progress: {},

  init: function (questions, saved) {
    State.all = questions || [];
    if (saved && typeof saved === "object") {
      if (saved.filters) {
        State.filters.category = saved.filters.category || "all";
        State.filters.difficulty = saved.filters.difficulty || "all";
        State.filters.type = saved.filters.type || "all";
      }
      State.shuffled = !!saved.shuffled;
      State.progress = saved.progress || {};
    }
    State.applyFilters({ keepIndex: false });
    if (saved && typeof saved.index === "number") {
      State.index = Math.min(Math.max(0, saved.index), Math.max(0, State.order.length - 1));
    }
  },

  applyFilters: function (opts) {
    var f = State.filters;
    var list = State.all.filter(function (q) {
      return (f.category === "all" || q.category === f.category) &&
        (f.difficulty === "all" || q.difficulty === f.difficulty) &&
        (f.type === "all" || q.type === f.type);
    });
    State.order = State.shuffled ? Utils.shuffle(list) : list;
    if (!opts || !opts.keepIndex || State.index >= State.order.length) {
      State.index = 0;
    }
    State.persist();
  },

  current: function () {
    return State.order[State.index] || null;
  },

  next: function () {
    if (State.index < State.order.length - 1) {
      State.index++;
      State.persist();
      return true;
    }
    return false;
  },

  prev: function () {
    if (State.index > 0) {
      State.index--;
      State.persist();
      return true;
    }
    return false;
  },

  record: function (id, patch) {
    var entry = State.progress[id] || {};
    for (var key in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, key)) {
        entry[key] = patch[key];
      }
    }
    State.progress[id] = entry;
    State.persist();
  },

  progressFor: function (id) {
    return State.progress[id] || null;
  },

  resetProgress: function () {
    State.progress = {};
    State.persist();
  },

  /* Stats over a list of questions (current deck or all). */
  statsFor: function (list) {
    var stats = { total: list.length, answered: 0, correct: 0, wrong: 0, known: 0, review: 0, mastered: 0 };
    list.forEach(function (q) {
      var p = State.progress[q.id];
      if (!p || !p.result) { return; }
      stats.answered++;
      if (p.result === "correct") { stats.correct++; }
      if (p.result === "wrong") { stats.wrong++; }
      if (p.result === "known") { stats.known++; }
      if (p.result === "review") { stats.review++; }
      if (p.result === "correct" || p.result === "known") { stats.mastered++; }
    });
    return stats;
  },

  categoryCounts: function () {
    var counts = { all: State.all.length };
    State.all.forEach(function (q) {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  },

  persist: function () {
    Store.save({
      filters: State.filters,
      shuffled: State.shuffled,
      index: State.index,
      progress: State.progress
    });
  }
};
