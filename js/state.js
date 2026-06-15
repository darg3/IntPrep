/* state.js — application state: filters, deck order, position, per-question progress */
"use strict";

var State = {
  all: [],
  order: [],
  index: 0,
  shuffled: false,
  currentSet: null,
  setsList: [],
  filters: { category: "all", difficulty: "all", type: "all", status: "all", search: "" },
  deckComplete: false,

  /* progress[id] = { result: "correct"|"wrong"|"known"|"review", choice: "a"|"b"|"c"|"d"|null } */
  progress: {},

  init: function (questions, saved) {
    State.all = questions || [];
    State.setsList = window.QUESTION_SETS || [];
    if (saved && typeof saved === "object") {
      if (saved.filters) {
        State.filters.category = saved.filters.category || "all";
        State.filters.difficulty = saved.filters.difficulty || "all";
        State.filters.type = saved.filters.type || "all";
        State.filters.status = saved.filters.status || "all";
        State.filters.search = saved.filters.search || "";
      }
      State.shuffled = !!saved.shuffled;
      State.currentSet = saved.currentSet || null;
      State.progress = saved.progress || {};
    }
    State.applyFilters({ keepIndex: false });
    if (saved && typeof saved.index === "number") {
      State.index = Math.min(Math.max(0, saved.index), Math.max(0, State.order.length - 1));
    }
  },

  applyFilters: function (opts) {
    var f = State.filters;
    var baseList = State.all;

    /* If a set is selected, start with just the set's questions. */
    if (State.currentSet) {
      var set = null;
      for (var i = 0; i < State.setsList.length; i++) {
        if (State.setsList[i].id === State.currentSet) {
          set = State.setsList[i];
          break;
        }
      }
      if (set) {
        baseList = State.all.filter(function (q) {
          return set.questionIds.indexOf(q.id) !== -1;
        });
      }
    }

    var list = baseList.filter(function (q) {
      if (f.category !== "all" && q.category !== f.category) { return false; }
      if (f.difficulty !== "all" && q.difficulty !== f.difficulty) { return false; }
      if (f.type !== "all" && q.type !== f.type) { return false; }

      if (f.status !== "all") {
        var p = State.progress[q.id];
        if (f.status === "unseen") {
          if (p && p.result) { return false; }
        } else if (f.status === "weak") {
          if (!p || (p.result !== "wrong" && p.result !== "review")) { return false; }
        } else if (f.status === "mastered") {
          if (!p || (p.result !== "correct" && p.result !== "known")) { return false; }
        }
      }

      if (f.search && f.search.length > 0) {
        var query = f.search.toLowerCase();
        var questionText = (q.question || "").toLowerCase();
        var solutionText = (q.solution || "").toLowerCase();
        if (questionText.indexOf(query) === -1 && solutionText.indexOf(query) === -1) {
          return false;
        }
      }

      return true;
    });
    State.order = State.shuffled ? Utils.shuffle(list) : list;
    State.deckComplete = false;
    if (!opts || !opts.keepIndex || State.index >= State.order.length) {
      State.index = 0;
    }
    State.persist();
  },

  current: function () {
    return State.order[State.index] || null;
  },

  selectSet: function (setId) {
    State.currentSet = setId || null;
    State.applyFilters({ keepIndex: false });
  },

  setCategory: function (cat) {
    State.filters.category = cat;
    State.applyFilters({ keepIndex: false });
  },

  setDifficulty: function (diff) {
    State.filters.difficulty = diff;
    State.applyFilters({ keepIndex: false });
  },

  setType: function (type) {
    State.filters.type = type;
    State.applyFilters({ keepIndex: false });
  },

  setStatus: function (status) {
    State.filters.status = status;
    State.applyFilters({ keepIndex: false });
  },

  setSearch: function (query) {
    State.filters.search = query;
    State.applyFilters({ keepIndex: false });
  },

  next: function () {
    if (State.index < State.order.length - 1) {
      State.index++;
      State.persist();
      return true;
    } else if (State.index === State.order.length - 1) {
      State.deckComplete = true;
      return false;
    }
    return false;
  },

  goTo: function (idx) {
    State.index = Math.max(0, Math.min(idx, State.order.length - 1));
    State.deckComplete = false;
    State.persist();
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
    var f = State.filters;
    var baseList = State.all;

    if (State.currentSet) {
      var set = null;
      for (var i = 0; i < State.setsList.length; i++) {
        if (State.setsList[i].id === State.currentSet) {
          set = State.setsList[i];
          break;
        }
      }
      if (set) {
        baseList = State.all.filter(function (q) {
          return set.questionIds.indexOf(q.id) !== -1;
        });
      }
    }

    var filtered = baseList.filter(function (q) {
      if (f.difficulty !== "all" && q.difficulty !== f.difficulty) { return false; }
      if (f.type !== "all" && q.type !== f.type) { return false; }
      if (f.status !== "all") {
        var p = State.progress[q.id];
        if (f.status === "unseen") {
          if (p && p.result) { return false; }
        } else if (f.status === "weak") {
          if (!p || (p.result !== "wrong" && p.result !== "review")) { return false; }
        } else if (f.status === "mastered") {
          if (!p || (p.result !== "correct" && p.result !== "known")) { return false; }
        }
      }
      if (f.search && f.search.length > 0) {
        var query = f.search.toLowerCase();
        var questionText = (q.question || "").toLowerCase();
        var solutionText = (q.solution || "").toLowerCase();
        if (questionText.indexOf(query) === -1 && solutionText.indexOf(query) === -1) {
          return false;
        }
      }
      return true;
    });

    var counts = { all: filtered.length };
    filtered.forEach(function (q) {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  },

  persist: function () {
    Store.save({
      filters: State.filters,
      shuffled: State.shuffled,
      currentSet: State.currentSet,
      index: State.index,
      progress: State.progress
    });
  }
};
