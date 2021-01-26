
// Store DOM objects
var timerElement = document.querySelector("#timer");           // timer div
var btnStartQuiz = document.getElementById("start-quiz-btn");  // Start Quiz button
var questionSection = document.getElementById("question");     // question div
var mainSection = document.getElementById("main-section");    // answers section
var answersDiv = document.getElementById("answers");          // answers div
var messageDiv = document.getElementById("message");          // message div

// Initialize global variables
var questionsAndAnswers = [];   // Question and answers object array
var currentQuestion = 0;        // Set current question.
var correctAnswer = 0;          // Correct answer of current question.
var currentScore = 0;           // Current score
var timeLeft = 76;              // Initialize time remaining.
var quizEnded = false;          // Flag telling us quiz ended.
var timerInterval;              // Timer interval
var btnSubmitScore;             // Submit score button
var btnClearScores;             // Clear scores button
var btnGoBack;                  // Go Back button to restart the quiz
var savedScores = [];           // Array to save high score objects

// This function initializes a global array of objects that contains each question, 
// its related answers, and the correct answer number.
function initializeQuestionAndAnswerArray() {
    // Add question 1, answer set, and correct answer to the global array
    questionsAndAnswers = [{
        question: "Inside which HTML element do we put the JavaScript?",
        "answer1": "&lt;javascript&gt;",
        "answer2": "&lt;js&gt;",
        "answer3": "&lt;scripting&gt;",
        "answer4": "&lt;script&gt;",
        correctAnswer: 4
      }   
    ];

    // Add question 2, answer set, and correct answer to the global array
    questionsAndAnswers.push({
        question: "What is the correct place to insert a JavaScript?",
        "answer1": "The &lt;body&gt; section",
        "answer2": "The &lt;head&gt; section",
        "answer3": "The &lt;inner&gt; section",
        "answer4": "Both the &lt;head&gt; and the <body> section",
        correctAnswer: 1
    });

    // Add question 3, answer set, and correct answer to the global array
    questionsAndAnswers.push({
        question: "What is the correct syntax for referring to an external script called xxx.js?",
        "answer1": "&lt;script name='xxx.js'",
        "answer2": "&lt;script href='xxx.js'",
        "answer3": "&lt;script src='xxx.js'",
        "answer4": "&lt;script alt='xxx.js'",
        correctAnswer: 3
    });

    // Add question 4, answer set, and correct answer to the global array
    questionsAndAnswers.push({
        question: "How do you write 'Hello World' in an alert box?",
        "answer1": "msg('Hello World');",
        "answer2": "msgBox('Hello World');",
        "answer3": "alert('Hello World');",
        "answer4": "alertBox('Hello World');",
        correctAnswer: 3
    });
}

// Get the correct answer from the questions and answers array for the
// question number passed in as a parameter.
function getCorrectAnswer(answerNum) {

    return questionsAndAnswers[answerNum].correctAnswer;
}

// This function will display the question and related answers using the the question
// number passed in as a parameter.
function displayQandA(questionNumber) {
    // Get DOM elements to process question and answers.
    var answersDiv = document.getElementById("answers");

    // Get the question from the question and answer array amd display it in the question div.
    document.getElementById("question").innerText = questionsAndAnswers[questionNumber].question;

    // Display each answer for the question in the answers div.
    for (var i = 1; i <= 4 ; i++) {
        // Only create the HTML elements if this is the first question.
        // Otherwise just replace the inner HTML.
        if (questionNumber === 0) {
          var newElement = document.createElement("div");

          // Set the attributes for each answer div.
          // var newAtt = document.createAttribute("class");
          newElement.setAttribute("class", "col-lg-12");
          newElement.setAttribute("id", "answer" + i.toString());
          newElement.setAttribute("data-number", i.toString());
        }
        else {
          var newElement = document.getElementById("answer" + i);
        };

        // Get the answer text from the questions and answer array.
        newElement.innerHTML = i.toString() + ". " + questionsAndAnswers[questionNumber]["answer" + i];

        // Append this div to the answers div.
        answersDiv.appendChild(newElement);
    }

    // Get the correct answer number for this question and store it
    // in a global variable.
    correctAnswer = getCorrectAnswer(currentQuestion);
}

