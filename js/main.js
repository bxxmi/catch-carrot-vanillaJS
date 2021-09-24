const playBtn = document.querySelector('.play_btn');
const deadLine = document.querySelector('.timer');
const elements = document.querySelector('.elements');

playBtn.addEventListener('click', play);

// 초기 화면
let setTime = 10;
window.addEventListener('load', () => {
  deadLine.innerHTML = `
    00:${setTime}
  `;
});

// 게임 플레이
function play() {
  const div = document.createElement('div');
  div.classList.add('item');

  const imgArray = ['carrot.png', 'bug.png'];
  let valueTop = Math.random() * 400;
  let valueLeft = Math.random() * 1000;

  imgArray.forEach(img => {
    div.innerHTML = `
      <img src="../img/${img}">
    `
    div.style.top = valueTop + 'px';
    div.style.left = valueLeft + 'px';
  })

  div.append(elements);
}

// 타이머 설정
function timer() {
  const timer = setInterval(() => {
    setTime--;
    
    playBtn.innerHTML = `
    <i class="fas fa-redo-alt"></i>
  `;

    if(setTime === -1) {
      clearInterval(timer);
    } else {
      deadLine.innerHTML = `
        00:0${setTime}
      `;
    }
  }, 1000);
}


