const messages = require('../messages/working');

const { workingPlaceBoard } = require('../utils/keyBoards');
const { Worker } = require('../utils/Worker');
const { timer } = require('../utils/timer');

const { state } = require('../state');

module.exports.startTimer = async(ctx) => {
    const user_id = ctx.from.id;
    const worker = await Worker.getWorkerById(user_id);

    if (worker.isWorking) {
        ctx.answerCbQuery('Вы уже работаете');
        return;
    }

    await Worker.startWorking(worker);

    ctx.editMessageText(messages.WORKING_MENU(worker, timer.startWork(worker)), workingPlaceBoard);
    
    const timerId = setInterval(() => {
        ctx.editMessageText(messages.WORKING_MENU(worker, timer.startWork(worker)), workingPlaceBoard);
    }, 1000)

    state.setTimerId(worker.id_user, timerId);

    ctx.answerCbQuery('Вы начали работать');
}

module.exports.pauseTimer = async(ctx) => {
    const user_id = ctx.from.id;
    const worker = await Worker.getWorkerById(user_id);

    if (!worker.isWorking) {
        ctx.answerCbQuery('Вы не начинали работать');
        return;
    }

    await Worker.userPauseWorking(worker);

    timer.pauseWork(worker);

    const time = state.getStateTimer(worker.id_user)

    ctx.editMessageText(messages.PAUSE_MENU(worker, time), workingPlaceBoard);
    ctx.answerCbQuery('Таймер на паузе');
}

module.exports.stopTimer = async(ctx) => {
    const user_id = ctx.from.id;
    const worker = await Worker.getWorkerById(user_id);

    if (!worker.isWorking && !worker.isPause) {
        ctx.answerCbQuery('Вы не начинали работать');
        return;
    }
    if (worker.isWorking) timer.pauseWork(worker);

    await Worker.userStopWorking(worker);

    await timer.stopTimer(worker);

    ctx.editMessageText(messages.DEFAULT_MENU(worker), workingPlaceBoard);
    ctx.answerCbQuery('Вы закончили работать');
}

module.exports.updateStatistics = async(ctx) => {
    const user_id = ctx.from.id;
    const worker = await Worker.getWorkerById(user_id);
    
    ctx.editMessageText(messages.DEFAULT_MENU(worker), workingPlaceBoard).catch((err) => {});
    ctx.answerCbQuery('Статистика успешно обновлена');
}