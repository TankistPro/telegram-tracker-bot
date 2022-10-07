const cronJob = require('cron').CronJob;

const { statistics } = require('../classes/Statisctics');

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

module.exports = {
    dayJob
}