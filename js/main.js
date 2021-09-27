'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 5;
const TIMER_SEC = 10;

const gameField = document.querySelector('.game_field');
const fieldRect = gameField.getBoundingClientRect();
const gameBtn = document.querySelector('.game_btn');
const gameTimer = document.querySelector('.game_timer');
const gameScore = document.querySelector('.game_score');

const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up_refresh_btn');
const popUpText = document.querySelector('.pop-up_message');

let start = false;
let score = 0;
let timer;

gameField.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', () => {
  if (start) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener('click', () => {
  startGame();
  hidePopUp();
});

function startGame() {
  start = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  start = false;
  stopGameTimer();
  hideGameButton();
  showPopUpText('REPLAY?😍');
}

function finishGame(win) {
  start = false;
  hideGameButton();
  showPopUpText(win? 'YOU WON' : 'YOU LOST');
}

function showStopButton() {
  gameBtn.innerHTML = `
    <i class="fas fa-stop"></i>
  `;
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  timer = TIMER_SEC;
  setInterval(() => {
    if (timer <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    } else {
      gameTimer.innerHTML = `
        0:${timer}  
      `;
    }
    timer--;
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function showPopUpText(text) {
  popUpText.innerHTML = text;
  popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}

function initGame() {
  gameField.innerHTML = '';
  gameScore.innerHTML = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, '../img/carrot.png');
  addItem('bug', BUG_COUNT, '../img/bug.png');
}

function onFieldClick(event) {
  if (!start) {
    return;
  }
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    updateScore();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    stopGameTimer();
    finishGame(false);
  }
}

function updateScore() {
  gameScore.innerHTML = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for(let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);

    item.style.position = 'absolute';

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    gameField.append(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// gameBtn.addEventListener('click', playGame);

// let time = 10;
// window.addEventListener('load', () => {
//   gameBtn.innerHTML = `
//     <i class="fas fa-play"></i>
//   `;
//   gameTimer.innerHTML = `
//     0:${time}
//   `;

//   popUp.classList.add('pop-up-hide');
// });

// function playGame() {
//   // 중지 버튼으로 변경
//   gameBtn.innerHTML = `
//     <i class="fas fa-stop"></i>
//   `;

//   // 10초 타이머
//   setInterval(() => {
//     time--;
//     if (time < 0) {
//       clearInterval(time);
//       popUp.classList.remove('pop-up-hide');
//       message.innerHTML = `
//         YOU LOSE 😥
//       `;
//     } else {
//       gameTimer.innerHTML = `
//       0:${time}  
//     `;
//     }
//   }, 1000);
// }


