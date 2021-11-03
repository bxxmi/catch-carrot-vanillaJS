'use strict';
import Popup from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new Popup();

const game = new GameBuilder()
.gameDuration(10)
.carrotCount(9)
.bugCount(9)
.build();

game.setGameStopListener(reason => {
  let message;

  switch(reason) {
    case Reason.cancle:
      message = 'Replay';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WON';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST';
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
