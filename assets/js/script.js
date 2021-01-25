
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
var savedScores = [];           // Array to save high score objects
var savedData = false;          // Boolean to tell whether there is saved data in local storage

// This function initializes a global array of objects that contains each question, 
// its related answers, and the correct answer number.
function initializeQuestionAndAnswerArray() {
    // Add question 1, answer set, and correct answer to the global array
    questionsAndAnswers = [{
        question: "Inside which HTML element do we put the JavaScript?",
        "answer1": "<javascript>",
        "answer2": "<js>",
        "answer3": "<scripting>",
        "answer4": "<script>",
        correctAnswer: 4
      }   
    ];

    // Add question 2, answer set, and correct answer to the global array
    questionsAndAnswers.push({
        question: "What is the correct place to insert a JavaScript?",
        "answer1": "The <body> section",
        "answer2": "The <head> section",
        "answer3": "The <inner> section",
        "answer4": "Both the <head> and the <body> section",
        correctAnswer: 1
    });

    // Add question 3, answer set, and correct answer to the global array
    questionsAndAnswers.push({
        question: "What is the correct syntax for referring to an external script called xxx.js?",
        "answer1": "<script name='xxx.js'",
        "answer2": "<script href='xxx.js'",
        "answer3": "<script src='xxx.js'",
        "answer4": "<script alt='xxx.js'",
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
    // Get the question from the question and answer array amd display it in the question div.
    document.getElementById("question").innerText = questionsAndAnswers[questionNumber].question;

    // Display each answer for the question in the answers div.
    var i;

    for (i = 1; i <= 4 ; i++) {
        document.getElementById("answer" + i.toString()).innerText = i.toString() + ". " + questionsAndAnswers[questionNumber]["answer" + i.toString()];
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
    var childDiv;
    var newElement;
    var initialsDiv;
    var newAtt;
    var i = 1;

    // Stop the timer.
    clearInterval(timerInterval);

    // Replace the question text with a message telling
    // the user that they are done.
    questionSection.innerHTML = "";

    // Clear the message div.
    messageDiv.innerHTML = "";

    // Remove all the answers from the page.
    for (i = 1; i <= 4; i++) {
        childDiv = document.getElementById("answer" + i.toString());
        var removeDiv = answersDiv.removeChild(childDiv);
    }

    // ALL DONE! - Add a new div to display "All done!".
    newElement = document.createElement("div");

    // Create a class attribute for the div, give it a value,
    // and add the attribute to the div node. Set the inner
    // HTML of the div.
    newAtt = document.createAttribute("class");
    newAtt.value = "col-lg-12 big-message";
    newElement.setAttributeNode(newAtt);

    // Add an h3 element so the text apears larger.
    // Create an Id attribute for it, give it a value, 
    // and add the attribute to the h3 node.
    var subHdrElement = document.createElement("h3");
    newAtt = document.createAttribute("id");
    newAtt.value = "sub-section-header"
    subHdrElement.setAttributeNode(newAtt);

    // Set the header's text.
    subHdrElement.innerHTML = "All done!";
    newElement.appendChild(subHdrElement);

    // Append the child node to the answers div.
    answersDiv.appendChild(newElement);

    // YOUR FINAL SCORE - Add a new div to display the 
    // user's final score.
    newElement = document.createElement("div");

    // Create a class attribute for the div, give it a value,
    // and add the attribute to the div node. Set the
    // inner HTML of the div.
    newAtt = document.createAttribute("class");
    newAtt.value = "col-lg-12";
    newElement.setAttributeNode(newAtt);
    newElement.innerHTML = "Your final score is: " + currentScore.toString();

    // Set an Id attribute for this element.
    newAtt = document.createAttribute("id");
    newAtt.value = "final-score";
    newElement.setAttributeNode(newAtt);

    // Append the child node to the answers div.
    answersDiv.appendChild(newElement);

    // ENTER INITIALS - Add a new div to prompt for their initials.
    initialsDiv = document.createElement("div");

    // Create a class attribute for the div, give it a value,
    // and add the attribute to the div node. Set the 
    // inner HTML of the div.
    newAtt = document.createAttribute("class");
    newAtt.value = "col-lg-12";
    initialsDiv.setAttributeNode(newAtt);
    initialsDiv.innerHTML = "Enter your initials: ";

    // Set an Id attribute for this element.
    newAtt = document.createAttribute("id");
    newAtt.value = "enter-initials";
    initialsDiv.setAttributeNode(newAtt);

    // Append the child node to the answers div.
    answersDiv.appendChild(initialsDiv);

    // INPUT - Add an input element for their initials.
    newElement = document.createElement("input");

    // Create a size attribute for the input element,
    // set the size value, and add the attribute to
    // the input node.
    newAtt = document.createAttribute("size");
    newAtt.value = "5";
    newElement.setAttributeNode(newAtt);

    // Create an Id attribute for the input element,
    // set its value, and add the attribute to the input node.
    newAtt = document.createAttribute("id");
    newAtt.value = "user-initials";
    newElement.setAttributeNode(newAtt);
    
    // Append the input element as a child node to the initials div.
    initialsDiv.appendChild(newElement);

    // BUTTON - Add a button element to save the initials entered
    newElement = document.createElement("button");

    // Create an Id attribute for the button, set its value,
    // and add the attribute to the button node.
    newAtt = document.createAttribute("id");
    newAtt.value = "submit-btn";
    newElement.setAttributeNode(newAtt);

    // Add text to button.
    newElement.innerHTML = "Submit";

    // Append the button element as a child node to the initials div.
    initialsDiv.appendChild(newElement);

    // Get the Submit Score button object.
    btnSubmitScore = document.getElementById("submit-btn");

    // Add an event listener if it is clicked. If it is
    // clicked then run the submitScore function.
    btnSubmitScore.addEventListener("click", submitScore);
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
function displayHighScoresSection() {
  // Initialize variables.
  var subSectionDiv;
  var newElement;
  var newAtt;
  var rowBgColor = "lightgray";
  var i = 1;

  // Get any saved scores from local storage.
  savedScores = JSON.parse(localStorage.getItem("savedScores"));

  // Remove final score div and the enter initials div.
  var deleteElement = document.getElementById("final-score");
  if (deleteElement != null) {
    deleteElement.remove();
  };

  deleteElement = document.getElementById("enter-initials");
  if (deleteElement != null) {
    deleteElement.remove();
  };

  // FInd the sub-section-header element and modify the 
  // inner HTML for the High Scores page.
  subSectionDiv = document.getElementById("sub-section-header");
  subSectionDiv.textContent = "High Scores";
  subSectionDiv.setAttribute("style", "text-align: center");

  // Create a new row div.
  var newRow = document.createElement("div");
  newAtt = document.createAttribute("class");
  newAtt.value = "row";
  newRow.setAttributeNode(newAtt);

  // Append the child node to the answers div.
  answersDiv.appendChild(newRow);

  // // Create a new div element and a class attribute for it.
  // newElement = document.createElement("div");
  // newAtt = document.createAttribute("class");
  // newAtt.value = "col-lg-2";
  // newElement.setAttributeNode(newAtt);

  // Append the child node to the answers div.
  // newRow.appendChild(newElement);

  // Create a new div for the high score place column.
  newElement = document.createElement("div");
  newAtt = document.createAttribute("class");
  newAtt.value = "col-lg-2";
  newElement.setAttributeNode(newAtt);

  // Append the child node to the answers div.
  newRow.appendChild(newElement);

  // Create a new div for the Score column
  newElement = document.createElement("div");
  newAtt = document.createAttribute("class");
  newAtt.value = "col-lg-3";
  newElement.setAttributeNode(newAtt);
  newElement.innerHTML = "Score";

  // Append the child node to the answers div.
  newRow.appendChild(newElement);

  // Create a new div for the Initials column
  newElement = document.createElement("div");
  newAtt = document.createAttribute("class");
  newAtt.value = "col-lg-3";
  newElement.setAttributeNode(newAtt);
  newElement.innerHTML = "Initials";

  // Append the child node to the row div.
  // Then append the div to the answers section.
  newRow.appendChild(newElement);
  answersDiv.appendChild(newRow);

  // Display the saved scores.
  var totalScores = parseInt(savedScores.length);
  
  // Display the scores and initials for 
  // the high scores page.
  for (var i = 0; i < totalScores; i++) {
    // Create a new row.
    newRow = document.createElement("div");
    newAtt = document.createAttribute("class");
    newAtt.value = "row";
    newRow.setAttributeNode(newAtt);
    newAtt = document.createAttribute("style");
    rowBgColor = (rowBgColor === "lightgray" ? "white" : "lightgray");
    newAtt.value = "background-color:" + rowBgColor;
    newRow.setAttributeNode(newAtt);

    // Create a new div element and a class attribute for it.
    // Append it to the new row.
    // newElement = document.createElement("div");
    // newAtt = document.createAttribute("class");
    // newAtt.value = "col-lg-2";
    // newElement.setAttributeNode(newAtt);
    // newRow.appendChild(newElement);

    // Create a new div for the high score order column.
    // Set the value to display and append it to the new row.
    newElement = document.createElement("div");
    newAtt = document.createAttribute("class");
    newAtt.value = "col-lg-2";
    newElement.setAttributeNode(newAtt);
    newElement.textContent = (i + 1).toString();
    newRow.appendChild(newElement);

    // Create a new div for the Score column.
    // Set the value from the saved array and 
    // append it to the new row.
    newElement = document.createElement("div");
    newAtt = document.createAttribute("class");
    newAtt.value = "col-lg-3";
    newElement.setAttributeNode(newAtt);
    newElement.innerHTML = savedScores[i].score;
    newRow.appendChild(newElement);

    // Create a new div for the Initials column.
    // Set the value from the saved array and
    // append it to the new row.
    newElement = document.createElement("div");
    newAtt = document.createAttribute("class");
    newAtt.value = "col-lg-3";
    newElement.setAttributeNode(newAtt);
    newElement.innerHTML = savedScores[i].initials;

    // Append the child node to the row div.
    // Then append the div to the answers section.
    newRow.appendChild(newElement);
    answersDiv.appendChild(newRow);
  };

  // BUTTON - Add a button element to clear the saved 
  // scores.
  newRow = document.createElement("div");
  newAtt = document.createAttribute("class");
  newAtt.value = "row";
  newRow.setAttributeNode(newAtt);


  newElement = document.createElement("div");
  newAtt = document.createAttribute("class");
  newAtt.value = "col-lg-12 button-row";
  newElement.setAttributeNode(newAtt);
  
  var newBtn = document.createElement("button");

  // Create an Id attribute for the button, set its value,
  // and add the attribute to the button node.
  newAtt = document.createAttribute("id");
  newAtt.value = "clear-scores-btn";
  newBtn.setAttributeNode(newAtt);

  // Add text to button.
  newBtn.innerHTML = "Clear Scores";

  // Append the button element as a child node to the row div.
  // Append the row to the answers div.
  newElement.appendChild(newBtn)
  newRow.appendChild(newElement);
  answersDiv.appendChild(newRow);

  // Get the Clear Scores button object.
  btnClearScores = document.getElementById("clear-scores-btn");

  // Add an event listener if it is clicked. If it is
  // clicked then run the clearScore function.
  btnClearScores.addEventListener("click", clearScores);

}
function clearScores() {
  // If the Clear Scores button was clicked, clear the savedScores item
  // in local storage.
  console.log("hello");
  localStorage.removeItem("savedScores");
  displayHighScoresSection();
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
