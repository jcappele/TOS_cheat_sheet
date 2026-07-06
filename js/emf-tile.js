/* ============================================
   TOS CheatSheet - Tuile de Preuve EMF
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'tos-cheatsheet-emf-points';
  const LEVEL_COLORS = {
    1: '#ab47bc',
    2: '#ba68c8',
    3: '#ce93d8',
    4: '#9c27b0'
  };

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

  function getComputedColor(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  }

  function formatTimeShort(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  }

  function addPoint(level) {
    state.points.push({ time: state.currentTime, level: level });
    storePoints();
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
    render();
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
    state.ctx.scale(dpr, dpr);
    return { width: width, height: height };
  }

  function getLevelColors() {
    return {
      1: getComputedColor('--graph-point-1'),
      2: getComputedColor('--graph-point-2'),
      3: getComputedColor('--graph-point-3'),
      4: getComputedColor('--graph-point-4')
    };
  }

  function render() {
    const canvas = state.canvas;
    if (!canvas) return;

    const levelColors = getLevelColors();
    GraphRenderer.renderGraph(canvas, state.points, state.maxDisplayTime, state.currentTime, 4, levelColors, { pointRadius: 4 });
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
  }

  window.__emfTile = {
    updateTimer: updateTimer,
    addPoint: addPoint,
    resetPoints: resetPoints,
    renderGlobalProof: function () {
      const canvas = document.getElementById('globalProofCanvas');
      if (!canvas) return;
      const levelColors = getLevelColors();
      GraphRenderer.renderGlobalProof(canvas, window.__thermalTile ? window.__thermalTile._getState().points : [], 60, 0, levelColors);
    }
  };

  init();
})();
