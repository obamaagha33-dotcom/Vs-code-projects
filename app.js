
"use strict";

// GCE Study Companion: first working version

const subjects = [
  {
    id: "math",
    name: "Mathematics",
    icon: "∑",
    iconClass: "math",
    description: "Practise mathematical methods, calculations, and problem-solving.",
    topics: [
      {
        name: "Algebra and functions",
        description: "Expressions, equations, functions, and graphs."
      },
      {
        name: "Differentiation",
        description: "Gradients, derivatives, and rates of change."
      },
      {
        name: "Integration",
        description: "Integrals, areas, and reverse differentiation."
      }
    ]
  },
  {
    id: "further",
    name: "Further Mathematics",
    icon: "ƒ",
    iconClass: "further",
    description: "Explore advanced mathematics, probability, and mechanics.",
    topics: [
      {
        name: "Probability",
        description: "Events, probability distributions, and expected values."
      },
      {
        name: "Mechanics",
        description: "Forces, motion, equilibrium, and connected particles."
      },
      {
        name: "Conics",
        description: "Circles, parabolas, ellipses, and hyperbolas."
      }
    ]
  },
  {
    id: "physics",
    name: "Physics",
    icon: "ϟ",
    iconClass: "physics",
    description: "Understand physical principles and apply them to problems.",
    topics: [
      {
        name: "Mechanics",
        description: "Motion, forces, momentum, and energy."
      },
      {
        name: "Electric fields",
        description: "Electric charge, field strength, and potential."
      },
      {
        name: "Current electricity",
        description: "Current, voltage, resistance, and circuit calculations."
      }
    ]
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "⚗",
    iconClass: "chemistry",
    description: "Revise chemical reactions, structures, and calculations.",
    topics: [
      {
        name: "Chemical bonding",
        description: "Ionic, covalent, and metallic bonding."
      },
      {
        name: "Energetics",
        description: "Enthalpy changes and energy cycles."
      },
      {
        name: "The s-block",
        description: "Properties and reactions of Group 1 and Group 2 elements."
      }
    ]
  },
  {
    id: "computer",
    name: "Computer Science",
    icon: "</>",
    iconClass: "computer",
    description: "Learn algorithms, programming, data, and computer systems.",
    topics: [
      {
        name: "Algorithms",
        description: "Pseudocode, flowcharts, and problem-solving steps."
      },
      {
        name: "Programming",
        description: "Variables, selection, iteration, and functions."
      },
      {
        name: "Data representation",
        description: "Binary, hexadecimal, and data storage."
      }
    ]
  }
];

// These are introductory practice questions, not official GCE past-paper questions.
const quizzes = {
  math: [
    {
      question: "Solve the equation 2x + 6 = 14.",
      options: ["x = 2", "x = 4", "x = 8", "x = 10"],
      answer: 1,
      explanation: "Subtract 6 from both sides: 2x = 8. Divide both sides by 2, giving x = 4."
    },
    {
      question: "What is the derivative of x²?",
      options: ["x", "2x", "2", "x³"],
      answer: 1,
      explanation: "Using the power rule, d(xⁿ)/dx = nxⁿ⁻¹. Therefore d(x²)/dx = 2x."
    },
    {
      question: "What is the gradient of y = 3x + 5?",
      options: ["5", "3", "8", "x"],
      answer: 1,
      explanation: "In the straight-line equation y = mx + c, m is the gradient. Here m = 3."
    }
  ],

  further: [
    {
      question: "A fair coin is tossed once. What is the probability of getting a head?",
      options: ["0", "1/4", "1/2", "1"],
      answer: 2,
      explanation: "There are two equally likely outcomes: head and tail. The probability of a head is 1/2."
    },
    {
      question: "If two independent events have probabilities 1/2 and 1/3, what is the probability that both occur?",
      options: ["5/6", "1/6", "2/5", "1/2"],
      answer: 1,
      explanation: "For independent events, multiply the probabilities: (1/2)(1/3) = 1/6."
    }
  ],

  physics: [
    {
      question: "What is the SI unit of force?",
      options: ["Joule", "Watt", "Newton", "Pascal"],
      answer: 2,
      explanation: "Force is measured in newtons (N). One newton is equivalent to one kilogram metre per second squared."
    },
    {
      question: "A body travels 100 m in 20 s at constant speed. What is its speed?",
      options: ["2 m/s", "5 m/s", "20 m/s", "2000 m/s"],
      answer: 1,
      explanation: "Speed = distance / time = 100 / 20 = 5 m/s."
    }
  ],

  chemistry: [
    {
      question: "What is the chemical symbol for sodium?",
      options: ["S", "So", "Na", "N"],
      answer: 2,
      explanation: "The symbol for sodium is Na, derived from its Latin name, natrium."
    },
    {
      question: "Which type of bond forms through the transfer of electrons?",
      options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"],
      answer: 0,
      explanation: "An ionic bond results from electrostatic attraction between oppositely charged ions, commonly formed when electrons are transferred."
    }
  ],

  computer: [
    {
      question: "What is an algorithm?",
      options: [
        "A physical part of a computer",
        "A step-by-step procedure for solving a problem",
        "A type of monitor",
        "A programming error"
      ],
      answer: 1,
      explanation: "An algorithm is a finite, ordered sequence of steps designed to solve a problem or complete a task."
    },
    {
      question: "Which Python statement displays text on the screen?",
      options: ["input()", "display()", "print()", "show()"],
      answer: 2,
      explanation: "The print() function sends text or other values to the program's output."
    },
    {
      question: "Which Python data type represents True or False?",
      options: ["String", "Integer", "Boolean", "Float"],
      answer: 2,
      explanation: "A Boolean value represents one of two logical states: True or False."
    }
  ]
};

