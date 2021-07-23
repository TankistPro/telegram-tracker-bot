const messages = require('../messages/working');

const { workingPlaceBoard } = require('../utils/keyBoards');
const { statistics } = require('../utils/statisctics');
const { timer } = require('../utils/timer');

let timerID = -1
let isWorking = false;
let isPause = false;

module.exports.startTimer = async(ctx) => {
    console.log(statistics.updatePeriod(ctx));
    if (isWorking) {
        ctx.answerCbQuery('Вы уже работаете');
        return;
    }
    isWorking = true;
    isPause = false;

    ctx.editMessageText(messages.WORKING_MENU(ctx.session.userData, timer.startWork()), workingPlaceBoard);
    timerID = setInterval(() => {
        ctx.editMessageText(messages.WORKING_MENU(ctx.session.userData, timer.startWork()), workingPlaceBoard);
    }, 1000)

    ctx.answerCbQuery('Вы начали работать');
}

module.exports.pauseTimer = async(ctx) => {
    if (!isWorking) {
        ctx.answerCbQuery('Вы не начинали работать');
        return;
    }
    isWorking = false;
    isPause = true;

    timerID = timer.pauseWork(timerID);
    ctx.editMessageText(messages.PAUSE_MENU(ctx.session.userData, timer.displayTimer()), workingPlaceBoard);
    ctx.answerCbQuery('Таймер на паузе');
}

module.exports.stopTimer = async(ctx) => {
    if (!isWorking && !isPause) {
        ctx.answerCbQuery('Вы не начинали работать');
        return;
    }
    if (isWorking) timerID = timer.pauseWork(timerID);

    isWorking = false;
    isPause = false;

    timerID = await timer.stopTimer(timerID, ctx.session.userData);
    ctx.editMessageText(messages.DEFAULT_MENU(ctx.session.userData), workingPlaceBoard);
    ctx.answerCbQuery('Вы закончили работать');
}

module.exports.updateStatistics = async(ctx) => {
    await statistics.updateUserStatistics(ctx);
    
    ctx.editMessageText(messages.DEFAULT_MENU(ctx.session.userData), workingPlaceBoard).catch((err) => {});
    ctx.answerCbQuery('Статистика успешно обновлена');
}