/* ============================================
   TOS CheatSheet - Tuile de Preuve Thermale
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'tos-cheatsheet-thermal-points';

  const state = {
    points: [],
    currentTime: 0,
    maxDisplayTime: 60,
    canvas: null,
    ctx: null,
    onConfirmCallback: null
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

  function getLevelColors() {
    var tileContainer = document.getElementById('thermalTile');
    return {
      1: getComputedColor('--graph-point-1', tileContainer),
      2: getComputedColor('--graph-point-2', tileContainer),
      3: getComputedColor('--graph-point-3', tileContainer),
      4: getComputedColor('--graph-point-4', tileContainer)
    };
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
    renderGlobalProof();
    emitProofPointAdded();
    registerProofWithEngine();
  }

  function removeLastPoint() {
    if (state.points.length > 0) {
      state.points.pop();
      storePoints();
      render();
      renderGlobalProof();
    }
  }

  function resetPoints() {
    state.points = [];
    state.maxDisplayTime = 60;
    state.currentTime = 0;
    storePoints();
    updateSelectedButton(null);
    render();
    renderGlobalProof();
    if (window.__ProofTrustEngine) {
      window.__ProofTrustEngine.reset();
    }
  }

  function updateSelectedButton(level) {
    var buttons = document.querySelectorAll('#thermalTile .btn-level');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('btn-level-selected');
    }
    if (level !== null) {
      var targetBtn = document.querySelector('#thermalTile .btn-level[data-level="' + level + '"]');
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
    renderGlobalProof();
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

  function render() {
    const canvas = state.canvas;
    if (!canvas) return;

    const levelColors = getLevelColors();
    window.__GraphRenderer.renderGraph(canvas, state.points, state.maxDisplayTime, state.currentTime, 4, levelColors, { pointRadius: 4 });
  }

  function renderGlobalProof() {
    const canvas = document.getElementById('globalProofCanvas');
    if (!canvas) return;
    const levelColors = getLevelColors();
    window.__GraphRenderer.renderGlobalProof(canvas, state.points, state.maxDisplayTime, state.currentTime, levelColors);
  }

  function showConfirmation(title, message, onConfirm) {
    const overlay = document.getElementById('confirmationOverlay');
    const titleEl = document.getElementById('confirmationTitle');
    const messageEl = document.getElementById('confirmationMessage');

    titleEl.textContent = title;
    messageEl.textContent = message;
    state.onConfirmCallback = onConfirm;

    overlay.classList.add('is-visible');
  }

  function hideConfirmation() {
    const overlay = document.getElementById('confirmationOverlay');
    overlay.classList.remove('is-visible');
    state.onConfirmCallback = null;
  }

  function emitProofPointAdded() {
    if (state.points.length > 0) {
      document.dispatchEvent(new CustomEvent('proofPointAdded', {
        detail: { type: 'thermal', level: state.points[state.points.length - 1].level, time: state.currentTime }
      }));
    }
  }

  function registerProofWithEngine() {
    if (window.__ProofTrustEngine) {
      window.__ProofTrustEngine.registerProof('thermal', state.points, 4);
    }
  }

  function init() {
    state.canvas = document.getElementById('thermalCanvas');
    state.ctx = state.canvas.getContext('2d');

    if (!state.canvas || !state.ctx) return;

    state.points = getStoredPoints();

    const thermalButtons = document.querySelectorAll('.btn-thermal');
    thermalButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const level = parseInt(this.getAttribute('data-level'), 10);
        addPoint(level);
      });
    });

    document.getElementById('thermalUndo').addEventListener('click', function () {
      removeLastPoint();
    });

    document.getElementById('thermalReset').addEventListener('click', function () {
      showConfirmation(
        'Reset Thermal Tile',
        'Are you sure you want to delete all points?',
        function () { resetPoints(); }
      );
    });

    document.getElementById('confirmationCancel').addEventListener('click', function () {
      hideConfirmation();
    });

    document.getElementById('confirmationConfirm').addEventListener('click', function () {
      if (state.onConfirmCallback) {
        state.onConfirmCallback();
      }
      hideConfirmation();
    });

    document.getElementById('confirmationOverlay').addEventListener('click', function (e) {
      if (e.target === this) {
        hideConfirmation();
      }
    });

    document.addEventListener('timerTick', function (e) {
      updateTimer(e.detail.seconds);
    });

    document.addEventListener('globalReset', function () {
      resetPoints();
    });

    window.addEventListener('resize', function () {
      render();
      renderGlobalProof();
    });

    render();
    renderGlobalProof();

    var lastPoint = state.points.length > 0 ? state.points[state.points.length - 1] : null;
    if (lastPoint) {
      updateSelectedButton(lastPoint.level);
    }
  }

  window.__thermalTile = {
    updateTimer: updateTimer,
    addPoint: addPoint,
    resetPoints: resetPoints,
    showConfirmation: showConfirmation,
    renderGlobalProof: renderGlobalProof
  };

  init();
})();
