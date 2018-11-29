

// Defining variables

// Div and containers
const gameContainer = document.querySelector('.game-container');
const playMenu = document.querySelector('.play-menu');
const difficulty = document.querySelector('.difficulty');
const start = document.querySelector('.start');
const gameWon = document.querySelector('.game-won');

// Buttons
const difficultyBtn = start.querySelector(':nth-child(2)');
const startBtn = start.querySelector(':last-child');
const easyBtn = document.querySelector('.easy-mode');
const mediumBtn = document.querySelector('.medium-mode');
const hardBtn = document.querySelector('.hard-mode');
const backBtn = playMenu.querySelector('h1');
const gameWonBackBtn = gameWon.querySelector('h2');

// Cards
const cards = document.querySelectorAll('.card');
const frontCards = document.querySelectorAll('.front-card');
const backCards = document.querySelectorAll('.back-card');
const hardModeCards = document.querySelectorAll('.hard-card');

// Span for text changes
const cardsFlippedSpan = playMenu.querySelector(':first-child > span');
const scoreSpan = playMenu.querySelector(':nth-child(2) > span');

// Sounds
const music = document.querySelector('.music');
const flipSound = document.querySelector('.flip-sound');
const clappingSound = document.querySelector('.clapping-sound');

// Changable variables
let mode = 'Easy';
let open = [];
let cardsFlipped = 0;
let score = 0;

// Set audio volume
music.volume = 0.25;
flipSound.volume = 1;

// Event listeners

// Before game starts
startBtn.addEventListener('click', startGame);
difficultyBtn.addEventListener('click', chooseDifficulty);
backBtn.addEventListener('click', backToMenu);

// Choose difficulty
easyBtn.addEventListener('click', () => {
  mode = easyBtn.innerHTML;
  backToStart();
});
mediumBtn.addEventListener('click', () => {
  mode = mediumBtn.innerHTML;
  backToStart();
});
hardBtn.addEventListener('click', () => {
  mode = hardBtn.innerHTML;
  backToStart();
});

// Game won
gameWonBackBtn.addEventListener('click', () => {
  gameWon.classList.add('hide');
  backToMenu();
});

function loopingCards () {
  for (let i = 0; i < cards.length; i++) {
    
  }
}

function startGame () {
  startBtn.parentElement.classList.add('hide');
  for (let i = 0; i < cards.length - 4; i++) {
    cards[i].classList.remove('hide');
  }
  if (mode === 'Easy') {
    easyMode();
    gameContainer.classList.remove('game-container-hard');
  } 
  else if (mode === 'Medium') {
    mediumMode();
    gameContainer.classList.remove('game-container-hard');
  } 
  else if (mode === 'Hard') {
    hardMode();
    for (let i = 0; i < hardModeCards.length; i++) {
      hardModeCards[i].classList.remove('hide');
    }
    gameContainer.classList.add('game-container-hard');
  }
  playMenu.classList.remove('hide');
  cardsFlippedSpan.innerHTML = cardsFlipped;
  scoreSpan.innerHTML = score;
  music.play();
}

function backToStart () {
  resetCards();
  startBtn.parentElement.classList.remove('hide');
  difficulty.classList.add('hide');
  difficultyBtn.innerHTML = mode;
}

function chooseDifficulty () {
  difficulty.classList.remove('hide');
  startBtn.parentElement.classList.add('hide');
}

function backToMenu () {
  playMenu.classList.add('hide');
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add('hide');
    cards[i].classList.remove('disabled');
    frontCards[i].classList.remove('hide');
    backCards[i].classList.add('hide');
  }
  score = 0;
  cardsFlipped = 0;
  music.pause();
  music.currentTime = 0;
  backToStart();
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

// Flip cards
function cardEvent () {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
      cards[i].classList.add('flip');
      setTimeout(() => {
        flipSound.play();
      }, 300);
      setTimeout(() => {
        frontCards[i].classList.add('hide');
        backCards[i].classList.remove('hide');
      }, 600);
      setTimeout(() => {
        cards[i].classList.remove('flip');
      }, 1000);
      cards[i].classList.add('disabled');
      cardsFlipped++;
      cardsFlippedSpan.innerHTML = cardsFlipped;
      open.push(cards[i]);
      if (open.length === 2) {
        check();
      }
    });
  }
}

cardEvent();

function check () {
  gameContainer.classList.add('disabled');
  // If cards match
  if (open[0].getAttribute('data-name') === open[1].getAttribute('data-name')) {
    setTimeout(() => {
      gameContainer.classList.remove('disabled');
      open.splice(0);
      score++;
      scoreSpan.innerHTML = score;
      congratulations();
    }, 500);
  } 
  // If cards doesn't match
  else if (open[0].getAttribute('data-name') !== open[1].getAttribute('data-name')) {
    setTimeout(() => {
      open[0].classList.remove('disabled');
      open[1].classList.remove('disabled');

      open[0].classList.add('flip');
      open[1].classList.add('flip');

      setTimeout(() => {
        open[0].querySelector('.back-card').classList.add('hide');
        open[0].querySelector('.front-card').classList.remove('hide');
        open[1].querySelector('.back-card').classList.add('hide');
        open[1].querySelector('.front-card').classList.remove('hide');
      }, 600);

      setTimeout(() => {
        open[0].classList.remove('flip');
        open[1].classList.remove('flip');
        gameContainer.classList.remove('disabled');
        open.splice(0);
      }, 1000);
    }, 2500);
  }
}

function congratulations () {
  if (mode === 'Easy' || mode === 'Medium') {
    gameWon.classList.remove('hide');
    music.pause();
    clappingSound.play();
  } 
  else if (mode === 'Hard' && score === 10) {
    gameWon.classList.remove('hide');
    music.pause();
    clappingSound.play();
  }
}
