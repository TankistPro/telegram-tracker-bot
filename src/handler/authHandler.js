const { userModel } = require('../db/models/userModel');
const { Worker } = require('../utils/Worker');
const { state } = require('../state');

module.exports.logIn = (ctx) => {
    ctx.answerCbQuery()

    ctx.scene.enter('loginScene');
}

module.exports.signIn = async (ctx) => {
    const existUser = await userModel.findOne({id_user: ctx.from.id});
    
    if(!existUser) {
        const response = await Worker.addWorker(ctx);
        state.addToState(response.id_user)
    
        ctx.reply(`${ ctx.from.username }, твой код для авторизации в системе: ${ response.authCode }.`);
    } else {
        ctx.reply(`${ ctx.from.username }, по нашим данным у вас уже имеется ключ для авторизации.`);
    }
}
