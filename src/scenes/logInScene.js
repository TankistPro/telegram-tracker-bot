const messages = require('../messages/working');

const { workingPlaceBoard } = require('../utils/keyBoards');
const { userModel } = require('../db/models/userModel');
const { Scenes } = require('telegraf');
const { statistics } = require('../utils/statisctics');
const { state } = require('../state');

const inputCode = async (ctx) => {
    await ctx.reply("Введите 6-ый код:");
    return ctx.wizard.next();
}

const checkCode = async (ctx) => {
    const existUser = await userModel.findOne({id_user: ctx.from.id});

    if (ctx.message.text == existUser?.authCode && existUser) {
        const worker = await userModel.findOne({id_user: ctx.from.id});
        
        state.addToState(worker.id_user)

        ctx.telegram.sendMessage(ctx.message.chat.id, messages.DEFAULT_MENU(worker), workingPlaceBoard);
    } else {
        ctx.telegram.sendMessage(ctx.message.chat.id, "Упс...🥺Код неверный⛔.");
    }

    return ctx.scene.leave()
}

module.exports.loginScene = new Scenes.WizardScene('loginScene', inputCode, checkCode);