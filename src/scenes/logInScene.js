const messages = require('../messages/working');

const { workingPlaceBoard } = require('../utils/keyBoards');
const { userModel } = require('../db/models/userModel');
const { Scenes } = require('telegraf');
const { state } = require('../utils/state');

const inputCode = async (ctx) => {
    await ctx.reply("Введите 6-ый код:");
    return ctx.wizard.next();
}

const checkCode = async (ctx) => {
    const existUser = await userModel.findOne({id_user: ctx.from.id});

    if (ctx.message.text == existUser?.authCode && existUser) {
        const userData = await userModel.findOne({id_user: ctx.from.id});
        state.userID = ctx.from.id;
        ctx.session.userData = userData;

        ctx.reply(messages.DEFAULT_MENU(ctx.session.userData), workingPlaceBoard);
    } else {
        ctx.reply("Упс...🥺Код неверный⛔.");
    }

    return ctx.scene.leave()
}

module.exports.loginScene = new Scenes.WizardScene('loginScene', inputCode, checkCode);