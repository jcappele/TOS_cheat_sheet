(function () {
  'use strict';

  function init() {
    var input = document.getElementById('eliminationThresholdInput');
    if (!input) return;

    var config = window.__ProofTrustEngine.getConfig();
    input.value = config.eliminationThreshold;

    input.addEventListener('input', function () {
      var value = parseInt(input.value, 10);
      if (!isNaN(value) && value >= 0 && value <= 100) {
        window.__ProofTrustEngine.setConfig({ eliminationThreshold: value });
        if (window.__ProofTrustEngine.calculateGhostScores) {
          window.__ProofTrustEngine.calculateGhostScores();
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    init();
  });

  window.__ProofConfig = { init: init };
})();
