const { userModel } = require('../db/models/userModel');
const { createRandomKey } = require('../utils/getRandomCode');
const { timer } = require('../classes/Timer');

const { state } = require('../classes/State');
const {pinoLogger} = require("../logger/pino");

class Worker {
    async getWorkerById (id) {
        const worker = await userModel.findOne({ id_user: id });

        return worker;
    }

    async createWorker (ctx) {
        const authCode = createRandomKey();

        const model = {
            id_user: ctx.from.id,
            fisrtName: ctx.from.first_name,
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
            isPause: false,
            chat_id: ctx.message.chat.id
        }

        const newWorker = new userModel(model);

        await newWorker.save().then(res => {
            pinoLogger.info('Создан новый пользователь', newWorker);
        })

        state.addToState(model.id_user);

        return {
            id_user: model.id_user,
            authCode
        }
    }

    addWorker (worker) {
        state.addToState(worker.id_user);

        console.log(state);
    }

    async startWorking (worker, timerId) {
        await userModel.updateOne({ id_user: worker.id_user }, {
            $set: { isWorking: true, isPause: false }
        })

        state.setTimerId(worker.id_user, timerId);

        pinoLogger.info({worker, timerId}, 'Пользователь начал рабоать');
    }

    async pauseWorking (worker) {
        await userModel.updateOne({ id_user: worker.id_user }, {
            $set: { isWorking: false, isPause: true }
        })

        timer.pauseWork(worker);

        pinoLogger.info({worker, timer: state.getStateTimer(worker.id_user)}, 'Таймер поставлен на паузу');
    }

    async stopWorking (worker) {
        await userModel.updateOne({ id_user: worker.id_user }, {
            $set: { isWorking: false, isPause: false }
        })

        await timer.stopTimer(worker);

        pinoLogger.info({worker, timer: state.getStateTimer(worker.id_user)}, 'Пользователь закончил работать');
    }
}

module.exports.Worker = new Worker();
