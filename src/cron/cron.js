const cronJob = require('cron').CronJob;

const { statistics } = require('../classes/Statisctics');
const { Worker } = require('../classes/Worker');

const updateAdminListJob = new cronJob(
    '*/15 * * * *',
    async function () {
        await Worker.getAdmins();
        console.log('Список админов успешно обновлен!');
	},
    null,
    false,
    'Europe/Moscow'
)

const dayJob = new cronJob(
    '00 00 00 * * *',
    async function () {
        await statistics.resetDayTime();
        console.log('Выполнено обнуление часов за день!');
	},
    null,
    false,
    'Europe/Moscow'
)

const weekJob = new cronJob(
    '00 00 00 * * 1',
    async function () {
        await statistics.resetWeekTime();
        console.log('Выполнено обнуление часов за неделю!');
	},
    null,
    false,
    'Europe/Moscow'
)

const monthJob = new cronJob(
    '00 00 00 1 * *',
    async function () {
        await statistics.resetMonthTime();
        console.log('Выполнено обнуление часов за неделю!');
	},
    null,
    false,
    'Europe/Moscow'
)

module.exports = {
    updateAdminListJob,
    dayJob,
    weekJob,
    monthJob
}