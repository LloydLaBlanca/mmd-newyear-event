let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
  {
    id: "0",
    question: "Who is our main Medical Director?",
    options: ["Clyde Winward", "Lloyd La Blanca", "Cali Srvani", "Theodore Amalia"],
    correct: "Cali Srvani",
    
  },
  {
    id: "1",
    question: "In FMD rules Policy #2: Basic FMD Policy section 2.2. What is the main point of this policy?",
    options: ["FMD Members should not carry an any kind of Weapons", "They are not allowed to  abuse their powers", "Family/Friends are not excempted to the application process", "All of the Above"],
    correct: "FMD Members should not carry an any kind of Weapons",
  },
  {
    id: "2",
    question: "In FMD Faction Vehicles, Who can use the Ranchers?",
    options: ["Chief of Doctor and Above", "Chief of Doctor and Below", "Deputy Chief of Doctor", "All of the above"],
    correct: "Chief of Doctor and Above",
  },
  {
    id: "3",
    question: " We frequently using the code 10-22, What is the meaning of this code?",
    options: ["Cancel/Disregard", "En Route", "Receiving Poorly", "Game Crashed"],
    correct: "Cancel/Disregard",
  },
  {
    id: "4",
    question: "What's DOA means?",
    options: ["Dead on Arrival", "Date of Arrival", "Digital Optical Audios", "Department of Administrators"],
    correct: "Dead on Arrival",
  },
  {
    id: "5",
    question: "This badge serves as as the Leader of the Medical Department. And they are the one who has the main role of being an EMT. What rank is this?",
    options: ["R10 - Commissioner", "R11 - Deputy Chief of Doctor", "R12 - Chief of Doctor", "R14 - Medical Director"],
    correct: "R14 - Medical Director",
  },
  {
    id: "6",
    question: "This badge are given by the Faction Leaders, to those who are deserving and have a determination through this Department. And it is also has the most important role. They are the one who will replace the R14 when they are not around. What rank is this?",
    options: ["R13 - Assistant Medical Director ", "R11 - Deputy Chief of Doctor", "R12 - Chief of Doctor", "R14 - Medical Director"],
    correct: "R13 - Assistant Medical Director",
  },
  {
    id: "7",
    question: "We prioritize high standards of conduct, ethics, and expertise to deliver exceptional medical care and services. What core value is this?",
    options: ["Professionalism", "Teamwork", "Comparison", "Integrity"],
    correct: "Professionalism",
  },
  {
    id: "8",
    question: "When using the /d (Department Radio). What will you say/reply when they say MMD how copy?",
    options: ["MMD in, send your transmission", "MMD in, send your transmission", "MMD in, send your request", "All of the above"],
    correct: "All of the above",
  },
  {
    id: "9",
    question: "What is the most Powerful punishment of any factions?",
    options: ["Strike", "Suspension", "Warn", "Faction Banned"],
    correct: "Faction Banned",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.innerHTML =
        "You got " + scoreCount + " out of " + questionCount;
    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);


const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};


const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  
  quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};