const defaultProgress = {
  quizzesCompleted: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  bestScores: {}
};

let progress = loadProgress();
let currentSubject = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;
let hasAnswered = false;
let toastTimeout = null;

const subjectGrid = document.getElementById("subject-grid");
const practicePanel = document.getElementById("practice-panel");
const practiceHeading = document.getElementById("practice-heading");
const toast = document.getElementById("toast");

function loadProgress() {
  try {
    const saved = localStorage.getItem("gce-study-progress");

    if (saved) {
      return {
        ...defaultProgress,
        ...JSON.parse(saved)
      };
    }
  } catch (error) {
    console.warn("Saved progress could not be loaded.", error);
  }

  return {
    ...defaultProgress,
    bestScores: {}
  };
}

function saveProgress() {
  try {
    localStorage.setItem("gce-study-progress", JSON.stringify(progress));
  } catch (error) {
    showToast("Progress could not be saved in this browser.");
    console.warn("Saved progress could not be stored.", error);
  }

  updateProgressDisplay();
}

function updateProgressDisplay() {
  document.getElementById("quizzes-completed").textContent =
    progress.quizzesCompleted;

  document.getElementById("questions-answered").textContent =
    progress.questionsAnswered;

  const accuracy = progress.questionsAnswered === 0
    ? 0
    : Math.round(
        (progress.correctAnswers / progress.questionsAnswered) * 100
      );

  document.getElementById("correct-answers").textContent = `${accuracy}%`;
}

function renderSubjects() {
  subjectGrid.innerHTML = "";

  subjects.forEach((subject) => {
    const card = document.createElement("article");
    card.className = "subject-card";

    card.innerHTML = `
      <span class="subject-icon ${subject.iconClass}" aria-hidden="true">
        ${subject.icon}
      </span>
      <h3>${subject.name}</h3>
      <p>${subject.description}</p>
      <a class="subject-action" href="#practice">
        Explore subject <span aria-hidden="true">→</span>
      </a>
    `;

    card.querySelector(".subject-action").addEventListener("click", () => {
      openSubject(subject.id);
    });

    subjectGrid.appendChild(card);
  });
}

