document.addEventListener('DOMContentLoaded', () => {
    const calculatorScreen = document.getElementById('calculator-screen');
    const keys = document.querySelector('.calculator-keys');

    let currentInput = '0';
    let firstOperand = null;
    let secondOperand = false;
    let operator = null;

    function updateScreen() {
        calculatorScreen.textContent = currentInput;
    }

    keys.addEventListener('click', (event) => {
        const { target } = event;
        const value = target.value;

        if (!target.matches('button')) return;

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
                handleOperator(value);
                break;
            case '.':
                inputDecimal();
                break;
            case 'all-clear':
                resetCalculator();
                break;
            default:
                if (Number.isInteger(parseFloat(value))) {
                    inputDigit(value);
                }
        }

        updateScreen();
    });

    function inputDigit(digit) {
        if (secondOperand) {
            currentInput = digit;
            secondOperand = false;
        } else {
            currentInput = currentInput === '0' ? digit : currentInput + digit;
        }
    }

    function inputDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && secondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            currentInput = String(result);
            firstOperand = result;
        }

        secondOperand = true;
        operator = nextOperator;
    }

    function calculate(first, second, operator) {
        if (operator === '+') {
            return first + second;
        } else if (operator === '-') {
            return first - second;
        } else if (operator === '*') {
            return first * second;
        } else if (operator === '/') {
            return first / second;
        }

        return second;
    }

    function resetCalculator() {
        currentInput = '0';
        firstOperand = null;
        secondOperand = false;
        operator = null;
    }
});
