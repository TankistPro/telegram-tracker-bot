const { userModel } = require('../db/models/userModel');
const { createRandomKey } = require('../utils/getRandomCode');
const { timer } = require('./timer');

class Worker {
    async getWorkerById (id) {
        const worker = await userModel.findOne({ id_user: id })
        return worker;
    }

    async addWorker (ctx) {
        const authCode = createRandomKey();
        const model = {
            id_user: ctx.from.id,
            fisrtName: ctx.from.fisrt_name,
            userName: ctx.from.username,
            authCode: authCode,
            timeDay: 0,
            timeWeek: 0,
            timeMonth: 0,
            timer: {
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            dataAuth: Date.now(),
            isWorking: false,
            isPause: false
        }

        const newWorker = new userModel(model)

        await newWorker.save().then(res => {
            console.log("[OK] Пользователь успешно добавлен")
        })

        console.log(id_user)

        return {
            id_user,
            authCode
        }
    }

    async startWorking (worker) {
        await userModel.updateOne({ id_user: worker.id_user }, { 
            $set: { isWorking: true, isPause: false }
        })
    }

    async userPauseWorking (worker) {
        await userModel.updateOne({ id_user: worker.id_user }, { 
            $set: { isWorking: false, isPause: true }
        })
    }

    async userStopWorking (worker) {
        await userModel.updateOne({ id_user: worker.id_user }, { 
            $set: { isWorking: false, isPause: false }
        })
    }
}

module.exports.Worker = new Worker();