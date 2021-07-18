const { userModel } = require('../db/models/userModel');

class Statistics {
    async saveWorkingTime (userData, hours, minutes, seconds) {
        let workedHours = hours + (minutes / 60) + (seconds / 3600);

        await userModel.updateOne({id_user: userData.id_user}, { $set: {
            timeDay: (userData.timeDay + workedHours).toFixed(1),
            timeWeek: (userData.timeWeek + workedHours).toFixed(1),
            timeMonth: (userData.timeMonth + workedHours).toFixed(1)
         } })
    }

    async updateUserStatistics (ctx) {
        const userData = await userModel.findOne({id_user: ctx.from.id});
        
        ctx.session.userData = userData;
    }
}

module.exports.statistics = new Statistics();