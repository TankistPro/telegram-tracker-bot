const { Markup } = require('telegraf')

module.exports.logInKeyBoard = Markup.inlineKeyboard([
    Markup.button.callback("🔑 Войти", "logIn"),
    Markup.button.callback("🔐 Зарегистрироваться", "signIn")
]);

module.exports.workingPlaceBoard = Markup.inlineKeyboard([
    [
        Markup.button.callback('▶', 'startTimer'),
        Markup.button.callback('⏸', 'pauseTimer'),
        Markup.button.callback('⏯', 'stopTimer'),
    ],
    [
        Markup.button.callback('↕ Расширенная статистика', 'extendStatistic')
    ]
]);