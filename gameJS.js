const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});


function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}


function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}


function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}


function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}


function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}


function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: '2 + 2 = ?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Các máy tính "cơ học" sơ khai phát minh vào năm nào ?',
    answers: [
      { text: '1801', correct: true },
      { text: '1810', correct: false },
      { text: '1811', correct: false },
      { text: '2820', correct: false }
    ]
  },
  {
    question: 'Máy tính đầu tiên giải quyết được 29 phương trình đc phát minh năm nào ?',
    answers: [
      { text: '1939', correct: false },
      { text: '1950', correct: false },
      { text: '1945', correct: false },
      { text: '1941', correct: true }
    ]
  },
  {
    question: 'Giao diện người dùng đồ hoạ được phát minh năm 1964 đúng hay sai ?',
    answers: [
      { text: 'Đúng', correct: true },
      { text: 'Sai', correct: false }
    ]
  }
];
