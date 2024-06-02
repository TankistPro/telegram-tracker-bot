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

module.exports.USER_START_WORKING = (userData) => {
    return `💻 Пользователь ${userData.fisrtName || userData.userName} начал(-a) работать ${ (new Date()).toLocaleString('ru-RU')}.`
}

module.exports.USER_END_WORKING = (userData, workerTimer) => {
    return `
💻 Пользователь ${userData.fisrtName || userData.userName} закончил(-a) работать в ${ (new Date()).toLocaleString('ru-RU')}.
🧠Отработано: ${timer.timeFormat(workerTimer.hours)}:${timer.timeFormat(workerTimer.minutes)}:${timer.timeFormat(workerTimer.seconds)}`
}

module.exports.USER_PAUSE_WORKING = (userData, workerTimer) => {
    return `
💻 Пользователь ${userData.fisrtName || userData.userName} поставил на паузу таймер в ${ (new Date()).toLocaleString('ru-RU')}.
⌛ Уже отработано: ${timer.timeFormat(workerTimer.hours)}:${timer.timeFormat(workerTimer.minutes)}:${timer.timeFormat(workerTimer.seconds)}`
}

