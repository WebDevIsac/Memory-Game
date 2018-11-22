

// Define variables
const container = document.querySelector('.container');
const gameContainer = document.querySelector('.game-container');
const tiles = document.querySelectorAll('.game-container > div');
const hardModeTiles = document.querySelectorAll('.hard-mode');



// Easy mode
function easyMode () {
  for (let i = tiles.length; i--;) {
    gameContainer.appendChild(tiles[Math.random() * i | 0]);
  }
}

// Medium mode
function mediumMode () {
  let temp = gameContainer.cloneNode(true); 
  // shuffle the cloned list (better performance)
  for (let i = temp.children.length + 1; i--; ) {
    temp.appendChild(temp.children[Math.random() * i | 0]);
  }
  gameContainer.parentNode.replaceChild(temp, gameContainer);
}

// Hard mode
function hardMode () {
  for (let i = 0; i < hardModeTiles.length; i++) {
    hardModeTiles[i].classList.remove('hide');
    gameContainer.classList.add('game-container-hard-mode');
  }
  mediumMode();
}

