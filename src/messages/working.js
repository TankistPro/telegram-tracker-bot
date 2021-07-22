module.exports.DEFAULT_MENU = (userData) => {
    return `
🤘 Добро пожаловать ${userData.userName}!

⏱ За работой (сегодня): ${userData.timeDay}ч.
⏱ Отработано (за неделю): ${userData.timeWeek}ч.
⏱ Отработано (за месяц): ${userData.timeMonth}ч.

Чтобы начать или продолжить работать нажмите ▶.
`
}

module.exports.WORKING_MENU = (userData, timer) => {
    return `
🤘 Добро пожаловать ${userData.userName}! 

⏱ За работой (сегодня): ${userData.timeDay}ч.
⏱ Отработано (за неделю): ${userData.timeWeek}ч.
⏱ Отработано (за месяц): ${userData.timeMonth}ч.
    
Чтобы начать или продолжить работать нажмите ▶.

🧠 Вы работаете: ${timer}.
`
}

module.exports.PAUSE_MENU = (userData, timer) => {
    return `
🤘 Добро пожаловать ${userData.userName}! 

⏱ За работой (сегодня): ${userData.timeDay}ч.
⏱ Отработано (за месяц): ${userData.timeMonth}ч.
⏱ Отработано (за неделю): ${userData.timeWeek}ч.
  
Чтобы начать или продолжить работать нажмите ▶.

⌛ Таймер на паузе.
🧠 Отработано: ${timer}.
`
}

