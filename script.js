// 5 Key Nepal History Questions Dataset
const questions = [
  {
    question: "Who unified Nepal into a single kingdom in 1768 AD (1825 BS)?",
    options: ["Bhimsen Thapa", "Prithvi Narayan Shah", "Jang Bahadur Rana", "King Tribhuvan"],
    correct: 1,
    explanation: "King Prithvi Narayan Shah of Gorkha spearheaded the unification campaign, capturing Kathmandu Valley in 1768 AD."
  },
  {
    question: "Which violent event in 1846 AD (1903 BS) led to the rise of Jang Bahadur Rana and 104 years of Rana rule?",
    options: ["Bhandarkhal Parva", "Kot Parva (Kot Massacre)", "Alau Parva", "38 Saalko Parva"],
    correct: 1,
    explanation: "The Kot Parva (Kot Massacre) resulted in the execution of top nobles, allowing Jang Bahadur Rana to seize complete control."
  },
  {
    question: "In which year BS was democracy established in Nepal, ending the century-long hereditary Rana rule?",
    options: ["2007 BS", "2017 BS", "2046 BS", "2063 BS"],
    correct: 0,
    explanation: "The popular revolution of 2007 BS (1951 AD) restored Royal authority under King Tribhuvan and introduced democracy."
  },
  {
    question: "When was the historic Sugauli Treaty signed between the East India Company and Nepal?",
    options: ["1805 AD", "1815/1816 AD", "1857 AD", "1923 AD"],
    correct: 1,
    explanation: "The Sugauli Treaty was signed in late 1815 and ratified in March 1816 following the Anglo-Nepalese War."
  },
  {
    question: "Who is recognized as the first Prime Minister of unified Nepal?",
    options: ["Mathabar Singh Thapa", "Jang Bahadur Rana", "Bhimsen Thapa", "Rana Bahadur Shah"],
    correct: 2,
    explanation: "Bhimsen Thapa served as Mukhtiyar (Prime Minister) from 1806 to 1837 AD, widely regarded as Nepal's first Prime Minister."
  }
];

let currentIdx = 0;
let score = 0;

function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function startQuiz() {
  currentIdx = 0;
  score = 0;
  switchScreen('screen-quiz');
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentIdx];
  
  // Update Progress
  document.getElementById('question-progress').innerText = `Question ${currentIdx + 1} of ${questions.length}`;
  document.getElementById('progress-bar-fill').style.width = `${((currentIdx + 1) / questions.length) * 100}%`;
  
  // Set Question Text
  document.getElementById('question-text').innerText = q.question;
  
  // Reset UI elements
  document.getElementById('explanation-box').style.display = 'none';
  document.getElementById('btn-next').style.display = 'none';
  
  // Render Options
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  
  q.options.forEach((optionText, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = optionText;
    btn.onclick = () => selectOption(index);
    container.appendChild(btn);
  });
}

function selectOption(selectedIndex) {
  const q = questions[currentIdx];
  const buttons = document.querySelectorAll('.option-btn');
  
  // Disable all option buttons
  buttons.forEach(btn => btn.disabled = true);
  
  // Check answer
  if (selectedIndex === q.correct) {
    buttons[selectedIndex].classList.add('correct');
    score++;
  } else {
    buttons[selectedIndex].classList.add('wrong');
    buttons[q.correct].classList.add('correct'); // Highlight the correct answer
  }
  
  // Display Explanation & Next Button
  document.getElementById('explanation-text').innerText = q.explanation;
  document.getElementById('explanation-box').style.display = 'block';
  document.getElementById('btn-next').style.display = 'block';
}

function nextQuestion() {
  currentIdx++;
  if (currentIdx < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  switchScreen('screen-results');
  document.getElementById('final-score').innerText = `You scored ${score} out of ${questions.length}`;
}