function openSubject(subjectId) {
  currentSubject = subjects.find((subject) => subject.id === subjectId);

  if (!currentSubject) {
    showToast("We could not find that subject.");
    return;
  }

  practiceHeading.textContent = `${currentSubject.name} revision`;
  renderTopics();

  document.getElementById("practice").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function renderTopics() {
  const questions = quizzes[currentSubject.id] || [];

  practicePanel.innerHTML = `
    <div>
      <p class="eyebrow">SUBJECT SELECTED</p>
      <h3>${currentSubject.name}</h3>
      <p>${currentSubject.description}</p>
      <p style="margin-top: 10px;">
        ${questions.length} introductory practice questions available.
      </p>
      <button class="button button-primary" id="start-quiz">
        Start practice quiz →
      </button>
      <button class="button button-secondary" id="back-home">
        Back to subjects
      </button>
    </div>

    <div class="topic-list">
      ${currentSubject.topics.map((topic) => `
        <article class="topic-card">
          <h4>${topic.name}</h4>
          <p>${topic.description}</p>
        </article>
      `).join("")}
    </div>
  `;

  document.getElementById("start-quiz").addEventListener("click", startQuiz);

  document.getElementById("back-home").addEventListener("click", () => {
    practiceHeading.textContent = "Ready to practise?";
    practicePanel.innerHTML = `
      <div class="practice-empty-icon" aria-hidden="true">✎</div>
      <div>
        <h3>Your next revision session starts here.</h3>
        <p>Choose a subject above to explore its topics and try a quiz.</p>
      </div>
      <a class="button button-primary" href="#subjects">Choose a subject</a>
    `;
  });
}

function startQuiz() {
  currentQuestions = quizzes[currentSubject.id] || [];

  if (currentQuestions.length === 0) {
    showToast("No questions are available for this subject yet.");
    return;
  }

  currentQuestionIndex = 0;
  selectedAnswer = null;
  score = 0;
  hasAnswered = false;

  renderQuestion();
}

function renderQuestion() {
  const question = currentQuestions[currentQuestionIndex];

  selectedAnswer = null;
  hasAnswered = false;

  const progressPercent =
    (currentQuestionIndex / currentQuestions.length) * 100;

  practicePanel.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-meta">
        <span>${currentSubject.name} practice</span>
        <span>Question ${currentQuestionIndex + 1} of ${currentQuestions.length}</span>
      </div>

      <div
        class="quiz-progress"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${Math.round(progressPercent)}"
      >
        <div
          class="quiz-progress-bar"
          style="width: ${progressPercent}%"
        ></div>
      </div>

      <h3 class="quiz-question">${question.question}</h3>

      <div class="answer-list" id="answer-list">
        ${question.options.map((option, index) => `
          <button class="answer-option" data-answer="${index}">
            <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
            <span>${option}</span>
          </button>
        `).join("")}
      </div>

      <div id="answer-feedback" aria-live="polite"></div>

      <div class="quiz-actions">
        <button class="button button-primary" id="check-answer">
          Check answer
        </button>
        <button class="button button-secondary" id="leave-quiz">
          Exit quiz
        </button>
      </div>
    </div>
  `;

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      if (hasAnswered) return;

      selectedAnswer = Number(button.dataset.answer);

      document.querySelectorAll("[data-answer]").forEach((option) => {
        option.classList.remove("selected");
      });

      button.classList.add("selected");
    });
  });

  document.getElementById("check-answer").addEventListener("click", checkAnswer);
  document.getElementById("leave-quiz").addEventListener("click", () => {
    renderTopics();
  });
}

function checkAnswer() {
  if (hasAnswered) return;

  if (selectedAnswer === null) {
    showToast("Select an answer before checking.");
    return;
  }

  hasAnswered = true;

  const question = currentQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === question.answer;

  progress.questionsAnswered += 1;

  if (isCorrect) {
    score += 1;
    progress.correctAnswers += 1;
  }

  document.querySelectorAll("[data-answer]").forEach((button) => {
    const answerIndex = Number(button.dataset.answer);

    button.disabled = true;

    if (answerIndex === question.answer) {
      button.classList.add("correct");
    } else if (answerIndex === selectedAnswer) {
      button.classList.add("incorrect");
    }
  });

  const feedback = document.getElementById("answer-feedback");

  feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;

  feedback.innerHTML = `
    <strong>${isCorrect ? "Correct!" : "Not quite."}</strong>
    <p>${question.explanation}</p>
  `;

  document.getElementById("check-answer").textContent =
    currentQuestionIndex === currentQuestions.length - 1
      ? "Finish quiz"
      : "Next question";

  document.getElementById("check-answer").removeEventListener("click", checkAnswer);
  document.getElementById("check-answer").addEventListener("click", nextQuestion);

  saveProgress();
}

function nextQuestion() {
  if (!hasAnswered) return;

  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  progress.quizzesCompleted += 1;

  const percentage = Math.round(
    (score / currentQuestions.length) * 100
  );

  const previousBest = progress.bestScores[currentSubject.id] || 0;

  progress.bestScores[currentSubject.id] = Math.max(
    previousBest,
    percentage
  );

  saveProgress();

  practicePanel.innerHTML = `
    <div class="result-panel">
      <p class="eyebrow">QUIZ COMPLETE</p>
      <h3>Well done for finishing!</h3>
      <p class="result-score">${score}/${currentQuestions.length}</p>
      <p>You answered ${percentage}% of the questions correctly.</p>
      <p>
        Your best score for this subject:
        <strong>${progress.bestScores[currentSubject.id]}%</strong>
      </p>
      <div class="quiz-actions" style="justify-content: center;">
        <button class="button button-primary" id="retry-quiz">
          Try again
        </button>
        <button class="button button-secondary" id="return-subjects">
          Explore topics
        </button>
      </div>
    </div>
  `;

  document.getElementById("retry-quiz").addEventListener("click", startQuiz);

  document.getElementById("return-subjects").addEventListener("click", renderTopics);

  practiceHeading.textContent = `${currentSubject.name} results`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimeout !== null) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

renderSubjects();
updateProgressDisplay();
