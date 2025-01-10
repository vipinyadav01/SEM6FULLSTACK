const math = require('./MathFeatures');

const num1 = 10;
const num2 = 5;

console.log(`Adding: ${num1} + ${num2} = ${math.add(num1, num2)}`);
console.log(`Subtracting: ${num1} - ${num2} = ${math.subtract(num1, num2)}`);
console.log(`Multiplying: ${num1} * ${num2} = ${math.multiply(num1, num2)}`);
console.log(`Dividing: ${num1} / ${num2} = ${math.divide(num1, num2)}`);
