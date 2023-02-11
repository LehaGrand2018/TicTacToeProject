// import { combinations, } from "./script.js";
// import { gameData } from "./script.js";
// import { combinations as combinations } from './script.js';

export function updateField(gameData) {
    const field = gameData.currentSession.field;
    for (let i = 0; i < field.length; i++) {
       
        const fieldButton = document.querySelector(`.item__${i}`)
        switch (field[i]) {
            case 'cross':
                const cellCross = item.querySelector('.item__cross');
                cellCross.classList.add(active);
                break;
            case 'zero':
                const cellZero = item.querySelector('.item__zero');
                cellZero.classList.add(active);
                break;
            default:
                break;
        }
    }
};

export function resetField (gameData) {
    const field = gameData.currentSession.field;
    for (let i = 0; i < field.length; i++) {
        field[i] = 'undefined';
    }
    const cellSigns = document.querySelectorAll('.item__sign');
    cellSigns.forEach( cellSign => {
        if (cellSign.classList.contains(`active`)) {
            cellSign.classList.remove('active');
        };
    }) 
}


export function changeGameStatus (gameData, status) {
    gameData.currentSession.gameStatus = status;
}

export function setStartPlayer (button, gameData) {
    if (button.classList.contains('button__cross')) {
        gameData.currentSession.startPlayer = 'cross';
    } else {
        gameData.currentSession.startPlayer= 'zero';
    }
}
export function setGameData (button, gameData) {
    changeGameStatus(gameData, 'active');
    if (button.classList.contains('button__cross')) {
        gameData.currentSession.move = 'cross';
        console.log('Set cross');
    } else {
        gameData.currentSession.move = 'zero';
        console.log('Set zero')
    }
    // setStartPlayer(button,gameData);
}

export function getPosition (button) {
    return button.className[button.className.length - 1];
}

export function isDraw (gameData, combinations) {
    if(isAllOcupied(gameData) && !(checkLine(gameData.currentSession.field, combinations))) {
        console.log('draw')
        return true;
    } else {
        console.log('no draw')
        return false
    }
}

export function changeScore (gameData, combinations) {
    console.log(gameData);
    
    if(isDraw(gameData, combinations)) {
        return;
    }
    
    // const scoreText = document.querySelector(`.score__${gameData.currentSession.player}-player`);

    // console.log('Score: ', scoreText);
    // scoreText.textContent++;
    // console.log(gameData);

    switch (gameData.currentSession.player) {
        case '1':
            gameData.firstPlayerScore+=1;
            break;
        case '2':
            gameData.secondPlayerScore+=1;
            break;
        default:
            break;
    }
    
}

export function signShow(move, button) {
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

export function checkLine (field, combinations){
    for (let combination of combinations) {
        if (field[combination[0]] === field[combination[1]] 
        && field[combination[1]]  === field[combination[2]]
        && field[combination[0]] !== "undefined") {
            return true;
        }
    }
    return false;
}


export function setCell (field, move, position) {
    field[position] = move;
}



export function moveInvert (gameData) {
    if (gameData.currentSession.move === 'zero') {
        gameData.currentSession.move = 'cross';
    } else {
        gameData.currentSession.move = 'zero';
    }
}

export function playerInvert (gameData) {
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

export function showGameInnerWinner (gameData) {
    const gameInnerWinner = document.querySelector('.game-inner__win');
    const gameInnerDraw = document.querySelector('.game-inner__draw');
    const gameInner = document.querySelector('.game__inner');
    if (isAllOcupied(gameData)) {
        gameInnerWinner.classList.add('hide');
        gameInner.classList.add('hide'); 
        gameInnerDraw.classList.remove('hide');
     } else{
        gameInnerWinner.classList.remove('hide'); 
        gameInnerWinner.textContent = `Player ${gameData.currentSession.player}'s win!`;
        gameInner.classList.add('hide');
     }

    
     showScore(gameData);
}

export function showGameButtons () {
    const gameButtons = document.querySelector('.game__buttons');
    gameButtons.classList.add('active');
}

export function hideGameButtons () {
    const gameButtons = document.querySelector('.game__buttons');
    gameButtons.classList.remove('active');
}

export function isAllOcupied (gameData) {
    for (const cell of gameData.currentSession.field) {
        if (cell === 'undefined') {
            console.log('ocup', false);
            return false;
        }
    }
    console.log('ocup', true);
    return true;
}



/* GameEndButtons */

export function hideGameInnerWinner () {
    const gameInnerWinner = document.querySelector('.game-inner__win');
    const gameInner = document.querySelector('.game__inner');
    const gameInnerDraw = document.querySelector('.game-inner__draw');
    
    if(!(gameInnerWinner.classList.contains('hide'))) {
        gameInnerWinner.classList.add('hide');
    }

    if(!(gameInnerDraw.classList.contains('hide'))) {
        gameInnerDraw.classList.add('hide');
    }
    
    gameInner.classList.remove('hide');
    
}

export function restoreDefaultSettings(gameData) {
    gameData.currentSession.gameStatus = 'active';
    gameData.currentSession.player = '1';
    gameData.currentSession.move = 'undefined'
}

export function resetAllSettings (gameData) {
    // restoreDefaultSettings(gameData);
    gameData.firstPlayerScore = 0;
    gameData.secondPlayerScore = 0;
}

export function startNewGame (gameData) {
    resetAllSettings(gameData);
    startGame(gameData);
    console.log("Start New Game");
}

export function startGame (gameData) {
    
    resetField(gameData);
    restoreDefaultSettings(gameData);
    hideGameInnerWinner();
    showScore(gameData);
    console.log("Start Game");
    console.log(gameData.currentSession.field)
    
}

export function showScore(gameData) {
    for(let i = 1; i <= 2; i++){
        const scoreText = document.querySelector(`.score__${i}-player`);
        switch (i) {
            case 1:
                scoreText.textContent = gameData.firstPlayerScore;
                break;
            case 2:
                scoreText.textContent = gameData.secondPlayerScore;
                break;
        }
    }
}

/* GameEndButtons */