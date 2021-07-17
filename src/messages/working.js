module.exports.DEFAULT_MENU = (username) => {
    return `
    Добро пожаловать ${username}!

    За работой (сегодня): 0ч
    Отработано(за неделю): 0ч
    Отработано (за месяц): 0ч 
    `
}

module.exports.WORKING_MENU = (username) => {
    return `
    Добро пожаловать ${username}! 

    За работой (сегодня): 0ч
    Отработано(за неделю): 0ч
    Отработано (за месяц): 0ч
    
    Вы работаете: 00:00
    `
}

