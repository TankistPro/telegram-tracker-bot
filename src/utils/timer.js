class Timer {
    constructor() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
    
    startWork(){
        setInterval(() => {
            if(this.seconds < 60) {
                this.seconds++;
            } else {
                this.seconds = 0;
                this.minutes++;
            }
            if(this.minutes === 60) {
                this.hours++;
            }
        }, 1000)

        return `${this.hours}:${this.minutes < 10 ? "0" + this.minutes : this.minutes}:${this.seconds < 10 ? "0" + this.seconds: this.seconds}`
    }
}

module.exports.timer = new Timer();