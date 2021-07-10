const { Markup } = require('telegraf')

module.exports.logInKeyBoard = Markup.inlineKeyboard([
    Markup.button.callback("Войти", "LogIn")
])