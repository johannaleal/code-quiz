function initializeQuiz() {

    var quizQAs = {
        question : null,
        answer1 : null,
        answer2 : null,
        answer3 : null,
        answer4 : null,
        correctAnswer : 0
    };

    quizQAs.question = "Inside which HTML element do we put the JavaScript?";
    quizQAs.answer1 = "<javascript>";
    quizQAs.answer2 = "<js>";
    quizQAs.answer3 = "<scripting>";
    quizQAs.answer4 = "<script>";
    quizQAs.correctAnswer = 4;

    var questionsAndAnswers = [quizQAs];

    quizQAs.question = "What is the correct place to insert a JavaScript?";
    quizQAs.answer1 = "The <body> section";
    quizQAs.answer2 = "The <head> section";
    quizQAs.answer3 = "The <inner> section";
    quizQAs.answer4 = "Both the <head> and the <body> section";
    quizQAs.correctAnswer = 1;

    questionsAndAnswers.push(quizQAs);

    quizQAs.question = "What is the correct syntax for referring to an external script called xxx.js?";
    quizQAs.answer1 = "<script name='xxx.js'";
    quizQAs.answer2 = "<script href='xxx.js'";
    quizQAs.answer3 = "<script src='xxx.js'";
    quizQAs.answer4 = ",script alt='xxx.js'";
    quizQAs.correctAnswer = 3;

    questionsAndAnswers.push(quizQAs);

    quizQAs.question = "How do you write 'Hello World' in an alert box?";
    quizQAs.answer1 = "msg('Hello World');";
    quizQAs.answer2 = "msgBox('Hello World');";
    quizQAs.answer3 = "alert('Hello World');";
    quizQAs.answer4 = "alertBox('Hello World');";
    quizQAs.correctAnswer = 3;

    questionsAndAnswers.push(quizQAs);

}

initializeQuiz();