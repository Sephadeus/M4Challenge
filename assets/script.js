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
const namesEl = document.getElementById("names");
const scoresEl = document.getElementById("scores");
const currentScoreEl = document.getElementById("currentScore");
const highScoreInputEl = document.querySelector("#highScoreInput");
const correctOrNotEl = document.getElementById("correctOrNot");
const playAgainEl = document.getElementById("playAgain");
const playAgain2El = document.getElementById("playAgain2");
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
     },
     {
      question: "What does HTML stand for?",
      A: "A: Hiding The Monkey's Laughter",
      B: "B: Hot Times, Mad Love",
      C: "C: Hypertext Markup Language",
      D: "D: Harry The Mechanical Lemur",
      correct: "C"
      },
      {
        question: "What is debugging?",
        A: "A: The practice of reviewing code and correcting errors",
        B: "B: A form of pest extermination",
        C: "C: 'The Bugging' but said in a French accent",
        D: "D: None of the above",
        correct: "A"
        }
]

//Sets interval for question card to pause before displaying the next set
var timeLeft = 0;
var cardTimeLeft = 0;

function cardTime() {
 
  cardTimeLeft = 1.5;
 
  var cardTimer = setInterval(function() {
  if (i < questions.length) {
  if(cardTimeLeft > 0) {
          cardTimeLeft--;
      }
     else {
      clearInterval(cardTimer);
      correctOrNotEl.textContent = "";
      nextQuestion();
     }
  } else if (i >= questions.length) {
    clearInterval(cardTimer);
    score *= 1000 + timeLeft;
    youWin();
  }
    } , 1000) 
};

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
          } else {
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
    youWinEl.style.display = "none";
    gameOverEl.style.display = "flex";
}


//Calculates score and submits it to local storage along with user initials
var score = 0;

submitEl.addEventListener("click", function handleSubmit(event) {
  event.preventDefault();

  if (highScoreInputEl.value.length > 10 || highScoreInputEl.value.length == 0 ) {
    alert("Input must be between 1 and 10 characters");
    highScoreInputEl.value = "";
  } else {

let scores = JSON.parse(localStorage.getItem("scores"));
console.log(scores)
  // Create user object from submission
var scorerProfile = {
  name: highScoreInputEl.value,
  score: score
}

scores.push(scorerProfile);
localStorage.setItem("scores", JSON.stringify(scores));
  //Pushes profile to the high scorer array

  console.log(scorerProfile);
  console.log(scores);
  
  viewScores();
}
});

function playAgain() {
  window.location.reload();
}
//Adds event listener to play again button for player
playAgainEl.addEventListener("click", playAgain);
//playAgain2El.addEventListener("click", playAgain);
//Adds event listener to start quiz
startBtnEl.addEventListener("click", startQuiz);

//Displays the victory screen
function youWin() {
  console.log(i)

  quizContentEl.style.display = "none";
  youWinEl.style.display = "flex";
  currentScoreEl.textContent = "Your score is: " + score;
}

    
//Display only the quiz and hide any possible open windows
let showQuiz = function() {
  correctOrNotEl.textContent = "";
  youWinEl.style.display = "none";                    
    gameOverEl.style.display = "none"; 
  titleEl.style.display = "none";
  viewScoresEl.style.display = "none";
  backBtnEl.style.display = "flex"
    quizContentEl.style.display = "flex";
}

//Returns the user to the "home page"
backBtnEl.addEventListener("click", returnHome);

function returnHome() {
  window.location.reload();
  scoreListEl.style.display = "none";
  titleEl.style.display = "flex";
  backBtnEl.style.display = "none";
  viewScoresEl.style.display = "block";
  quizContentEl.style.display = "none"
  youWinEl.style.display = "none";
  gameOverEl.style.display = "none";
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
 
    let scores = JSON.parse(localStorage.getItem("scores"));

      scores.sort((a, b) => {
             
        return a.score - b.score;
        
      })
    console.log(scores)
            for (let i = scores.length - 1; i > scores.length-10; i--) {
      
      if (scoresEl.childElementCount < scores.length){

        var nameItem = document.createElement('li');
        var scoreItem = document.createElement('li');
        console.log("Name: " + scores[i].name + ", Score: " + scores[i].score)
        
        nameItem.textContent = "Name: " + scores[i].name;
        scoreItem.textContent = "Score: " + scores[i].score;
       
        scoresEl.appendChild(scoreItem);
        namesEl.appendChild(nameItem);


          } 
           
      }
    };

     
//Initializes the index variable and starts the quiz


function nextQuestion() {
  if (i < questions.length){
        questionEl.textContent = questions[i].question;
        choice1El.textContent = questions[i].A;
        choice2El.textContent = questions[i].B;
        choice3El.textContent = questions[i].C;
        choice4El.textContent = questions[i].D;
       } else {
        i = 0;
        questionEl.textContent = questions[i].question;
        choice1El.textContent = questions[i].A;
        choice2El.textContent = questions[i].B;
        choice3El.textContent = questions[i].C;
        choice4El.textContent = questions[i].D;
       }
      }

       function clearQuestion() {
        questionEl.textContent = "";
        choice1El.textContent = "";
        choice2El.textContent = "";
        choice3El.textContent = "";
        choice4El.textContent = "";
       }


var i;
function startQuiz() {
score = 0;
i = 0;
console.log(i);
console.log(score);

  //Hides other windows and presents the question and possible answers
    showQuiz();

    //Sets the clock
    setTime();
   
    
    //Tracks how many questions have been answered and displays the multiple choices in their respective containers
    
    choice1El.addEventListener("click", checkAnswer);
    choice2El.addEventListener("click", checkAnswer);
    choice3El.addEventListener("click", checkAnswer);
    choice4El.addEventListener("click", checkAnswer); 
    nextQuestion();
        //Checks whether the value of the event target is true or not
function checkAnswer(event) {

  var selected = event.target;

  if (i < questions.length) {

    console.log(selected.value, questions[i].correct)
     
    if (selected.value == questions[i].correct){
       
        correctOrNotEl.textContent = "Great job, that is correct!";
        i++;
        score += Math.floor(1000 + 100/questions.length);
        console.log(score)
        cardTime();
        
      } else if (timeLeft > 5 && selected.value != questions[i].correct) {
        
          correctOrNotEl.textContent = "Sorry, try again."
          score -= 100;
          timeLeft -= 5;
          console.log(score)
          cardTime();
        
        } else if (timeLeft < 5 && selected.value != questions[i].correct ) {
          
          correctOrNotEl.textContent = "Sorry, try again."
          score -= 100;
          console.log(score)
          cardTime();
        
        }

} else if (i >= questions.length) {
  
  clearInterval(timer);
  console.log(score);
  cardTime();
} 
 } 

};