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

// Test the functions in the browser console
console.log(add(5, 3));       // Output: 8
console.log(subtract(10, 4)); // Output: 6
console.log(multiply(6, 7));  // Output: 42
console.log(divide(20, 5));   // Output: 4
console.log(divide(10, 0));   // Output: "Error: Division by zero"