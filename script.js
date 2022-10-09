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
var correctOrNotEl = document.getElementById("correctOrNot");
var playAgainEl = document.getElementById("playAgain");

var questions = [
    {
     question: "What is the DOM?",
     A: "Document Object Module",
     B: "Document On Machine",
     C: "Dominant Object Mathematics",
     D: "Duck Obfuscating Monopoly",
     correct: "A"
     },
     {
     question: "What is an 'event listener'?",
     A: "An application used to track current events",
     B: "A person who listens to an event",
     C: "A JavaScript property used to detect user input in various forms",
     D: "A device used to record live events",
     correct: "C"
     },
     {
     question: "What is an API?",
     A: "A Perfect Insult",
     B: "Application Plugged Into",
     C: "All Properties In",
     D: "Application Programming Interface",
     correct: "D"
     }
]

console.log(questions[0].correct);

var timeLeft = 100;

function setTime() {
       
        var timerInterval = setInterval(function() {
          if(timeLeft > 1) {
          timeLeftEl.textContent = "Time remaining: " + timeLeft + " seconds.";
          timeLeft--;
        } 
          else if (timeLeft === 1) {
            timeLeftEl.textContent = "Time remaining: " + timeLeft + " second.";
            timeLeft--;
          } else {
            clearInterval(timerInterval);
            gameOver();
          }
      
        }, 1000);


      }

function gameOver() {
    quizContentEl.style.display = "none";
    gameOverEl.style.display = "flex";
}

function youWin() {
  quizContentEl.style.display = "none";
  youWinEl.style.display = "flex";
}

    playAgainEl.addEventListener("click", function(event) {
        event.preventDefault(); 
        youWinEl.style.display = "none";
        gameOverEl.style.display = "none";
        startQuiz();
    });

      startBtnEl.addEventListener("click", function(event) {
        event.preventDefault(); 
        startQuiz();
      });


function startQuiz() {
    
    titleEl.style.display = "none";
    quizContentEl.style.display = "flex";
    setTime();  
    
  for (let i = 0; i < questions.length; i++) {
        console.log(questions.question)

        questionEl.textContent = questions[i].question;
        choice1El.textContent = questions[i].A;
        choice2El.textContent = questions[i].B;
        choice3El.textContent = questions[i].C;
        choice4El.textContent = questions[i].D;
 
        optionEl.addEventListener("click", function(event) {
          console.log(event.key);
          event.preventDefault();
          var element = event.key;
          console.log(element);
        if (element[i] == questions[i].correct) {
            correctOrNotEl.textContent = "Correct!"
            return;
        } else {
            correctOrNotEl.textContent = "Wrong!";
            if (timeLeft - 5 <= 0) {
              clearInterval(timerInterval);
              gameOver();
            } else {
            timeLeft -= 5;
            return;
        }
    }  
});

}


};