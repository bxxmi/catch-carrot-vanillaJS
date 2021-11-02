'use strict'

export default class Field {
  constructor() {
    this.field = document.querySelector('.game__field');
    this.fieldRect = field.getBoundingClientRect();
    this.field.addEventListener('click', () => {
      this.onClick && this.onClick();
    });
  }

  onFieldClick(onClick) {
    if (!started) {
      return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
      // 당근!!
      target.remove();
      score++;
      playSound(carrotSound);
      updateScoreBoard();
      if (score === CARROT_COUNT) {
        finishGame(true);
      }
    } else if (target.matches('.bug')) {
      finishGame(false);
    }
  }
}