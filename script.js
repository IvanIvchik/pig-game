'use strict';

const firstPlayer = document.querySelector('.player--0');
const secondPlayer = document.querySelector('.player--1');
const scorePlayers = document.querySelectorAll('.score');
const currentScorePlayers = document.querySelectorAll('.current-score');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldPoints = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

let relevanceGame = true;
let currentPlayer = 0;
let pointsCurrentPlayerPerTurn = 0;
let currentAccountsPlayers = [0, 0];


const startNewGame = () => {
    relevanceGame = true;

    resetCounters(scorePlayers);
    resetCounters(currentScorePlayers);

    dice.classList.add('hidden');
    firstPlayer.classList.add('player--active');
    secondPlayer.classList.remove('player--active');
    firstPlayer.classList.remove('player--winner');
    secondPlayer.classList.remove('player--winner');

    for (let i = 0; i < 2; i ++) {
        currentAccountsPlayers[i] = 0;
    }
};

const resetCount = (el) => {
    el.innerHTML = 0;
}

const resetCounters = (node) => {
    for (let i = 0; i < node.length; i++) {
        resetCount(node[i]);
    }
};

const generateDiceValue = () => {
    return Math.trunc(Math.random() * 6) + 1;
}

const rollDice = () => {
    if (dice.classList.contains('hidden')) dice.classList.remove('hidden');

    const diceValue = generateDiceValue();

    changeDice(diceValue);

    if (diceValue !== 1) {
        additionScore(currentPlayer, diceValue);
    } else {
        zeroingCurrentScore(currentPlayer);
        changePlayer(currentPlayer);
    }
}

const changeDice = (num) => {
    dice.src = `dice${num}.png`;
}

const additionScore = (numPlayer, number) => {
    pointsCurrentPlayerPerTurn = +document.querySelector(`#current--${numPlayer}`).textContent + number;
    document.querySelector(`#current--${numPlayer}`).innerHTML = pointsCurrentPlayerPerTurn;
}

const zeroingCurrentScore = (numPlayer) => {
    document.querySelector(`#current--${numPlayer}`).innerHTML = 0;
    pointsCurrentPlayerPerTurn = 0;
}

const savePoints = (numPlayer) => {
    currentAccountsPlayers[numPlayer] += pointsCurrentPlayerPerTurn;
    document.querySelector(`#score--${numPlayer}`).innerHTML = currentAccountsPlayers[numPlayer];

    if(!checkScoreLimit(currentPlayer)) endingGame(currentPlayer);
}

const changePlayer = () => {
    firstPlayer.classList.toggle('player--active');
    secondPlayer.classList.toggle('player--active');

    currentPlayer = Math.abs(currentPlayer - 1);
}

const checkScoreLimit = (numPlayer) => {
    return currentAccountsPlayers[numPlayer] >= 100 ? false : true;
}

const endingGame = (numPlayer) => {
    relevanceGame = false;

    firstPlayer.classList.remove('player--active');
    secondPlayer.classList.remove('player--active');
    document.querySelector(`.player--${numPlayer}`).classList.add('player--winner');
    dice.classList.add('hidden');
}

btnNewGame.addEventListener('click', () => {
    startNewGame();
})

btnRollDice.addEventListener('click', () => {
    if (relevanceGame) rollDice();
})

btnHoldPoints.addEventListener('click', () => {
    if (relevanceGame) {
        savePoints(currentPlayer);
        zeroingCurrentScore(currentPlayer);
        changePlayer();
    }

    console.log(currentAccountsPlayers);
})

startNewGame();