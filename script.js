let playerSide = 'X';
let currentPlayer = 'X';
let vsComputer = false;
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xWins = 0;
let oWins = 0;
let draws = 0;

function startGame(mode) {
    vsComputer = (mode === 'computer');
    resetGameBoard(); // Reset only the game board, not the scores
    document.getElementById('initial-options').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    updatePlayerTurn();
    if (vsComputer && playerSide === 'O') {
        computerMove();
    }
}

function handleClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            showWinMessage(currentPlayer);
            if (currentPlayer === 'X') {
                xWins++;
            } else {
                oWins++;
            }
            updateScore();
            gameActive = false;
            return;
        }
        if (!board.includes('')) {
            showWinMessage('Draw');
            draws++;
            updateScore();
            gameActive = false;
            return;
        }
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        if (vsComputer && currentPlayer !== playerSide) {
            computerMove();
        }
        updatePlayerTurn();
    }
}

function computerMove() {
    setTimeout(() => {
        let emptyIndices = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
        let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        board[randomIndex] = currentPlayer;
        document.querySelector(`.cell[data-index="${randomIndex}"]`).textContent = currentPlayer;
        if (checkWin()) {
            showWinMessage(currentPlayer);
            if (currentPlayer === 'X') {
                xWins++;
            } else {
                oWins++;
            }
            updateScore();
            gameActive = false;
            return;
        }
        if (!board.includes('')) {
            showWinMessage('Draw');
            draws++;
            updateScore();
            gameActive = false;
            return;
        }
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        updatePlayerTurn();
    }, 1000); // Delay of 1 second (1000 milliseconds)
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let win = winPatterns.some(pattern => {
        return pattern.every(index => {
            return board[index] === currentPlayer;
        });
    });

    return win;
}

function showWinMessage(result) {
    const message = document.createElement('div');
    message.className = 'win-message';
    if (result === 'Draw') {
        message.textContent = `It's a Draw!`;
    } else {
        message.textContent = `Player ${result} wins!`;
    }
    document.body.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 2000);
}

function resetGame() {
    resetGameBoard();
    updateScore();
}

function resetGameBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    updatePlayerTurn();
    document.querySelectorAll('.win-message').forEach(msg => msg.remove());
}

function exitGame() {
    resetGameBoard();
    xWins = 0;
    oWins = 0;
    draws = 0;
    updateScore();
    document.getElementById('game').style.display = 'none';
    document.getElementById('initial-options').style.display = 'block';
}


function updatePlayerTurn() {
    document.getElementById('player-turn').textContent = `Player ${currentPlayer}'s turn`;
}

function updateScore() {
    document.getElementById('x-wins').innerHTML = `<span class="x-symbol">X's Wins: </span>${xWins}`;
    document.getElementById('o-wins').innerHTML = `<span class="o-symbol">O's Wins: </span>${oWins}`;
    document.getElementById('draws').textContent = `Draws: ${draws}`;
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleClick);
});
