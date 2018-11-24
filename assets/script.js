

// Define variables
const container = document.querySelector('.container');
const gameContainer = document.querySelector('.game-container');
const tiles = document.querySelectorAll('.game-container > div');
const hardModeTiles = document.querySelectorAll('.hard-mode');
const easyBtn = document.querySelector('.easy-mode');
const mediumBtn = document.querySelector('.medium-mode');
const hardBtn = document.querySelector('.hard-mode');

// Check if game is set to Hard mode
function checkMode () {
  if (gameContainer.classList.contains('game-container-hard')) {
    for (let i = 0; i < hardModeTiles.length; i++) {
      hardModeTiles[i].classList.add('hide');
    }
    gameContainer.classList.remove('game-container-hard');
  }
}

// Easy mode
function easyMode () {
  checkMode();
  for (let i = 0; i < tiles.length; i++) {
    gameContainer.appendChild(tiles[Math.random() * i | 0]);
  }
}

function mediumMode () {
  checkMode();
  for (let i = 0; i < tiles.length; i++) {
    gameContainer.appendChild(tiles[Math.random() * i | 0]);
  }
}

// // Medium mode
// function mediumMode () {
  //   let temp = gameContainer.cloneNode(true); 
  //   // shuffle the cloned list (better performance)
  //   for (let i = temp.children.length; i--;) {
    //     temp.appendChild(temp.children[Math.random() * i | 0]);
    //   }
    //   gameContainer.parentNode.replaceChild(temp, gameContainer);
    // }
    
    
    // Hard mode
    function hardMode () {
      for (let i = 0; i < hardModeTiles.length; i++) {
        hardModeTiles[i].classList.remove('hide');
      }
      for (let i = 0; i < tiles.length; i++) {
        gameContainer.appendChild(tiles[Math.random() * i | 0]);
      }
  gameContainer.classList.add('game-container-hard');
}

easyBtn.addEventListener('click', easyMode);
mediumBtn.addEventListener('click', mediumMode);
hardBtn.addEventListener('click', hardMode);