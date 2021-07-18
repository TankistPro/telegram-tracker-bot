const messages = require('../messages/working');

const { workingPlaceBoard } = require('../utils/keyBoards');
const { userModel } = require('../db/models/userModel');
const { timer } = require('../utils/timer');

let timerID = -1

module.exports.startTimer = async(ctx) => {
    timerID = setInterval(() => {
        ctx.editMessageText(messages.WORKING_MENU(ctx.session.userData, timer.startWork()), workingPlaceBoard);
    }, 1000)

    await ctx.answerCbQuery('Вы начали работать');
}

module.exports.pauseTimer = async(ctx) => {
    timerID = timer.pauseWork(timerID);
    await ctx.editMessageText(messages.PAUSE_MENU(ctx.session.userData, timer.displayTimer()), workingPlaceBoard);
    await ctx.answerCbQuery('Таймер на паузе');
}

module.exports.stopTimer = async(ctx) => {
    timerID = timer.stopTimer(timerID);
    await ctx.editMessageText(messages.DEFAULT_MENU(ctx.session.userData), workingPlaceBoard);
    await ctx.answerCbQuery('Вы закончили работать');
}