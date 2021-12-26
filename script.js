const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    let updateBoard = (symbol, position) => board[position] = symbol;

    let getBoard = () => board;

    return { updateBoard, getBoard };
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
    if (board.slice(0,3) === ['X', 'X', 'X']) {
        return [0,1,2,'X'];
    }
    if (board.slice(0,3) === ['O', 'O', 'O']) {
        return [0,1,2,'O'];
    }
    if (board.slice(3,6) === ['X', 'X', 'X']) {
        return [3,4,5,'X'];
    }
    if (board.slice(3,6) === ['O', 'O', 'O']) {
        return [3,4,5,'O'];
    }
    if (board.slice(6,9) === ['X', 'X', 'X']) {
        return [6,7,8,'X'];
    }
    if (board.slice(6,9) === ['O', 'O', 'O']) {
        return [6,7,8,'O'];
    }
    // columns
    if ([board[0], board[3], board[6] === ['X','X','X']]) {
        return [0,3,6,'X'];
    }
    if ([board[1], board[4], board[7] === ['X','X','X']]) {
        return [1,4,7,'X'];
    }
    if ([board[2], board[5], board[8] === ['X','X','X']]) {
        return [2,5,8,'X'];
    }
    if ([board[0], board[3], board[6] === ['O','O','O']]) {
        return [0,3,6,'O'];
    }
    if ([board[1], board[4], board[7] === ['O','O','O']]) {
        return [1,4,7,'O'];
    }
    if ([board[2], board[5], board[8] === ['O','O','O']]) {
        return [2,5,8,'O'];
    }
    // diagonals
    if ([board[0], board[4], board[8]] === ['X','X','X']) {
        return [0,4,8,'X'];
    }
    if ([board[2], board[4], board[6]] === ['X','X','X']) {
        return [2,4,6,'X'];
    }
    if ([board[0], board[4], board[8]] === ['O','O','O']) {
        return [0,4,8,'O'];
    }
    if ([board[2], board[4], board[6]] === ['O','O','O']) {
        return [2,4,6,'O'];
    }

    if (!board.includes('')) {
        return 'Tie';
    }

    return 0; // no one has won yet and game is not over yet
}

p1 = Player('X');
p2 = Player('O');
p2.toggleTurn();

document.querySelectorAll('.space').forEach(item => {
    item.addEventListener('click', () => {
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

    }, { once: true })
})
