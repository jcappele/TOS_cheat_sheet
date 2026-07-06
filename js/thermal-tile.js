/* ============================================
   TOS CheatSheet - Tuile de Preuve Thermale
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'tos-cheatsheet-thermal-points';
  const LEVEL_COLORS = {
    1: '#4fc3f7',
    2: '#29b6f6',
    3: '#03a9f4',
    4: '#0288d1'
  };

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

  function render() {
    const ctx = state.ctx;
    if (!ctx) return;

    const { width, height } = getCanvasDimensions();
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    const bgColor = getComputedColor('--bg-primary');
    const textColor = getComputedColor('--text-secondary');
    const borderColor = getComputedColor('--border-color');

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (i / 4) * graphHeight;
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + graphWidth, y);
    }
    ctx.stroke();

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const timeStep = state.maxDisplayTime <= 120 ? 15 : 30;
    for (let t = 0; t <= state.maxDisplayTime; t += timeStep) {
      const x = padding.left + (t / state.maxDisplayTime) * graphWidth;
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + graphHeight);
    }
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = '11px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';
    ctx.textAlign = 'center';

    for (let t = 0; t <= state.maxDisplayTime; t += timeStep) {
      const x = padding.left + (t / state.maxDisplayTime) * graphWidth;
      const y = padding.top + graphHeight + 15;
      ctx.fillText(formatTimeShort(t), x, y);
    }

    ctx.textAlign = 'right';
    for (let i = 4; i >= 0; i--) {
      const y = padding.top + (i / 4) * graphHeight;
      ctx.fillText(i, padding.left - 8, y + 4);
    }

    if (state.points.length === 0) return;

    const pointsInRange = state.points.filter(p => p.time <= state.maxDisplayTime);
    if (pointsInRange.length === 0) return;

    ctx.strokeStyle = LEVEL_COLORS[1];
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();

    for (let i = 0; i < pointsInRange.length; i++) {
      const p = pointsInRange[i];
      const x = padding.left + (p.time / state.maxDisplayTime) * graphWidth;
      const y = padding.top + ((4 - p.level) / 4) * graphHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    for (let i = 0; i < pointsInRange.length; i++) {
      const p = pointsInRange[i];
      const x = padding.left + (p.time / state.maxDisplayTime) * graphWidth;
      const y = padding.top + ((4 - p.level) / 4) * graphHeight;
      const color = LEVEL_COLORS[p.level] || LEVEL_COLORS[1];

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = bgColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    const currentTimeX = padding.left + (state.currentTime / state.maxDisplayTime) * graphWidth;
    if (currentTimeX <= padding.left + graphWidth) {
      ctx.strokeStyle = getComputedColor('--deezer-purple');
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(currentTimeX, padding.top);
      ctx.lineTo(currentTimeX, padding.top + graphHeight);
      ctx.stroke();
      ctx.setLineDash([]);
    }
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
        'Reset de la tuile thermique',
        'Êtes-vous sûr de vouloir supprimer tous les points ?',
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
    });

    render();
  }

  window.__thermalTile = {
    updateTimer: updateTimer,
    addPoint: addPoint,
    resetPoints: resetPoints,
    showConfirmation: showConfirmation
  };

  init();
})();
