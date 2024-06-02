const messages = require('../messages/working');

const { workingPlaceBoard } = require('../utils/keyBoards');
const { Worker } = require('../classes/Worker');
const { timer } = require('../classes/Timer');

const { state } = require('../classes/State');
const {pinoLogger} = require("../logger/pino");

module.exports.startTimer = async(ctx) => {
    try {
        const user_id = ctx.from.id;
        const worker = await Worker.getWorkerById(user_id);

        if (worker.isWorking) {
            ctx.answerCbQuery('Вы уже работаете');
            return;
        }

        const time = state.getStateTimer(worker.id_user);
        ctx.editMessageText(messages.WORKING_MENU(worker, timer.displayTimer(time)), workingPlaceBoard);

        const timerId = setInterval(() => {
            const workerTimer = state.getStateTimer(worker.id_user);

            timer.startWork(worker);

            if (workerTimer.seconds - 1 < 0) {
                ctx.editMessageText(messages.WORKING_MENU(worker, timer.displayTimer(workerTimer)), workingPlaceBoard);
            }
        }, 1000)

        await Worker.startWorking(ctx, worker, timerId);

        ctx.answerCbQuery('Вы начали работать');
    } catch (e) {
        pinoLogger.error(e, 'Ошибка при попытке начать работу таймера');
    }
}

module.exports.pauseTimer = async(ctx) => {
    try {
        const user_id = ctx.from.id;
        const worker = await Worker.getWorkerById(user_id);

        if (!worker.isWorking) {
            ctx.answerCbQuery('Вы не начинали работать');
            return;
        }

        await Worker.pauseWorking(ctx, worker);

        const time = state.getStateTimer(worker.id_user)

        ctx.editMessageText(messages.PAUSE_MENU(worker, time), workingPlaceBoard);
        ctx.answerCbQuery('Таймер на паузе');
    } catch (e) {
        pinoLogger.error(e, 'Ошибка при постановке таймера на паузу');
    }

}

module.exports.stopTimer = async(ctx) => {
    try {
        const user_id = ctx.from.id;
        let worker = await Worker.getWorkerById(user_id);

        if (!worker.isWorking && !worker.isPause) {
            ctx.answerCbQuery('Вы не начинали работать');
            return;
        }
        if (worker.isWorking) await Worker.pauseWorking(ctx, worker);

        await Worker.stopWorking(ctx, worker);
        worker = await Worker.getWorkerById(user_id);

        ctx.editMessageText(messages.DEFAULT_MENU(worker), workingPlaceBoard);

        ctx.answerCbQuery('Вы закончили работать');
    } catch (e) {
        pinoLogger.error(e, 'Ошибка при попытке остановить таймера');
    }
}

module.exports.updateStatistics = async(ctx) => {
    try {
        const user_id = ctx.from.id;
        const worker = await Worker.getWorkerById(user_id);
        const workerTimer = state.getStateTimer(worker.id_user);

        if (worker.isWorking) {
            ctx.editMessageText(messages.WORKING_MENU(worker, timer.displayTimer(workerTimer)), workingPlaceBoard).catch((err) => {});
        } else if (worker.isPause){
            ctx.editMessageText(messages.PAUSE_MENU(worker, workerTimer), workingPlaceBoard).catch((err) => {});
        } else {
            ctx.editMessageText(messages.DEFAULT_MENU(worker), workingPlaceBoard).catch((err) => {});
        }

        ctx.answerCbQuery('Статистика успешно обновлена');
    } catch (e) {
        pinoLogger.error(e, 'Ошибка при попытке обновить статистику');
    }
}
