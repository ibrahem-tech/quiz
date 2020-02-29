var result = document.getElementById("result");
var timer = document.getElementById("countDownTimer");
var time = questions.length * 15;
var timerID;
var currentQuestionIndex = 0;
var endScreenEl = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");


function startQuiz() {
  
  endScreenEl.style.display = "none";
  timerID = setInterval(countDownTimer, 1000);
  timer.textContent = time;
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  const questionTextArea = document.getElementById("text");
  questionTextArea.textContent = currentQuestion.title;
  const choicesEl = document.getElementById("option-buttons");
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function (choice) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice btn");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = choice;
    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick(event) {

  var answer = event.target.textContent;
  var correct = questions[currentQuestionIndex].answer;
  if (correct === answer) {
    result.textContent = "Last answer was CORRECT";
  } else {
    time -= 15;
    result.textContent = "Well that was a hard no";
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();

  }
}

function countDownTimer() {
  time--;
  timer.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function quizEnd() {
  clearInterval(timerID);
   endScreenEl.style.display = "block";
   finalScore.textContent = time;
    var submitBtn = document.getElementById("submit");
  submitBtn.onclick = function (event) {

    
    var initials = document.getElementById("initials");
    userInitials = initials;
    localStorage.setItem(userInitials, time)
    var scores = document.getElementById("scores");
    scores.textContent = JSON.parse(localStorage.getItem());
    

  };
}

function getScores() {

}

startQuiz();