/* storage.js — localStorage persistence (progress, filters, position) */
"use strict";

var Store = {
  KEY: "intprep-v1",
  TIME_KEY: "intprep-time-v1",

  load: function () {
    try {
      var raw = localStorage.getItem(Store.KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  },

  save: function (data) {
    try {
      localStorage.setItem(Store.KEY, JSON.stringify(data));
    } catch (err) {
      /* private mode or storage full — the app still works, progress just is not kept */
    }
  },

  clear: function () {
    try {
      localStorage.removeItem(Store.KEY);
    } catch (err) {
      /* ignore */
    }
  },

  /* Training time is stored under its own key so State.persist() — which
     rewrites the whole KEY object — never clobbers it. */
  loadTime: function () {
    try {
      var raw = localStorage.getItem(Store.TIME_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  },

  saveTime: function (data) {
    try {
      localStorage.setItem(Store.TIME_KEY, JSON.stringify(data));
    } catch (err) {
      /* private mode or storage full — time just is not kept */
    }
  },

  clearTime: function () {
    try {
      localStorage.removeItem(Store.TIME_KEY);
    } catch (err) {
      /* ignore */
    }
  }
};
