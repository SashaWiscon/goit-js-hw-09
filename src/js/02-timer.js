import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  valueDays: document.querySelector('[data-days]'),
  valueHours: document.querySelector('[data-hours]'),
  valueMinutes: document.querySelector('[data-minutes]'),
  valueSeconds: document.querySelector('[data-seconds]'),
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.selectedDate = null;
    this.onTick = onTick;
    this.isActive = false;
  }

  start() {
    if (this.isActive || !this.selectedDate) return;

    this.isActive = true;
    this.updateTimer();
    refs.datePicker.disabled = true;
    refs.startBtn.disabled = true;

    this.intervalId = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }

  setSelectedDate(date) {
    this.selectedDate = date;
  }

  updateTimer() {
    const currentTime = new Date();
    const deltaTime = this.selectedDate - currentTime;

    if (deltaTime <= 0) {
      this.stop();
      this.onTick(convertMs(0));
      return;
    }

    this.onTick(convertMs(deltaTime));
  }

  static addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = (selectedDates[0]);
      if (pickedDate <= new Date()) {
        window.alert('Please choose a date in the future');
        refs.startBtn.disabled = true;
      } else {
        timer.setSelectedDate(pickedDate);
        refs.startBtn.disabled = false;
      }
  },
};

const calendar = flatpickr(refs.datePicker,
 options,
);

const timer = new Timer({
  onTick: updateClockface,
});


refs.startBtn.addEventListener('click', timer.start.bind(timer));


function convertMs(ms) {
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

console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function updateClockface({ days, hours, minutes, seconds }) {
  refs.valueDays.textContent = days;
  refs.valueHours.textContent = Timer.addLeadingZero(hours);
  refs.valueMinutes.textContent = Timer.addLeadingZero(minutes);
  refs.valueSeconds.textContent = Timer.addLeadingZero(seconds);
}