// This will check if one of the answers is clicked in the answers div.
answersDiv.addEventListener("click", function(event) {
  var element = event.target;
  var userAnswer;

  if (element.matches("div")) {
    // Get the answer number that the user clicked.
    userAnswer = Number(element.getAttribute("data-number"));

    // If the user's selected answer matches the correct answer
    // for the question, display a message stating that they won.
    if (userAnswer === correctAnswer ) {
      messageDiv.innerText = "Correct!";
    }
    else {
      messageDiv.innerText = "Wrong!";

      // When the user answers incorrectly, penalize by reducing
      // timer by 10 seconds.
      timeLeft = timeLeft - 10;
      timerElement.innerHTML = timeLeft;
    }

    // Display the next question if there are any more questions left.
    currentQuestion++;

    if ( currentQuestion < 4 ) {
      displayQandA(currentQuestion);
    }
    else {
      currentScore = timeLeft;
      displayFinalScoreSection(currentScore);
    }
  }
});

// This function will display the screen where the user can enter their initials
// once the quiz is over.
function displayFinalScoreSection() {
    // Initialize variables.
    // var childDiv;
    var newElement;
    var initialsDiv;
    var newAtt;
    var i = 1;

    // Clear certain content from previous functions.
    clearContent();

    // ALL DONE! - Display "All done!".
    var subHdrElement = document.getElementById("sub-section-header");
    subHdrElement.innerHTML = "All done!";

    // YOUR FINAL SCORE - Add a new div to display the 
    // user's final score.
    newElement = document.createElement("div");

    // Set the class attribute, the Id, the inner HTML of the div.
    newElement.setAttribute("class", "col-lg-12");
    newElement.setAttribute("id", "final-score");
    newElement.innerHTML = "Your final score is: " + currentScore.toString();

    // Append the child node to the answers div.
    answersDiv.appendChild(newElement);

    // ENTER INITIALS - Add a new div to prompt for their initials.
    // Set the class attribute, Id, and inner HTML of the div.
    initialsDiv = document.createElement("div");
    initialsDiv.setAttribute("class", "col-lg-12");
    initialsDiv.setAttribute("id", "enter-initials");
    initialsDiv.innerHTML = "Enter your initials: ";

    // Append the child node to the answers div.
    answersDiv.appendChild(initialsDiv);

    // INPUT - Add an input element for their initials.
    // Set the size and Id of the input box.
    newElement = document.createElement("input");
    newElement.setAttribute("size", "5");
    newElement.setAttribute("id", "user-initials");
    
    // Append the input element as a child node to the initials div.
    initialsDiv.appendChild(newElement);

    // BUTTON - Add a button element to save the initials entered.
    // Set the Id of the button and text.
    newElement = document.createElement("button");
    newElement.setAttribute("id", "submit-btn");
    newElement.innerHTML = "Submit";

    // Append the button element as a child node to the initials div.
    initialsDiv.appendChild(newElement);

    // Get the Submit Score button object.
    btnSubmitScore = document.getElementById("submit-btn");

    // Add an event listener if it is clicked. If it is
    // clicked then run the submitScore function.
    btnSubmitScore.addEventListener("click", submitScore);
}

function clearContent() {

  var childDiv;

  // Stop the timer.
  clearInterval(timerInterval);

  // Clear the question section in case you are coming from 
  // the View High Scores link.
  questionSection.innerHTML = "";

  // Remove all the answers from the page.
  if (answersDiv) {
    for (i = 1; i <= 4; i++) {
        childDiv = document.getElementById("answer" + i.toString());
        if (childDiv) {
          answersDiv.removeChild(childDiv);
        };
    };
  };

}

