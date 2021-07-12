const { Scenes } = require('telegraf');
const { workingPlaceBoard } = require('../utils/keyBoards');

const workingPlace = async (ctx) => {
    ctx.reply(
    `Добро пожаловать ${ctx.session.username }!\n` +
    `За работой сегодня: 0ч\n` +
    `Отработано за неделю: 0ч\n` +
    `Отработано за месяц: 0ч\n`
    , workingPlaceBoard);
}

module.exports.workingPalce = new Scenes.WizardScene('workingPalce', workingPlace);