const { Markup } = require('telegraf')

module.exports.logInKeyBoard = Markup.inlineKeyboard([
    Markup.button.callback("✔ Войти", "logIn"),
    Markup.button.callback("✔ Зарегистрироваться", "signIn")
])