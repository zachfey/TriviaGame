$(document).ready();

var questions, question, answers, correctAnswer, answer, numberRight, numberWrong, gameOver, start, randQ,
    choseQuestion, questionNumber, ansNum, qTimer, dTimer, rTimer, qArray, counter,
    qCount


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
    console.log('answer: ' + answer);
    
    if (answer - 1 === this.correctAnswer) {
        console.log('right answer')
        return true
    } else {
        console.log('wrong answer')
        return false
    }
}

var question1 = new QuestionConstructor('True of False: Water is the only substance found naturally on Earth in three forms?', ['True', 'False'], 0);
var question2 = new QuestionConstructor('How long can a person live without water?', ['One Week', 'One Month', 'One Day', 'One Year'], 0);
var question3 = new QuestionConstructor('How much of the human body is water?', ['16%', '56%', '66%', '96%'], 2);
var question4 = new QuestionConstructor('How much of the Earth\'s water is suitable for drinking water?', ['1%', '10%', '50%', '100%'], 0);
var question5 = new QuestionConstructor('How much does one cubic foot of water weigh?', ['24.4 lbs', '45.4 lbs', '55.4 lbs', '62.4 lbs'], 3);
var question6 = new QuestionConstructor('What is the total amount of water used to manufacture a new car?', ['39 gal', '390 gal', '3,900 gal', '39,000 gal'], 3);
var question7 = new QuestionConstructor('Which other substance\'s solid is lighter than its liquid, like water?', ['gasoline', 'silicon', 'oil', 'ethanol'], 1);
var question8 = new QuestionConstructor('What percentage of Earth\'s fresh water is trapped in glaciers?', ['8.7%', '38.7%', '68.7%', '98.7% lbs'], 2);
var question9 = new QuestionConstructor('How many atoms make up one molecule of water?', ['1', '2', '3', '4'], 2);
var question10 = new QuestionConstructor('Which word describes a property of water?', ['volatile', 'polar', 'flammable', 'basic'], 1);

questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]

game = {
    initialize: function () {
        qArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] //TODO expand to keep up with number of questions
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

    // checkAnswer: function (ansNum) { //replaced by object method
    //     if (choseQuestion.correctAnswer + 1 == ansNum) {
    //         correctAnswer = true;
    //     } else {
    //         correctAnswer = false;
    //     }
    // },

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
    correctAnswer = choseQuestion.check(this.id[6]);
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

