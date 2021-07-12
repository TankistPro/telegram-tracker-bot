require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');
const mongoDB = require('./db/connect');

const bot = new Telegraf(process.env.BOT_ACCESS_TOKEN);

const loginScene = require('./scenes/logInScene').loginScene;
const workingPlaceScene = require('./scenes/workingPalce').workingPalce;

const authHandler = require('./handler/authHandler');
const timehandler = require('./handler/timeHandler');

const { logInKeyBoard } = require('./utils/keyBoards');

const stage = new Scenes.Stage([ loginScene, workingPlaceScene ]);
bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => {
    ctx.reply("Привет, я трекер-бот. Нажми «Войти», чтобы авторизоваться в системе.", logInKeyBoard)
});

bot.action('logIn', async (ctx) => authHandler.logIn(ctx));
bot.action('signIn', async (ctx) => authHandler.signIn(ctx));

bot.action('startTimer', async (ctx) => timehandler.startTimer(ctx));

mongoDB.connectDB().then(res => {
    bot.launch().then(res => {
        console.log("[OK] Bot started succesfully!");
    }).catch(err => {
        console.log("[ERROR] Error started Bot!");
    });
});