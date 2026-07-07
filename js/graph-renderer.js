/* ============================================
   TOS CheatSheet - Graph Renderer Partagé
   ============================================ */

(function () {
  'use strict';

  var GraphRenderer = {};

  function getComputedColor(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  }

  function formatTimeShort(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  }

  function getCanvasDimensions(canvas) {
    var container = canvas.parentElement;
    var width = container.clientWidth;
    var height = 150;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    return { width: width, height: height, dpr: dpr };
  }

  function drawGrid(ctx, width, height, maxDisplayTime, padding, graphHeight) {
    var bgColor = getComputedColor('--bg-primary');
    var textColor = getComputedColor('--text-secondary');
    var borderColor = getComputedColor('--border-color');

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    var timeStep = maxDisplayTime <= 120 ? 15 : 30;
    for (var t = 0; t <= maxDisplayTime; t += timeStep) {
      var x = padding.left + (t / maxDisplayTime) * (width - padding.left - padding.right);
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + graphHeight);
    }
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = '9px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';
    ctx.textAlign = 'center';
    for (var t = 0; t <= maxDisplayTime; t += timeStep) {
      var x = padding.left + (t / maxDisplayTime) * (width - padding.left - padding.right);
      var y = padding.top + graphHeight + 15;
      ctx.fillText(formatTimeShort(t), x, y);
    }
  }

  function drawYAxis(ctx, padding, graphHeight, maxLevel) {
    ctx.textAlign = 'right';
    for (var i = 0; i <= maxLevel; i++) {
      var y = padding.top + ((maxLevel - i) / maxLevel) * graphHeight;
      ctx.fillText(i, padding.left - 8, y + 4);
    }
  }

  function drawCurrentTimeLine(ctx, width, height, currentTime, maxDisplayTime, padding, graphHeight) {
    var currentTimeX = padding.left + (currentTime / maxDisplayTime) * (width - padding.left - padding.right);
    if (currentTimeX <= padding.left + (width - padding.left - padding.right)) {
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

  function drawPoints(ctx, points, maxDisplayTime, padding, graphHeight, graphWidth, maxLevel, levelColors, pointRadius) {
    var bgColor = getComputedColor('--bg-primary');
    var pointsInRange = points.filter(function (p) { return p.time <= maxDisplayTime; });
    if (pointsInRange.length === 0) return;

    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    for (var i = 0; i < pointsInRange.length; i++) {
      var p = pointsInRange[i];
      var x = padding.left + (p.time / maxDisplayTime) * graphWidth;
      var y = padding.top + ((maxLevel - p.level) / maxLevel) * graphHeight;
      var color = levelColors[p.level] || levelColors[1] || levelColors[0];

      if (i === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        var prevP = pointsInRange[i - 1];
        var prevX = padding.left + (prevP.time / maxDisplayTime) * graphWidth;
        var prevY = padding.top + ((maxLevel - prevP.level) / maxLevel) * graphHeight;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }

    for (var i = 0; i < pointsInRange.length; i++) {
      var p = pointsInRange[i];
      var x = padding.left + (p.time / maxDisplayTime) * graphWidth;
      var y = padding.top + ((maxLevel - p.level) / maxLevel) * graphHeight;
      var color = levelColors[p.level] || levelColors[1] || levelColors[0];

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, pointRadius || 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = bgColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function renderGraph(canvas, points, maxDisplayTime, currentTime, maxLevel, levelColors, options) {
    options = options || {};
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var dims = getCanvasDimensions(canvas);
    var width = dims.width;
    var height = dims.height;
    var dpr = dims.dpr;
    
    ctx.save();
    ctx.scale(dpr, dpr);

    var padding = options.padding || { top: 12, right: 12, bottom: 18, left: 28 };
    var graphWidth = width - padding.left - padding.right;
    var graphHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width / dpr, height / dpr);

    drawGrid(ctx, width, height, maxDisplayTime, padding, graphHeight);
    drawYAxis(ctx, padding, graphHeight, maxLevel);
    drawCurrentTimeLine(ctx, width, height, currentTime, maxDisplayTime, padding, graphHeight);
    drawPoints(ctx, points, maxDisplayTime, padding, graphHeight, graphWidth, maxLevel, levelColors, options.pointRadius);
    
    ctx.restore();
  }

  function renderGlobalProof(canvas, points, maxDisplayTime, currentTime, levelColors) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var dims = getCanvasDimensions(canvas);
    var width = dims.width;
    var height = dims.height;
    var dpr = dims.dpr;
    
    ctx.save();
    ctx.scale(dpr, dpr);

    var padding = { top: 20, right: 20, bottom: 30, left: 40 };
    var graphWidth = width - padding.left - padding.right;
    var graphHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width / dpr, height / dpr);

    var bgColor = getComputedColor('--bg-primary');
    var textColor = getComputedColor('--text-secondary');
    var borderColor = getComputedColor('--border-color');
    var timeStep = maxDisplayTime <= 120 ? 15 : 30;

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var t = 0; t <= maxDisplayTime; t += timeStep) {
      var x = padding.left + (t / maxDisplayTime) * graphWidth;
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + graphHeight);
    }
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = '11px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';
    ctx.textAlign = 'center';
    for (var t = 0; t <= maxDisplayTime; t += timeStep) {
      var x = padding.left + (t / maxDisplayTime) * graphWidth;
      var y = padding.top + graphHeight + 15;
      ctx.fillText(formatTimeShort(t), x, y);
    }

    ctx.textAlign = 'right';
    for (var i = 0; i <= 5; i++) {
      var y = padding.top + ((5 - i) / 5) * graphHeight;
      ctx.fillText(i, padding.left - 8, y + 4);
    }

    if (points.length === 0) return;

    var pointsInRange = points.filter(function (p) { return p.time <= maxDisplayTime; });
    if (pointsInRange.length === 0) return;

    for (var i = 0; i < pointsInRange.length; i++) {
      var p = pointsInRange[i];
      var x = padding.left + (p.time / maxDisplayTime) * graphWidth;
      var y = padding.top + ((5 - p.level) / 5) * graphHeight;
      var color = levelColors[p.level] || levelColors[1] || levelColors[0];

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = bgColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    var currentTimeX = padding.left + (currentTime / maxDisplayTime) * graphWidth;
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
    
    ctx.restore();
  }

  function showConfirmation(title, message, onConfirm) {
    var overlay = document.getElementById('confirmationOverlay');
    var titleEl = document.getElementById('confirmationTitle');
    var messageEl = document.getElementById('confirmationMessage');

    titleEl.textContent = title;
    messageEl.textContent = message;

    overlay.classList.add('is-visible');

    var onConfirmHandler = function () {
      onConfirm();
      overlay.removeEventListener('click', onConfirmHandler);
    };

    overlay.addEventListener('click', onConfirmHandler);
  }

  function hideConfirmation() {
    var overlay = document.getElementById('confirmationOverlay');
    overlay.classList.remove('is-visible');
  }

  GraphRenderer.renderGraph = renderGraph;
  GraphRenderer.renderGlobalProof = renderGlobalProof;
  GraphRenderer.showConfirmation = showConfirmation;
  GraphRenderer.hideConfirmation = hideConfirmation;
  GraphRenderer.getComputedColor = getComputedColor;
  GraphRenderer.formatTimeShort = formatTimeShort;
  GraphRenderer.getCanvasDimensions = getCanvasDimensions;

  window.__GraphRenderer = GraphRenderer;
})();
