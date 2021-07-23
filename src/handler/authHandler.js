const { userModel } = require('../db/models/userModel');
const { createRandomKey } = require('../utils/getRandomCode');
const { state } = require('../utils/state');

module.exports.logIn = (ctx) => {
    ctx.answerCbQuery()

    ctx.scene.enter('loginScene');
}

module.exports.signIn = async (ctx) => {
    const existUser = await userModel.findOne({id_user: ctx.from.id});
    
    if(!existUser) {
        const authCode = createRandomKey();

        const newUser = new userModel({
            id_user: ctx.from.id,
            fisrtName: ctx.from.fisrt_name,
            userName: ctx.from.username,
            authCode: authCode,
            timeDay: 0,
            timeWeek: 0,
            timeMonth: 0,
            dataAuth: Date.now()
        })
        
        await newUser.save().then(res => {
            console.log("[OK] Пользователь успешно добавлен")
        })
    
        ctx.reply(`${ ctx.from.username }, твой код для авторизации в системе: ${ authCode }.`);
    } else {
        ctx.reply(`${ ctx.from.username }, по нашим данным у вас уже имеется ключ для авторизации.`);
    }
}
