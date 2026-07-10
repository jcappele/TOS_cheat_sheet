/* ============================================
   TOS CheatSheet - Behavioral Tiles Module
   ============================================ */

(function () {
  'use strict';

  var state = {
    selectedBehaviors: {},
    counts: {
      lightOn: 0,
      lightOff: 0,
      doors: 0,
      flxPod: 0,
      breaker: 0
    }
  };

  var BEHAVIOR_CONFIG = {
    candles: {
      exclusive: true,
      buttons: [
        { value: 'one', label: 'One' },
        { value: 'multiple', label: 'Multiple' }
      ]
    },
    radio: {
      exclusive: false,
      buttons: [
        { value: 'on', label: 'On' },
        { value: 'off', label: 'Off' }
      ]
    },
    doors: {
      exclusive: false,
      buttons: [
        { value: 'increment', label: '+1' },
        { value: 'decrement', label: '-1' }
      ],
      isCounter: true
    },
    cooldown: {
      exclusive: true,
      buttons: [
        { value: '40', label: '40s' },
        { value: '60', label: '60s' },
        { value: '90', label: '90s' }
      ]
    },
    'holywater-cooldown': {
      exclusive: true,
      buttons: [
        { value: '3', label: '3s' },
        { value: '5', label: '5s' }
      ]
    },
    speed: {
      exclusive: true,
      buttons: [
        { value: 'normal', label: 'Normal' },
        { value: 'fast', label: 'Fast' }
      ]
    },
    'speed-los': {
      exclusive: true,
      buttons: [
        { value: 'slow', label: 'Slow' },
        { value: 'normal', label: 'Normal' },
        { value: 'fast', label: 'Fast' }
      ]
    },
    'range-los': {
      exclusive: true,
      buttons: [
        { value: 'low', label: 'Low' },
        { value: 'normal', label: 'Normal' },
        { value: 'high', label: 'High' },
        { value: 'very-high', label: 'Very High' }
      ]
    },
    'flx-pod': {
      exclusive: false,
      buttons: [
        { value: 'increment', label: '+1' },
        { value: 'decrement', label: '-1' }
      ],
      isCounter: true
    },
    breaker: {
      exclusive: false,
      buttons: [
        { value: 'increment', label: '+1' },
        { value: 'decrement', label: '-1' }
      ],
      isCounter: true
    },
    'light-on': {
      exclusive: false,
      buttons: [
        { value: 'increment', label: '+1' },
        { value: 'decrement', label: '-1' }
      ],
      isCounter: true
    },
    'light-off': {
      exclusive: false,
      buttons: [
        { value: 'increment', label: '+1' },
        { value: 'decrement', label: '-1' }
      ],
      isCounter: true
    }
  };

  function createBehaviorButton(config, behaviorType) {
    var button = document.createElement('button');
    button.className = 'behavior-btn';
    button.textContent = config.label;
    button.setAttribute('data-value', config.value);
    button.setAttribute('data-behavior', behaviorType);
    button.setAttribute('aria-label', 'Behavior: ' + behaviorType + ' - ' + config.label);

    button.addEventListener('click', function () {
      var tile = button.closest('.behavior-tile');
      var config = BEHAVIOR_CONFIG[behaviorType];
      var buttons = tile.querySelectorAll('.behavior-btn');
      var btnValue = button.getAttribute('data-value');

      if (config && config.isCounter) {
        var countKey = getCountKey(behaviorType);
        if (btnValue === 'increment') {
          state.counts[countKey]++;
        } else {
          if (state.counts[countKey] > 0) {
            state.counts[countKey]--;
          }
        }
        var countDisplay = tile.querySelector('.behavior-count');
        if (countDisplay) {
          countDisplay.textContent = state.counts[countKey];
        }
        localStorage.setItem('tos-cheatsheet-' + countKey + '-count', state.counts[countKey]);
        return;
      }

      if (config && config.exclusive) {
        var alreadySelected = button.classList.contains('behavior-btn-selected');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove('behavior-btn-selected');
        }
        if (!alreadySelected) {
          button.classList.add('behavior-btn-selected');
          state.selectedBehaviors[behaviorType] = btnValue;
        } else {
          delete state.selectedBehaviors[behaviorType];
        }
      } else {
        if (button.classList.contains('behavior-btn-selected')) {
          button.classList.remove('behavior-btn-selected');
          delete state.selectedBehaviors[behaviorType];
        } else {
          button.classList.add('behavior-btn-selected');
          if (!state.selectedBehaviors[behaviorType]) {
            state.selectedBehaviors[behaviorType] = [];
          }
          if (Array.isArray(state.selectedBehaviors[behaviorType])) {
            var arr = state.selectedBehaviors[behaviorType];
            var idx = arr.indexOf(btnValue);
            if (idx === -1) {
              arr.push(btnValue);
            }
          } else {
            state.selectedBehaviors[behaviorType] = [btnValue];
          }
        }
      }

      if (window.__ProofTrustEngine && window.__ProofTrustEngine.applyBehaviorFilter) {
        window.__ProofTrustEngine.applyBehaviorFilter(state.selectedBehaviors);
      }
    });

    return button;
  }

  function getCountKey(behaviorType) {
    if (behaviorType === 'light-on') return 'lightOn';
    if (behaviorType === 'light-off') return 'lightOff';
    if (behaviorType === 'doors') return 'doors';
    if (behaviorType === 'flx-pod') return 'flxPod';
    if (behaviorType === 'breaker') return 'breaker';
    return 'lightOn';
  }

  function renderBehaviorTile(behaviorType) {
    console.log('[BehaviorTiles] renderBehaviorTile:', behaviorType);
    var config = BEHAVIOR_CONFIG[behaviorType];
    console.log('[BehaviorTiles] config:', config);
    if (!config) return null;

    var tile = document.querySelector('#behaviorTilesContainer .behavior-tile[data-behavior="' + behaviorType + '"]');
    console.log('[BehaviorTiles] tile:', tile);
    if (!tile) return null;

    var container = tile.querySelector('.behavior-btn-group');
    console.log('[BehaviorTiles] container:', container);
    if (!container) return null;

    if (config.isCounter) {
      var existingCount = tile.querySelector('.behavior-count');
      if (!existingCount) {
        var countDisplay = document.createElement('div');
        countDisplay.className = 'behavior-count';
        var countKey = getCountKey(behaviorType);
        countDisplay.textContent = state.counts[countKey] || 0;
        tile.insertBefore(countDisplay, container);
      } else {
        var countKey2 = getCountKey(behaviorType);
        existingCount.textContent = state.counts[countKey2] || 0;
      }
    }

    console.log('[BehaviorTiles] buttons count:', config.buttons.length);
    for (var i = 0; i < config.buttons.length; i++) {
      console.log('[BehaviorTiles] creating button', i, config.buttons[i]);
      var button = createBehaviorButton(config.buttons[i], behaviorType);
      console.log('[BehaviorTiles] button element:', button);
      container.appendChild(button);
      console.log('[BehaviorTiles] after append, container children:', container.children.length);
    }

    return tile;
  }

  function renderAllBehaviorTiles() {
    var behaviorTypes = Object.keys(BEHAVIOR_CONFIG);
    console.log('[BehaviorTiles] renderAllBehaviorTiles - types:', behaviorTypes);
    for (var i = 0; i < behaviorTypes.length; i++) {
      var result = renderBehaviorTile(behaviorTypes[i]);
      console.log('[BehaviorTiles] result for', behaviorTypes[i], ':', result);
    }
  }

  function getSelectedBehaviors() {
    return state.selectedBehaviors;
  }

  function reset() {
    state.selectedBehaviors = {};
    state.counts.lightOn = 0;
    state.counts.lightOff = 0;
    state.counts.doors = 0;
    state.counts.flxPod = 0;
    state.counts.breaker = 0;
    localStorage.setItem('tos-cheatsheet-lightOn-count', 0);
    localStorage.setItem('tos-cheatsheet-lightOff-count', 0);
    localStorage.setItem('tos-cheatsheet-doors-count', 0);
    localStorage.setItem('tos-cheatsheet-flxPod-count', 0);
    localStorage.setItem('tos-cheatsheet-breaker-count', 0);
    var buttons = document.querySelectorAll('.behavior-btn-selected');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('behavior-btn-selected');
    }
  }

  document.addEventListener('globalReset', function () {
    if (window.__BehaviorTiles && window.__BehaviorTiles.reset) {
      window.__BehaviorTiles.reset();
    }
  });

  function loadCounts() {
    try {
      var lightOn = localStorage.getItem('tos-cheatsheet-lightOn-count');
      var lightOff = localStorage.getItem('tos-cheatsheet-lightOff-count');
      var doors = localStorage.getItem('tos-cheatsheet-doors-count');
      var flxPod = localStorage.getItem('tos-cheatsheet-flxPod-count');
      var breaker = localStorage.getItem('tos-cheatsheet-breaker-count');
      if (lightOn !== null) state.counts.lightOn = parseInt(lightOn, 10) || 0;
      if (lightOff !== null) state.counts.lightOff = parseInt(lightOff, 10) || 0;
      if (doors !== null) state.counts.doors = parseInt(doors, 10) || 0;
      if (flxPod !== null) state.counts.flxPod = parseInt(flxPod, 10) || 0;
      if (breaker !== null) state.counts.breaker = parseInt(breaker, 10) || 0;
    } catch (e) {
      state.counts.lightOn = 0;
      state.counts.lightOff = 0;
      state.counts.doors = 0;
      state.counts.flxPod = 0;
      state.counts.breaker = 0;
    }
  }

  function init() {
    loadCounts();
    renderAllBehaviorTiles();
  }

  window.__BehaviorTiles = {
    init: init,
    getSelectedBehaviors: getSelectedBehaviors,
    reset: reset,
    BEHAVIOR_CONFIG: BEHAVIOR_CONFIG
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
