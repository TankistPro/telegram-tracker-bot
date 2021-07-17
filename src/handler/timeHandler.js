const messages = require('../messages/working');

const { workingPlaceBoard } = require('../utils/keyBoards');
const { userModel } = require('../db/models/userModel');
const { timer } = require('../utils/timer');

module.exports.startTimer = async(ctx) => {
    setInterval(() => {
        ctx.editMessageText(messages.WORKING_MENU(ctx.session.userData, timer), workingPlaceBoard)
    }, 1000)
}

module.exports.pauseTimer = async(ctx) => {
    await ctx.answerCbQuery('Таймер на паузе');
}

module.exports.stopTimer = async(ctx) => {
    await ctx.answerCbQuery('Вы закончили работать');
}