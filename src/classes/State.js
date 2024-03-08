class State {
    constructor() {
        this.state = {};
    }

    addToState(key) {
        this.state[key] = {
            timer: {
                hours: 0,
                minutes: 0,
                seconds: 0,
                timerID: null,
            }
        };
    }

    setTimerId (key, value) {
        const timer = this.getStateTimer(key);

        timer.timerID = value

        this.state[key].timer = timer
    }

    clearTimerId (key) {
        const timer = this.getStateTimer(key);

        clearInterval(timer.timerID)

        timer.timerID = null;

        this.state[key].timer = timer
    }

    removeFromState(key) {
        this.state[key] = {}
    }

    restoreTimer (key) {
        this.addToState(key);
    }

    getStateTimer(key) {
        const timer = this.state[key]?.timer;

        if (!timer) {
            this.addToState(key);
        }

        return this.state[key].timer;
    }

}

module.exports.state = new State();
