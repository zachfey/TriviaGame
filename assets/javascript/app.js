$(document).ready(function () { //once the document is ready, execute the below script

    let questions, correctAnswer, numberRight, numberWrong, randQ,
        choseQuestion, qTimer, dTimer, rTimer, qArray, counter,
        qCount, game




    function QuestionConstructor(question, answers, rightAnswer) { //a constructor to make it easier to create questions
        this.question = question;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
        
    }

    QuestionConstructor.prototype.check = function (answer) { //adds a .check method to the QuestionConstructor
        // console.log('answer: ' + answer);
        if (answer - 1 === this.rightAnswer) {
            // console.log('right answer')
            return true
        } else {
            // console.log('wrong answer')
            return false
        }
    }

    //create each question using the above constructor
    let question1 = new QuestionConstructor('True of False: Water is the only substance found naturally on Earth in three forms?', ['True', 'False', '', ''], 0);
    let question2 = new QuestionConstructor('How long can a person live without water?', ['One Week', 'One Month', 'One Day', 'One Year'], 0);
    let question3 = new QuestionConstructor('How much of the human body is water?', ['16%', '56%', '66%', '96%'], 2);
    let question4 = new QuestionConstructor('How much of the Earth\'s water is suitable for drinking water?', ['1%', '10%', '50%', '100%'], 0);
    let question5 = new QuestionConstructor('How much does one cubic foot of water weigh?', ['24.4 lbs', '45.4 lbs', '55.4 lbs', '62.4 lbs'], 3);
    let question6 = new QuestionConstructor('What is the total amount of water used to manufacture a new car?', ['39 gal', '390 gal', '3,900 gal', '39,000 gal'], 3);
    let question7 = new QuestionConstructor('Which other substance\'s solid is lighter than its liquid, like water?', ['gasoline', 'silicon', 'oil', 'ethanol'], 1);
    let question8 = new QuestionConstructor('What percentage of Earth\'s fresh water is trapped in glaciers?', ['8.7%', '38.7%', '68.7%', '98.7%'], 2);
    let question9 = new QuestionConstructor('How many atoms make up one molecule of water?', ['1', '2', '3', '4'], 2);
    let question10 = new QuestionConstructor('Which word describes a property of water?', ['volatile', 'polar', 'flammable', 'basic'], 1);

    //create an array of all of the qeustions
    questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]

    /////////////////////////begin game object
    game = {
        initialize: function () { //initialize function to put the game at the beginning game state
            qArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] //this array is used to reference questions 1 - 10. These values are stored in an array so that the index can be removed after using a question
            numberRight = 0; // 0 correct answers
            numberWrong = 0; // 0 wrong answers
            qCount = 0; // 0 questions asked
            gameOver = false //game is not over

            $('#questionBox').hide(); //hide the question area
            $('#resultBox').hide(); //hide the results area
            $('#gameOver').hide(); //hide the game over screen
            $('.replayButton').hide(); //hide the replay button
            $('#start').hide(); //hide the start button

            game.newQuestion() //generate and ask a new question
        },

        newQuestion: function () { //generates and asks a new question
            qCount++; //number of questions increments by 1
            // start = new Date; 
            correctAnswer = false; // defaults to the wrong answer if an answer is not chosen
            $('button').css('color', 'rgb(64, 114, 178)'); //removes any highlighting from selecting the previous answer

            counter = 0; //counter for the time remaining timer
            $('#timeRemaining').text(10); //start the time remaiing timer at 10
            dTimer = setInterval(function () {//Count down from 10
                $('#timeRemaining').text(9 - counter);
                counter++
                // console.log('tick');
            }, 1000);

            qTimer = setInterval(function () {//Display the result after 10s
                clearInterval(dTimer);
                clearInterval(qTimer);

                if (correctAnswer) {
                    game.correctResult();

                } else {
                    game.wrongResult();
                }
            }, 10000);

            let qNumber = game.pickQuestion()//pick a random question id
            // console.log('qNumber: ' + qNumber)
            choseQuestion = questions[qNumber];//assign the chosen question based on question id
            // console.log("The correct answer was: " + choseQuestion.answers[choseQuestion.rightAnswer])

            $('#question').text(choseQuestion.question); //populate the question onto the page
            for (let i = 1; i < 5; i++) { //populate the answer
                $('#answer' + i).text(choseQuestion.answers[i - 1]);
            }
            $('#correctAnswer').text("The correct answer was: " + choseQuestion.answers[choseQuestion.rightAnswer]); //go ahead and populate the correct answer element because it is still hidden


            $('#questionBox').show(); //show the user the question
            $('#resultBox').hide(); //hide the result box
            $('#correctAnswer').hide(); //hide the correct answer box
        },

        correctResult: function () { //executes when the timer is up and the user guessed correctly
            $('#questionBox').hide(); //hides the question
            $('#resultBox').show(); //shows the result
            $('#rightWrong').text("Correct!"); //tells the user they were correct

            numberRight++ //increments the number of correct answers
            // console.log('newquestion') 
            rTimer = setInterval(function () { //sets a timer for five seconds for the user to review the result
                if (qCount < 5) { //if 5 questions have not been asked, ask a new question.
                    game.newQuestion();
                } else { //if 5 questions have been asked, end the game
                    game.gameOver();
                }
                clearInterval(rTimer);
            }, 5000);

        },

        wrongResult: function () { //executes when the timer is up and the user guessed incorrectly
            $('#questionBox').hide(); //hide the qeustion
            $('#resultBox').show(); //show the results
            $('#rightWrong').text("Wrong!"); //tell the user they got it wrong
            $('#correctAnswer').show(); //show the user the correct answer

            numberWrong++ //increments the number of wrong answers
            rTimer = setInterval(function () {
                clearInterval(rTimer);
                if (qCount < 5) {
                    game.newQuestion();
                } else {
                    game.gameOver();
                }
            }, 5000);
        },

        gameOver: function () { //when the game is over (after 5 questions)
            gameOver = true;
            $('#resultBox').hide();
            $('#gameOver').show();
            $('.replayButton').show();
            $('#gameOverText').text("That's all for this round!");
            $('#numberRight').text("Correct: " + numberRight);
            $('#numberWrong').text('Wrong: ' + numberWrong);
            $('#playAgain').text("Would you like to play again?")
        },

        pickQuestion: function () { //chooses a question randomly using the qArray, and removes the chosen question index from qArray
            randQ = qArray[Math.floor(Math.random() * qArray.length)]; //picks the random index number
            // console.log('qArray before:' + qArray)
            qArray.splice(randQ, 1); //removes the chosen index number from qArray
            // console.log('qArray after: ' + qArray)
            // console.log('randQ:' + randQ)
            return randQ;
        }
    }

    ///////////////////////////////////End Game Object


    ////////////////////////////////////Begin event listeners

    $('#start').on('click', function () { //when the start button is clicked, start the game
        game.initialize();
    })

    $('.answer').on('click', function () { //when an answer is clicked, check to see if it was correct
        correctAnswer = choseQuestion.check(this.id[6]);
        // console.log(correctAnswer)
    });

    $('.replayButton').on('click', function (event) { //when a replay button class is clicked (yes/no)
        // event.preventDefault();
        // console.log($(this).val())
        // console.log($(this).val() === 'true')
        if ($(this).val() === 'true') { //if 'yes' was clicked
            game.initialize(); //start the game
        } //TODO add a goodby screen if 'no' is clicked
    })

    $('button').on('click', function () { //if any button in the game is clicked
        // console.log($(this).css('color'));
        if ($(this).css('color') !== 'rgb(38, 67, 105)') { //if the button is not highlighted
            $('button').css('color', 'rgb(64, 114, 178)'); //turn all other buttons to the standard color
            $(this).css('color', 'rgb(38, 67, 105)'); //highlight teh clicked button
        }
    })

});