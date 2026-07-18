(function () {
  'use strict';

  var TRUST_LEVELS = {
    GUARANTEED: 'Guaranteed',
    CONFIDENT: 'Confident',
    MIXED: 'Mixed',
    UNSURE: 'Unsure',
    FALSE: 'False'
  };

  var TRUST_SCORES = {
    Guaranteed: 100,
    Confident: 85,
    Mixed: 50,
    Unsure: 20,
    False: 0
  };

  var CONFIG = {
    eliminationThreshold: 50
  };

  var GHOST_DATA = {
    banshee: {
      proofs: ['audio', 'emf', 'radiation'],
      name: 'Banshee',
      behaviors: { candles: 'extinguish', lights: 'on-off', radio: 'on-off', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'normal',
      speed: 'normal',
      speedLOS: 'normal',
      losRange: 'normal',
      tags: ['extinguish', 'lights-on', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-normal']
    },
    bhoot: {
      proofs: ['thermal', 'radiation', 'writing'],
      name: 'Bhoot',
      behaviors: { candles: 'extinguish', lights: 'on-off', radio: 'on-off', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'long',
      speed: 'normal',
      speedLOS: 'normal',
      losRange: 'normal',
      tags: ['extinguish', 'lights-on', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-normal', 'cooldown-long']
    },
    demon: {
      proofs: ['radiation', 'uv', 'writing'],
      name: 'Demon',
      behaviors: { candles: 'extinguish', lights: 'off-only', radio: 'on-off', doors: 'yes' },
      holyWater: 'more',
      cooldown: 'short',
      speed: 'fast',
      speedLOS: 'slow',
      losRange: 'low',
      tags: ['extinguish', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-more', 'cooldown-short', 'speed-fast', 'los-slow', 'los-low']
    },
    doppelganger: {
      proofs: ['audio', 'uv', 'writing'],
      name: 'Doppelganger',
      behaviors: { candles: 'extinguish', lights: 'on-off', radio: 'on-off', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'normal',
      speed: 'normal',
      speedLOS: 'normal',
      losRange: 'low',
      tags: ['extinguish', 'lights-on', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-normal', 'los-low']
    },
    iblis: {
      proofs: ['audio', 'thermal', 'writing'],
      name: 'Iblis',
      behaviors: { candles: 'extinguish', lights: 'on-off', radio: 'on-off', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'normal',
      speed: 'fast',
      speedLOS: 'normal',
      losRange: 'normal',
      tags: ['extinguish', 'lights-on', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-normal', 'speed-fast']
    },
    phantom: {
      proofs: ['audio', 'radiation', 'uv'],
      name: 'Phantom',
      behaviors: { candles: 'ignore', lights: 'on-off', radio: 'off-only', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'normal',
      speed: 'normal',
      speedLOS: 'normal',
      losRange: 'normal',
      tags: ['candles-ignore', 'flx-ignore', 'lights-on', 'lights-off', 'doors', 'radio-off', 'shadow-only', 'spray-normal']
    },
    poltergeist: {
      proofs: ['emf', 'radiation', 'writing'],
      name: 'Poltergeist',
      behaviors: { candles: 'extinguish', lights: 'on-off', radio: 'on-off', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'normal',
      speed: 'normal',
      speedLOS: 'medium',
      losRange: 'normal',
      tags: ['extinguish', 'lights-on', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-normal']
    },
    revenant: {
      proofs: ['emf', 'uv', 'writing'],
      name: 'Revenant',
      behaviors: { candles: 'extinguish', lights: 'on-off', radio: 'on-off', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'normal',
      speed: 'normal',
      speedLOS: 'normal',
      losRange: 'normal',
      tags: ['extinguish', 'lights-on', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-normal']
    },
    shura: {
      proofs: ['emf', 'thermal', 'writing'],
      name: 'Shura',
      behaviors: { candles: 'extinguish', lights: 'on-off', radio: 'on-off', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'short',
      speed: 'fast',
      speedLOS: 'fast',
      losRange: 'high',
      tags: ['extinguish', 'lights-on', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-normal', 'cooldown-short', 'speed-fast', 'los-fast', 'los-high']
    },
    skia: {
      proofs: ['audio', 'emf', 'uv'],
      name: 'Skia',
      behaviors: { candles: 'ignore', lights: 'on-off', radio: 'on-off', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'long',
      speed: 'fast',
      speedLOS: 'variable',
      losRange: 'normal',
      tags: ['candles-ignore', 'flx-ignore', 'lights-on', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-normal', 'cooldown-long', 'speed-fast', 'los-variable']
    },
    strigoi: {
      proofs: ['thermal', 'uv', 'writing'],
      name: 'Strigoi',
      behaviors: { candles: 'ignore', lights: 'on-off', radio: 'on-only', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'normal',
      speed: 'fast',
      speedLOS: 'medium',
      losRange: 'normal',
      tags: ['candles-ignore', 'lights-on', 'lights-off', 'doors', 'radio-on', 'shadow-only', 'spray-normal', 'speed-fast']
    },
    tantalus: {
      proofs: ['emf', 'thermal', 'uv'],
      name: 'Tantalus',
      behaviors: { candles: 'extinguish', lights: 'on-off', radio: 'on-off', doors: 'no' },
      holyWater: 'normal',
      cooldown: 'normal',
      speed: 'fast',
      speedLOS: 'medium',
      losRange: 'normal',
      tags: ['extinguish', 'flx-ignore', 'no-doors', 'lights-on', 'lights-off', 'radio-on', 'radio-off', 'spray-normal', 'speed-fast']
    },
    tariaksuq: {
      proofs: ['audio', 'emf', 'thermal'],
      name: 'Tariaksuq',
      behaviors: { candles: 'extinguish', lights: 'off-only', radio: 'on-off', doors: 'yes' },
      holyWater: '90s',
      cooldown: 'normal',
      speed: 'normal',
      speedLOS: 'normal',
      losRange: 'normal',
      tags: ['extinguish', 'lights-off', 'doors', 'radio-on', 'radio-off', 'shadow-only', 'spray-normal', 'spray-90s']
    },
    'the-echo': {
      proofs: ['thermal', 'radiation', 'uv'],
      name: 'The Echo',
      behaviors: { candles: 'ignore', lights: 'ignore', radio: 'ignore', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'normal',
      speed: 'normal',
      speedLOS: 'normal',
      losRange: 'normal',
      tags: ['candles-ignore', 'lights-ignore', 'radio-ignore', 'flx-ignore', 'doors', 'no-breaker', 'spray-normal']
    },
    'the-forgotten': {
      proofs: ['emf', 'radiation', 'uv'],
      name: 'The Forgotten',
      behaviors: { candles: 'extinguish', lights: 'on-off', radio: 'on-off', doors: 'yes' },
      holyWater: 'normal',
      cooldown: 'normal',
      speed: 'fast',
      speedLOS: 'medium',
      losRange: 'normal',
      tags: ['extinguish', 'flx-ignore', 'lights-on', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-normal', 'speed-fast']
    },
    'wewe-gombel': {
      proofs: ['emf', 'thermal', 'radiation'],
      name: 'Wewe Gombel',
      behaviors: { candles: 'extinguish', lights: 'off-only', radio: 'on-off', doors: 'yes' },
      holyWater: 'more',
      cooldown: 'short',
      speed: 'normal',
      speedLOS: 'fast',
      losRange: 'normal',
      tags: ['extinguish', 'lights-off', 'doors', 'radio-on', 'radio-off', 'no-breaker', 'spray-more', 'cooldown-short', 'los-fast']
    },
    wisp: {
      proofs: ['audio', 'thermal', 'radiation'],
      name: 'Wisp',
      behaviors: { candles: 'ignore', lights: 'on-only', radio: 'on-off', doors: 'yes' },
      holyWater: '2m',
      cooldown: 'normal',
      speed: 'fast',
      speedLOS: 'medium',
      losRange: 'normal',
      tags: ['candles-ignore', 'lights-on', 'doors', 'radio-on', 'radio-off', 'spray-more', 'spray-2m', 'speed-fast']
    },
    wraith: {
      proofs: ['audio', 'thermal', 'uv'],
      name: 'Wraith',
      behaviors: { candles: 'extinguish', lights: 'on-off', radio: 'on-off', doors: 'yes' },
      holyWater: 'more',
      cooldown: 'normal',
      speed: 'fast',
      speedLOS: 'fast',
      losRange: 'very-high',
      tags: ['extinguish', 'lights-on', 'lights-off', 'doors', 'radio-on', 'radio-off', 'spray-more', 'speed-fast', 'los-fast', 'los-very-high']
    }
  };

  var state = {
    proofData: {},
    trustScores: {},
    ghostScores: [],
    currentTime: 0
  };

  var PROOF_MIN_LEVELS = {
    thermal: 3,
    audio: 3,
    emf: 4,
    radiation: 3,
    uv: 3,
    writing: 3
  };

  var PROOF_MIN_POINTS = {
    thermal: 3,
    audio: 3,
    emf: 4,
    radiation: 3,
    uv: 3,
    writing: 3
  };

  function initProofData() {
    var proofTypes = ['thermal', 'audio', 'emf', 'radiation', 'uv', 'writing'];
    for (var i = 0; i < proofTypes.length; i++) {
      var type = proofTypes[i];
      if (!state.proofData[type]) {
        state.proofData[type] = { points: [], maxLevel: 0, validCount: 0, invalidCount: 0 };
      }
      if (!state.trustScores[type]) {
        state.trustScores[type] = { level: TRUST_LEVELS.UNSURE, score: 0, validCount: 0, invalidCount: 0 };
      }
    }
  }

  function registerProof(type, points, maxLevel) {
    initProofData();
    state.proofData[type] = { points: points, maxLevel: maxLevel, validCount: 0, invalidCount: 0 };
    countProofs(type);
    calculateTrustScore(type);
    calculateGhostScores();
  }

  function countProofs(type) {
    var data = state.proofData[type];
    if (!data || !data.points) return;
    var minLevel = PROOF_MIN_LEVELS[type] || 3;
    var validCount = 0;
    var invalidCount = 0;
    for (var i = 0; i < data.points.length; i++) {
      if (data.points[i].level >= minLevel) {
        validCount++;
      } else {
        invalidCount++;
      }
    }
    data.validCount = validCount;
    data.invalidCount = invalidCount;
  }

  function calculateTrustScore(proofType) {
    var data = state.proofData[proofType];
    if (!data || !data.points || data.points.length === 0) {
      state.trustScores[proofType] = { level: TRUST_LEVELS.UNSURE, score: 0, validCount: 0, invalidCount: 0 };
      return state.trustScores[proofType];
    }

    countProofs(proofType);

    var result;

    switch (proofType) {
      case 'thermal':
        result = calculateThermalTrust(data.points, data.maxLevel);
        break;
      case 'emf':
        result = calculateEmfTrust(data.points, data.maxLevel);
        break;
      default:
        result = calculateStandardProofTrust(data.points, data.maxLevel);
        break;
    }

    if (!result.validCount) result.validCount = data.validCount || 0;
    if (!result.invalidCount) result.invalidCount = data.invalidCount || 0;

    state.trustScores[proofType] = result;

    document.dispatchEvent(new CustomEvent('trustScoreUpdated', {
      detail: { proofType: proofType, score: result.score, level: result.level, validCount: result.validCount, invalidCount: result.invalidCount }
    }));

    return result;
  }

  function calculateThermalTrust(points, maxLevel) {
    var data = state.proofData['thermal'];
    var validCount = data ? data.validCount : 0;
    var invalidCount = data ? data.invalidCount : 0;

    var hasFreezing = false;
    for (var i = 0; i < points.length; i++) {
      if (points[i].level >= 3) {
        hasFreezing = true;
        break;
      }
    }
    if (hasFreezing && invalidCount === 0) {
      return { level: TRUST_LEVELS.GUARANTEED, score: TRUST_SCORES.Guaranteed, validCount: validCount, invalidCount: invalidCount };
    }
    if (hasFreezing && invalidCount > 0) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(70 * ratio);
      return { level: ratio >= 0.5 ? TRUST_LEVELS.CONFIDENT : TRUST_LEVELS.UNSURE, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    var mesuresNiveau4 = [];
    var mesuresNiveau3 = [];
    for (var j = 0; j < points.length; j++) {
      if (points[j].level === 4) {
        mesuresNiveau4.push(points[j]);
      }
      if (points[j].level === 3) {
        mesuresNiveau3.push(points[j]);
      }
    }

    if (mesuresNiveau4.length >= 5) {
      return { level: TRUST_LEVELS.GUARANTEED, score: TRUST_SCORES.Guaranteed, validCount: validCount, invalidCount: invalidCount };
    }

    if (mesuresNiveau4.length >= 3 && isStable(mesuresNiveau4)) {
      return { level: TRUST_LEVELS.GUARANTEED, score: TRUST_SCORES.Guaranteed, validCount: validCount, invalidCount: invalidCount };
    }

    if (mesuresNiveau4.length >= 3) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 85, validCount: validCount, invalidCount: invalidCount };
    }

    if (mesuresNiveau3.length >= 3 && isStable(mesuresNiveau3)) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 85, validCount: validCount, invalidCount: invalidCount };
    }

    if (mesuresNiveau3.length >= 3) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 70, validCount: validCount, invalidCount: invalidCount };
    }

    if (mesuresNiveau4.length >= 2 || mesuresNiveau3.length >= 2) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(70 * ratio);
      return { level: ratio >= 0.5 ? TRUST_LEVELS.MIXED : TRUST_LEVELS.UNSURE, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 1) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(70 * ratio);
      return { level: ratio >= 0.5 ? TRUST_LEVELS.CONFIDENT : TRUST_LEVELS.UNSURE, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    return { level: TRUST_LEVELS.FALSE, score: TRUST_SCORES.False, validCount: validCount, invalidCount: invalidCount };
  }

  function calculateEmfTrust(points, maxLevel) {
    var data = state.proofData['emf'];
    var validCount = data ? data.validCount : 0;
    var invalidCount = data ? data.invalidCount : 0;

    var hasMaxLevel = false;
    for (var i = 0; i < points.length; i++) {
      if (points[i].level === 5) {
        hasMaxLevel = true;
        break;
      }
    }
    if (hasMaxLevel) {
      return { level: TRUST_LEVELS.GUARANTEED, score: TRUST_SCORES.Guaranteed, validCount: validCount, invalidCount: invalidCount };
    }

    var mesuresNiveau5 = [];
    var mesuresNiveau4 = [];
    for (var j = 0; j < points.length; j++) {
      if (points[j].level === 5) {
        mesuresNiveau5.push(points[j]);
      }
      if (points[j].level === 4) {
        mesuresNiveau4.push(points[j]);
      }
    }

    if (mesuresNiveau5.length >= 5) {
      return { level: TRUST_LEVELS.GUARANTEED, score: TRUST_SCORES.Guaranteed, validCount: validCount, invalidCount: invalidCount };
    }

    if (mesuresNiveau5.length >= 3 && isStable(mesuresNiveau5)) {
      return { level: TRUST_LEVELS.GUARANTEED, score: TRUST_SCORES.Guaranteed, validCount: validCount, invalidCount: invalidCount };
    }

    if (mesuresNiveau4.length >= 4) {
      return { level: TRUST_LEVELS.GUARANTEED, score: TRUST_SCORES.Guaranteed, validCount: validCount, invalidCount: invalidCount };
    }

    if (mesuresNiveau4.length >= 3 && isStable(mesuresNiveau4)) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 85, validCount: validCount, invalidCount: invalidCount };
    }

    if (mesuresNiveau4.length >= 3) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(70 * ratio);
      return { level: ratio >= 0.5 ? TRUST_LEVELS.CONFIDENT : TRUST_LEVELS.MIXED, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    if (mesuresNiveau4.length >= 2) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(70 * ratio);
      return { level: ratio >= 0.5 ? TRUST_LEVELS.CONFIDENT : TRUST_LEVELS.MIXED, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 1) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(70 * ratio);
      return { level: ratio >= 0.5 ? TRUST_LEVELS.CONFIDENT : TRUST_LEVELS.UNSURE, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    return { level: TRUST_LEVELS.FALSE, score: TRUST_SCORES.False, validCount: validCount, invalidCount: invalidCount };
  }

  function calculateStandardProofTrust(points, maxLevel) {
    var proofType = null;
    for (var type in PROOF_MIN_LEVELS) {
      if (PROOF_MIN_LEVELS[type] === maxLevel && type !== 'thermal' && type !== 'emf') {
        proofType = type;
        break;
      }
    }
    var data = proofType ? state.proofData[proofType] : null;
    var validCount = data ? data.validCount : 0;
    var invalidCount = data ? data.invalidCount : 0;

    var mesuresParNiveau = {};
    for (var k = 1; k <= maxLevel; k++) {
      mesuresParNiveau[k] = [];
    }

    for (var i = 0; i < points.length; i++) {
      var level = points[i].level;
      if (level in mesuresParNiveau) {
        mesuresParNiveau[level].push(points[i]);
      }
    }

    var mesuresMax = mesuresParNiveau[maxLevel] || [];
    var mesuresMaxMoins1 = mesuresParNiveau[maxLevel - 1] || [];

    if (validCount === 0) {
      return { level: TRUST_LEVELS.FALSE, score: TRUST_SCORES.False, validCount: validCount, invalidCount: invalidCount };
    }

    if (isDecreasing(points)) {
      if (mesuresMax.length === 0 && mesuresMaxMoins1.length === 0) {
        return { level: TRUST_LEVELS.FALSE, score: TRUST_SCORES.False, validCount: validCount, invalidCount: invalidCount };
      }
      if (mesuresMax.length >= 3) {
        var ratio = validCount / (validCount + invalidCount);
        var score = Math.round(55 * ratio);
        return { level: ratio >= 0.5 ? TRUST_LEVELS.MIXED : TRUST_LEVELS.UNSURE, score: score, validCount: validCount, invalidCount: invalidCount };
      }
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(40 * ratio);
      return { level: ratio >= 0.5 ? TRUST_LEVELS.UNSURE : TRUST_LEVELS.FALSE, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 3 && invalidCount === 0) {
      return { level: TRUST_LEVELS.GUARANTEED, score: TRUST_SCORES.Guaranteed, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 3 && invalidCount === 1) {
      return { level: TRUST_LEVELS.GUARANTEED, score: 95, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 3 && invalidCount === 2) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 85, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 3 && invalidCount === 3) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 70, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 3 && isStable(mesuresMax)) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 85, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 2 && invalidCount === 0) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 85, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 2 && invalidCount === 1 && isStable(mesuresMax)) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 85, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 2 && invalidCount === 1) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 70, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 2 && invalidCount === 2) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(55 * ratio);
      return { level: TRUST_LEVELS.MIXED, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 2 && invalidCount === 3) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(40 * ratio);
      return { level: TRUST_LEVELS.UNSURE, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 1 && invalidCount === 0) {
      return { level: TRUST_LEVELS.CONFIDENT, score: 70, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 1 && invalidCount === 1) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(50 * ratio);
      return { level: TRUST_LEVELS.MIXED, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 1 && invalidCount === 2) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(35 * ratio);
      return { level: TRUST_LEVELS.UNSURE, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    if (validCount >= 1 && invalidCount === 3) {
      var ratio = validCount / (validCount + invalidCount);
      var score = Math.round(25 * ratio);
      return { level: TRUST_LEVELS.UNSURE, score: score, validCount: validCount, invalidCount: invalidCount };
    }

    return { level: TRUST_LEVELS.UNSURE, score: TRUST_SCORES.Unsure, validCount: validCount, invalidCount: invalidCount };
  }

  function isDecreasing(points) {
    if (points.length < 2) {
      return false;
    }

    var lastLevel = points[points.length - 1].level;
    var firstLevel = points[0].level;

    return lastLevel < firstLevel;
  }

  function isStable(measures) {
    if (measures.length < 2) {
      return false;
    }

    var times = [];
    for (var i = 0; i < measures.length; i++) {
      times.push(measures[i].time);
    }
    times.sort(function (a, b) { return a - b; });

    var intervals = [];
    for (var j = 1; j < times.length; j++) {
      intervals.push(times[j] - times[j - 1]);
    }

    var mean = intervals.reduce(function (sum, val) { return sum + val; }, 0) / intervals.length;
    var variance = intervals.reduce(function (sum, val) { return sum + Math.pow(val - mean, 2); }, 0) / intervals.length;
    var stdDev = Math.sqrt(variance);

    return stdDev < 120;
  }

  function isStableProof(points, maxLevel) {
    for (var i = 0; i < points.length; i++) {
      if (points[i].level !== maxLevel) {
        return false;
      }
    }
    return points.length >= 2;
  }

  function isDecreasingProof(points) {
    if (points.length < 2) {
      return false;
    }
    var lastLevel = points[points.length - 1].level;
    var firstLevel = points[0].level;
    return lastLevel < firstLevel;
  }

  function calculateProofScore(proofType) {
    var trust = calculateTrustScore(proofType);
    return { level: trust.level, score: trust.score, validCount: trust.validCount, invalidCount: trust.invalidCount };
  }

  function calculateGhostScores() {
    var validProofsCount = 0;
    var totalWeight = 0;
    var proofWeights = {};
    var proofScores = {};

    var proofTypes = ['thermal', 'audio', 'emf', 'radiation', 'uv', 'writing'];
    for (var i = 0; i < proofTypes.length; i++) {
      var type = proofTypes[i];
      var score = calculateProofScore(type);
      proofScores[type] = score;
      if (score.score >= CONFIG.eliminationThreshold) {
        proofWeights[type] = score.score;
        validProofsCount++;
        totalWeight += score.score;
      } else {
        proofWeights[type] = 0;
      }
    }

    if (totalWeight === 0) {
      state.ghostScores = [];
      for (var ghostId in GHOST_DATA) {
        var g = GHOST_DATA[ghostId];
        state.ghostScores.push({
          id: ghostId,
          name: g.name,
          score: 0,
          proofBadges: {},
          data: g
        });
      }
      emitGhostScores();
      return;
    }

    var scores = [];
    for (var ghostId in GHOST_DATA) {
      var ghost = GHOST_DATA[ghostId];
      var ghostScore = 0;
      var proofBadges = {};
      var ghostValidProofs = 0;

      for (var p = 0; p < ghost.proofs.length; p++) {
        var proofType = ghost.proofs[p];
        var score = proofScores[proofType] || { level: TRUST_LEVELS.UNSURE, score: 0 };
        var badge = { type: proofType, level: score.level, score: score.score };
        proofBadges[proofType] = badge;

        if (score.score >= CONFIG.eliminationThreshold) {
          ghostScore += score.score;
          ghostValidProofs++;
        }
      }

      if (ghostValidProofs > 0) {
        ghostScore = (ghostScore / (ghostValidProofs * 100)) * validProofsCount / proofTypes.length * 100;
      }

      scores.push({
        id: ghostId,
        name: ghost.name,
        score: Math.round(ghostScore),
        proofBadges: proofBadges,
        data: ghost
      });
    }

    scores.sort(function (a, b) { return b.score - a.score; });
    state.ghostScores = scores;

    emitGhostScores();
  }

  function emitGhostScores() {
    var totalValid = 0;
    var totalInvalid = 0;
    var proofTypes = ['thermal', 'audio', 'emf', 'radiation', 'uv', 'writing'];
    for (var i = 0; i < proofTypes.length; i++) {
      var type = proofTypes[i];
      var data = state.proofData[type];
      if (data) {
        totalValid += data.validCount || 0;
        totalInvalid += data.invalidCount || 0;
      }
    }
    document.dispatchEvent(new CustomEvent('ghostScoresUpdated', {
      detail: { topGhosts: state.ghostScores.slice(0, 3), validProofs: totalValid, invalidProofs: totalInvalid }
    }));
  }

  function getTopGhosts(count) {
    count = count || 3;
    return state.ghostScores.slice(0, count);
  }

  function getProofTrustLevel(proofType) {
    return state.trustScores[proofType] || { level: TRUST_LEVELS.UNSURE, score: 0 };
  }

  function applyBehaviorFilter(selectedBehaviors) {
    if (!selectedBehaviors || Object.keys(selectedBehaviors).length === 0) {
      calculateGhostScores();
      return;
    }

    var validProofsCount = 0;
    var totalWeight = 0;
    var proofWeights = {};
    var proofTypes = ['thermal', 'audio', 'emf', 'radiation', 'uv', 'writing'];

    for (var i = 0; i < proofTypes.length; i++) {
      var type = proofTypes[i];
      var trust = state.trustScores[type];
      if (trust && trust.level !== TRUST_LEVELS.FALSE) {
        proofWeights[type] = trust.score;
        validProofsCount++;
        totalWeight += trust.score;
      } else {
        proofWeights[type] = 0;
      }
    }

    if (totalWeight === 0) {
      state.ghostScores = [];
      for (var ghostId in GHOST_DATA) {
        var g = GHOST_DATA[ghostId];
        state.ghostScores.push({
          id: ghostId,
          name: g.name,
          score: 0,
          proofBadges: {},
          data: g
        });
      }
      emitGhostScores();
      return;
    }

    var scores = [];
    for (var ghostId in GHOST_DATA) {
      var ghost = GHOST_DATA[ghostId];
      var ghostScore = 0;
      var proofBadges = {};
      var ghostValidProofs = 0;

      for (var p = 0; p < ghost.proofs.length; p++) {
        var proofType = ghost.proofs[p];
        var trust = state.trustScores[proofType];
        var badge = { type: proofType, level: trust ? trust.level : TRUST_LEVELS.UNSURE, score: trust ? trust.score : 0 };
        proofBadges[proofType] = badge;

        if (trust && trust.level !== TRUST_LEVELS.FALSE) {
          ghostScore += trust.score;
          ghostValidProofs++;
        }
      }

      if (ghostValidProofs > 0) {
        ghostScore = (ghostScore / (ghostValidProofs * 100)) * validProofsCount / proofTypes.length * 100;
      }

      var behaviorMultiplier = 1;
      var behaviors = ghost.behaviors || {};

      if (selectedBehaviors.candles && behaviors.candles) {
        if (selectedBehaviors.candles === 'one' && behaviors.candles !== 'extinguish') {
          behaviorMultiplier *= 0.1;
        }
        if (selectedBehaviors.candles === 'multiple' && behaviors.candles !== 'extinguish') {
          behaviorMultiplier *= 0.1;
        }
      }

      if (selectedBehaviors.radio) {
        var radioSelected = selectedBehaviors.radio;
        if (Array.isArray(radioSelected)) {
          if (radioSelected.indexOf('on') !== -1 && behaviors.radio !== 'on-only' && behaviors.radio !== 'on-off') {
            behaviorMultiplier *= 0.1;
          }
          if (radioSelected.indexOf('off') !== -1 && behaviors.radio !== 'off-only' && behaviors.radio !== 'on-off') {
            behaviorMultiplier *= 0.1;
          }
        } else {
          if (radioSelected === 'on' && behaviors.radio !== 'on-only' && behaviors.radio !== 'on-off') {
            behaviorMultiplier *= 0.1;
          }
          if (radioSelected === 'off' && behaviors.radio !== 'off-only' && behaviors.radio !== 'on-off') {
            behaviorMultiplier *= 0.1;
          }
        }
      }

      if (selectedBehaviors.doors && behaviors.doors) {
        if (selectedBehaviors.doors === 'yes' && behaviors.doors !== 'yes') {
          behaviorMultiplier *= 0.1;
        }
      }

      if (selectedBehaviors.cooldown && ghost.cooldown) {
        var cooldownMap = { '40': 'short', '60': 'normal', '90': 'long' };
        if (selectedBehaviors.cooldown !== cooldownMap[ghost.cooldown]) {
          behaviorMultiplier *= 0.5;
        }
      }

      if (selectedBehaviors.speed && ghost.speed) {
        if (selectedBehaviors.speed !== ghost.speed) {
          behaviorMultiplier *= 0.3;
        }
      }

      if (selectedBehaviors['holywater-cooldown'] && ghost.holyWater) {
        var hwMap = { '3': 'normal', '5': 'more' };
        if (selectedBehaviors['holywater-cooldown'] !== hwMap[ghost.holyWater]) {
          behaviorMultiplier *= 0.1;
        }
      }

      if (selectedBehaviors['speed-los'] && ghost.speedLOS) {
        if (selectedBehaviors['speed-los'] !== ghost.speedLOS) {
          behaviorMultiplier *= 0.3;
        }
      }

      if (selectedBehaviors['range-los'] && ghost.losRange) {
        if (selectedBehaviors['range-los'] !== ghost.losRange) {
          behaviorMultiplier *= 0.3;
        }
      }

      if (selectedBehaviors['flx-pod'] && behaviors.flxPod) {
        if (selectedBehaviors['flx-pod'] === 'interact' && behaviors.flxPod !== 'interact') {
          behaviorMultiplier *= 0.1;
        }
      }

      if (selectedBehaviors.breaker) {
        var breakerSelected = selectedBehaviors.breaker;
        if (Array.isArray(breakerSelected)) {
          if (breakerSelected.indexOf('on') !== -1 && behaviors.breaker !== 'yes') {
            behaviorMultiplier *= 0.1;
          }
          if (breakerSelected.indexOf('off') !== -1 && behaviors.breaker !== 'no') {
            behaviorMultiplier *= 0.1;
          }
        } else {
          if (breakerSelected === 'on' && behaviors.breaker !== 'yes') {
            behaviorMultiplier *= 0.1;
          }
          if (breakerSelected === 'off' && behaviors.breaker !== 'no') {
            behaviorMultiplier *= 0.1;
          }
        }
      }

      ghostScore = ghostScore * behaviorMultiplier;

      scores.push({
        id: ghostId,
        name: ghost.name,
        score: Math.round(ghostScore),
        proofBadges: proofBadges,
        data: ghost
      });
    }

    scores.sort(function (a, b) { return b.score - a.score; });
    state.ghostScores = scores;
    emitGhostScores();
  }

  function reset() {
    state.proofData = {};
    state.trustScores = {};
    initProofData();
    calculateGhostScores();
  }

  window.__ProofTrustEngine = {
    registerProof: registerProof,
    calculateTrustScore: calculateTrustScore,
    calculateProofScore: calculateProofScore,
    calculateGhostScores: calculateGhostScores,
    getTopGhosts: getTopGhosts,
    getProofTrustLevel: getProofTrustLevel,
    getProofScore: calculateProofScore,
    setConfig: function(newConfig) {
      if (newConfig.eliminationThreshold !== undefined) {
        CONFIG.eliminationThreshold = newConfig.eliminationThreshold;
      }
    },
    getConfig: function() {
      return CONFIG;
    },
    applyBehaviorFilter: applyBehaviorFilter,
    reset: reset,
    _getState: function () { return state; }
  };

  initProofData();
})();
