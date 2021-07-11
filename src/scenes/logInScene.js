const { Scenes  } = require('telegraf');

const inputCode = async (ctx) => {
    await ctx.updateType("Введите 6-ый код:");

    return ctx.wizard.next();
}

const checkCode = async (ctx) => {
    if (ctx.message.text === 'admin')
        return ctx.scene.leave();

    await ctx.editedMessage("Упс...🥺Код неверный⛔")
}

module.exports.loginScene = new Scenes.WizardScene('loginScene', inputCode, checkCode);