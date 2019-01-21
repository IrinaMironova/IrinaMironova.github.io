class Timer {
	constructor(tick, minutesEl, secondsEl, startEl, pauseEl) {
		this.seconds = 0;
		this.minutes = 0;
		this.counting = false;
		this.tick = tick;
		this.minutesEl = minutesEl;
		this.secondsEl = secondsEl;
		this.startEl = startEl;
		this.pauseEl = pauseEl;
		this.startEl.addEventListener('click', this.startTimer.bind(this));
		this.pauseEl.addEventListener('click', this.pauseTimer.bind(this));
	}
	startTimer() {
		if(!this.timerId) {
			this.timerId = setInterval(this.count.bind(this), this.tick);
			this.counting = true;
			this.startEl.classList.toggle('hidden');
			this.startEl.nextElementSibling.classList.toggle('hidden');
		}
	}
	stopTimer() {
		clearInterval(this.timerId);
		this.counting = false;
		this.timerId = false;
	}
	count() {
		this.seconds++;
		if(this.seconds >= 60) {
			this.setMinutes(this.minutes + 1);
			this.seconds = 0;
		}
		this.renderSeconds();
	}
	pauseTimer() {
		this.stopTimer();
		this.pauseEl.classList.toggle('hidden');
		this.pauseEl.previousElementSibling.classList.toggle('hidden');
	}
	setMinutes(value) {
		this.minutes = value;
		this.renderMinutes();
	}
	renderMinutes() {
		if(this.minutes < 10) {
			this.minutesEl.textContent = '0' + this.minutes;
		} else {
			this.minutesEl.textContent = this.minutes;
		}
	}
	renderSeconds() {
		if(this.seconds < 10) {
			this.secondsEl.textContent = '0' + this.seconds;
		} else {
			this.secondsEl.textContent = this.seconds;
		}
	}
}

const minutes = document.querySelector('#minFirst');
const seconds = document.querySelector('#secFirst');
const startButton = document.querySelector('.startFirst');
const pauseButton = document.querySelector('.pauseFirst');
const firstTimer = new Timer(
	1000,
	minutes,
	seconds,
	startButton,
	pauseButton
);

const minutesSecond = document.querySelector('#minSecond');
const secondsSecond = document.querySelector('#secSecond');
const startButtonSecond = document.querySelector('.startSecond');
const pauseButtonSecond = document.querySelector('.pauseSecond');
const secondTimer = new Timer(
	1000,
	minutesSecond,
	secondsSecond,
	startButtonSecond,
	pauseButtonSecond
);
