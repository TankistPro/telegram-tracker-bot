const { statistics } = require('./statisctics');

class Timer {
    constructor() {
        this.seconds = 54;
        this.minutes = 23;
        this.hours = 5;
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

    async stopTimer(timerID, userData) {
        clearInterval(timerID);

        await statistics.saveWorkingTime(userData, this.hours, this.minutes, this.seconds);

        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
}

module.exports.timer = new Timer();