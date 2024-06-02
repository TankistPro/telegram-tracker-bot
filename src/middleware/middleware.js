const { userModel } = require('../db/models/userModel');
const { Worker } = require('../classes/Worker');

module.exports.checkUserChatID = checkUserChatID = async (ctx, next) => {
       const existUser = await  Worker.getWorkerById(ctx.from.id);

        if(existUser && !existUser.chat_id) {
            const chat_id = ctx.update.callback_query.message.chat.id;

            await userModel.updateOne({ id_user: ctx.from.id }, {
                $set: { chat_id: chat_id }
            })
        }

        next();
}