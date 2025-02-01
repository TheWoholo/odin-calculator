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

// Test the function in the browser console
console.log(operate('+', 5, 3));  // Output: 8
console.log(operate('-', 10, 4)); // Output: 6
console.log(operate('*', 6, 7));  // Output: 42
console.log(operate('/', 20, 5)); // Output: 4
console.log(operate('/', 10, 0)); // Output: "Error: Division by zero"
console.log(operate('%', 10, 3)); // Output: "Error: Invalid operator"