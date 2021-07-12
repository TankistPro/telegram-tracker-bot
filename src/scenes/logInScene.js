const { userModel } = require('../db/models/userModel');
const { Scenes  } = require('telegraf');

const inputCode = async (ctx) => {
    await ctx.reply("Введите 6-ый код:");

    return ctx.wizard.next();
}

const checkCode = async (ctx) => {
    const existUser = await userModel.findOne({id_user: ctx.from.id});
    
    if (ctx.message.text == existUser.authCode) {
        ctx.reply("Вы успешно авторизировались");
        return ctx.scene.leave();
    }

    ctx.reply("Упс...🥺Код неверный⛔. Попробуте снова!")
}

module.exports.loginScene = new Scenes.WizardScene('loginScene', inputCode, checkCode);