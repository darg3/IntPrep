/* storage.js — localStorage persistence (progress, filters, position) */
"use strict";

var Store = {
  KEY: "intprep-v1",

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
  }
};
