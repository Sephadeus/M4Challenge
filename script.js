const startBtnEl = document.getElementById("start-btn");
const titleEl = document.getElementById("title");
const quizContentEl = document.getElementById("quiz-content");
const questionEl = document.getElementById("question");
const optionEl = document.querySelectorAll("option");
const choice1El = document.getElementById("A");
const choice2El = document.getElementById("B");
const choice3El = document.getElementById("C");
const choice4El = document.getElementById("D");
const timerEl = document.getElementById("timer");
const timeLeftEl = document.getElementById("timeLeft");
const gameOverEl = document.getElementById("gameOver");
const youWinEl = document.getElementById("youWin");
const viewScoresEl = document.getElementById("viewScores");
const scoresEl = document.getElementById("scores");
const currentScoreEl = document.getElementById("currentScore");
const highScoreInputEl = document.querySelector("#highScore");
const correctOrNotEl = document.getElementById("correctOrNot");
const playAgainEl = document.getElementById("playAgain");
const submitEl = document.getElementById("submit");
const scoreListEl = document.getElementById("highScoreList");
const backBtnEl = document.getElementById("backBtn");

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

//Sets interval for question card to pause before displaying the next set
var timeLeft = 0;
var cardTimeLeft = 0;

function cardTime() {
 
  cardTimeLeft = 1;
 
  var cardTimer = setInterval(function() {
 
    if(cardTimeLeft > 0) {
 
      cardTimeLeft--;
 
    } else if (i == questions.length - 1){
 
      clearInterval(cardTimer);
    clearInterval(timer);
    correctOrNotEl.textContent = "";
    timerEl.textContent = "";
    youWin();
  }
 
  else {
      clearInterval(cardTimer);
      correctOrNotEl.textContent = "";
      i++;

      questionEl.textContent = questions[i].question;
        choice1El.textContent = questions[i].A;
        choice2El.textContent = questions[i].B;
        choice3El.textContent = questions[i].C;
        choice4El.textContent = questions[i].D;
    }
  }, 1000)
}

//Displays the quiz timer
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
    
//Displays the game over screen
function gameOver() {
    quizContentEl.style.display = "none";
    gameOverEl.style.display = "flex";
}


//Calculates score and submits it to local storage along with user initials
let score;
var scorerProfile;
let highScorers= [];

submitEl.addEventListener("click", function handleSubmit(event) {
  event.preventDefault();
  JSON.parse(localStorage.getItem("scores"));
  console.log(localStorage.getItem("scores"));
// Create user object from submission
var scorerProfile = {
  name: highScoreInputEl.value.trim(),
  score: score
}

highScorers.push(scorerProfile);
localStorage.setItem("scores", JSON.stringify(scorerProfile));
  //Pushes profile to the high scorer array
  console.log(highScoreInputEl.value);
  console.log(scorerProfile);

  viewScores();
  event.stopPropagation();
});

//Displays the victory screen
function youWin(score) {
  quizContentEl.style.display = "none";
  youWinEl.style.display = "flex";
  currentScoreEl.textContent = "Your score is: " + score;
}

//Adds event listener to play again button for player
playAgainEl.addEventListener("click", startQuiz);

//Adds event listener to start quiz
startBtnEl.addEventListener("click", startQuiz);
    
//Display only the quiz and hide any possible open windows
let showQuiz = function() {
  youWinEl.style.display = "none";
    gameOverEl.style.display = "none"; 
  titleEl.style.display = "none";
  viewScoresEl.style.display = "none";
    quizContentEl.style.display = "flex";
}

//Returns the user to the "home page"
backBtnEl.addEventListener("click", returnHome);

function returnHome() {
  scoreListEl.style.display = "none";
  titleEl.style.display = "flex";
  backBtnEl.style.display = "none";
  viewScoresEl.style.display = "block";
}

//Allows the user to view the current high scores
viewScoresEl.addEventListener("click", viewScores);

function viewScores() {
backBtnEl.style.display = "flex";
 viewScoresEl.style.display = "none";
 youWinEl.style.display = "none";
 gameOverEl.style.display = "none"; 
 titleEl.style.display = "none";
 quizContentEl.style.display = "none";
 scoreListEl.style.display = "flex";
 

let scores = localStorage.getItem("scores");
console.log(scores)

for (let score in scores) {
   var listItem = document.createElement('li');
   listItem.textContent = this.score;
   scoresEl.appendChild(listItem);
}
};
      
//Initializes the index variable and starts the quiz
var i = 0;
function startQuiz() {
  
  //Hides other windows and presents the question and possible answers
    showQuiz();

    //Sets the clock
    setTime();

    //Tracks how many questions have been answered and displays the multiple choices in their respective containers
    let answered = 0;
        questionEl.textContent = questions[i].question;
        choice1El.textContent = questions[i].A;
        choice2El.textContent = questions[i].B;
        choice3El.textContent = questions[i].C;
        choice4El.textContent = questions[i].D;

        //Checks whether the value of the event target is true or not
function checkAnswer(event) {
  var selected = event.target;

  if (i < questions.length && timeLeft > 0) {
      if (selected.value == questions[i].correct){
        correctOrNotEl.textContent = "Great job, that is correct!";
        cardTime();
        answered++;
        }
        else if (timeLeft > 5 && selected.value != questions[i].correct) {
        correctOrNotEl.textContent = "Try again."
        timeLeft -= 5;
        } else if (timeLeft < 5 && selected.value != questions[i].correct ) {
          correctOrNotEl.textContent = "Try again."
        }
} else if (questions[i] == undefined && timeLeft > 0) {
  let score = answered*questions.length +timeLeft;
  console.log(score)
  clearInterval(timer);
  console.log(answered);
  console.log(score);
  youWin(score);
} else if (timeLeft == 0) {

  clearInterval(timer);
  gameOver();

}
}
        choice1El.addEventListener("click", checkAnswer);
        choice2El.addEventListener("click", checkAnswer);
        choice3El.addEventListener("click", checkAnswer);
        choice4El.addEventListener("click", checkAnswer);

    };