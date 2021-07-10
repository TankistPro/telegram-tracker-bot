require('dotenv').config();

const { Telegraf, Scenes: { BaseScene, Stage } } = require('telegraf');
const bot = new Telegraf(process.env.BOT_ACCESS_TOKEN);

const loginActions = require('./actions/loginActions');

const { createRandomKey } = require('./utils/getRandomCode')
const { logInKeyBoard } = require('./utils/keyBoards');

bot.start((ctx) => ctx.telegram.sendMessage(ctx.from.id, "Привет, я трекер-бот. Нажми «Войти», чтобы авторизоваться в системе.", logInKeyBoard));

bot.action('LogIn', ctx => loginActions.logIn(ctx));

bot.command('/regme', (ctx) => {
    const authCode = createRandomKey();
    ctx.reply(`${ ctx.from.username }, твой код для авторизации в системе: ${ authCode }.`)
})
bot.launch();