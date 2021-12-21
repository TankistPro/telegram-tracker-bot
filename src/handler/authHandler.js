const { userModel } = require('../db/models/userModel');
const { Worker } = require('../classes/Worker');

module.exports.logIn = (ctx) => {
    ctx.answerCbQuery()

    ctx.scene.enter('loginScene');
}

module.exports.signIn = async (ctx) => {
    const existUser = await userModel.findOne({id_user: ctx.from.id});
    
    if(!existUser) {
        const { authCode } = await Worker.createWorker(ctx);
    
        ctx.reply(`${ ctx.from.username }, твой код для авторизации в системе: ${ authCode }.`);
    } else {
        ctx.reply(`${ ctx.from.username }, по нашим данным у вас уже имеется ключ для авторизации.`);
    }
}
