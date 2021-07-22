const { userModel } = require('../db/models/userModel');
const { state } = require('../utils/state');

module.exports.isAuth = async (ctx, next) => {
    if (state.userID && ctx.session?.userData === undefined) {
        const userData = await userModel.findOne({id_user: state.userID});
        
        ctx.session.userData = userData;
    }
    await next();
}