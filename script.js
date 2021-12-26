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

p1 = Player('X');
p2 = Player('O');
p2.toggleTurn();

document.querySelectorAll('.space').forEach(item => {
    item.addEventListener('click', () => {
        let position = parseInt(item.className.substring(item.className.length - 1));

        if (gameBoard.getBoard()[position] !== '') {
            return
        }

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

    })
})
