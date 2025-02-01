let first_digit=0;
let second_digit=0;
let operator_present=false;
let current_operator = '';
let dot_count=0;
let isFirstDigit=true;
let isSecondDigit=false;
let display={};

function debug(){
    console.log("first_digit:", first_digit);
    console.log("second_digit:", second_digit);
    console.log("operator_present:", operator_present);
    console.log("current_operator:", current_operator);
    console.log("dot_count:", dot_count);
    console.log("isFirstDigit:", isFirstDigit);
    console.log("isSecondDigit:", isSecondDigit);
    console.log("\n");
}

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
    if(!isFirstDigit && !isSecondDigit)  //it is an operator before this
    {
        display.innerHTML=second_digit;
        isSecondDigit=true;
        console.log("Second digit starts");
    }
    if (display.innerHTML === '0') {
        display.innerHTML = ''; // Clear the display if it was just '0'
    }
    display.innerHTML += this.innerHTML;
    debug();
}

function handleDot(){
    if(!isFirstDigit)
    {
        display.innerHTML=second_digit;
        isSecondDigit=true;
    }
    if (display.innerHTML == '0') {
        display.innerHTML = ''; // Clear the display if it was just '0'
    }
    if(dot_count==0){
        display.innerHTML += this.innerHTML;
        dot_count++;
    }
    debug();
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

function operator_functionality(){
    const ops = document.querySelectorAll('.operators button'); 
    ops.forEach( operator =>{
        if(operator.innerHTML=='=')
            operator.addEventListener('click',handleEquals);
        else
            operator.addEventListener('click',handleOps);
    });
}

function handleEquals(){
    if(!operator_present || !isSecondDigit){
        debug();
        return;
    }
    updateNumbers();
    first_digit = operate(current_operator, first_digit, second_digit);
    display.innerHTML = first_digit;
    operator_present=false;
    dot_count=0;  //update this to depend on result of operation
    isFirstDigit=true;
    isSecondDigit=false;
    second_digit=0;
    debug();
}

function handleOps(){
    if(!operator_present){
        updateNumbers();
        operator_present=true;
        dot_count=0;    //bcos new number, need better algo for this
        current_operator = this.innerHTML;
        isFirstDigit=false;
        isSecondDigit=false;   //becomes true when u start entering digits for it
        debug();
        return;
    }
    else if(!isSecondDigit){
        current_operator = this.innerHTML;
        debug();
        return;
    }
    updateNumbers();
    first_digit = operate(current_operator, first_digit, second_digit);
    display.innerHTML = first_digit;
    operator_present= true;
    current_operator = this.innerHTML;
    dot_count=0;    //update this to depend on result of operation
    isFirstDigit=false;
    isSecondDigit=false;
    second_digit=0;
    debug();
}

function addFunctionalities(){
    display_digits();
    operator_functionality();
}

document.addEventListener('DOMContentLoaded', () => {
    display = document.querySelector('.display');
    addFunctionalities(); // Call addFunctionalities after DOM is ready
});