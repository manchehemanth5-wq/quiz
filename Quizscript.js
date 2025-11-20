const questions = [
    {
        question: "The 2025 G20 Summit is being held in which city?",
        answers: [
            { text: "johannesburg", correct: true },
            { text: "Rio de janeiro", correct: false },
            { text: "New Delhi", correct: false },
            { text: "Tokyo", correct: false }
        ]
    },
    {
        question: "What is the theme of the 2025 G20 Johannesburg Summit?",
        answers: [
            { text: "inclusive development", correct: false },
            { text: "Green growth and digital future", correct: false },
            { text: "prosperity through innovation", correct: false },
            { text: "solidarity,equality,sustainability", correct: true }
        ]
    },
    {
        question: "Which major country is rportedly not participating in COP30?",
        answers: [
            { text: "india", correct: false },
            { text: "china", correct: false },
            { text: "United states", correct: true },
            { text: "russia", correct: false }
        ]
    },
    {
        question: "in nov 2025,which indian city was declared a UNESCO Creative city of Gastronomy?",
        answers: [
            { text: "chandigarh", correct: false },
            { text: "lucknow", correct: true },
            { text: "mumbai", correct: false },
            { text: "jaipur", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

 currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }
Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.textContent = "You scored ${score} out of ${questions.length}!";
    nextButton.textContent = "start quiz again";
    nextButton.style.display = "block";
    nextButton.onclick = () => {
        startQuiz();
    };
}

startQuiz();