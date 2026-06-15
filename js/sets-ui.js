/* sets-ui.js — set selector UI and metadata display */
"use strict";

var SetsUI = {
  build: function () {
    var select = document.getElementById("sets-select");
    if (!select) { return; }

    /* Add "Custom" option */
    var customOpt = document.createElement("option");
    customOpt.value = "custom";
    customOpt.textContent = "Custom selection";
    select.appendChild(customOpt);

    /* Add each preset set */
    State.setsList.forEach(function (set) {
      var opt = document.createElement("option");
      opt.value = set.id;
      opt.textContent = set.name;
      select.appendChild(opt);
    });

    /* Wire change event */
    select.addEventListener("change", function (e) {
      var val = e.target.value;
      if (val === "custom") {
        State.selectSet(null);
      } else {
        State.selectSet(val);
      }
      SetsUI.render();
      Flashcards.render();
    });
  },

  render: function () {
    var select = document.getElementById("sets-select");
    var info = document.getElementById("set-info");
    if (!select || !info) { return; }

    if (State.currentSet) {
      select.value = State.currentSet;
      var set = null;
      for (var i = 0; i < State.setsList.length; i++) {
        if (State.setsList[i].id === State.currentSet) {
          set = State.setsList[i];
          break;
        }
      }
      if (set) {
        info.textContent = set.questionCount + " questions · " + set.duration + " min";
        info.style.display = "inline";
      }
    } else {
      select.value = "custom";
      info.style.display = "none";
    }
  }
};
