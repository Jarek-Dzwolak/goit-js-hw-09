const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
console.log('startButton', 'stopButton');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', () => {
  timerId = setInterval(changeColor, 1000);
});
stopButton.addEventListener('click', () => {
  timerId = clearInterval(timerId);
});
function changeColor() {
  let color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}
