'use strict';

//Selecting e lements
const player0Elm = document.querySelector('.player--0 ');
const player1Elm = document.querySelector('.player--1 ');
const score0Elm = document.querySelector('#score--0');
const score1Elm = document.getElementById('score--1');
const current0Elm = document.getElementById('current--0');
const current1Elm = document.getElementById('current--1');
const diceElm = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
let score, currentScore, activePlayer, playing;
const init = function () {
  score = [0, 0];
  currentScore = 0; //it needs be to in global scope
  activePlayer = 0; //keep track of the current player
  playing = true;

  score0Elm.textContent = 0;
  score1Elm.textContent = 0;
  current0Elm.textContent = 0;
  current1Elm.textContent = 0;

  diceElm.classList.add('hidden');
  player0Elm.classList.remove('player--winner');
  player1Elm.classList.remove('player--winner');
  player0Elm.classList.add('player--active');
  player1Elm.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Elm.classList.toggle('player--active');
  player1Elm.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice number
    //we have to declare dice in local scope
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);

    // 2. Display the dice number
    diceElm.classList.remove('hidden');
    diceElm.src = `dice-${dice}.png`;

    // 3. check for rolled 1
    if (dice !== 1) {
      // add dice to the correct score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0Elm.textContent = currentScore; //CHANGE LATER
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add the current score to active plyaer's score
    score[activePlayer] += currentScore;
    //   score[activePlayer] = score[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. check if active player's score is >=100
    if (score[activePlayer] >= 100) {
      // finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElm.classList.add('hidden');
    } else {
      // 3. switch the next player
      switchPlayer();
    }
  }
});

//restting the game
btnNew.addEventListener('click', init);
