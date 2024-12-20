
const TIMER_CONFIG = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
};

const SOUNDS = {
    rain: 'sounds/rain-01.mp3',
    forest: 'sounds/forest-02.mp3',
    fire: 'sounds/fire-03.mp3',
    wind: 'sounds/wind-04.mp3',
    alarm: 'sounds/alarm.mp3'
};


let timeLeft = TIMER_CONFIG.pomodoro * 60;
let isRunning = false;
let timerInterval = null;
let currentMode = 'pomodoro';
let currentAudio = null;
let alarmSound = new Audio(SOUNDS.alarm);


const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const pomodoroBtn = document.getElementById('pomodoroBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');
const soundButtons = document.querySelectorAll('.sound-btn');


function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function playAlarm() {
    alarmSound.currentTime = 0;
    alarmSound.play();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                stopTimer();
                playAlarm();
            }
        }, 1000);
        startBtn.textContent = 'Pause';
    } else {
        stopTimer();
    }
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startBtn.textContent = 'Start';
}

function resetTimer() {
    stopTimer();
    timeLeft = TIMER_CONFIG[currentMode] * 60;
    updateDisplay();
}

function setMode(mode) {
    currentMode = mode;
    stopTimer();
    timeLeft = TIMER_CONFIG[mode] * 60;
    updateDisplay();


    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`#${mode}Btn`).classList.add('active');
}


function playSound(soundName) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    if (SOUNDS[soundName]) {
        currentAudio = new Audio(SOUNDS[soundName]);
        currentAudio.loop = true;
        currentAudio.play();
    }
}

function stopSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
}


startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

pomodoroBtn.addEventListener('click', () => setMode('pomodoro'));
shortBreakBtn.addEventListener('click', () => setMode('shortBreak'));
longBreakBtn.addEventListener('click', () => setMode('longBreak'));

soundButtons.forEach(button => {
    button.addEventListener('click', () => {
        const soundName = button.id.replace('Sound', '').toLowerCase();

        if (button.classList.contains('active')) {
            button.classList.remove('active');
            stopSound();
        } else {
            soundButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            playSound(soundName);
        }
    });
});


updateDisplay();
