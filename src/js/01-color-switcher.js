const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}

refs.startBtn.addEventListener("click", onClickColorChange )
refs.stopBtn.addEventListener("click", onClickStopColorChange)
let timerId = null;

function onClickColorChange() {

  timerId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
    refs.startBtn.disabled= true;
  }, 1000);
}

function onClickStopColorChange() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}