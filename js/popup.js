'use strict';

// export default : 해당 클래스를 바깥으로 내보냄
// 외부에서도 해당 클래스를 사용할 수 있다.
export default class Popup {
  // constructor : 해당 클래스에서 필요한 데이터(ex.DOM)를 초기화
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpText = document.querySelector('.pop-up__message');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');
    
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      hide();
    });
  }

  // onClick 이벤트에 대한 함수를 설정
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove('pop-up--hide');
  }

  hide() {
    this.popUp.classList.add('pop-up--hide');
  }
}