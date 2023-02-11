'use strict'
import {updateField, resetField, showScore, setStartPlayer, setGameData, getPosition, setCell, signShow, checkLine, changeGameStatus, isAllOcupied, moveInvert, playerInvert, showGameInnerWinner, showGameButtons, hideGameButtons, isDraw, changeScore, hideGameInnerWinner, resetAllSettings, startNewGame, startGame, restoreDefaultSettings } from './functions.js';
export const gameData = {
    firstPlayerScore : 0,
    secondPlayerScore: 0,
    currentSession: {
        gameStatus: "active",
        player: "1",
        startPlayer: "undefined",
        move: "undefined",
        field: ['undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'],
   },
};



console.log("It's a TicTacToe");




const field = new Array(9);
// field.forEach((cell) => {
//     console.log(cell);
// })

// ResetField(gameData);
// updateField(gameData);


export const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/* Menu Buttons */
const menuButtons = document.querySelectorAll('.menu__button');

menuButtons.forEach(button => {
    button.addEventListener("click", () => {

    const menu = document.querySelector('.menu');
    const game = document.querySelector('.game');

        menu.classList.add("menu_hide");
        game.classList.remove("game_hide");

        console.log(button.classList.contains('button__cross'));

        setGameData(button, gameData);
        setStartPlayer(button,gameData)
    })
    
})

/* Menu Buttons */


/* GameButtons */
const fieldButtons = document.querySelectorAll('.field__item');

fieldButtons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(getPosition(button));

        const field = gameData.currentSession.field;

        if(field[getPosition(button)] === 'undefined' && gameData.currentSession.gameStatus === 'active') { 
             setCell(field, gameData.currentSession.move, getPosition(button));
             signShow(gameData.currentSession.move, button);

            console.log(`Check ${checkLine(field, combinations)}`);

            if(!(checkLine(field, combinations)) && !(isAllOcupied(gameData))) {
                moveInvert(gameData);
                playerInvert(gameData);
            } else {
                changeGameStatus(gameData, 'stopped');
                changeScore(gameData, combinations);
                showGameInnerWinner(gameData);
                console.log('GameData: ');
                console.log(gameData);
                showGameButtons();
            }
        }
       
    })
})

/* GameButtons */




/*GameEndButtons */

const continueGameButton = document.querySelector('.game-button__continue');

continueGameButton.addEventListener("click", () => {
    startGame(gameData);
    gameData.currentSession.move = gameData.currentSession.startPlayer;

    hideGameButtons();
    hideGameInnerWinner()
})





const menuGameButton = document.querySelector('.game-button__menu');

menuGameButton.addEventListener("click", () => {
    const menu = document.querySelector('.menu');
    const game = document.querySelector('.game');
    menu.classList.remove("menu_hide");
    game.classList.add("game_hide");
    startNewGame(gameData);
    
})



/*GameEndButtons */
