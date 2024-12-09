const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 10; // Time limit for each question in seconds
let timeLeft;

function startQuiz() {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = timeLimit;
    document.getElementById('time').innerText = timeLeft;

    const questionObj = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionObj.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    questionObj.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => selectAnswer(option);
        optionsContainer.appendChild(button);
    });

    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;
    } else {
        submitAnswer();
    }
}

let selectedAnswer = '';

function selectAnswer(option) {
    selectedAnswer = option;
}

function submitAnswer() {
    clearInterval(timer);
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score').innerText = `You scored ${score} out of ${questions.length}`;

    const summaryContainer = document.getElementById('summary');
    summaryContainer.innerHTML = '';
    questions.forEach((question, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>Q${index + 1}:</strong> ${question.question}<br>
                         <strong>Correct Answer:</strong> ${question.answer}<br>
                         <strong>Your Answer:</strong> ${selectedAnswer === question.answer ? 'Correct' : 'Incorrect'}`;
        summaryContainer.appendChild(div);
    });
}

function goToHome() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
}
