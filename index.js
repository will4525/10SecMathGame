$(document).ready(function () {
    var currentQuestion;
    var timeLeft = 10;
    var interval;
    var score = 0;

    var startGame = function () {
        if (!interval) {
            if (timeLeft === 0) {
                updateTimeLeft(10);
                updateScore(-score);
            }
            interval = setInterval(function () {
                updateTimeLeft(-1);
                if (timeLeft === 0) {
                    clearInterval(interval);
                    interval = undefined;
                }
            }, 1000);
        }
    };

    $('#user-input').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    var randomNumberGenerator = function (size) {
        return Math.ceil(Math.random() * size);
    }

    var questionGenerator = function () {
        var question = {};
        var num1 = randomNumberGenerator(10);
        var num2 = randomNumberGenerator(10);
        var operator = randomNumberGenerator(4); // 1: +, 2: -, 3: *, 4: /

        switch (operator) {
            case 1:
                question.answer = num1 + num2;
                question.equation = num1 + " + " + num2;
                break;
            case 2:
                // Ensure the answer is a positive whole number
                if (num1 < num2) {
                    var temp = num1;
                    num1 = num2;
                    num2 = temp;
                }
                question.answer = num1 - num2;
                question.equation = num1 + " - " + num2;
                break;
            case 3:
                question.answer = num1 * num2;
                question.equation = num1 + " * " + num2;
                break;
            case 4:
                // Ensure the answer is a positive whole number
                question.answer = Math.ceil(num1 / num2);
                question.equation = num1 + " / " + num2;
                break;
        }

        return question;
    }

    var checkAnswer = function (userInput, answer) {
        if (userInput === answer) {
            renderNewQuestion();
            $('#user-input').val('');
            updateTimeLeft(+1);
            updateScore(+1);
        }
    };

    var renderNewQuestion = function () {
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);
    }

    var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    }

    var updateScore = function (amount) {
        score += amount;
        $('#score').text(score);
    };

    renderNewQuestion();

    setInterval(function () {
        console.log('1 sec passed');
    }, 1000);

    var interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
            clearInterval(interval);
        }
    }, 1000);
});
