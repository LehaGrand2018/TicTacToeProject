


// Use

export function updateField() {
    const field = gameData.currentSession.field;
    for (let i = 0; i < field.length; i++) {

        const fieldButton = item.querySelector(`.item__${i}`)
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

export function changeGameStatus (status) {
    gameData.currentSession.gameStatus = status;
}

export function setGameData (button, gameData) {
    changeGameStatus('active');
    if (button.classList.contains('button__cross')) {
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

export function isDraw (gameData) {
    if(isAllOcupied() && !(checkLine(gameData.currentSession.field, combinations))) {
        console.log('draw')
        return true;
    } else {
        console.log('no draw')
        return false
    }
}

export function updateScore (player) {
    const scoreText = document.querySelector(`.score__${player}-player`);

    console.log('Score: ', scoreText)
    scoreText.textContent++;
    switch (player) {
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

export function getPosition (button) {
    return button.className[button.className.length - 1];
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

export function showGameInnerWinner () {
    const gameInnerWinner = document.querySelector('.game-inner__win');
    const gameInnerDraw = document.querySelector('.game-inner__draw');
    const gameInner = document.querySelector('.game__inner');

    if (isAllOcupied()) {
        gameInnerWinner.classList.add('hide');
        gameInner.classList.add('hide'); 
        gameInnerDraw.classList.remove('hide');
     } else{
        gameInnerWinner.classList.remove('hide'); 
        gameInnerWinner.textContent = `Player ${gameData.currentSession.player}'s win!`;
        gameInner.classList.add('hide');
     }

    
    
}

export function showGameButtons () {
    const gameButtons = document.querySelector('.game__buttons');
    gameButtons.classList.add('active');
}

export function hideGameButtons () {
    const gameButtons = document.querySelector('.game__buttons');
    gameButtons.classList.remove('active');
}

export function isAllOcupied () {
    for (const cell of field) {
        if (cell === 'undefined') {
            console.log('ocup', false);
            return false;
        }
    }
    console.log('ocup', true);
    return true;
}
// Use










      

// ResetField();
// const combinations = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
// ];

// const gameData = {
//     firstPlayerScore : "0",
//     secondPlayerScore: "0",
//     currentSession: {
//     gameStatus: 'active',
//         player: "1",
//         move: "undefined",
//     field,
//    },
// }


const menuButtons = document.querySelectorAll('.menu__button');








const fieldButtons = document.querySelectorAll('.field__item');





fieldButtons.forEach(button => {
    button.addEventListener("click", () => {
        console.log(getPosition(button));
        if(field[getPosition(button)] === 'undefined' && gameData.currentSession.gameStatus === 'active') { 
             setCell(field, gameData.currentSession.move, getPosition(button));
             signShow(gameData.currentSession.move, button);

            console.log(`Check ${checkLine(field, combinations, gameData.currentSession.move)}`);
            if(!(checkLine(field, combinations)) && !(isAllOcupied())) {
                moveInvert(gameData);
                playerInvert(gameData);
            } else {
                changeGameStatus('stopped');
                showGameInnerWinner();
                updateScore(gameData.currentSession.player);
                showGameButtons();
            }
        }
       
    })
})




/* GameEndButtons */
const continueGameButton = document.querySelector('.game-button__continue');

continueGameButton.addEventListener("click", () => {
    hideGameButtons();
    hideGameInnerWinner()
    startGame();
})

export function restoreDefaultSettings() {
    gameData.currentSession.gameStatus = 'active';
    gameData.currentSession.player = '1';
    gameData.currentSession.move = 'undefined'
}

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

const menuGameButton = document.querySelector('.game-button__menu');
menuGameButton.addEventListener("click", () => {
    const menu = document.querySelector('.menu');
    const game = document.querySelector('.game');
    menu.classList.remove("menu_hide");
    game.classList.add("game_hide");
    resetAllSettings();
    hideGameInnerWinner();
})

export function resetAllSettings () {
    restoreDefaultSettings();
    gameData.firstPlayerScore = '0';
    gameData.secondPlayerScore = '0';
    startGame();
}

export function startGame () {
    resetField();
    restoreDefaultSettings();
    console.log("Start New Game");
    
}


/* GameEndButtons */


