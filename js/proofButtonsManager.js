(function () {
  'use strict';

  const proofButtonSelectors = [
    '.btn-thermal',
    '.btn-audio',
    '.btn-emf',
    '.btn-radiation',
    '.btn-uv',
    '.btn-writing',
    '.btn-counter',
    '.btn-level'
  ];

  const controlButtonSelectors = [
    '#thermalUndo', '#thermalReset',
    '#audioUndo', '#audioReset',
    '#emfUndo', '#emfReset',
    '#radiationUndo', '#radiationReset',
    '#uvUndo', '#uvReset',
    '#writingUndo', '#writingReset'
  ];

  function getProofButtons() {
    return document.querySelectorAll(proofButtonSelectors.join(', '));
  }

  function getControlButtons() {
    return document.querySelectorAll(controlButtonSelectors.join(', '));
  }

  function disableButtons() {
    getProofButtons().forEach(function (btn) {
      btn.classList.add('is-disabled');
      btn.disabled = true;
    });
  }

  function enableButtons() {
    getProofButtons().forEach(function (btn) {
      btn.classList.remove('is-disabled');
      btn.disabled = false;
    });
  }

  function init() {
    disableButtons();

    document.addEventListener('timerStart', function () {
      enableButtons();
    });

    document.addEventListener('timerStop', function () {
      disableButtons();
    });

    document.addEventListener('globalReset', function () {
      disableButtons();
    });
  }

  init();
})();