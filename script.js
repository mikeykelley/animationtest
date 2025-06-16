const ordersInput = document.getElementById('orders');
const orderCountLabel = document.getElementById('order-count');
const aovInput = document.getElementById('aov');
const categorySelect = document.getElementById('category');

const hiddenCosts = document.getElementById('hidden-costs');
const conversionUplift = document.getElementById('conversion-uplift');
const totalImpact = document.getElementById('total-impact');
const quirksList = document.getElementById('quirks-list');
const snakeHead = document.querySelector('.snake-head');
const snakeBody = document.querySelector('.snake-body');

function formatCurrency(value) {
  return `£${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function calculateImpact() {
  const orders = parseInt(ordersInput.value, 10);
  const aov = parseFloat(aovInput.value);
  const revenue = orders * aov;

  const errorRate = 0.005;
  const errorCost = 12;
  const margin = 0.5;
  const baseCR = 0.03;
  const uplift = 0.10;

  const costOfErrors = orders * errorRate * errorCost;
  const valueOfUplift = revenue * uplift * margin;

  hiddenCosts.textContent = formatCurrency(costOfErrors);
  conversionUplift.textContent = formatCurrency(valueOfUplift);
  totalImpact.textContent = formatCurrency(costOfErrors + valueOfUplift);

  renderQuirks(categorySelect.value, orders);
}

function renderQuirks(category, orders) {
  const quirks = {
    fashion: [
      'High return rates can affect accuracy and stock availability.',
      'Customers expect quick dispatch and flexible delivery options.'
    ],
    food: [
      'Expiry dates make fulfilment speed critical.',
      'Temperature control and packaging matter for fresh products.'
    ],
    health: [
      'Subscription orders need automation and predictability.',
      'Delivery delays can affect trust in health products.'
    ],
    other: [
      'Every business has unique fulfilment quirks—identify and improve yours.'
    ]
  };

  quirksList.innerHTML = '';
  (quirks[category] || []).forEach(q => {
    const li = document.createElement('li');
    li.textContent = q;
    quirksList.appendChild(li);
  });
}

function updateSnakeScroll() {
  const container = document.querySelector('.calculator-container');
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight - container.clientHeight;
  const percentScrolled = scrollTop / scrollHeight;

  const trackHeight = document.querySelector('.snake-track').clientHeight;
  const headPos = percentScrolled * trackHeight;
  snakeHead.style.top = `${headPos}px`;
  snakeBody.style.height = `${headPos}px`;
}

ordersInput.addEventListener('input', () => {
  orderCountLabel.textContent = ordersInput.value;
  calculateImpact();
});

aovInput.addEventListener('input', calculateImpact);
categorySelect.addEventListener('change', calculateImpact);

document.querySelector('.calculator-container').addEventListener('scroll', updateSnakeScroll);

calculateImpact();
updateSnakeScroll();
