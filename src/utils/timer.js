class Timer {
    constructor() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
    
    displayTimer() {
        return `${this.hours}:${this.minutes < 10 ? "0" + this.minutes : this.minutes}:${this.seconds < 10 ? "0" + this.seconds: this.seconds}`
    }

    startWork() {
        if(this.seconds < 59) {
            this.seconds++;
        } else {
            this.seconds = 0;
            this.minutes++;
        }
        if(this.minutes === 60) {
            this.hours++;
        }

        return this.displayTimer()
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