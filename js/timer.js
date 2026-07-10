/* ============================================
   TOS CheatSheet - Timer Global
   ============================================ */

(function () {
  'use strict';

  const timerDisplay = document.getElementById('globalTimer');
  const btnStartStop = document.getElementById('btnStartStop');
  const btnReset = document.getElementById('btnReset');

  let elapsedSeconds = 0;
  let timerInterval = null;
  let isRunning = false;

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  }

  function updateDisplay() {
    timerDisplay.textContent = formatTime(elapsedSeconds);
  }

  function updateButtonState() {
    if (isRunning) {
      btnStartStop.textContent = 'STOP';
      btnStartStop.classList.add('is-stopping');
      btnStartStop.setAttribute('aria-label', 'Arrêter l\'investigation');
      timerDisplay.classList.add('timer-running');
    } else {
      btnStartStop.textContent = 'START';
      btnStartStop.classList.remove('is-stopping');
      btnStartStop.setAttribute('aria-label', 'Démarrer l\'investigation');
      timerDisplay.classList.remove('timer-running');
    }
  }

  function startTimer() {
    if (isRunning) {
      return;
    }
    isRunning = true;
    updateButtonState();
    document.dispatchEvent(new CustomEvent('timerStart'));
    timerInterval = setInterval(function () {
      elapsedSeconds++;
      updateDisplay();
      document.dispatchEvent(new CustomEvent('timerTick', { detail: { seconds: elapsedSeconds } }));
    }, 1000);
  }

  function stopTimer() {
    if (!isRunning) {
      return;
    }
    isRunning = false;
    updateButtonState();
    document.dispatchEvent(new CustomEvent('timerStop'));
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetAll() {
    if (window.__thermalTile && window.__thermalTile.showConfirmation) {
      window.__thermalTile.showConfirmation(
        'Reset global',
        'Êtes-vous sûr de vouloir réinitialiser le timer et les preuves ?',
        function () {
          if (isRunning) {
            stopTimer();
          }
          elapsedSeconds = 0;
          updateDisplay();
          updateButtonState();
          document.dispatchEvent(new CustomEvent('globalReset'));
        }
      );
    } else {
      if (isRunning) {
        stopTimer();
      }
      elapsedSeconds = 0;
      updateDisplay();
      updateButtonState();
      document.dispatchEvent(new CustomEvent('globalReset'));
    }
  }

  btnStartStop.addEventListener('click', function () {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  btnReset.addEventListener('click', resetAll);

  updateDisplay();
  updateButtonState();
})();
