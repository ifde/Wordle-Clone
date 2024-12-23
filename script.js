// script.js
const words = ['APPLE', 'GRAPE', 'BANJO', 'CHAIR', 'PLUMB']; // List of possible words
let solution = getRandomWord();
let currentRow = 0;

const grid = document.getElementById('grid');
const guessInput = document.getElementById('guess-input');
const submitGuess = document.getElementById('submit-guess');
const restartGame = document.getElementById('restart-game');
const message = document.getElementById('message');

// Create grid
function initializeGrid() {
    grid.innerHTML = ''; // Clear previous grid
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell);
    }
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Handle guess submission
submitGuess.addEventListener('click', () => {
    const guess = guessInput.value.toUpperCase();
    if (guess.length !== 5) {
        message.textContent = 'Enter a 5-letter word!';
        return;
    }

    message.textContent = '';
    const rowStart = currentRow * 5;
    const rowCells = Array.from(grid.children).slice(rowStart, rowStart + 5);

    let correctCount = 0;
    for (let i = 0; i < 5; i++) {
        const letter = guess[i];
        const cell = rowCells[i];

        cell.textContent = letter;

        if (letter === solution[i]) {
            cell.classList.add('correct');
            correctCount++;
        } else if (solution.includes(letter)) {
            cell.classList.add('present');
        } else {
            cell.classList.add('absent');
        }
    }

    if (correctCount === 5) {
        message.textContent = 'Congratulations! You guessed it!';
        endGame();
        return;
    }

    currentRow++;
    if (currentRow === 6) {
        message.textContent = `Game Over! The word was ${solution}`;
        endGame();
    }

    guessInput.value = '';
});

// Restart the game
restartGame.addEventListener('click', () => {
    solution = getRandomWord();
    currentRow = 0;
    message.textContent = '';
    initializeGrid();
    guessInput.value = '';
    guessInput.disabled = false;
    submitGuess.style.display = 'inline-block';
    restartGame.style.display = 'none';
});

// End the game and show the restart button
function endGame() {
    guessInput.disabled = true;
    submitGuess.style.display = 'none';
    restartGame.style.display = 'inline-block';
}

// Initialize the game
initializeGrid();
