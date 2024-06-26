require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');
const mongoDB = require('./db/connect');
const bot = new Telegraf(process.env.BOT_ACCESS_TOKEN);

const loginScene = require('./scenes/logInScene').loginScene;
const authHandler = require('./handler/authHandler');
const timehandler = require('./handler/timeHandler');

const { updateAdminListJob, dayJob, monthJob, weekJob }= require('./cron/cron');

const { logInKeyBoard } = require('./utils/keyBoards');
const { checkUserChatID } = require('./middleware/middleware');

const stage = new Scenes.Stage([ loginScene ]);

bot.use(session());
bot.use(stage.middleware());
bot.use(checkUserChatID)

bot.start(async (ctx) => {
    ctx.reply("Привет, я трекер-бот. Нажми «Войти», чтобы авторизоваться в системе.", logInKeyBoard)
});

bot.action('logIn', async (ctx) => authHandler.logIn(ctx));
bot.action('signIn', async (ctx) => authHandler.signIn(ctx));

bot.action('startTimer', async (ctx) => timehandler.startTimer(ctx));
bot.action('pauseTimer', async (ctx) => timehandler.pauseTimer(ctx));
bot.action('stopTimer', async (ctx) => timehandler.stopTimer(ctx));
bot.action('updateStatistics', async (ctx) => timehandler.updateStatistics(ctx));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

mongoDB.connectDB().then(res => {
    bot.launch().then(res => {
        console.log("[OK] Bot started succesfully!");

        updateAdminListJob.start();
        dayJob.start();
        weekJob.start();
        monthJob.start();
    }).catch(err => {
        console.log("[ERROR] Error started Bot!");
    });
});