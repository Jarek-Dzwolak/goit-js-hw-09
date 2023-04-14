import Notiflix from 'notiflix';

const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const createPromisesForm = document.querySelector('#create-promises-form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const result = { position, delay };

      if (shouldResolve) {
        Notiflix.Notify.success(`Promise ${position} resolved!`);
        resolve(result);
      } else {
        Notiflix.Notify.failure(`Promise ${position} rejected!`);
        reject(result);
      }
    }, delay);
  });
}

createPromisesForm.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  console.log(delay, step, amount);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const currentDelay = delay + i * step;
    createPromise(position, currentDelay);
  }
});
