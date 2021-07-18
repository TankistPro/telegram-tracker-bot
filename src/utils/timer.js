class Timer {
    constructor() {
        this.seconds = 50;
        this.minutes = 59;
        this.hours = 0;
    }
    
    timeFormat(time) {
        return time < 10 ? "0" + time : time;
    }

    displayTimer() {
        return `${this.timeFormat(this.hours)}:${this.timeFormat(this.minutes)}:${this.timeFormat(this.seconds)}`;
    }

    startWork() {
        if(this.seconds < 59) this.seconds++;
        else {
            this.seconds = 0;
            this.minutes++;
        }
        if(this.minutes === 60) {
            this.hours++;
            this.minutes = 0;
        }

        return this.displayTimer();
    }

    pauseWork(timerID) {
        if(timerID !== -1) clearInterval(timerID);
        return timerID = -1;
    }

    stopTimer(timerID) {
        clearInterval(timerID);

        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
}

module.exports.timer = new Timer();