$(document).ready(function () {
    var currentQuestion;
    // Add to top, after currentQuestion;
    var timeLeft = 10;
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

    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);

    $('#user-input').on('keyup', function () {
        console.log($(this).val());
    });

    var checkAnswer = function (userInput, answer) {
        console.log(userInput === answer);
    }

    $('#user-input').on('keyup', function () {
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    var renderNewQuestion = function () {
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);
    }

    var checkAnswer = function (userInput, answer) {
        if (userInput === answer) {
            renderNewQuestion();
            $('#user-input').val('');
        }
    }

    $('#user-input').on('keyup', function () {
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    renderNewQuestion();

    setInterval(function () {
        console.log('1 sec passed');
    }, 1000);

    var interval = setInterval(function () {
        timeLeft--;
        $('#time-left').text(timeLeft);
        if (timeLeft === 0) {
            clearInterval(interval);
        }
    }, 1000);
});

