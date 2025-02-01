function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Error: Invalid operator";
    }
}

function display_digits() {
    const digits = document.querySelectorAll('.digits button');
    const display = document.querySelector('.display');

    digits.forEach(button => {
        button.addEventListener('click', () => {
            if (display.innerHTML === '0') {
                display.innerHTML = ''; // Clear the display if it was just '0'
            }
            display.innerHTML += button.innerHTML;
        });
    });
}


function addFunctionalities(){
    display_digits();
}

document.addEventListener('DOMContentLoaded', () => {
    addFunctionalities(); // Call addFunctionalities after DOM is ready
});