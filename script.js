var startBtnEl = document.getElementById("start-btn");
var titleEl = document.getElementById("title");
var quizContentEl = document.getElementById("quiz-content");
var questionEl = document.getElementById("question");
var optionEl = document.querySelectorAll("option");
var choice1El = document.getElementById("A");
var choice2El = document.getElementById("B");
var choice3El = document.getElementById("C");
var choice4El = document.getElementById("D");
var timerEl = document.getElementById("timer");
var timeLeftEl = document.getElementById("timeLeft");
var gameOverEl = document.getElementById("gameOver");
var youWinEl = document.getElementById("youWin");
var viewScoresEl = document.getElementById("viewScores");
var highScoreInputEl = document.getElementById("highScore");
var correctOrNotEl = document.getElementById("correctOrNot");
var playAgainEl = document.getElementById("playAgain");
var submitEl = document.getElementById("submit");
var scoreListEl = document.getElementById("highScoreList");
var backBtnEl = document.getElementById("backBtn");

 console.log("choice1El's value is: " + choice1El.value)

 
 //Array of high scorers
 


//Array of questions with answer key
var questions = [
    {
     question: "What is the DOM?",
     A: "A: Document Object Module",
     B: "B: Document On Machine",
     C: "C: Dominant Object Mathematics",
     D: "D: Duck Obfuscating Monopoly",
     correct: "A"
     },
     {
     question: "What is an 'event listener'?",
     A: "A: An application used to track current events",
     B: "B: A person who listens to an event",
     C: "C: A JavaScript property used to detect user input in various forms",
     D: "D: A device used to record live events",
     correct: "C"
     },
     {
     question: "What is an API?",
     A: "A: A Perfect Insult",
     B: "B: Application Plugged Into",
     C: "C: All Properties In",
     D: "D: Application Programming Interface",
     correct: "D"
     }
]

console.log(questions[0].correct);

var timeLeft = 0;

function setTime() {
       timeLeft = 100;
        var timer = setInterval(function() {
          if(timeLeft > 1) {
          timeLeftEl.textContent = "Time remaining: " + timeLeft + " seconds.";
          timeLeft--;
        } 
          else if (timeLeft === 1) {
            timeLeftEl.textContent = "Time remaining: " + timeLeft + " second.";
            timeLeft--;
          } else if (timeLeft <= 0) {
            clearInterval(timer);
            timeLeftEl.textContent = "";
            correctOrNotEl.textContent = "";
            gameOver();
          }
        }, 1000)
      }
    

function gameOver() {
    quizContentEl.style.display = "none";
    gameOverEl.style.display = "flex";
}

var score;
var scorerProfile;
var highScorers = [];

function youWin(score, scorerProfile) {
  quizContentEl.style.display = "none";
  youWinEl.style.display = "flex";
  
  
  var highScore = localStorage.setItem("score", score, scorerProfile);
  highScorers.push(highScore);
}

playAgainEl.addEventListener("click", startQuiz);

startBtnEl.addEventListener("click", startQuiz);
    
submitEl.addEventListener("click", function handleSubmit(event) {
// create user object from submission
var scorerProfile = {
    initials: highScoreInputEl.value.trim(),
    score: score
  };

  // set new submission to local storage 
  localStorage.setItem("scorer", JSON.stringify(scorerProfile));

  viewScores();
  
});

let showQuiz = function() {
  youWinEl.style.display = "none";
    gameOverEl.style.display = "none"; 
  titleEl.style.display = "none";
  viewScoresEl.style.display = "none";
    quizContentEl.style.display = "flex";
}

backBtnEl.addEventListener("click", returnHome);

function returnHome() {
  scoreListEl.style.display = "none";
  titleEl.style.display = "flex";
  backBtnEl.style.display = "none";
  viewScoresEl.style.display = "block";
}

viewScoresEl.addEventListener("click", viewScores);

function viewScores() {
backBtnEl.style.display = "flex";
 viewScoresEl.style.display = "none";
 youWinEl.style.display = "none";
 gameOverEl.style.display = "none"; 
 titleEl.style.display = "none";
 quizContentEl.style.display = "none";
 scoreListEl.style.display = "flex";
 

var scores = localStorage.getItem(scorer);

for (let i = 0; i < scores.length; i++) {
   var listItem = document.createElement('li');
   listItem.textContent = scores[i];
   scoreListEl.appendChild(listItem);
}
};
      
function startQuiz() {
    //titleEl.style.display = "none";
    //quizContentEl.style.display = "flex";
    showQuiz();
    setTime();
    let i = 0;
    var answered = 0;
        questionEl.textContent = questions[i].question;
        choice1El.textContent = questions[i].A;
        choice2El.textContent = questions[i].B;
        choice3El.textContent = questions[i].C;
        choice4El.textContent = questions[i].D;

function checkAnswer(event) {
  var selected = event.target;

  console.log("the event target is " + selected);
  if (i < questions.length && timeLeft > 0) {
      if (selected.value == questions[i].correct){
        correctOrNotEl.textContent = "Great job, that is correct!";
        console.log(i);
        i++;
        answered++;
        
        questionEl.textContent = questions[i].question;
        choice1El.textContent = questions[i].A;
        choice2El.textContent = questions[i].B;
        choice3El.textContent = questions[i].C;
        choice4El.textContent = questions[i].D;
        }
        else if (timeLeft > 5 && selected.value != questions[i].correct) {
        correctOrNotEl.textContent = "Try again."
        timeLeft -= 5;
        } else if (timeLeft < 5 && selected.value != questions[i].correct ) {
          correctOrNotEl.textContent = "Try again."
        }
} else if (questions[i] == undefined && timeLeft >= 0) {
  clearInterval(timer);
  let score = answered * questions.length + timeLeft;

  youWin(score);
} else if (timeLeft == 0) {
  clearInterval(timer);
  gameOver();
}
}
        console.log(questions[i])

        
        choice1El.addEventListener("click", checkAnswer);
        choice2El.addEventListener("click", checkAnswer);
        choice3El.addEventListener("click", checkAnswer);
        choice4El.addEventListener("click", checkAnswer);


        console.log(score);


    };