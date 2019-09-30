$(document).ready(function(){

    // start the game when user clicks on Start button
    $("#start-button").on("click", gameState.startTimer);
  
  });
  
  // information about the state of game play
  var gameState = {
  
    // set the time at 60 seconds//counting down by 1 second
    timeRemaining : 60,
  
    // start the timer, hide the start page, show the questions
    startTimer: function() {
      $("#timer").text("Time remaining: " + gameState.timeRemaining);
      setInterval(gameState.countdown, 1000);
      $("#start-page").hide();
      trivia.displayQuestions();
    },
  
    // updates the timer and update the UI; stop the timer at 0
    countdown: function() {
      gameState.timeRemaining--;
      $("#timer").text("Time remaining: " + gameState.timeRemaining);
      if (gameState.timeRemaining === 0) {
        gameState.stopTimer();
        $("#timer").empty();
      }
    },
  
    // This will stop the timer and check the answers
    stopTimer: function() {
      clearInterval();
      trivia.checkAnswers();
    },
  
    // This will hide the questions and display end page results 
    showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
      $("#end-page").show();
      $("#questions-box").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correct-answers").text("Correct answers (We Have Collected a Stone): " + numCorrect);
      $("#incorrect-answers").text("Incorrect answers (Averngers...You Failed): " + numIncorrect);
      $("#unanswered").text("Skipped questions (Find the Stones): " + numUnanswered);
    }
  }
  
  // functions to handle the building questions page and scoring
  var trivia = {
  
    // pull questions from the array of questions, loop through them, and append to UI
    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
      divContainer.append('<h2>Answer the following questions:</h2>');
              
      for (var i = 0; i < questionBank.length; i++) {
  
        divContainer.append('<div id="question">' + questionBank[i].question + '</div>');
  
        var answer1 = questionBank[i].answers[0];
        var answer2 = questionBank[i].answers[1];
        var answer3 = questionBank[i].answers[2];
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
      }
  
      // Here is our done button
      var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
      divContainer.append(doneButton);
      $("#done-button").on("click", gameState.stopTimer);
    },
  
    // test if the user answers are correct, incorrect, or if there are unanswered questions
    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numCorrect = 0;
      var numIncorrect = 0;
      var numUnanswered = 0;
  
      // loop through to compare the text of the label with the user answers
      // Increasing score
      for (var i = 0; i < questionBank.length; i++) {
        correctAnswer = questionBank[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          numCorrect++;
        } else if (userAnswer === "") {
          numUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            numIncorrect++;
          }
        }
      }
  
      // This displays our tally
      gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
  }
  
  // Below is our array of objects with the questions, possible answers, and the correct answer
  var questionBank =
  [
    {
      question: "Tony Stark is saved from dying in outer space only with the help of who of these?",
      answers: ["Thor", "Carol Danvers", "The Guardians of the Galaxy"],
      correct: "Carol Danvers"
    },
  
    {
      question: "Which of the following Avengers is married to Pepper Potts?",
      answers: ["Tony Stark", "Peter Parker", "Thanos"],
      correct: "Tony Stark"
    },
    {
      question: "In Avengers: Infinity War, with whom are the Avengers at war?",
      answers: ["Thanos", "Ultron", "Loki"],
      correct: "Thanos"
    },
    {
      question: "This character’s main superpower is sorcery.",
      answers: ["Black Widow ", "Vision", "Dr.Strange"],
      correct: "Dr.Strange"
    },
    {
      question: "What kind of radiation caused Bruce Banner to transform into the Hulk when angry?",
      answers: ["Gamma", "Delta", "Ultra Violet"],
      correct: "Gamma"
    },
    {
      question: "What are the colors of the classic Iron Man suit?",
      answers: ["Red & Blue", "Red & Gold", "All Black"],
      correct: "Red & Gold"
    },
    {
      question: "How many Infinity Stones are in the saga?",
      answers: ["Four", "Five", "Six"],
      correct: "Six"
    },
    {
      question: "What is Captain America’s real name?",
      answers: ["Buck Rodgers", "Steve Rogers", "Reed Richards"],
      correct: "Steve Rogers"
    },
    {
      question: "Before joining the Avengers, Black Widow was a _______ .",
      answers: ["medical doctor", "Chemical Engineer", "Russian Spy"],
      correct: "Russian Spy"
    },
    {
      question: "What is Thor’s weapon?",
      answers: ["Spear", "Sword of Asgard","Hammer"],
      correct: "Hammer"
    }
  ];