const { userModel } = require('../db/models/userModel');

// const { state } = require('../utils/state');

// module.exports.isAuth = async(ctx, next) => {
//     if (state.userID) ctx.answerCbQuery('Вы уже вошли в систему!') ;
//     else await next();
// }

// module.exports.updateDate = async (ctx, next) => {
//     if (ctx.session?.userData === undefined) {
//         const userData = await userModel.findOne({id_user: state.userID});
        
//         if (userData) ctx.session.userData = userData;
//     }
//     await next();
// }

// module.exports.getUserData = async (ctx, next) => {
    // const userData = await userModel.findOne({id_user: ctx.from.id});

    // ctx.session.userData = userData;
    
    // return next();
// }