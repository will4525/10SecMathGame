$(document).ready(function () {
    var currentQuestion;
    var timeLeft = 10;

    // Define global interval variable at the top
    var interval;

    var startGame = function () {
        if (!interval) {
            // call the updateTimeLeft function if timeLeft is 0
            if (timeLeft === 0) {
                updateTimeLeft(10);
            }
            interval = setInterval(function () {
                updateTimeLeft(-1);
                if (timeLeft === 0) {
                    clearInterval(interval);
                    interval = undefined;
                }
            }, 1000);
        }
    }

    // Call start game in the event listener callback
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
            updateTimeLeft(+1);
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
        updateTimeLeft(-1);
        if (timeLeft === 0) {
            clearInterval(interval);
        }
    }, 1000);

    var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    }
});

