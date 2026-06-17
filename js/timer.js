/* timer.js — accumulates active study time (visible tab + recent activity) */
"use strict";

var Timer = {
  IDLE_LIMIT: 60000,   /* pause after 60s without interaction */
  TICK_MS: 1000,
  MAX_DELTA: 5000,     /* clamp per-tick gain so sleep/throttle can't jump the clock */
  SAVE_EVERY: 15,      /* persist roughly every 15 ticks */

  total: 0,            /* persisted base + this session, in ms */
  session: 0,          /* this session only, in ms */
  lastCount: 0,        /* Date.now() of the previous tick */
  lastActivity: 0,     /* Date.now() of the last user interaction */
  tickCount: 0,
  intervalId: null,
  started: false,

  start: function () {
    if (Timer.started) { return; }
    Timer.started = true;

    var saved = Store.loadTime();
    Timer.total = (saved && typeof saved.totalMs === "number") ? saved.totalMs : 0;
    Timer.session = 0;
    Timer.lastCount = Date.now();
    Timer.lastActivity = Date.now();

    var bump = function () { Timer.lastActivity = Date.now(); };
    var events = ["keydown", "pointerdown", "touchstart", "mousemove", "scroll"];
    events.forEach(function (name) {
      document.addEventListener(name, bump, { passive: true });
    });

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") {
        Timer.persist();
      } else {
        /* Returning to the tab counts as activity and resets the tick base. */
        Timer.lastActivity = Date.now();
        Timer.lastCount = Date.now();
      }
    });

    window.addEventListener("pagehide", Timer.persist);

    Timer.intervalId = setInterval(Timer.tick, Timer.TICK_MS);
  },

  tick: function () {
    var now = Date.now();
    var active = document.visibilityState === "visible" &&
      (now - Timer.lastActivity) < Timer.IDLE_LIMIT;

    if (active) {
      var delta = now - Timer.lastCount;
      if (delta < 0) { delta = 0; }
      if (delta > Timer.MAX_DELTA) { delta = Timer.MAX_DELTA; }
      Timer.total += delta;
      Timer.session += delta;
    }
    Timer.lastCount = now; /* always advance so paused gaps are never counted */

    Timer.tickCount++;
    if (Timer.tickCount % Timer.SAVE_EVERY === 0) {
      Timer.persist();
    }
  },

  totalMs: function () { return Timer.total; },

  sessionMs: function () { return Timer.session; },

  persist: function () {
    Store.saveTime({ totalMs: Timer.total });
  },

  reset: function () {
    Timer.total = 0;
    Timer.session = 0;
    Timer.lastCount = Date.now();
    Timer.lastActivity = Date.now();
    Store.clearTime();
  }
};
