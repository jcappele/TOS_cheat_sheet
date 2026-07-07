/* ============================================
   TOS CheatSheet - Tuile de Comportement (Light On / Light Off)
   ============================================ */

(function () {
  'use strict';

  const state = {
    counts: {},
    canvas: null,
    ctx: null
  };

  function getStoredCount(key) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? parseInt(stored, 10) : 0;
    } catch (e) {
      return 0;
    }
  }

  function storeCount(key, value) {
    localStorage.setItem(key, String(value));
  }

  function incrementCount(type) {
    if (!state.counts[type]) {
      state.counts[type] = 0;
    }
    state.counts[type]++;
    storeCount('tos-cheatsheet-' + type + '-count', state.counts[type]);
    updateDisplay(type);
  }

  function decrementCount(type) {
    if (!state.counts[type]) {
      state.counts[type] = 0;
    }
    if (state.counts[type] > 0) {
      state.counts[type]--;
      storeCount('tos-cheatsheet-' + type + '-count', state.counts[type]);
      updateDisplay(type);
    }
  }

  function resetCount(type) {
    state.counts[type] = 0;
    storeCount('tos-cheatsheet-' + type + '-count', 0);
    updateDisplay(type);
  }

  function updateDisplay(type) {
    var displayEl = document.getElementById(type + 'Count');
    if (displayEl) {
      displayEl.textContent = state.counts[type] || 0;
    }
  }

  function init() {
    state.counts.lightOn = getStoredCount('tos-cheatsheet-lightOn-count');
    state.counts.lightOff = getStoredCount('tos-cheatsheet-lightOff-count');

    updateDisplay('lightOn');
    updateDisplay('lightOff');

    document.getElementById('lightOnIncrement').addEventListener('click', function () {
      incrementCount('lightOn');
    });

    document.getElementById('lightOnDecrement').addEventListener('click', function () {
      decrementCount('lightOn');
    });

    document.getElementById('lightOffIncrement').addEventListener('click', function () {
      incrementCount('lightOff');
    });

    document.getElementById('lightOffDecrement').addEventListener('click', function () {
      decrementCount('lightOff');
    });

    document.addEventListener('globalReset', function () {
      resetCount('lightOn');
      resetCount('lightOff');
    });
  }

  window.__behaviorTile = {
    incrementCount: incrementCount,
    decrementCount: decrementCount,
    resetCount: resetCount
  };

  init();
})();
