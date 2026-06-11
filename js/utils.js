/* utils.js — small shared helpers */
"use strict";

var Utils = {
  escapeHtml: function (str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  /* Escapes HTML, then renders `inline code` markers and newlines. */
  formatText: function (str) {
    var html = Utils.escapeHtml(str);
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\n/g, "<br>");
    return html;
  },

  /* Fisher-Yates; returns a new array, does not mutate the input. */
  shuffle: function (arr) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  },

  capitalize: function (str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  }
};
