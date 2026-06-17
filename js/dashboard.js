/* dashboard.js — stats modal: training time and accuracy */
"use strict";

var Dashboard = {
  isOpen: false,
  wired: false,

  open: function () {
    Dashboard.render();
    var overlay = document.getElementById("dashboard");
    if (!overlay) { return; }
    if (!Dashboard.wired) { Dashboard.wire(overlay); }
    overlay.classList.remove("is-hidden");
    overlay.setAttribute("aria-hidden", "false");
    Dashboard.isOpen = true;
    var close = document.getElementById("dashboard-close");
    if (close) { close.focus(); }
  },

  close: function () {
    var overlay = document.getElementById("dashboard");
    if (!overlay) { return; }
    overlay.classList.add("is-hidden");
    overlay.setAttribute("aria-hidden", "true");
    Dashboard.isOpen = false;
    var btn = document.getElementById("dashboard-btn");
    if (btn) { btn.focus(); }
  },

  toggle: function () {
    if (Dashboard.isOpen) { Dashboard.close(); } else { Dashboard.open(); }
  },

  wire: function (overlay) {
    Dashboard.wired = true;

    var close = document.getElementById("dashboard-close");
    if (close) { close.addEventListener("click", Dashboard.close); }

    /* Backdrop click closes; clicks inside the modal do not. */
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) { Dashboard.close(); }
    });

    document.addEventListener("keydown", function (event) {
      if (Dashboard.isOpen && event.key === "Escape") {
        event.preventDefault();
        Dashboard.close();
      }
    });
  },

  pct: function (numerator, denominator) {
    if (!denominator) { return null; }
    return Math.round((numerator / denominator) * 100);
  },

  render: function () {
    var body = document.getElementById("dashboard-body");
    if (!body) { return; }

    var s = State.statsFor(State.all);
    var rightCount = s.correct + s.known;
    var accuracy = Dashboard.pct(rightCount, s.answered);
    var mcq = Dashboard.pct(s.correct, s.correct + s.wrong);
    var self = Dashboard.pct(s.known, s.known + s.review);

    var rows = [
      Dashboard.metricRow(
        "&#9201;", "Training time",
        Utils.formatDuration(Timer.totalMs()),
        "this session: " + Utils.formatDuration(Timer.sessionMs())
      ),
      Dashboard.accuracyRow(accuracy, rightCount, s.answered)
    ];

    var breakdown = [];
    if (mcq !== null) {
      breakdown.push(Dashboard.breakdownItem("Multiple choice", mcq + "%", s.correct + " / " + (s.correct + s.wrong)));
    }
    if (self !== null) {
      breakdown.push(Dashboard.breakdownItem("Self-assessed", self + "%", s.known + " / " + (s.known + s.review)));
    }
    breakdown.push(Dashboard.breakdownItem("Mastered", s.mastered + " / " + s.total, "of all cards"));
    breakdown.push(Dashboard.breakdownItem("Answered", String(s.answered), "of " + s.total + " cards"));

    body.innerHTML =
      rows.join("") +
      '<div class="dash-grid">' + breakdown.join("") + "</div>";
  },

  metricRow: function (icon, label, value, sub) {
    return '<div class="dash-metric">' +
      '<span class="dash-label">' + icon + " " + Utils.escapeHtml(label) + "</span>" +
      '<span class="dash-value">' + Utils.escapeHtml(value) + "</span>" +
      '<span class="dash-sub">' + Utils.escapeHtml(sub) + "</span>" +
      "</div>";
  },

  accuracyRow: function (accuracy, right, answered) {
    var value = accuracy === null ? "—" : accuracy + "%";
    var sub = answered === 0
      ? "answer some cards to see your accuracy"
      : right + " right of " + answered + " answered";
    var bar = '<div class="progress-bar"><div class="progress-fill" style="width:' +
      (accuracy === null ? 0 : accuracy) + '%"></div></div>';
    return '<div class="dash-metric">' +
      '<span class="dash-label">&#127919; Accuracy</span>' +
      '<span class="dash-value">' + value + "</span>" +
      bar +
      '<span class="dash-sub">' + Utils.escapeHtml(sub) + "</span>" +
      "</div>";
  },

  breakdownItem: function (label, value, sub) {
    return '<div class="dash-item">' +
      '<span class="dash-item-value">' + Utils.escapeHtml(value) + "</span>" +
      '<span class="dash-item-label">' + Utils.escapeHtml(label) + "</span>" +
      '<span class="dash-item-sub">' + Utils.escapeHtml(sub) + "</span>" +
      "</div>";
  }
};
