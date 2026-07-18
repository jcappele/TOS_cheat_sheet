(function () {
  'use strict';

  function updateStats() {
    var engine = window.__ProofTrustEngine;
    if (!engine || !engine._getState) return;

    var state = engine._getState();
    var proofData = state.proofData || {};
    var validCount = 0;
    var invalidCount = 0;

    var proofTypes = ['thermal', 'audio', 'emf', 'radiation', 'uv', 'writing'];
    for (var i = 0; i < proofTypes.length; i++) {
      var type = proofTypes[i];
      var data = proofData[type];
      if (data) {
        validCount += data.validCount || 0;
        invalidCount += data.invalidCount || 0;
      }
    }

    var validEl = document.getElementById('validProofsCount');
    var invalidEl = document.getElementById('invalidProofsCount');
    if (validEl) validEl.value = validCount;
    if (invalidEl) invalidEl.value = invalidCount;
  }

  function handleButtonClick(event) {
    var btn = event.target.closest('.proof-counter-btn');
    if (!btn) return;
    var targetId = btn.getAttribute('data-target');
    var action = btn.getAttribute('data-action');
    var input = document.getElementById(targetId);
    if (!input) return;
    var currentValue = parseInt(input.value, 10) || 0;
    var newValue = action === 'increase' ? currentValue + 1 : currentValue - 1;
    if (newValue < (parseInt(input.min, 10) || 0)) newValue = parseInt(input.min, 10) || 0;
    if (newValue > (parseInt(input.max, 10) || 999)) newValue = parseInt(input.max, 10) || 999;
    input.value = newValue;
    if (targetId === 'eliminationThresholdInput') {
      var engine = window.__ProofTrustEngine;
      if (engine && engine.setConfig) {
        engine.setConfig({ eliminationThreshold: newValue });
      }
      if (engine && engine.calculateGhostScores) {
        engine.calculateGhostScores();
      }
    }
  }

  function init() {
    document.addEventListener('ghostScoresUpdated', function () {
      updateStats();
    });
    document.addEventListener('click', handleButtonClick);
    updateStats();
  }

  document.addEventListener('DOMContentLoaded', function () {
    init();
  });

  window.__ProofStats = { updateStats: updateStats };
})();
