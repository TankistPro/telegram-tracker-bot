require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');
const mongoDB = require('./db/connect');
const bot = new Telegraf(process.env.BOT_ACCESS_TOKEN);

const loginScene = require('./scenes/logInScene').loginScene;
const authHandler = require('./handler/authHandler');
const timehandler = require('./handler/timeHandler');

const { logInKeyBoard } = require('./utils/keyBoards');
const { isAuth } = require('./middleware/isAuth');

const stage = new Scenes.Stage([ loginScene ]);
bot.use(session());
bot.use(isAuth);
bot.use(stage.middleware());

bot.start(async (ctx) => {
    ctx.reply("Привет, я трекер-бот. Нажми «Войти», чтобы авторизоваться в системе.", logInKeyBoard)
});

bot.action('logIn', async (ctx) => authHandler.logIn(ctx));
bot.action('signIn', async (ctx) => authHandler.signIn(ctx));

bot.action('startTimer', async (ctx) => timehandler.startTimer(ctx));
bot.action('pauseTimer',async (ctx) => timehandler.pauseTimer(ctx));
bot.action('stopTimer',async (ctx) => timehandler.stopTimer(ctx));
bot.action('updateStatistics', async (ctx) => timehandler.updateStatistics(ctx));

mongoDB.connectDB().then(res => {
    bot.launch().then(res => {
        console.log("[OK] Bot started succesfully!");
    }).catch(err => {
        console.log("[ERROR] Error started Bot!");
    });
});