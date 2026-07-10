/* ============================================
   TOS CheatSheet - Tuile de Preuve EMF
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'tos-cheatsheet-emf-points';

  const state = {
    points: [],
    currentTime: 0,
    maxDisplayTime: 60,
    canvas: null,
    ctx: null
  };

  function getStoredPoints() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function storePoints() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.points));
  }

  function getComputedColor(variable, element) {
    var target = element || document.documentElement;
    return getComputedStyle(target).getPropertyValue(variable).trim();
  }

  function formatTimeShort(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  }

  function addPoint(level) {
    state.points.push({ time: state.currentTime, level: level });
    storePoints();
    updateSelectedButton(level);
    render();
  }

  function removeLastPoint() {
    if (state.points.length > 0) {
      state.points.pop();
      storePoints();
      render();
    }
  }

  function resetPoints() {
    state.points = [];
    state.maxDisplayTime = 60;
    state.currentTime = 0;
    storePoints();
    updateSelectedButton(null);
    render();
  }

  function updateSelectedButton(level) {
    var buttons = document.querySelectorAll('#emfTile .btn-level');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('btn-level-selected');
    }
    if (level !== null) {
      var targetBtn = document.querySelector('#emfTile .btn-level[data-level="' + level + '"]');
      if (targetBtn) {
        targetBtn.classList.add('btn-level-selected');
      }
    }
  }

  function updateTimer(seconds) {
    state.currentTime = seconds;
    if (state.currentTime > state.maxDisplayTime - 10) {
      state.maxDisplayTime += 60;
    }
    render();
  }

  function getCanvasDimensions() {
    const container = state.canvas.parentElement;
    const width = container.clientWidth;
    const height = 200;
    const dpr = window.devicePixelRatio || 1;
    state.canvas.width = width * dpr;
    state.canvas.height = height * dpr;
    state.canvas.style.width = width + 'px';
    state.canvas.style.height = height + 'px';
    return { width: width, height: height };
  }

  function getLevelColors() {
    var tileContainer = document.getElementById('emfTile');
    return {
      1: getComputedColor('--graph-point-1', tileContainer),
      2: getComputedColor('--graph-point-2', tileContainer),
      3: getComputedColor('--graph-point-3', tileContainer),
      4: getComputedColor('--graph-point-4', tileContainer)
    };
  }

  function render() {
    const canvas = state.canvas;
    if (!canvas) return;

    const levelColors = getLevelColors();
    window.__GraphRenderer.renderGraph(canvas, state.points, state.maxDisplayTime, state.currentTime, 4, levelColors, { pointRadius: 4 });
  }

  function showConfirmation(title, message, onConfirm) {
    const overlay = document.getElementById('confirmationOverlay');
    const titleEl = document.getElementById('confirmationTitle');
    const messageEl = document.getElementById('confirmationMessage');

    titleEl.textContent = title;
    messageEl.textContent = message;

    overlay.classList.add('is-visible');

    var onConfirmHandler = function () {
      onConfirm();
      overlay.removeEventListener('click', onConfirmHandler);
    };

    overlay.addEventListener('click', onConfirmHandler);
  }

  function init() {
    state.canvas = document.getElementById('emfCanvas');
    state.ctx = state.canvas.getContext('2d');

    if (!state.canvas || !state.ctx) return;

    state.points = getStoredPoints();

    var emfButtons = document.querySelectorAll('.btn-emf');
    for (var i = 0; i < emfButtons.length; i++) {
      emfButtons[i].addEventListener('click', (function (btn) {
        return function () {
          var level = parseInt(btn.getAttribute('data-level'), 10);
          addPoint(level);
        };
      })(emfButtons[i]));
    }

    document.getElementById('emfUndo').addEventListener('click', function () {
      removeLastPoint();
    });

    document.getElementById('emfReset').addEventListener('click', function () {
      showConfirmation(
        'Reset EMF Tile',
        'Are you sure you want to delete all points?',
        function () { resetPoints(); }
      );
    });

    document.addEventListener('timerTick', function (e) {
      updateTimer(e.detail.seconds);
    });

    document.addEventListener('globalReset', function () {
      resetPoints();
    });

    window.addEventListener('resize', function () {
      render();
    });

    render();

    var lastPoint = state.points.length > 0 ? state.points[state.points.length - 1] : null;
    if (lastPoint) {
      updateSelectedButton(lastPoint.level);
    }

    registerProofWithEngine();
  }

  function emitProofPointAdded() {
    if (state.points.length > 0) {
      document.dispatchEvent(new CustomEvent('proofPointAdded', {
        detail: { type: 'emf', level: state.points[state.points.length - 1].level, time: state.currentTime }
      }));
    }
  }

  function registerProofWithEngine() {
    if (window.__ProofTrustEngine) {
      window.__ProofTrustEngine.registerProof('emf', state.points, 5);
    }
  }

  window.__emfTile = {
    updateTimer: updateTimer,
    addPoint: addPoint,
    resetPoints: resetPoints,
    renderGlobalProof: function () {
      const canvas = document.getElementById('globalProofCanvas');
      if (!canvas) return;
      const levelColors = getLevelColors();
      window.__GraphRenderer.renderGlobalProof(canvas, window.__thermalTile ? window.__thermalTile._getState().points : [], 60, 0, levelColors);
    }
  };

  init();
})();
