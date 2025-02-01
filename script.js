let first_digit=0;
let second_digit=0;
let operator_present=false;
let dot_count=0;

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

function handleClick(){
    const display = document.querySelector('.display');
    if (display.innerHTML === '0') {
        display.innerHTML = ''; // Clear the display if it was just '0'
    }
    display.innerHTML += this.innerHTML;
}

function handleDot(){
    const display = document.querySelector('.display');
    if (display.innerHTML === '0') {
        display.innerHTML = ''; // Clear the display if it was just '0'
    }
    if(dot_count==0){
        display.innerHTML += this.innerHTML;
        dot_count++;
    }
}

function display_digits() {
    const digits = document.querySelectorAll('.digits button');
    digits.forEach(button => {
        if(button.innerHTML != '.')
            button.addEventListener('click', handleClick);
        else
            button.addEventListener('click',handleDot);
    }); 
}

function updateNumbers(){
    let number = 0;
    if(dot_count)
        number = parseFloat(display.innerHTML);
    else
        number = parseInt(display.innerHTML);

    if(operator_present)
        second_digit = number;
    else
        first_digit = number;
}

function addFunctionalities(){
    display_digits();
}

document.addEventListener('DOMContentLoaded', () => {
    addFunctionalities(); // Call addFunctionalities after DOM is ready
});