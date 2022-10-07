const { userModel } = require('../db/models/userModel');

class Statistics {
    async saveWorkingTime (userData, hours, minutes, seconds) {
        let workedHours = hours + (minutes / 60) + (seconds / 3600);

        await userModel.updateOne({id_user: userData.id_user}, { $set: {
            timeDay: (userData.timeDay + workedHours).toFixed(1),
            timeWeek: (userData.timeWeek + workedHours).toFixed(1),
            timeMonth: (userData.timeMonth + workedHours).toFixed(1)
         } 
        });
    }

    async resetDayTime() {
        await userModel.updateMany({}, { $set: {
            timeDay: 0,
         } 
        });
    }

    async resetWeekTime() {
        await userModel.updateMany({}, { $set: {
            timeWeek: 0,
         } 
        });
    }

    async resetMonthTime() {
        await userModel.updateMany({}, { $set: {
            timeMonth: 0,
         } 
        });
    }
}

module.exports.statistics = new Statistics();