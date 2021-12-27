const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    let updateBoard = (symbol, position) => board[position] = symbol;

    let getBoard = () => board;

    let resetBoard = () => board = ['', '', '', '', '', '', '', '', ''];

    return { updateBoard, getBoard, resetBoard };
})();

const Player = symbol => {
    let myTurn = true;

    const getTurn = () => myTurn;

    const getSymbol = () => symbol;

    const toggleTurn = () => {
        if (myTurn) {
            myTurn = false;
        }
        else {
            myTurn = true;
        }
    }

    return { getSymbol, toggleTurn, getTurn };
};

function checkWinner() {
    board = gameBoard.getBoard();
    // rows
    if (board[0] === 'X' && board[1] === 'X' && board[2] === 'X') {
        return [0, 1, 2, 'X'];
    }
    if (board[0] === 'O' && board[1] === 'O' && board[2] === 'O') {
        return [0, 1, 2, 'O'];
    }
    if (board[3] === 'X' && board[4] === 'X' && board[5] === 'X') {
        return [3, 4, 5, 'X'];
    }
    if (board[3] === 'O' && board[4] === 'O' && board[5] === 'O') {
        return [3, 4, 5, 'O'];
    }
    if (board[6] === 'X' && board[7] === 'X' && board[8] === 'X') {
        return [6, 7, 8, 'X'];
    }
    if (board[6] === 'O' && board[7] === 'O' && board[8] === 'O') {
        return [6, 7, 8, 'O'];
    }
    // columns
    if (board[0] === 'X' && board[3] === 'X' && board[6] === 'X') {
        return [0, 3, 6, 'X'];
    }
    if (board[1] === 'X' && board[4] === 'X' && board[7] === 'X') {
        return [1, 4, 7, 'X'];
    }
    if (board[2] === 'X' && board[5] === 'X' && board[8] === 'X') {
        return [2, 5, 8, 'X'];
    }
    if (board[0] === 'O' && board[3] === 'O' && board[6] === 'O') {
        return [0, 3, 6, 'O'];
    }
    if (board[1] === 'O' && board[4] === 'O' && board[7] === 'O') {
        return [1, 4, 7, 'O'];
    }
    if (board[2] === 'O' && board[5] === 'O' && board[8] === 'O') {
        return [2, 5, 8, 'O'];
    }
    // diagonals
    if (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') {
        return [0, 4, 8, 'X'];
    }
    if (board[2] === 'X' && board[4] === 'X' && board[6] === 'X') {
        return [2, 4, 6, 'X'];
    }
    if (board[0] === 'O' && board[4] === 'O' && board[8] === 'O') {
        return [0, 4, 8, 'O'];
    }
    if (board[2] === 'O' && board[4] === 'O' && board[6] === 'O') {
        return [2, 4, 6, 'O'];
    }

    if (!board.includes('')) {
        return 'Tie';
    }

    return 0; // no one has won yet and game is not over yet
}

const game = (() => {
    const displayWinner = () => {
        let winner = checkWinner();

        if (winner !== 0) {
            if (winner === 'Tie') {
                document.querySelector('.game-result').textContent = 'Tie!';
                document.querySelector('.play-again-button').style.display = 'block';
                return true;
            } else {
                if (winner[3] === 'X') {
                    document.querySelector('.game-result').textContent = 'X Wins!';
                }
                if (winner[3] === 'O') {
                    document.querySelector('.game-result').textContent = 'O Wins!';
                }
                // sets color of winning x's or o's spaces to green
                document.querySelector(`.space-${winner[0]}`).style.color = '#198C19';
                document.querySelector(`.space-${winner[1]}`).style.color = '#198C19';
                document.querySelector(`.space-${winner[2]}`).style.color = '#198C19';
                document.querySelector('.play-again-button').style.display = 'block';
                return true;
            }
        }
    }

    const play = (player1, player2) => {
        document.querySelectorAll('.space').forEach(item => {
            item.addEventListener('click', () => {
                if (displayWinner()) {
                    return
                }

                let position = parseInt(item.className.substring(item.className.length - 1));

                if (p1.getTurn()) {
                    item.textContent = p1.getSymbol();
                    p1.toggleTurn();
                    p2.toggleTurn();
                    gameBoard.updateBoard(p1.getSymbol(), position);
                } else {
                    item.textContent = p2.getSymbol();
                    p2.toggleTurn();
                    p1.toggleTurn();
                    gameBoard.updateBoard(p2.getSymbol(), position);
                }

                if (displayWinner()) {
                    return
                }
            }, { once: true })
        })
    }

    const reset = () => {
        document.querySelectorAll('.space').forEach(item => {
            item.style.color = '#e5e5e5';
            item.textContent = '';
        });
        document.querySelector('.play-again-button').style.display = 'none';

        gameBoard.resetBoard();

        document.querySelector('.game-result').textContent = '';
    }

    return { play, reset };
})();

p1 = Player('X');
p2 = Player('O');
p2.toggleTurn();

document.querySelector('.start-button').addEventListener('click', () => {
    game.play(p1, p2)
    document.querySelector('.start-button').style.display = 'none';
});

document.querySelector('.play-again-button').addEventListener('click', () => {
    game.reset();
    game.play(p1,p2);
});

