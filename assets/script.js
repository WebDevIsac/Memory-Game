

// Define variables
const container = document.querySelector('.container');
const gameContainer = document.querySelector('.game-container');
const cards = document.querySelectorAll('.card');
const hardModeCards = document.querySelectorAll('.hard-card');
const difficulty = document.querySelector('.difficulty');
const start = document.querySelector('.start');
const startBtn = start.querySelector(':first-child');
const difficultyBtn = start.querySelector(':last-child');
const easyBtn = document.querySelector('.easy-mode');
const mediumBtn = document.querySelector('.medium-mode');
const hardBtn = document.querySelector('.hard-mode');
const backMenu = document.querySelector('.back-menu');
const backMenuBtn = backMenu.querySelector('h1')
const frontCards = document.querySelectorAll('.front-card');
const backCards = document.querySelectorAll('.back-card');

let mode = 'easy';

startBtn.addEventListener('click', startGame);
difficultyBtn.addEventListener('click', chooseDifficulty);
backMenuBtn.addEventListener('click', backToMenu);

function startGame () {
  startBtn.parentElement.classList.add('hide');
  for (let i = 0; i < cards.length - 4; i++) {
    cards[i].classList.remove('hide');
  }
  if (mode === 'easy') {
    easyMode();
    gameContainer.classList.remove('game-container-hard');
  } 
  else if (mode === 'medium') {
    mediumMode();
    gameContainer.classList.remove('game-container-hard');
  } 
  else if (mode === 'hard') {
    hardMode();
    for (let i = 0; i < hardModeCards.length; i++) {
      hardModeCards[i].classList.remove('hide');
    }
    gameContainer.classList.add('game-container-hard');
  }
  backMenu.classList.remove('hide');
}

function backToStart () {
  startBtn.parentElement.classList.remove('hide');
  difficulty.classList.add('hide');
  difficultyBtn.innerHTML = mode;
}

function chooseDifficulty () {
  difficulty.classList.remove('hide');
  startBtn.parentElement.classList.add('hide');
}

function backToMenu () {
  resetCards();
  backToStart();
  backMenu.classList.add('hide');
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add('hide');
  }
}

function resetCards () {
  for (let i = 0; i < cards.length; i++) {
    gameContainer.appendChild(cards[i]);
  }
}


// Easy mode
function easyMode () {
  resetCards();
  for (let i = 0; i < 16; i++) {
    let random = Math.floor(Math.random() * i);
    gameContainer.appendChild(cards[random]);
  }
}

// Medium mode
function mediumMode () {
  resetCards();
  for (let i = 0; i < 16; i++) {
    let random = Math.floor((Math.random() * 16));
    gameContainer.appendChild(cards[random]);
  }
}

// Hard mode
function hardMode () {
  resetCards();
  for (let i = 0; i < hardModeCards.length; i++) {
    hardModeCards[i].classList.remove('hide');
  }
  for (let i = 0; i < 21; i++) {
    let random = Math.floor((Math.random() * 20));
    gameContainer.appendChild(cards[random]);
  }
  gameContainer.classList.add('game-container-hard');
}

// Eventlisteners for game difficulty on click 
easyBtn.addEventListener('click', () => {
  mode = 'easy';
  backToStart();
});
mediumBtn.addEventListener('click', () => {
  mode = 'medium';
  backToStart();
});
hardBtn.addEventListener('click', () => {
  mode = 'hard';
  backToStart();
});

// Flip cards
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', () => {
    cards[i].classList.add('flip');
    setTimeout(() => {
      frontCards[i].classList.add('hide');
      backCards[i].classList.remove('hide'); 
    }, 600);
    setTimeout(() => {
      cards[i].classList.remove('flip');
    }, 1000);
  });
}


