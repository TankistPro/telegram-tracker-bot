module.exports.DEFAULT_MENU = (userData) => {
    return `
🤘Добро пожаловать ${userData.userName}!

👌За работой (сегодня): ${userData.timeDay}ч.
🤛Отработано (за неделю): ${userData.timeWeek}ч.
💪Отработано (за месяц): ${userData.timeMonth}ч.
`
}

module.exports.WORKING_MENU = (userData, displayTimer) => {
    return `
🤘Добро пожаловать ${userData.userName}! 

👌За работой (сегодня): ${userData.timeDay}ч.
🤛Отработано (за неделю): ${userData.timeWeek}ч.
💪Отработано (за месяц): ${userData.timeMonth}ч.
    
🧠Вы работаете: ${displayTimer}.
`
}

