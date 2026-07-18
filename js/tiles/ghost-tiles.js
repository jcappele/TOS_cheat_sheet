(function () {
  'use strict';

  var PROOF_ABBREVIATIONS = {
    thermal: 'T',
    audio: 'A',
    emf: 'E',
    radiation: 'R',
    uv: 'UV',
    writing: 'W'
  };

  var TRUST_SCORES = {
    Guaranteed: 100,
    Confident: 85,
    Mixed: 50,
    Unsure: 20,
    False: 0
  };

  var state = {
    ghostTiles: {},
    topGhosts: []
  };

  function renderGhostTiles() {
    var ghostsContainerInner = document.getElementById('ghostsContainerInner');
    if (!ghostsContainerInner) return;

    var ghostData = window.__ProofTrustEngine._getState ? window.__ProofTrustEngine._getState().ghostScores : [];
    if (!ghostData || ghostData.length === 0) {
      ghostsContainerInner.innerHTML = '<div class="ghosts-placeholder">Top 3 Ghosts — Coming Soon</div>';
      return;
    }

    var container = document.createElement('div');
    container.className = 'ghost-tiles-container';

    for (var i = 0; i < ghostData.length; i++) {
      var ghost = ghostData[i];
      var tile = createGhostTile(ghost, i < 3);
      container.appendChild(tile);
    }

    ghostsContainerInner.innerHTML = '';
    ghostsContainerInner.appendChild(container);
    state.ghostTiles = {};

    var tiles = container.querySelectorAll('.ghost-tile');
    for (var j = 0; j < tiles.length; j++) {
      var ghostId = tiles[j].getAttribute('data-ghost');
      state.ghostTiles[ghostId] = tiles[j];
    }
  }

  function createGhostTile(ghost, isTop) {
    var tile = document.createElement('div');
    tile.className = 'ghost-tile' + (isTop ? ' is-top' : '');
    tile.setAttribute('data-ghost', ghost.id);

    var header = document.createElement('div');
    header.className = 'ghost-tile-header';

    var name = document.createElement('div');
    name.className = 'ghost-name';
    name.textContent = ghost.name;
    header.appendChild(name);

    var proofLabels = document.createElement('div');
    proofLabels.className = 'ghost-proof-labels';
    if (ghost.data && ghost.data.proofs) {
      for (var p = 0; p < ghost.data.proofs.length; p++) {
        var proofType = ghost.data.proofs[p];
        var proofLabel = createProofLabel(proofType);
        proofLabels.appendChild(proofLabel);
      }
    }
    header.appendChild(proofLabels);
    tile.appendChild(header);

    var score = document.createElement('div');
    score.className = 'ghost-score';
    score.textContent = ghost.score + '%';
    score.setAttribute('data-score', ghost.score);
    var maxTrust = 'Unsure';
    if (ghost.proofBadges) {
      var proofTypes = ['thermal', 'audio', 'emf', 'radiation', 'uv', 'writing'];
      for (var p = 0; p < proofTypes.length; p++) {
        var proofType = proofTypes[p];
        if (ghost.proofBadges[proofType] && ghost.proofBadges[proofType].score > TRUST_SCORES[maxTrust]) {
          maxTrust = ghost.proofBadges[proofType].level;
        }
      }
    }
    score.classList.add('score-' + maxTrust.toLowerCase());
    tile.appendChild(score);

    var behaviors = document.createElement('div');
    behaviors.className = 'ghost-behaviors';
    if (ghost.data) {
      var behaviorLabels = createBehaviorLabels(ghost.data);
      for (var i = 0; i < behaviorLabels.length; i++) {
        behaviors.appendChild(behaviorLabels[i]);
      }
    }
    tile.appendChild(behaviors);

    return tile;
  }

  function createProofLabel(proofType) {
    var label = document.createElement('span');
    label.className = 'ghost-proof-label';
    label.textContent = getProofFullName(proofType);
    return label;
  }

  function createBehaviorLabels(ghostData) {
    var labels = [];
    var behaviors = ghostData.behaviors || {};

    if (ghostData.speed) {
      var speedLabel = document.createElement('span');
      speedLabel.className = 'ghost-behavior';
      var speedText = ghostData.speed === 'fast' ? 'Rapide' : ghostData.speed === 'slow' ? 'Lent' : 'Normal';
      speedLabel.textContent = 'Vitesse: ' + speedText;
      labels.push(speedLabel);
    }

    if (ghostData.cooldown) {
      var cdLabel = document.createElement('span');
      cdLabel.className = 'ghost-behavior';
      var cdText = ghostData.cooldown === 'short' ? 'Court' : ghostData.cooldown === 'long' ? 'Long' : 'Normal';
      cdLabel.textContent = 'Cooldown: ' + cdText;
      labels.push(cdLabel);
    }

    if (ghostData.holyWater) {
      var hwLabel = document.createElement('span');
      hwLabel.className = 'ghost-behavior';
      var hwText = ghostData.holyWater === 'more' ? '+ efficace' : ghostData.holyWater === '90s' ? '90s' : ghostData.holyWater === '2m' ? '2m portée' : 'Normale';
      hwLabel.textContent = 'Eau bénite: ' + hwText;
      labels.push(hwLabel);
    }

    if (behaviors.candles === 'extinguish') {
      var candleLabel = document.createElement('span');
      candleLabel.className = 'ghost-behavior';
      candleLabel.textContent = 'Bougies: Éteint';
      labels.push(candleLabel);
    }

    if (behaviors.lights === 'on-only') {
      var lightOnLabel = document.createElement('span');
      lightOnLabel.className = 'ghost-behavior';
      lightOnLabel.textContent = 'Lumières: On';
      labels.push(lightOnLabel);
    } else if (behaviors.lights === 'off-only') {
      var lightOffLabel = document.createElement('span');
      lightOffLabel.className = 'ghost-behavior';
      lightOffLabel.textContent = 'Lumières: Off';
      labels.push(lightOffLabel);
    }

    if (behaviors.doors === 'yes') {
      var doorLabel = document.createElement('span');
      doorLabel.className = 'ghost-behavior';
      doorLabel.textContent = 'Portes: Oui';
      labels.push(doorLabel);
    }

    return labels;
  }

  function createProofBadge(proofType, badgeData) {
    var badge = document.createElement('span');
    badge.className = 'proof-badge';
    badge.setAttribute('data-trust', badgeData.level);
    badge.setAttribute('data-proof', proofType);
    badge.textContent = PROOF_ABBREVIATIONS[proofType] || '?';
    badge.title = getProofFullName(proofType) + ': ' + badgeData.level;
    return badge;
  }

  function getProofFullName(proofType) {
    var names = {
      thermal: 'Thermal',
      audio: 'Audio',
      emf: 'EMF',
      radiation: 'Radiation',
      uv: 'UV',
      writing: 'Writing'
    };
    return names[proofType] || proofType;
  }

  function updateGhostScore(ghostId, score) {
    var tile = state.ghostTiles[ghostId];
    if (!tile) return;

    var scoreEl = tile.querySelector('.ghost-score');
    if (scoreEl) {
      scoreEl.textContent = score + '%';
      scoreEl.setAttribute('data-score', score);
    }
  }

  function updateProofBadge(proofType, trustLevel, trustScore) {
    var allBadges = document.querySelectorAll('.proof-badge[data-proof="' + proofType + '"]');
    for (var i = 0; i < allBadges.length; i++) {
      allBadges[i].setAttribute('data-trust', trustLevel);
      allBadges[i].title = getProofFullName(proofType) + ': ' + trustLevel;
    }
  }

  function highlightTopGhosts(top3) {
    var allTiles = document.querySelectorAll('.ghost-tile');
    for (var i = 0; i < allTiles.length; i++) {
      var ghostId = allTiles[i].getAttribute('data-ghost');
      var isTop = false;
      for (var j = 0; j < top3.length; j++) {
        if (top3[j].id === ghostId) {
          isTop = true;
          break;
        }
      }
      if (isTop) {
        allTiles[i].classList.add('is-top');
      } else {
        allTiles[i].classList.remove('is-top');
      }
    }
  }

  function reset() {
    state.ghostTiles = {};
    state.topGhosts = [];
    var ghostBar = document.getElementById('ghostBar');
    if (ghostBar) {
      ghostBar.innerHTML = '<span class="ghost-bar-empty">Top 3 Ghosts — Coming Soon</span>';
    }
  }

  function init() {
    document.addEventListener('ghostScoresUpdated', function (e) {
      state.topGhosts = e.detail.topGhosts;
      renderGhostTiles();
    });

    document.addEventListener('trustScoreUpdated', function (e) {
      updateProofBadge(e.detail.proofType, e.detail.level, e.detail.score);
    });

    document.addEventListener('globalReset', function () {
      reset();
    });

    renderGhostTiles();
  }

  window.__GhostTiles = {
    updateGhostScore: updateGhostScore,
    updateProofBadge: updateProofBadge,
    highlightTopGhosts: highlightTopGhosts,
    reset: reset,
    renderGhostTiles: renderGhostTiles
  };

  init();
})();
