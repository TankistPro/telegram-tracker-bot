class State {
    constructor() {
        this.state = {};
    }

    addToState(key) {
        this.state[key] = {
            timer: {
                hours: 0,
                minutes: 20,
                seconds: 0,
                timerID: null,
            }
        };
    }

    setTimerId (key, value) {
        const timer = this.state[key];

        timer.timer.timerID = value

        this.state[key] = timer

        console.log(timer)
    }

    clearTimerId (key) {
        const timer = this.state[key];

        clearInterval(timer.timer.timerID)

        timer.timer.timerID = null;

        this.state[key] = timer

        console.log(timer)
    }

    removeFromState(key) {
        this.state[key] = {}
    }

    restoreTimer (key) {
        this.addToState(key);
    }

    getStateTimer(key) {
        return this.state[key]['timer'];
    }
}

module.exports.state = new State();