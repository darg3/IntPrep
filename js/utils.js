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
  },

  /* Syntax highlighting: escapes HTML, then wraps tokens in spans. */
  highlightCode: function (code) {
    var escaped = Utils.escapeHtml(code);
    var keywords = ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "new", "this", "null", "undefined", "true", "false", "int", "char", "void", "struct", "typedef"];
    var regex;

    escaped = escaped.replace(/\/\*[\s\S]*?\*\//g, function (m) {
      return '<span class="tok-comment">' + m + "</span>";
    });

    escaped = escaped.replace(/\/\/.*?(?=\n|$)/g, function (m) {
      return '<span class="tok-comment">' + m + "</span>";
    });

    escaped = escaped.replace(/("(?:\\.|[^"])*"|'(?:\\.|[^'])*')/g, function (m) {
      return '<span class="tok-string">' + m + "</span>";
    });

    escaped = escaped.replace(/\b(\d+(?:\.\d+)?)\b/g, function (m) {
      return '<span class="tok-number">' + m + "</span>";
    });

    for (var i = 0; i < keywords.length; i++) {
      regex = new RegExp("\\b" + keywords[i] + "\\b", "g");
      escaped = escaped.replace(regex, '<span class="tok-keyword">' + keywords[i] + "</span>");
    }

    return escaped;
  }
};
