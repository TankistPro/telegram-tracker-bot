const { statistics } = require('./Statisctics');
const { state } = require('../classes/State');

class Timer {
    timeFormat(time) {
        return time < 10 ? "0" + time : time;
    }

    displayTimer(workerTimer) {
        return `${this.timeFormat(workerTimer.hours)}:${this.timeFormat(workerTimer.minutes)}:${this.timeFormat(workerTimer.seconds)}`;
    }

    startWork(worker) {
        const workerTimer = state.getStateTimer(worker.id_user);

        if(workerTimer.minutes != 59) workerTimer.minutes += 1;
        else {
            workerTimer.hours++;
            workerTimer.minutes = 0;
        }
    }

    pauseWork(worker) {
        const timer = state.getStateTimer(worker.id_user);

        if(timer.timerID !== -1) clearInterval(timer.timerID);
        return state.setTimerId(worker.id_user, -1);
    }

    async stopTimer(worker) {
        state.clearTimerId(worker.id_user);
        const timer = state.getStateTimer(worker.id_user);

        state.restoreTimer(worker.id_user);

        await statistics.saveWorkingTime(worker, timer.hours, timer.minutes, timer.seconds);
    }
}

module.exports.timer = new Timer();
