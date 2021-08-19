'use strict';
const pScoresCurrent = [0, 0];
const pScoresTotal = [0, 0];
let activePlayer = 0;

let diceImg = document.querySelector('.dice');

//buttons
let newGameBtn = document.querySelector('.btn--new');
let rollBtn = document.querySelector('.btn--roll');
let holdBtn = document.querySelector('.btn--hold');

diceImg.style.display = 'none';
//to set the image of the dice: diceImg.src = 'dice-3.png';

for (let i = 0; i < 2; i++) {
  document.querySelector(`#score--${i}`).textContent = '0';
  document.querySelector(`#current--${i}`).textContent = '0';
}

//call function to set the dice image randomly
function diceRoll() {
  let randDiceGen = Math.trunc(Math.random() * 6) + 1;
  return randDiceGen;
}

//when hold is pressed:
holdBtn.addEventListener('click', function () {
  pScoresTotal[activePlayer] += pScoresCurrent[activePlayer];
  document.querySelector(`#score--${activePlayer}`).textContent = String(
    pScoresTotal[activePlayer]
  );
  console.log('This is the total ' + pScoresTotal[activePlayer]);
  if (pScoresTotal[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document.querySelector(`#current--${activePlayer}`).textContent = '0';
    pScoresCurrent[activePlayer] = 0;
    diceImg.style.display = 'none';
  } else {
    document.querySelector(`#current--${activePlayer}`).textContent = '0';
    pScoresCurrent[activePlayer] = 0;
    activePlayer = switchPlayers(activePlayer);
  }
});

let scoreTracker = 0;

//to roll the dice.
rollBtn.addEventListener('click', function () {
  let randNumber = diceRoll();
  console.log(randNumber);
  diceImg.src = `dice-${randNumber}.png`;
  if (
    !document
      .querySelector(`.player--${0}`)
      .classList.contains('player--winner') &&
    !document
      .querySelector(`.player--${1}`)
      .classList.contains('player--winner')
  ) {
    diceImg.style.display = 'block';
    if (randNumber === 1) {
      pScoresCurrent[activePlayer] = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = '0';
      pScoresCurrent[activePlayer] = 0;
      activePlayer = switchPlayers(activePlayer);
      console.log('This is the active player: ' + activePlayer);
    } else {
      pScoresCurrent[activePlayer] += randNumber;
      document.querySelector(`#current--${activePlayer}`).textContent = String(
        pScoresCurrent[activePlayer]
      );
    }
  }
});

//when new game button is pressed

newGameBtn.addEventListener('click', function () {
  if (
    document.querySelector(`.player--0`).classList.contains('player--winner')
  ) {
    document
      .querySelector(`.player--0`)
      .classList.replace('player--winner', 'player--active');
  } else if (
    document.querySelector('.player--1').classList.contains('player--winner')
  ) {
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
  } else if (activePlayer === 1) {
    switchPlayers(activePlayer);
  }
  diceImg.style.display = 'none';
  activePlayer = 0;
  for (let i = 0; i < 2; i++) {
    document.querySelector(`#score--${i}`).textContent = '0';
    document.querySelector(`#current--${i}`).textContent = '0';
    pScoresTotal[i] = 0;
    pScoresCurrent[i] = 0;
  }
});

//execution contexts belonging to arrow functions, do not get their own arguments keyword nor do they get the this keyword. Instead, they can use the arguments objec, from their closes tregular function parent

function switchPlayers(active) {
  if (active === 1) {
    active = 0;
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
  } else {
    active += 1;
    document.querySelector('.player--1').classList.add('player--active');
    document.querySelector('.player--0').classList.remove('player--active');
  }
  return active;
}
