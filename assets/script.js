

// Defining variables

// Div and containers
const gameContainer = document.querySelector('.game-container');
const playMenu = document.querySelector('.play-menu');
const difficulty = document.querySelector('.difficulty-menu');
const startMenu = document.querySelector('.start-menu');
const gameWon = document.querySelector('.game-won');

// Buttons
const difficultyBtn = document.querySelector('.start-menu > .current-difficulty');
const startBtn = document.querySelector('.start-menu > .start-game');
const easyBtn = document.querySelector('.easy-mode');
const mediumBtn = document.querySelector('.medium-mode');
const hardBtn = document.querySelector('.hard-mode');
const backFromGameBtn = playMenu.querySelector('.back-from-game');
const backFromWinBtn = gameWon.querySelector('.back-from-win');
const restartGame = gameWon.querySelector('.restart-game');

// Cards
const cards = document.querySelectorAll('.card');
const frontCards = document.querySelectorAll('.front-card');
const backCards = document.querySelectorAll('.back-card');
const hardModeCards = document.querySelectorAll('.hard-card');

// Span for text changes
const cardsFlippedSpan = playMenu.querySelector('.cards-flipped > span');
const scoreSpan = playMenu.querySelector('.score > span');

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
clappingSound.volume = 1;



// Event listeners

// Starting game when calling on startGame function
startBtn.addEventListener('click', startGame);
// Redirects user to difficult menu when calling on function chooseDifficulty
difficultyBtn.addEventListener('click', chooseDifficulty);
// Redirects user to 
backFromGameBtn.addEventListener('click', backToMenu);

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

// Calling function flipCards for the clicked card
for (let i = 0; i < cards.length; i++) {
	cards[i].addEventListener('click', () => {
		flipCards(i);
	});
}

// Calling function backFromWin
backFromWinBtn.addEventListener('click', backFromWin);

// Calling functions backFromWin and startGame
restartGame.addEventListener('click', () => {
	backFromWin();
	startGame();
});



// Functions

// Function for starting game
function startGame () {
	startMenu.setAttribute('id', 'hide');
  for (let i = 0; i < cards.length - 4; i++) {
		resetCards();
    cards[i].removeAttribute('id', 'hide');
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
      hardModeCards[i].removeAttribute('id', 'hide');
    }
    gameContainer.classList.add('game-container-hard');
  }
  playMenu.removeAttribute('id', 'hide');
  cardsFlippedSpan.innerHTML = cardsFlipped;
  scoreSpan.innerHTML = score;
  music.currentTime = 0;
  music.play();
}

// Back to start menu from winning menu
function backFromWin () {
	gameContainer.removeAttribute('id', 'hide');
	clappingSound.pause();
	clappingSound.currentTime = 0;
	gameWon.setAttribute('id', 'hide');
	backFromGameBtn.removeAttribute('id', 'hide');
	backToMenu();
}

// To difficulty menu from start menu 
function chooseDifficulty () {
	difficulty.removeAttribute('id', 'hide');
	startBtn.parentElement.setAttribute('id', 'hide');
}

// Back to start menu from difficulty menu
function backToStart () {
  startMenu.removeAttribute('id', 'hide');
  difficulty.setAttribute('id', 'hide');
  difficultyBtn.innerHTML = mode;
}

// Back to start menu from play menu
function backToMenu () {
  playMenu.setAttribute('id', 'hide');
  for (let i = 0; i < cards.length; i++) {
    cards[i].setAttribute('id', 'hide');
    cards[i].classList.remove('disabled');
    frontCards[i].removeAttribute('id', 'hide');
    backCards[i].setAttribute('id', 'hide');
  }
  score = 0;
  cardsFlipped = 0;
  music.pause();
  backToStart();
}

// Reset cards order
function resetCards () {
  for (let i = 0; i < cards.length; i++) {
    gameContainer.appendChild(cards[i]);
  }
}

// Easy mode
function easyMode () {
	// Shuffle 16 cards
  for (let i = 0; i < 16; i++) {
    let random = Math.floor(Math.random() * i);
    gameContainer.appendChild(cards[random]);
  }
}

// Medium mode
function mediumMode () {
	// Shuffle 16 cards
  for (let i = 0; i < 16; i++) {
    let random = Math.floor((Math.random() * 16));
    gameContainer.appendChild(cards[random]);
  }
}

// Hard mode
function hardMode () {
	// Change layout for game container so all cards can fit inside
	gameContainer.classList.add('game-container-hard');
	// Show hard mode cards
  for (let i = 0; i < hardModeCards.length; i++) {
    hardModeCards[i].removeAttribute('id', 'hide');
	}
	// Shuffle all cards
  for (let i = 0; i < 21; i++) {
    let random = Math.floor((Math.random() * 20));
    gameContainer.appendChild(cards[random]);
	}
}

// Flip cards when clicked
function flipCards (i) {
			cards[i].classList.add('flip');
			setTimeout(() => {
			flipSound.play();
		}, 300);
		setTimeout(() => {
			frontCards[i].setAttribute('id', 'hide');
			backCards[i].removeAttribute('id', 'hide');
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
}

// Check if cards match
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
        open[0].querySelector('.back-card').setAttribute('id', 'hide');
        open[0].querySelector('.front-card').removeAttribute('id', 'hide');
        open[1].querySelector('.back-card').setAttribute('id', 'hide');
        open[1].querySelector('.front-card').removeAttribute('id', 'hide');
      }, 600);

      setTimeout(() => {
        open[0].classList.remove('flip');
        open[1].classList.remove('flip');
        gameContainer.classList.remove('disabled');
        open.splice(0);
      }, 1000);
    }, 1500);
  }
}

// If all pairs are found, show win menu 
function congratulations () {
	if ((score === 8 && (mode === 'Easy' || mode === 'Medium')) || (score === 10 && mode === 'Hard')) {
		setTimeout(() => {
			backFromGameBtn.setAttribute('id', 'hide');
			gameWon.removeAttribute('id', 'hide');
			gameContainer.setAttribute('id', 'hide');
			music.pause();
			clappingSound.play();
		}, 500);
	}
}
