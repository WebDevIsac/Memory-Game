

// Define variables
const container = document.querySelector('.container');
const gameContainer = document.querySelector('.game-container');
const cards = document.querySelectorAll('.card');
const hardModeCards = document.querySelectorAll('.hard-card');
const easyBtn = document.querySelector('.easy-mode');
const mediumBtn = document.querySelector('.medium-mode');
const hardBtn = document.querySelector('.hard-mode');

const frontCards = document.querySelectorAll('.front-card');
const backCards = document.querySelectorAll('.back-card');

function hideCards () {
  for (let i = 0; i < frontCards.length; i++) {
    frontCards[i].classList.add('hide');
  }
}

hideCards();


// Check if game is set to Hard mode
function checkMode () {
  if (gameContainer.classList.contains('game-container-hard')) {
    for (let i = 0; i < hardModeCards.length; i++) {
      hardModeCards[i].classList.add('hide');
    }
    gameContainer.classList.remove('game-container-hard');
  }
}

// Easy mode
function easyMode () {
  checkMode();
  for (let i = 0; i < 17; i++) {
    let random = Math.floor(Math.random() * i);
    gameContainer.appendChild(cards[random]);
  }
}

function mediumMode () {
  checkMode();
  for (let i = 0; i < 17; i++) {
    let random = Math.floor((Math.random() * 17));
    gameContainer.appendChild(cards[random]);
  }
}

// Hard mode
function hardMode () {
  for (let i = 0; i < hardModeCards.length; i++) {
    hardModeCards[i].classList.remove('hide');
  }
  for (let i = 0; i < 21; i++) {
    let random = Math.floor((Math.random() * 21));
    gameContainer.appendChild(cards[random]);
  }
  gameContainer.classList.add('game-container-hard');
}

easyBtn.addEventListener('click', easyMode);
mediumBtn.addEventListener('click', mediumMode);
hardBtn.addEventListener('click', hardMode);


