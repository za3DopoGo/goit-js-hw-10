
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
    constructor(tick) {
        this.tick = tick;
        this.isActive = false;
    }
    start() {
        if (this.isActive) return;
        this.isActive = true;
         this.updateTime();

        this.intervalId = setInterval(() => {
             this.updateTime();
        }, 1000);
    }

    updateTime() {
    const target = userSelectedDate.getTime();
    const now = Date.now();
    if (target <= now) {
          this.onClose(); 
    }
    const diff = target - now;
        const timeObj = this.convertMs(diff);
        updateStartButton(false);
    this.tick(timeObj);
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

const timer = new Timer(tick);

button.addEventListener('click', () => {
    
    timer.start();
   
});

function tick({days, hours, minutes, seconds}) {
    const timeDays = addZero(days); 
    const timeHours = addZero(hours); 
    const timeMin = addZero(minutes);
    const timeSec = addZero(seconds);
    dataDays.textContent = timeDays;
    dataHours.textContent = timeHours;
    dataMin.textContent = timeMin;
    dataSec.textContent = timeSec;
}

function addZero(num) {
    return num.toString().padStart(2, '0');
}

function updateStartButton(isActive) {
  button.disabled = !isActive;
}