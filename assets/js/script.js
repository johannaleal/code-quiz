var btnStartQuiz = document.getElementById("start-quiz-btn");

var answersDiv = document.getElementById("answers");

// Question and answers object array
var questionsAndAnswers = [];

btnStartQuiz.addEventListener("click", function() {
    // If the Start Quiz button was clicked, initialize the 
    // quiz questions and answers object array
    initializeQuestionAndAnswerArray();

    // Add answer rows to answers column.
    addAnswerRows();

    // Display the first question and related answers.
    displayQandA(0);

});

// initializeQuestionAndAnswerArray initializes a global array of objects that contains each question, 
// its related answers, and the correct answer number.
function initializeQuestionAndAnswerArray() {
    // Add question 1, answer set, and correct answer to the global array
    questionsAndAnswers = [
        {
            question: "Inside which HTML element do we put the JavaScript?",
            answer1: "<javascript>",
            answer2: "<js>",
            answer3: "<scripting>",
            answer4: "<script>",
            correctAnswer: 4
        }
    ];

    // Add question 2, answer set, and correct answer to the global array
    questionsAndAnswers.push({
        question: "What is the correct place to insert a JavaScript?",
        answer1: "The <body> section",
        answer2: "The <head> section",
        answer3: "The <inner> section",
        answer4: "Both the <head> and the <body> section",
        correctAnswer: 1
    });

    // Add question 3, answer set, and correct answer to the global array
    questionsAndAnswers.push({
        question: "What is the correct syntax for referring to an external script called xxx.js?",
        answer1: "<script name='xxx.js'",
        answer2: "<script href='xxx.js'",
        answer3: "<script src='xxx.js'",
        answer4: ",script alt='xxx.js'",
        correctAnswer: 3
    });

    // Add question 4, answer set, and correct answer to the global array
    questionsAndAnswers.push({
        question: "How do you write 'Hello World' in an alert box?",
        answer1: "msg('Hello World');",
        answer2: "msgBox('Hello World');",
        answer3: "alert('Hello World');",
        answer4: "alertBox('Hello World');",
        correctAnswer: 3
    });
}

function displayQandA(questionNumber) {

    document.getElementById("question").innerText = questionsAndAnswers[questionNumber].question;

}

function addAnswerRows() {

    // answersDiv.removeChild(answersDiv.getElementsByTagName("<p>"));
    var node = document.createElement("div");
    node.className = "row";

    answersDiv.appendChild(node);

    node.className = "col-lg-4";
    answersDiv.appendChild(node);
}