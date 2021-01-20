// DECLARATIONS

// Question and answers object array
var questionsAndAnswers = [];

// Set current question.
var currentQuestion;

// Correct answer of current question.
var correctAnswer = 0;

// Total score
var score = 0;

// Store Start Quiz button object.
var btnStartQuiz = document.getElementById("start-quiz-btn");

// Get answers div object and store.
var answersDiv = document.getElementById("answers");

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
            document.getElementById("message").innerText = "Correct!";
        }
        else {
            document.getElementById("message").innerText = "Wrong!";
        }

        // Display the next question.
        currentQuestion++;
        displayQandA(currentQuestion);
    };
});

btnStartQuiz.addEventListener("click", function() {
    // If the Start Quiz button was clicked do the following:
    
    // Set the timer.
    setTimer();

    // Initialize the quiz questions and answers object array.
    initializeQuestionAndAnswerArray();

    // Remove the Start Quiz button.
    btnStartQuiz.remove();

    // Display the first question and related answers.
    currentQuestion = 0;
    displayQandA(currentQuestion);
    //correctAnswer = getCorrectAnswer(currentQuestion);

    //checkForAnswerClicked();

});

// initializeQuestionAndAnswerArray initializes a global array of objects that contains each question, 
// its related answers, and the correct answer number.
function initializeQuestionAndAnswerArray() {
    // Add question 1, answer set, and correct answer to the global array
    questionsAndAnswers = [
        {
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
        "answer4": ",script alt='xxx.js'",
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
};

function setTimer() {

};

// This function will display the question and related answers using the the question
// number passed in as a parameter.
function displayQandA(questionNumber) {
    // Clear any messages from previous question.
    //document.getElementById("message").innerText = "";

    // Get the question from the question and answer array amd display it in the question div.
    document.getElementById("question").innerText = questionsAndAnswers[questionNumber].question;

    // Display each answer for the question in the answers div.
    for ( i = 1; i <= 4 ; i++ ) {
        document.getElementById("answer" + i.toString()).innerText = i.toString() + ". " + questionsAndAnswers[questionNumber]["answer" + i.toString()];
    };

    // Get the correct answer number for this question and store it
    // in a global variable.
    correctAnswer = getCorrectAnswer(currentQuestion);
};

// Get the correct answer from the questions and answers array for the
// question number passed in as a parameter.
function getCorrectAnswer(answerNum) {

    return questionsAndAnswers[answerNum].correctAnswer;

};

// function checkForAnswerClicked() {
//     answersDiv.addEventListener("click", function(event) {
//         var element = event.target;

//         if (element.matches("div")) {
//             console.log(element.innerText);
//         }
//     });
// }

// function addAnswerRows() {

//     // answersDiv.removeChild(answersDiv.getElementsByTagName("<p>"));
//     var node = document.createElement("div");
//     node.className = "row";

//     answersDiv.appendChild(node);

//     node.className = "col-lg-4";
//     answersDiv.appendChild(node);
// }