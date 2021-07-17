const messages = require('../messages/working');

const { workingPlaceBoard } = require('../utils/keyBoards');

module.exports.startTimer = async(ctx) => {
    ctx.editMessageText(messages.WORKING_MENU(ctx.from.username), workingPlaceBoard)
}

module.exports.pauseTimer = async(ctx) => {
    await ctx.answerCbQuery('Таймер на паузе');
}

module.exports.stopTimer = async(ctx) => {
    await ctx.answerCbQuery('Вы закончили работать');
}