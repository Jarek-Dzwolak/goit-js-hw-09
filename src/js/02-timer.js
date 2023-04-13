// commonjs
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

console.log(dateTimePicker);

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',

  time_24hr: true,
  defaultDate: new Date(),
  onClose: function (selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];
    console.log(selectedDate);
    const now = new Date();
    if (selectedDate <= now) {
      Notify.failure('Please choose a date in the future.');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};
flatpickr(dateTimePicker, options);

const countDown = function () {
  const now = new Date().getTime();
  const selectedDate = new Date(dateTimePicker.value).getTime();
  const distance = selectedDate - now;

  const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

  days.innerText = daysLeft < 10 ? `0${daysLeft}` : daysLeft;
  hours.innerText = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft;
  minutes.innerText = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
  seconds.innerText = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  if (distance < 0) {
    clearInterval(timer);
  }
};

let timer;
startButton.addEventListener('click', function () {
  const now = new Date().getTime();
  const selectedDate = new Date(dateTimePicker.value).getTime();

  if (selectedDate <= now) {
    window.alert('Please choose a date in the future.');
  } else {
    startButton.disabled = true;
    countDown();
    timer = setInterval(countDown, 1000);
  }
});
