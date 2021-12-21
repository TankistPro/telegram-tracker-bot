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

    async updateUserStatistics (worker) {
        const userData = await userModel.findOne({id_user: ctx.from.id});
        
        ctx.session.userData = userData;
    }

    async updatePeriod (ctx) {
        const userID = ctx.session.userData.id_user;
        setInterval(async () => {
            await userModel.updateOne({id_user: userID}, { $set: {
                timeDay: 0
            } })

            console.log("Таймер дня обновился")
        }, 3600000 * 24);
   
        setInterval(async () => {
            await userModel.updateOne({id_user: userID}, { $set: {
                timeWeek: 0
            } })

            console.log("Таймер недели обновился")
        }, 3600000 * 24 * 7);
    }
}

module.exports.statistics = new Statistics();