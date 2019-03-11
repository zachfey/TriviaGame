"use strict";

$(document).ready();

var questions, question, answers, correctAnswer, answer, numberRight, numberWrong, gameOver, start, randQ,
    choseQuestion, questionNumber, ansNum, qTimer, dTimer, rTimer, qArray, counter,
    qCount

function setState(pama) {

}
function pickQuestion() {
    randQ = qArray[Math.floor(Math.random() * qArray.length)];
    console.log('qArray before:' + qArray)
    qArray.splice(randQ, 1);
    console.log('qArray after: ' + qArray)
    console.log('randQ:' + randQ)
    return randQ;
}

function QuestionConstructor(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;

}

QuestionConstructor.prototype.check = function (answer) {
    if (answer = this.answers[this.correctAnswer]) {
        return true
    } else {
        return false
    }
}

var question1 = new QuestionConstructor('How much is 4?', [1, 2, 3, 4], 3);
var question2 = new QuestionConstructor('Placeholder, pick 1', [1, 2, 3, 4], 0);
var question3 = new QuestionConstructor('Placeholder2, pick 2', [1, 2, 3, 4], 1);
var question4 = new QuestionConstructor('Placeholder3, pick 3', [1, 2, 3, 4], 2);
var question5 = new QuestionConstructor('Placeholder4, pick 4', [1, 2, 3, 4], 3);
questions = [question1, question2, question3, question4, question5]

game = {
    initialize: function () {
        qArray = [0, 1, 2, 3, 4] //TODO expand to keep up with number of questions
        numberRight = 0;
        numberWrong = 0;
        qCount = 0;
        gameOver = false

        $('#questionBox').hide();
        $('#resultBox').hide();
        $('#gameOver').hide();
        $('.replayButton').hide();
        $('#start').hide();

        game.newQuestion()
    },

    newQuestion: function () {
        qCount++;
        start = new Date;

        counter = 0;
        $('#timeRemaining').text(7);
        dTimer = setInterval(function () {//Count down from 7
            $('#timeRemaining').text(6 - counter);
            counter++
            console.log('tick');
        }, 1000);

        qTimer = setInterval(function () {//Display the result after 7s
            clearInterval(dTimer);
            clearInterval(qTimer);

            if (correctAnswer) {
                game.correctResult();

            } else {
                game.wrongResult();
            }
        }, 7000);

        var qNumber = pickQuestion()//pick a random question id
        console.log('qNumber: ' + qNumber)
        choseQuestion = questions[qNumber];//assign the chosen question based on question id

        $('#question').text(choseQuestion.question); //populate the question
        for (let i = 1; i < 5; i++) { //populate the answer
            $('#answer' + i).text(choseQuestion.answers[i - 1]);
        }

        $('#questionBox').show(); //show the user the question
        $('#resultBox').hide();
    },

    checkAnswer: function (ansNum) {
        if (choseQuestion.correctAnswer + 1 == ansNum) {
            correctAnswer = true;
        } else {
            correctAnswer = false;
        }
    },

    correctResult: function () {
        $('#questionBox').hide();
        $('#resultBox').show();
        $('#rightWrong').text("Correct!");

        numberRight++
        console.log('newquestion')
        rTimer = setInterval(function () {
            if (qCount < 1) {
                game.newQuestion();
            } else {
                game.gameOver();
            }
            clearInterval(rTimer);
            console.log('hellloooo')
        }, 5000);

    },

    wrongResult: function () {
        $('#questionBox').hide();
        $('#resultBox').show();
        $('#rightWrong').text("Wrong!");

        numberWrong++
        console.log('newquestion')
        rTimer = setInterval(function () {
            clearInterval(rTimer);
            console.log('hellloooo')
            if (qCount < 1) {
                game.newQuestion();
            } else {
                game.gameOver();
            }
        }, 5000);
    },

    gameOver: function () {
        gameOver = true;
        $('#resultBox').hide();
        $('#gameOver').show();
        $('.replayButton').show();
        $('#gameOverText').text("That's all for this round!");
        $('#numberRight').text("Correct: " + numberRight);
        $('#numberWrong').text('Wrong: ' + numberWrong);
        $('#playAgain').text("Would you like to play again?")
    }
}

///////End Game Object

// game.initialize();

$('#start').on('click', function () {
    $('#start').hide()
    game.initialize();
})

$('.answer').on('click', function () {
    game.checkAnswer(this.id[6]);
    console.log(correctAnswer)
});

$('.replayButton').on('click', function (event) {
    event.preventDefault();
    console.log($(this).val())
    console.log($(this).val() === 'true')
    if ($(this).val() === 'true') {
        game.initialize();
    }
})

