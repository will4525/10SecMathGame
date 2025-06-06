// index.js
console.log("I brought my gears")

var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
}

var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
}

console.log(questionGenerator());
console.log(questionGenerator());
// { answer: 10, equation: '3 + 7' }
// { answer: 9, equation: '8 + 1' }