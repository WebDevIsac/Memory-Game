

// Define variables
const container = document.querySelector('.container');
const gameContainer = document.querySelector('.game-container');
const tiles = document.querySelectorAll('.game-container > div');

let tilesArray = Array.from(tiles);


// Function to shuffle array
function shuffle (array) {
    let i = 0;
    let j = 0;
    let temp = null
  
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
}

let shuffled = shuffle(tilesArray);

console.log(shuffled);
