const { createRandomKey } = require('../utils/getRandomCode')

module.exports.logIn = (ctx) => {
    ctx.scene.enter('loginScene');
}

module.exports.signIn = (ctx) => {
    const authCode = createRandomKey();
    ctx.reply(`${ ctx.from.username }, твой код для авторизации в системе: ${ authCode }.`);
}
