const questions = document.querySelector('.question');
const btn = document.getElementById('generateBtn');
const answer = document.querySelector('.answer');
const oneAnswer = document.querySelector('.answer-1');
const toAnswer = document.querySelector('.answer-2');
const threAnswer = document.querySelector('.answer-3');
const fourAnswer = document.querySelector('.answer-4');
const apikey = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';

async function quiz() {
  const data = await fetch(apikey).then(response => response.json());

  console.log(data)

  oneAnswer.style.display = 'none';
  toAnswer.style.display = 'none';
  threAnswer.style.display = 'none';
  fourAnswer.style.display = 'none';

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const randomIndex = Math.floor(Math.random() * data.results.length);
    let qes = data.results[randomIndex];
    questions.textContent = qes.question;

    const allAnswers = [...qes.incorrect_answers, qes.correct_answer];

    [oneAnswer, toAnswer, threAnswer, fourAnswer].forEach(option => {
      option.addEventListener('click', () => {
        if (option.textContent === qes.correct_answer) {
          alert('You got it right!');
        } else if(qes.incorrect_answers.includes(option.textContent)) {
          alert('Wrong answer!');
        }
      });
    });


    const shuffle = allAnswers.sort(() => Math.random() - 0.5);

    oneAnswer.textContent = shuffle[0];
    toAnswer.textContent = shuffle[2];
    threAnswer.textContent = shuffle[3];
    fourAnswer.textContent = shuffle[1];

    oneAnswer.style.display = 'block';
    toAnswer.style.display = 'block';
    threAnswer.style.display = 'block';
    fourAnswer.style.display = 'block';

  });
}

quiz();

