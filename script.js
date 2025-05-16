let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let firstOperand = null;
let history = [];
const historyContainer = document.getElementById('history-container');
const historyList = document.getElementById('history-list');
const toggleHistoryBtn = document.getElementById('toggle-history-btn');

function updateDisplay() {
    display.value = currentInput || '0';
}

function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (firstOperand !== null) {
        calculate();
    }
    firstOperand = parseFloat(currentInput);
    operator = op;
    currentInput = '';
}

function appendDecimal() {
    if (currentInput.includes('.')) return;
    currentInput += '.';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (operator === null || firstOperand === null || currentInput === '') return;
    const secondOperand = parseFloat(currentInput);
    let result;
    let fullOperation = `${firstOperand} ${operator} ${secondOperand}`;
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                result = 'Error: División por cero';
            } else {
                result = firstOperand / secondOperand;
            }
            break;
        default:
            return;
    }
    currentInput = String(result);
    operator = null;
    firstOperand = null;
    updateDisplay();
    history.push(fullOperation + ' = ' + result);
    
}

function updateHistoryDisplay() {
    historyList.innerHTML = '';
    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
}

toggleHistoryBtn.addEventListener('click', function() {
    historyContainer.style.display = historyContainer.style.display === 'none' ? 'block' : 'none';
    toggleHistoryBtn.textContent = historyContainer.style.display === 'none' ? 'Mostrar Historial' : 'Ocultar Historial';
    updateHistoryDisplay(); 
});
