const { timer } = require('../classes/Timer')

module.exports.DEFAULT_MENU = (userData) => {
    return `
🤘 Добро пожаловать ${userData.fisrtName || userData.userName}!

⏱ За работой (сегодня): ${userData.timeDay}ч.
⏱ Отработано (за неделю): ${userData.timeWeek}ч.
⏱ Отработано (за месяц): ${userData.timeMonth}ч.

Чтобы начать или продолжить работать нажмите ▶.
`
}

module.exports.WORKING_MENU = (userData, timer) => {
    return `
🤘 Добро пожаловать ${userData.fisrtName || userData.userName}! 

⏱ За работой (сегодня): ${userData.timeDay}ч.
⏱ Отработано (за неделю): ${userData.timeWeek}ч.
⏱ Отработано (за месяц): ${userData.timeMonth}ч.
    
Чтобы начать или продолжить работать нажмите ▶.

🧠 Вы работаете: ${timer}.
`
}

module.exports.PAUSE_MENU = (userData, workerTimer) => {
    return `
🤘 Добро пожаловать ${userData.fisrtName || userData.userName}! 

⏱ За работой (сегодня): ${userData.timeDay}ч.
⏱ Отработано (за неделю): ${userData.timeWeek}ч.
⏱ Отработано (за месяц): ${userData.timeMonth}ч.
  
Чтобы начать или продолжить работать нажмите ▶.

⌛ Таймер на паузе.
🧠 Отработано: ${timer.timeFormat(workerTimer.hours)}:${timer.timeFormat(workerTimer.minutes)}:${timer.timeFormat(workerTimer.seconds)}.
`
}

