/* ============================================
   TOS CheatSheet - Tuile Audio
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'tos-cheatsheet-audio-points';
  const LEVEL_COLORS = {
    1: '#ef5350',
    2: '#ffa726',
    3: '#66bb6a'
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
    for (let i = 0; i <= 3; i++) {
      const y = padding.top + ((3 - i) / 3) * graphHeight;
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + graphWidth, y);
    }
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = '11px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';
    ctx.textAlign = 'center';
    const timeStep = state.maxDisplayTime <= 120 ? 15 : 30;
    for (let t = 0; t <= state.maxDisplayTime; t += timeStep) {
      const x = padding.left + (t / state.maxDisplayTime) * graphWidth;
      const y = padding.top + graphHeight + 15;
      ctx.fillText(formatTimeShort(t), x, y);
    }

    ctx.textAlign = 'right';
    for (let i = 0; i <= 3; i++) {
      const y = padding.top + ((3 - i) / 3) * graphHeight;
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
      const y = padding.top + ((3 - p.level) / 3) * graphHeight;
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
      const y = padding.top + ((3 - p.level) / 3) * graphHeight;
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

    overlay.classList.add('is-visible');

    var onConfirmHandler = function () {
      onConfirm();
      overlay.removeEventListener('click', onConfirmHandler);
    };

    overlay.addEventListener('click', onConfirmHandler);
  }

  function init() {
    state.canvas = document.getElementById('audioCanvas');
    state.ctx = state.canvas.getContext('2d');

    if (!state.canvas || !state.ctx) return;

    state.points = getStoredPoints();

    var audioButtons = document.querySelectorAll('.btn-audio');
    for (var i = 0; i < audioButtons.length; i++) {
      audioButtons[i].addEventListener('click', (function (btn) {
        return function () {
          var level = parseInt(btn.getAttribute('data-level'), 10);
          addPoint(level);
        };
      })(audioButtons[i]));
    }

    document.getElementById('audioUndo').addEventListener('click', function () {
      removeLastPoint();
    });

    document.getElementById('audioReset').addEventListener('click', function () {
      showConfirmation(
        'Reset de la tuile audio',
        'Êtes-vous sûr de vouloir supprimer tous les points ?',
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

  window.__audioTile = {
    updateTimer: updateTimer,
    addPoint: addPoint,
    resetPoints: resetPoints
  };

  init();
})();
