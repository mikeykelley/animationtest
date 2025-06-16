document.getElementById('orders').addEventListener('input', function () {
  document.getElementById('orderValue').textContent = this.value;
  updateSteps();
});

document.getElementById('aov').addEventListener('input', updateSteps);
document.getElementById('category').addEventListener('change', updateSteps);

document.getElementById('calculate').addEventListener('click', function () {
  const category = document.getElementById('category').value;
  const orders = parseInt(document.getElementById('orders').value, 10);
  const aov = parseFloat(document.getElementById('aov').value);

  const errorRate = 0.005;
  const wage = 12;
  const margin = 0.5;
  const baseCR = 0.03;
  const uplift = 0.10;

  const errors = orders * errorRate;
  const errorCost = errors * aov * margin;
  const inefficiency = (orders * 3 / 60) * wage;
  const revenueUplift = orders * baseCR * uplift * aov;

  document.getElementById('errors').textContent = `£${errorCost.toFixed(2)}`;
  document.getElementById('inefficiency').textContent = `£${inefficiency.toFixed(2)}`;
  document.getElementById('uplift').textContent = `£${revenueUplift.toFixed(2)}`;

  document.getElementById('results').classList.remove('hidden');

  // Highlight final step
  highlightStep(4);
});

function updateSteps() {
  const category = document.getElementById('category').value;
  const orders = parseInt(document.getElementById('orders').value, 10);
  const aov = parseFloat(document.getElementById('aov').value);

  if (category) highlightStep(1);
  if (orders > 0) highlightStep(2);
  if (!isNaN(aov) && aov > 0) highlightStep(3);
}

function highlightStep(stepNum) {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
    if (index <= stepNum - 1) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
}
