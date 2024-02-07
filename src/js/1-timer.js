
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector('input[type="text"]');
const button = document.querySelector('button[type="button"]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMin = document.querySelector('[data-minutes]');
const dataSec = document.querySelector('[data-seconds]');

button.disabled = true; 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
          iziToast.error({
              message: 'Please choose a date in the future',
              position: "topRight",
});
           updateStartButton(false);
      } else {
        updateStartButton(true); 
          userSelectedDate = selectedDates[0];
        }
    },     
};

let userSelectedDate = new flatpickr('input', options);

class Timer {
    constructor(updateDisplay) {
        this.updateDisplay = updateDisplay;
        this.isActive = false;
    }
    start() {
        if (this.isActive) return;
        this.isActive = true;
        updateStateInput(false);
        updateStartButton(false);
        this.intervalId = setInterval(() => {
             this.updateTime();
        }, 1000);
    }

      stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        // updateStartButton(true);
        updateStateInput(true); 
        userSelectedDate.clear(); 
    }

    updateTime() {
    const target = userSelectedDate.getTime();
    const now = Date.now();
    if (target <= now) {
         this.stop();
            return;
    }
    const diff = target - now;
        const timeObj = this.convertMs(diff);
        this.updateDisplay(timeObj);
  }

    convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
}

const timer = new Timer(updateDisplay);

button.addEventListener('click', () => {
    
    timer.start();
   
});

function updateDisplay({days, hours, minutes, seconds}) {
    const formattedDays = addZero(days); 
    const formattedHours = addZero(hours); 
    const formattedMin = addZero(minutes);
    const formattedSec = addZero(seconds);
    dataDays.textContent = formattedDays;
    dataHours.textContent = formattedHours;
    dataMin.textContent = formattedMin;
    dataSec.textContent = formattedSec;
}

function addZero(num) {
    return num.toString().padStart(2, '0');
}

function updateStartButton(isActive) {
  button.disabled = !isActive;
}

function updateStateInput(isActive) {
  input.disabled = !isActive;
}