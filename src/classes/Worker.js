const { userModel } = require('../db/models/userModel');
const { createRandomKey } = require('../utils/getRandomCode');
const { timer } = require('../classes/Timer');
const { statistics } = require('./Statisctics');
const { state } = require('../classes/State');
const {pinoLogger} = require("../logger/pino");

const messages = require('../messages/working');

class Worker {
    adminList = [];

    constructor() {
        this.getAdmins();
    }

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
    }

    async startWorking (ctx, worker, timerId) {
        await userModel.updateOne({ id_user: worker.id_user }, {
            $set: { isWorking: true, isPause: false }
        })

        state.setTimerId(worker.id_user, timerId);

        this.adminList.forEach(admin => {
            if(admin.id_user !== worker.id_user) { 
                ctx.telegram.sendMessage(admin.chat_id, messages.USER_START_WORKING(worker));
            }
        });
    }

    async pauseWorking (ctx, worker) {
        await userModel.updateOne({ id_user: worker.id_user }, {
            $set: { isWorking: false, isPause: true }
        })

        timer.pauseWork(worker);

        const workerTimer = state.getStateTimer(worker.id_user);
        this.adminList.forEach(admin => {
            if(admin.id_user !== worker.id_user) { 
                ctx.telegram.sendMessage(admin.chat_id, messages.USER_PAUSE_WORKING(worker, workerTimer));
            }
        });
    }

    async stopWorking (ctx, worker) {
        await userModel.updateOne({ id_user: worker.id_user }, {
            $set: { isWorking: false, isPause: false }
        })

        const workerTimer = state.getStateTimer(worker.id_user);
        await statistics.saveWorkingTime(worker, workerTimer.hours, workerTimer.minutes, workerTimer.seconds);

        await timer.stopTimer(worker);

        this.adminList.forEach(admin => {
            if(admin.id_user !== worker.id_user) {
                ctx.telegram.sendMessage(admin.chat_id, messages.USER_END_WORKING(worker, workerTimer));
            }
        });
    }

    async isUserAdmin(workerID) {
        return this.adminList.find(admin => admin.id_user === workerID);
    }

    async getAdmins () {
        this.adminList = await userModel.find({ isAdmin: true});
    }
}

module.exports.Worker = new Worker();
