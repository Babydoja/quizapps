const questions = [
  {
    question: "Which chart looks like a circle with pieces cut out?",
    choices: ["Line chart", "Bar chart", "Pie chart", "Column chart"],
    answer: "Pie chart",
  },
  {
    question:
      "What button do you click to see how your document will look before printing?",
    choices: ["Save", "Copy", "Paste", "Print Preview"],
    answer: "Print Preview",
  },
  {
    question: "Which Excel button helps you count numbers?",
    choices: ["SUM", "COUNT", "AVERAGE", "MAX"],
    answer: "COUNT",
  },
  {
    question: "Where can you add notes for yourself in PowerPoint?",
    choices: ["Slide View", "Slide Sorter", "Reading View", "Notes Page"],
    answer: "Notes Page",
  },
];


const questionText = document.getElementById("question");
const answersList = document.getElementById("answers-list");
const answerChoices = document.querySelectorAll(".answer-choice");
const questionCounter = document.getElementById("question-counter");
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");
const resultsBox = document.getElementById("results");
const finalScore = document.getElementById("final-score");
const playAgainButton = document.getElementById("play-again");
const quizBox = document.getElementById("quiz-box");
const viewAnswerButton = document.getElementById('view-answer-button');
const viewCorrectAnswersButton = document.getElementById('view-correct-answers');


let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; 

// Show the current question and answers
function showQuestion() {
  // Update the question text
  questionText.innerHTML = questions[currentQuestionIndex].question;

  // Update each answer choice
  for (let i = 0; i < answerChoices.length; i++) {
    answerChoices[i].innerHTML = questions[currentQuestionIndex].choices[i];
    answerChoices[i].className = "answer-choice";

    // If user already answered this question, show their selection
    if (userAnswers[currentQuestionIndex] === i) {
      answerChoices[i].classList.add("picked");
    }
  }

  // Update the question counter
  questionCounter.innerHTML =
    "Question " + (currentQuestionIndex + 1) + " of " + questions.length;

  // Hide results, show quiz
  resultsBox.style.display = "none";
  quizBox.style.display = "block";

  // Update buttons
  updateButtons();
}

// Move to the next question
function goToNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showResults();
  }
}

// Go back to the previous question
function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

// Update the buttons based on current question
function updateButtons() {
  backButton.disabled = currentQuestionIndex === 0;

  if (currentQuestionIndex === questions.length - 1) {
    nextButton.innerHTML = "Finish Quiz";
  } else {
    nextButton.innerHTML = "Next";
  }
}

// Calculate the final score
function calculateScore() {
  score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] !== null) {
      const selectedAnswer = questions[i].choices[userAnswers[i]];
      if (selectedAnswer === questions[i].answer) {
        score++;
      }
    }
  }
}

// Show the final results
function showResults() {
  calculateScore();
  quizBox.style.display = "none";
  resultsBox.style.display = "block";
  finalScore.innerHTML = score + "/" + questions.length;
}

// Set up event listeners
nextButton.addEventListener("click", goToNextQuestion);
backButton.addEventListener("click", goToPreviousQuestion);

playAgainButton.addEventListener("click", function () {
  // Reset everything and start over
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  showQuestion();
});

// Add click handlers for all answer choices
answerChoices.forEach((choice) => {
  choice.addEventListener("click", function () {
    const choiceIndex = parseInt(this.getAttribute("data-index"));

    // Remove 'picked' class from all choices
    answerChoices.forEach((c) => {
      c.classList.remove("picked");
    });

    // Add 'picked' class to the clicked choice
    this.classList.add("picked");

    // Save the user's answer
    userAnswers[currentQuestionIndex] = choiceIndex;
  });
});


viewCorrectAnswersButton.addEventListener('click', function () {
    // Create a string to show all questions and correct answers
    let answersHTML = '<h2>Correct Answers</h2>';
    
    questions.forEach((q, index) => {
        answersHTML += `
            <div style="margin-bottom: 20px;">
                <strong>Q${index + 1}: ${q.question}</strong><br>
                <span style="color: green;">✔ ${q.answer}</span>
            </div>
        `;
    });

    // Replace the result box content with correct answers
    resultsBox.innerHTML = `
        ${answersHTML}
        <button id="play-again-final">Play Again</button>
    `;

    // Add event listener for play again button
    document.getElementById('play-again-final').addEventListener('click', function () {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [null, null, null, null];
        showQuestion();
    });
});



// Start the quiz
showQuestion();
