document.addEventListener('DOMContentLoaded', function () {
    // Selecting elements
    const result = document.querySelector('.res');
    const buttons = document.querySelectorAll('button');

    // Initialize variables
    let currentResult = '0';
    let expression = '';

    // Update the result display
    function updateDisplay() {
        result.textContent = currentResult;
    }

    // Function to evaluate the expression without using eval
    function evaluateExpression() {
        try {
            currentResult = calculate(expression);
        } catch (error) {
            currentResult = 'Error';
        }
        expression = '';
    }

    // Function to perform arithmetic operations
    function calculate(expression) {
        // Split expression into numbers and operators
        const tokens = expression.match(/\d+|[-+*/]/g);

        let result = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const operand = parseFloat(tokens[i + 1]);

            if (isNaN(operand)) {
                throw new Error('Invalid expression');
            }

            switch (operator) {
                case '+':
                    result += operand;
                    break;
                case '-':
                    result -= operand;
                    break;
                case '*':
                    result *= operand;
                    break;
                case '/':
                    if (operand === 0) {
                        throw new Error('Division by zero');
                    }
                    result /= operand;
                    result = result.toFixed(1);
                    break;
                default:
                    throw new Error('Unknown operator');
            }
        }
        return result.toString();
    }
    const del = document.querySelector('.backspace');
    del.addEventListener('click', () => {
        expression = expression.slice(0, -1);
        if (expression === '') {
            currentResult = '0';
        }
    })

    // Event listener for button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            switch (buttonText) {
                case 'AC':
                    currentResult = '0';
                    expression = '';
                    break;
                case 'Delete':
                    expression = expression.slice(0, -1);
                    if (expression === '') {
                        currentResult = '0';
                    }
                    break;
                case '=':
                    evaluateExpression();
                    break;
                default:
                    if (/[\d.]/.test(buttonText)) {
                        if (currentResult === '0' || currentResult === 'Error') {
                            currentResult = buttonText;
                        } else {
                            currentResult += buttonText;
                        }
                        expression += buttonText;
                    } else if (/[\+\-\*\/]/.test(buttonText)) {
                        expression += buttonText;
                        currentResult = buttonText;
                    }
                    break;
            }

            updateDisplay();
        });
    });
});
