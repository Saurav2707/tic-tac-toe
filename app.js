const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,3,6],
    [0,4,8],
    [2,4,6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const xClass = 'x';
const oClass = 'o';
let oTurn;
const board = document.getElementById("board");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById("winning-message");
const restartButton = document.getElementById("restartButton");


startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
    oTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.addEventListener("click", handleClick, {once: true})
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}


function handleClick (e){
    const cell = e.target;
    const currentClass = oTurn ? oClass : xClass;
    placeMark (cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = `Draw!`;
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(oClass) || cell.classList.contains(xClass);
    })
}

function placeMark (cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if(oTurn){
        board.classList.add(oClass);
    } else {
        board.classList.add(xClass);
    }
}

function checkWin(currentClass) {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}