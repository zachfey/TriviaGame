$(document).ready();

var questions, question, answers, correctAnswer, answer, numberRight, numberWrong, gameOver, start, randQ,
    choseQuestion, questionNumber, ansNum, qTimer, dTimer, rTimer, qArray, counter



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
        gameOver = false

        $('#questionBox').hide()
        $('#resultBox').hide()

        $('#start').show()

    },

    newQuestion: function () {

        start = new Date;

        counter = 0
        dTimer = setInterval(function () {
            $('#timeRemaining').text(14 - counter);
            counter++
            console.log('tick');
        }, 1000);

        qTimer = setInterval(function () {
            clearInterval(dTimer);
            clearInterval(qTimer);
            if (correctAnswer) {
                game.correctResult();
            } else {
                game.wrongResult();
            }
        }, 15000);
        var qNumber = pickQuestion()
        console.log('qNumber: ' + qNumber)
        choseQuestion = questions[qNumber];

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
            clearInterval(rTimer);
            console.log('hellloooo')
            game.newQuestion();
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
            game.newQuestion();
        }, 5000);
    }
}

///////End Game Object

game.initialize();

$('#start').on('click', function () {
    $('#start').hide()
    game.newQuestion();
})

$('.answer').on('click', function () {
    game.checkAnswer(this.id[6]);
    console.log(correctAnswer)
});

