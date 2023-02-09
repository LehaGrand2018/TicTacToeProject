console.log("It's a TicTacToe");

let field = new Array(9);

for (let i = 0; i < field.length; i++) {
field[i] = 'undefined';
}

let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const gameData = {
    firstPlayerScore : "0",
    secondPlayerScore: "0",
   currentSession: {
    gameStatus: 'active',
        player: "1",
        move: "undefined",
   },
}


const menuButtons = document.querySelectorAll('.menu__button');

function changeGameStatus (status) {
    gameData.currentSession.gameStatus = status;;
}

function setGameData (button, gameData) {
    changeGameStatus('active');
    if(button.classList.contains('button__cross')) {
        gameData.currentSession.move = 'cross';
        console.log('Set cross');
    } else {
        gameData.currentSession.move = 'zero';
        console.log('Set zero')
    }
}

menuButtons.forEach(button => {
    button.addEventListener("click", () => {

    const menu = document.querySelector('.menu');
    const game = document.querySelector('.game');

        menu.classList.add("menu_hide");
        game.classList.remove("game_hide");

        console.log(button.classList.contains('button__cross'));

        setGameData(button, gameData);
    })
    
})

function setCell (field, move, position) {
    field[position] = move;
}

function getPosition (button) {
    return button.className[button.className.length - 1];
}

function moveInvert (gameData) {
    if (gameData.currentSession.move === 'zero') {
        gameData.currentSession.move = 'cross';
    } else {
        gameData.currentSession.move = 'zero';
    }
}


function playerInvert (gameData) {
    const gameInner = document.querySelector('.inner__player');
    if (gameData.currentSession.player === '1') {
        gameInner.textContent = '2' 
        gameData.currentSession.player = '2'
    } else {
        gameData.currentSession.player = '1'
        gameInner.textContent = '1' 
    }
    console.log("Player: ", gameInner.textContent);
}

function changeGameInnerWinner (gameData) {
    const gameInner = document.querySelector('.game__inner');
    gameInner.textContent = `Player ${gameData.currentSession.player}'s win!`
}

function updateScore (player) {
    const scoreText = document.querySelector(`.score__${player}-player`);

    console.log('Score: ', scoreText)
    scoreText.textContent++;
}

function SignShow(move, button) {
    const cellSigns = button.querySelectorAll('.item__sign');
    cellSigns.forEach( cellSign => {
        if (cellSign.classList.contains(`item__${move}`)) {
            cellSign.classList.add('active');
        };
        //  console.log(cellSign.classList.contains(`item__${move}`))
        //  cellSign.q
        // console.log(cellSign)
    })   
}

function CheckLine (field, combinations){
    for (let combination of combinations) {
        if (field[combination[0]] === field[combination[1]] 
        && field[combination[1]]  === field[combination[2]]
        && field[combination[0]] !== "undefined") {
            return true;
        }
    }
    return false;
}

const fieldButtons = document.querySelectorAll('.field__item');

fieldButtons.forEach(button => {
    button.addEventListener("click", () => {
        console.log(getPosition(button));
        if(field[getPosition(button)] === 'undefined' && gameData.currentSession.gameStatus === 'active'){
             setCell(field, gameData.currentSession.move, getPosition(button));
             SignShow(gameData.currentSession.move, button);

            console.log(`Check ${CheckLine(field, combinations, gameData.currentSession.move)}`);
            if(!(CheckLine(field, combinations, gameData.currentSession.move))) {
                moveInvert(gameData);
                playerInvert(gameData);
            } else {
                changeGameStatus('stopped')
                changeGameInnerWinner(gameData);
                updateScore(gameData.currentSession.player);
            }
        }
       
    })
})
