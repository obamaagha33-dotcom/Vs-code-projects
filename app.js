"use strict";
//GCE companion: fist working version

const subjects = [
    {
        id: "Math",
        name: "Mathematics",
        icon:"∑",
        iconclass: "math",
        description:"Practice mathematics methods, calculations, and problem-solving.",
        topics:[
            {
                name: "Algebra and functions",
                description:"Expression, equations, functions, and graphs."
            },
            {
                name:"Differentiation",
                description:"Gradients, derivatives, and rates of change."
            },
            {
                name:"Integration",
                description:"Integrals, areas, and reverse differentiation."
            }
        ]                   
    },
    {
        id:"Further",
        name: "Futher Mathematics",
        icon: "ƒ",
        iconclass:"further",
        description: "Explore advanced mathematics, probability, and mechanics.",
        topics: [
            {
                name:"Probability",
                description:"Event, probability distributions, and expected values."
            },
            {
                name:"Mechanics",
                description:"Forces, motion, equilibrium, and connected particles."
            },
            {
                name:"Conics",
                description:"Circles, parabolas, ellipses, and hyperbolas."
            }
        ]
    },
    {
        id:"Physics",
        name: "Physics",
        icon: "ϟ",
        iconclass: "physics",
        description: "Understand physics principles and apply them to problems.",
        topics: [
            {
                name:"Mechanics",
                description:"Motion, forces, momentum, and energy."
            },
            {
                name:"Electric fields",
                description: "Current, voltage, resistance, and circuit calculation."
            }
        ]
    },
    {
        id:"chemistry",
        name: "chemistry",
        icon:  "⚗",
        iconClass: "chemistry",
        description: "Revise chemical reactions, structures, and calculations.",
        topics: [
            {
                name:"Chemistry bonding",
                description: "Ionic, covalent, and metallic bonding."
            },
            {
                name:"Energetics",
                description: "Enthalpy changes and energy cycles."
            },
            {
                name: "The s-block",
                descrition: "Properties and reactions of Group 1 and 2 elements."
            }
        ]
        
    },
    {
        id:"computer",
        name: "Computer Science",
        icon:  "</>",
        iconClass: "computer",
        description: "learn algorithms, programming, data, and computer systems.",
        topics: [
            {
                name: "Algorithms",
                description: "Pseudocode, flowcharts, and problem-solving steps."
            },
            {
                name:"Programming",
                description: "Varialbes, section, iteration, and functions."
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
            question: "solve the equation 2x + 6 = 14.",
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
        question:"What is the chemical symbol for sodium?",
        options: ["S", "So", "Na", "N"],
        amswer: 2,
        explanation:"The symbol for sodium is Na, derived from its latin name natrium."
    },
    {
        question: "Which type of bond forms through the transfer of electrons?",
        options: ["Ionic bond", "Cvalent bond", "Metellic bond", "Hydrogen bond"],
        answer: 0,
        explanation: "An ionic bond results from electrostatics attraction between charged ions, commonly formed when electrons are transferred."
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
    amswer: 1,
    explanation: "An algorithm is a finite, ordered sequence of steps designed to solve a problem or complete a task."
  },
  {
    question: "Which python statement displays text on the screen?",
    options: ["input()", "display()","print()", "show()"],
    answer: 2,
    explanation: "The print() function sends text or other values to the program's output."
  },
  {
    question: "Which python data type represents true or False?",
    options: ["string", "Integer", "Boolean", "Float"],
    answer: 2,
    explanation: "A Boolean value represents one of two logical states: True or False. "
  }
  ]
};

const defaultprogress= {
    quizzesCompleted: 0,
    questionsAnswered:0,
    correctAnswers: 0,
    bestSvores: {}
};

let progress = loadprogress();
let currentSubject = null;

  














