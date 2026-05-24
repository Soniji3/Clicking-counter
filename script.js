 // ── The closure ───────────────────────────────────────────
  function makeCounter(initialValue = 0) {
    let count = initialValue;
    let history = [];

    return {
      increment(step = 1) {
        count += step;
        history.push({ action: "+" + step, value: count });
        return count;
      },
      decrement(step = 1) {
        count -= step;
        history.push({ action: "-" + step, value: count });
        return count;
      },
      reset() {
        count = initialValue;
        history = [];
        return count;
      },
      getHistory() { return [...history]; },
      value()      { return count; },
    };
  }

  const counter = makeCounter(0);

  // ── UI wiring ─────────────────────────────────────────────
  const display     = document.getElementById("display");
  const actionLabel = document.getElementById("action-label");
  const historyEl   = document.getElementById("history");
  const stepInput   = document.getElementById("step");
  const stepOut     = document.getElementById("step-out");

  stepInput.addEventListener("input", () => {
    stepOut.textContent = stepInput.value;
  });

  function updateDisplay(action) {
    const val = counter.value();
    display.textContent = val;
    display.className = "display" +
      (val > 0 ? " positive" : val < 0 ? " negative" : "");
    actionLabel.textContent = action;
    renderHistory();
  }

  function renderHistory() {
    const h = counter.getHistory().slice(-8);
    historyEl.innerHTML = h.map(item => {
      const cls = item.action.startsWith("+") ? "pill-up" : "pill-down";
      return `<span class="pill ${cls}">${item.action} → ${item.value}</span>`;
    }).join("");
  }

  function handleIncrement() {
    const step = parseInt(stepInput.value);
    counter.increment(step);
    updateDisplay("incremented by " + step);
  }

  function handleDecrement() {
    const step = parseInt(stepInput.value);
    counter.decrement(step);
    updateDisplay("decremented by " + step);
  }

  function handleReset() {
    counter.reset();
    historyEl.innerHTML = "";
    updateDisplay("reset to 0");
  }
