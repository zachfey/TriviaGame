$(document).ready();

var questions, question, answers, correctAnswer, answer, numberRight, numberWrong, gameOver, start, randQ,
    choseQuestion, questionNumber, ansNum, qTimer, dTimer, rTimer, qArray



function pickQuestion() {
    randQ = Math.floor(Math.random() * qArray.length);
    console.log('qArray before:' + qArray)
    for(let i = 0; i < qArray.length; i++){ 
        if ( qArray[i] === randQ) {
          qArray.splice(i, 1); 
        }
     }
     console.log('qArray after: ' + qArray)
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
        qArray = [1, 2, 3, 4, 5] //TODO expand to keep up with number of questions
        numberRight = 0;
        numberWrong = 0;
        gameOver = false

        $('#questionBox').hide()
        $('#resultBox').hide()

        $('#start').show()

    },

    newQuestion: function () {
        
        start = new Date;

        dTimer = setInterval(function () {
            $('#timeRemaining').text(parseInt(16 - (new Date - start) / 1000));
            console.logt('tick');
        }, 1000);

        
        qTimer = setInterval(function () {
            game.displayResult(correctAnswer);
        }, 15000);

        choseQuestion = questions[pickQuestion()];
 
        $('#question').text(choseQuestion.question); //populate the question
        for (let i = 1; i < 5; i++) { //populate the answer
            $('#answer' + i).text(choseQuestion.answers[i - 1]);
        }

        $('#questionBox').show(); //show the user the question
    },

    checkAnswer: function (ansNum) {
        if (choseQuestion.correctAnswer + 1 == ansNum) {
            correctAnswer = true;
        } else {
            correctAnswer = false;
        }
    },

    displayResult: function (response) {
        clearInterval(dTimer);
        clearInterval(qTimer);
        console.log('display result')
        console.log(dTimer)
        console.log(response)
        $('#questionBox').hide();
        clearInterval(rTimer);
        if (response) {
            game.correctResult();
        } else {
            game.wrongResult();
        }
    },

    correctResult: function () {
        console.log('newquestion')
        rTimer = setInterval(function () {
            console.log('hellloooo')
            game.newQuestion();
        }, 5000);

    },

    wrongResult: function () {
        console.log('newquestion')
        rTimer = setInterval(function () {
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

