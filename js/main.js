/*----- constants -----*/ 
const MAX_WRONG_GUESSES = 6;
const WORDS = [
  'DATATYPES', 'OBJECTS', 'ARRAYS',
  'FUNCTIONS', 'MVC', 'DOM', 'VARIABLES'
];

/*----- app's state (variables) -----*/ 
let usedLetters, wrongGuesses, secret, guess;

/*----- cached element references -----*/ 
const letterBtns = document.querySelectorAll('#letters button');
const hangmanImg = document.querySelector('section');
const guessEl = document.getElementById('guess');
const msgEl = document.querySelector('h2');
const replayBtn = document.getElementById('replay');

/*----- event listeners -----*/ 
document.getElementById('letters').addEventListener('click', handleLetterClick);
replayBtn.addEventListener('click', init);

/*----- functions -----*/

init();

function init() {
  usedLetters = [];
  wrongGuesses = [];
  let rndIdx = Math.floor(Math.random() * WORDS.length);
  secret = WORDS[rndIdx];
  guess = '_'.repeat(secret.length);
  // clear classes from letter btns in case replaying
  letterBtns.forEach(function(btn) {
    btn.className = '';
  });
  render();
}

function render() {
  guessEl.textContent = guess;
  hangmanImg.style.backgroundPosition = `${-75 * wrongGuesses.length}px 0`;
  if (guess === secret) {
    msgEl.textContent = 'Congrats you guessed the word!';
  } else if (wrongGuesses.length === MAX_WRONG_GUESSES) {
    msgEl.textContent = "Sorry, you've been hung!";
  } else {
    msgEl.textContent = "Good luck!";
  }
  letterBtns.forEach(function(btn) {
    let letter = btn.textContent;
    if (wrongGuesses.includes(letter)) {
      btn.classList.add('wrong');
    } else if (usedLetters.includes(letter)) {
      btn.classList.add('correct');
    }
  });
  replayBtn.style.visibility = isGameOver() ? 'visible' : 'hidden';
}

function handleLetterClick(evt) {
  if (
    evt.target.tagName !== 'BUTTON' ||
    wrongGuesses.length === MAX_WRONG_GUESSES ||
    secret === guess
  ) return;
  let letter = evt.target.textContent;
  let guessChars = guess.split('');
  if (secret.includes(letter)) {
    for (let i = 0; i < secret.length; i++) {
      let char = secret.charAt(i);
      if (char === letter) {
        guessChars[i] = letter;
      }
    }
    guess = guessChars.join('');
  } else {
    wrongGuesses.push(letter);
  }
  usedLetters.push(letter);
  render();
}

function isGameOver() {
  return wrongGuesses.length === MAX_WRONG_GUESSES || guess === secret;
}