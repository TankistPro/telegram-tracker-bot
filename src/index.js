require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');

const { logInKeyBoard } = require('./utils/keyBoards');

const loginScene = require('./scenes/logInScene').loginScene;

const authHandler = require('./handler/authHandler');

const bot = new Telegraf(process.env.BOT_ACCESS_TOKEN);

const stage = new Scenes.Stage([ loginScene ]);
bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => {
    ctx.reply("Привет, я трекер-бот. Нажми «Войти», чтобы авторизоваться в системе.", logInKeyBoard)
});

bot.action('logIn', async (ctx) => authHandler.logIn(ctx));
bot.action('signIn', ctx => authHandler.signIn(ctx) )

bot.launch();