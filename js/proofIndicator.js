(function () {
  'use strict';

  var PROOF_TYPES = ['thermal', 'audio', 'emf', 'radiation', 'uv', 'writing'];
  var INDICATOR_TEXTS = {
    high: 'Strong',
    medium: 'Moderate',
    low: 'Weak'
  };

  function updateIndicators(topGhosts) {
    for (var i = 0; i < PROOF_TYPES.length; i++) {
      var type = PROOF_TYPES[i];
      var indicator = document.getElementById(type + 'ProofIndicator');
      if (!indicator) continue;

      var score = window.__ProofTrustEngine.getProofScore(type);
      if (!score || score.score === 0) {
        indicator.className = 'proof-confidence-indicator hidden';
        indicator.textContent = '';
        continue;
      }

      var validCount = score.validCount || 0;
      var invalidCount = score.invalidCount || 0;
      var countLabel = '(' + validCount + 'V/' + invalidCount + 'F)';

      var level = score.score >= 70 ? 'high' : score.score >= 40 ? 'medium' : 'low';
      indicator.className = 'proof-confidence-indicator ' + level;
      indicator.textContent = INDICATOR_TEXTS[level] + ': ' + score.score + '% ' + countLabel;
    }
  }

  function init() {
    document.addEventListener('ghostScoresUpdated', function (e) {
      updateIndicators(e.detail.topGhosts);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    init();
  });

  window.__ProofIndicator = { updateIndicators: updateIndicators };
})();