// This will save the score entered in the input box after the
//  Submit button is clicked on the final score page.
function submitScore() {
  // Get the value entered in the initials input box.
  var userInits = document.getElementById("user-initials").value;
  
  // Initials are required. Display an error message if they
  // were not entered.
  if (userInits ==  "") {
    alert("Initials must be entered in order to save them.");
  }
  // Save the score.
  else {
    // Save the latest score and initials to the scores array.
    var currentScoreObject = {initials: userInits.toUpperCase(), score: currentScore};

    // Save current initials and score to global array.
    savedScores = savedScores || [];
    savedScores.push(currentScoreObject);
   
    // Save the array in local storage for later display.
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
  };

    // Display a list of high scores. This page will be dynamically
    // created.
    displayHighScoresSection();
}

// This function will display the high scores page where user initials
// and scores will be displayed by descending score order.
function displayHighScoresSection(requestor) {
  // Initialize variables.
  var subSectionDiv;
  var newElement;
  var rowBgColor = "lightgray";
  var i = 1;

   // Clear the message div and time i nheader.
   messageDiv.innerHTML = "";
   timerElement.innerHTML = "";

  // Get any saved scores from local storage.
  savedScores = JSON.parse(localStorage.getItem("savedScores"));

  // If this function was called from the View High Scores
  // link stop the timer and clear certain contant that 
  // may exist from other functions.
  if (requestor === "link") {
    clearContent();

    // Remove the Start Quiz button if it exists on the page.
    deleteElement = document.getElementById("start-quiz-btn");
    if (deleteElement) {
      deleteElement.remove();
    };

    deleteElement = document.getElementById("high-scores-section");
    if (deleteElement) {
      deleteElement.remove();
    };
  };

  // Remove final score div and the enter initials div.
  var deleteElement = document.getElementById("final-score");
  if (deleteElement) {
    deleteElement.remove();
  };

  deleteElement = document.getElementById("enter-initials");
  if (deleteElement) {
    deleteElement.remove();
  };

  // Find the sub-section-header element and modify the 
  // inner HTML for the High Scores page.
  subSectionDiv = document.getElementById("sub-section-header");
  subSectionDiv.textContent = "High Scores";
  subSectionDiv.setAttribute("style", "text-align: center");

   // Create a new section for the high scores list, 
  // set an Id for it, and append it to the answers div.
  var highScoresSection = document.createElement("section");
  highScoresSection.setAttribute("id", "high-scores-section");
  answersDiv.appendChild(highScoresSection);

  // Create a new row div.
  var newRow = document.createElement("div");
  newRow.setAttribute("class", "row");
  newRow.setAttribute("style", "background-color: lightskyblue");

  // Append the child node to the answers div.
  highScoresSection.appendChild(newRow);

  // Create a new div for the high score place column.
  newElement = document.createElement("div");
  newElement.setAttribute("class", "col-lg-2");

  // Append the child node to the answers div.
  newRow.appendChild(newElement);

  // Create a new div for the Score column
  newElement = document.createElement("div");
  newElement.setAttribute("class", "col-lg-3");
  newElement.innerHTML = "Score";

  // Append the child node to the answers div.
  newRow.appendChild(newElement);

  // Create a new div for the Initials column
  newElement = document.createElement("div");
  newElement.setAttribute("class", "col-lg-3");
  newElement.innerHTML = "Initials";

  // Append the child node to the row div.
  // Then append the div to the answers section.
  newRow.appendChild(newElement);
  highScoresSection.appendChild(newRow);

  // Display the saved scores.
  var totalScores;
  
  if (savedScores) {
    // Get the total number of scores that are stored.
    totalScores = parseInt(savedScores.length);
    
    // Sort the scores in descending order.
    savedScores.sort((a, b) => parseInt(b.score) - parseInt(a.score));
  };

  // Display the scores and initials for 
  // the high scores page.
  for (var i = 0; i < totalScores; i++) {
    // Create a new row.
    newRow = document.createElement("div");
    newRow.setAttribute("class", "row");
    rowBgColor = (rowBgColor === "lightgray" ? "white" : "lightgray");
    newRow.setAttribute("style", "background-color:" + rowBgColor);

    // Create a new div for the high score order column.
    // Set the value to display and append it to the new row.
    newElement = document.createElement("div");
    newElement.setAttribute("class", "col-lg-2");
    newElement.textContent = (i + 1).toString();
    newRow.appendChild(newElement);

    // Create a new div for the Score column.
    // Set the value from the saved array and 
    // append it to the new row.
    newElement = document.createElement("div");
    newElement.setAttribute("class", "col-lg-3");
    newElement.innerHTML = savedScores[i].score;
    newRow.appendChild(newElement);

    // Create a new div for the Initials column.
    // Set the value from the saved array and
    // append it to the new row.
    newElement = document.createElement("div");
    newElement.setAttribute("class", "col-lg-3");
    newElement.innerHTML = savedScores[i].initials;

    // Append the child node to the row div.
    // Then append the div to the answers section.
    newRow.appendChild(newElement);
    highScoresSection.appendChild(newRow);
  };

  // BUTTONS - Add a row wher the Clear Scores button 
  // and Go Back buttons will display.
  // scores.
  newRow = document.createElement("div");
  newRow.setAttribute("class", "row");

  newElement = document.createElement("div");
  newElement.setAttribute("class", "col-lg-12 button-row");
  
  // Create and set attributes for the Clear Scores button.
  var newBtn = document.createElement("button");
  newBtn.setAttribute("id", "clear-scores-btn");
  newBtn.innerHTML = "Clear Scores";

  // Append the button element as a child node to the row div.
  newElement.appendChild(newBtn)
  newRow.appendChild(newElement);
  highScoresSection.appendChild(newRow);

  // Create and set attributes for the Go Back button.
  newBtn = document.createElement("button");
  newBtn.setAttribute("id", "go-back-btn");
  newBtn.innerHTML = "Go Back";

  // Append the button element as a child node to the row div.
  // Append the row to the answers div.
  newElement.appendChild(newBtn)
  newRow.appendChild(newElement);
  highScoresSection.appendChild(newRow);
  answersDiv.appendChild(highScoresSection);

  // Get the Clear Scores button object.
  btnClearScores = document.getElementById("clear-scores-btn");

  // Add an event listener if it is clicked. If it is
  // clicked then run the clearScore function.
  btnClearScores.addEventListener("click", clearScores);

  // Get the Go Back button object.
  btnGoBack = document.getElementById("go-back-btn");

  // Add an event listener if it is clicked. If it is
  // clicked then run the Start Quiz function.
  btnGoBack.addEventListener("click", reLoad);

}
function clearScores() {
  // If the Clear Scores button was clicked, clear the savedScores item
  // in local storage.
  localStorage.removeItem("savedScores");

  // Clear the global saved scores arry.
  savedScores = [];

  var deleteElement = document.getElementById("high-scores-section");
  if (deleteElement != null) {
    deleteElement.remove();
  };

  displayHighScoresSection();
}

function reLoad() {
  // To restart the quiz, reload the page.
  location.reload();
}

function startQuiz() {
  // Initialize the quiz questions and answers object array.
  initializeQuestionAndAnswerArray();

  // Get any saved scores from local storage.
  savedScores = JSON.parse(localStorage.getItem("savedScores"));

  if (savedScores != null) {
    saveData = true;
  }

  // Remove the Start Quiz button.
  btnStartQuiz.remove();

  // Display the first question and related answers.
  currentQuestion = 0;
  displayQandA(currentQuestion);

  // Set timer interval.
  timerInterval = setInterval(function() {
    // Decrement timer and display the new value.
    timeLeft--;
    timerElement.innerHTML = timeLeft;
    
    // If the timer has run out, the game is over so
    // display the score.
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      displayFinalScoreSection();
    }
  }, 1000);
}

// If the Start Quiz button was clicked, start the quiz.
btnStartQuiz.addEventListener("click", startQuiz);
