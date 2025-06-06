$(document).ready(function () {
    var currentQuestion;
    var timeLeft = 10;
    // Define global interval variable at the top
    var interval;
    // Add this after declaring timeLeft
    var score = 0;

    var startGame = function () {
        if (!interval) {
            if (timeLeft === 0) {
                updateTimeLeft(10);
                // Add the following
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
        if (userInput === answer) {
            renderNewQuestion();
            $('#user-input').val('');
            updateTimeLeft(+1);
            updateScore(+1);
        }
    };

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

    var updateScore = function (amount) {
        score += amount;
        $('#score').text(score);
    };
});

