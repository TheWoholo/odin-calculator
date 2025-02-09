let first_digit=0.0;
let second_digit=0.0;
let operator_present=false;
let current_operator = '';
let dot_count=0;
let isFirstDigit=false;
let isDisplayEmpty=true;
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
    console.log("isDisplayEmpty:", isDisplayEmpty);
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
    console.log(`${a} ${operator} ${b}`);
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
    if(isDisplayEmpty){
        isFirstDigit=true;
        isDisplayEmpty=false;
    }
    else if(!isFirstDigit && !isSecondDigit)  //it is an operator before this
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
    if(isDisplayEmpty){
        isFirstDigit=true;
    }
    if(!isFirstDigit && !isSecondDigit)
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
    if(!operator_present || !isSecondDigit || isDisplayEmpty){
        debug();
        return;
    }
    updateNumbers();
    first_digit = operate(current_operator, first_digit, second_digit);
    display.innerHTML = first_digit;
    operator_present=false;
    if(Number.isInteger(first_digit))
        dot_count=0;
    else
        dot_count=1;
    isFirstDigit=true;
    isSecondDigit=false;
    second_digit=0;
    debug();
}

function handleOps(){
    if(this.innerHTML=='-' && !isFirstDigit && !isSecondDigit){
        display.innerHTML='-';
        isSecondDigit=true;
        console.log("Second digit starts");
        debug();
        return;
    }
    else if(isDisplayEmpty){
        debug();
        return;
    }
    else if(!operator_present){
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
    dot_count=0;  //bcos new number, need better algo for this
    isFirstDigit=false;
    isSecondDigit=false;
    second_digit=0;
    debug();
}

function clear_functionality(){
    const clear_button = document.querySelector('.AC');
    const del_button = document.querySelector('.delete');
    clear_button.addEventListener('click', clearDisplay);
    del_button.addEventListener('click',deleteOperation);
}

function deleteOperation(){
    if(display.innerHTML.length==0)
        return;
    else if(display.innerHTML.length==1)
        clearDisplay();
    else
        display.innerHTML = display.innerHTML.slice(0,-1);
}

function clearDisplay(){
    if(isSecondDigit){
        isSecondDigit=false;
        dot_count=0;
        display.innerHTML='';
        return;
    }
    first_digit=0;
    operator_present=false;
    current_operator='';
    dot_count=0;
    isFirstDigit=false;
    isSecondDigit=false;
    isDisplayEmpty=true;
    display.innerHTML='';
    debug();
}

function addKeyboardFunctionalities() {
    document.addEventListener("keydown", function(event) {
        const key = event.key;

        // Select display
        const display = document.querySelector('.display');

        // Check if the key is a number (0-9)
        if (!isNaN(key)) {
            document.querySelector(`.n${key}`).click();
        }

        // Handle decimal point (.)
        else if (key === ".") {
            document.querySelector(".dot").click();
        }

        // Handle operators
        else if (key === "+") document.querySelector(".add").click();
        else if (key === "-") document.querySelector(".subtract").click();
        else if (key === "*") document.querySelector(".multiply").click();
        else if (key === "/") document.querySelector(".divide").click();

        // Handle Enter (equals)
        else if (key === "Enter") {
            event.preventDefault(); // Prevent form submission
            document.querySelector(".equal").click();
        }

        // Handle Backspace (Delete last digit)
        else if (key === "Backspace") {
            document.querySelector(".delete").click();
        }

        // Handle Delete (Clear all)
        else if (key === "Delete") {
            document.querySelector(".AC").click();
        }
    });
}


function addFunctionalities(){
    display_digits();
    operator_functionality();
    clear_functionality();
    addKeyboardFunctionalities();
}

document.addEventListener('DOMContentLoaded', () => {
    display = document.querySelector('.display');
    addFunctionalities(); // Call addFunctionalities after DOM is ready
});