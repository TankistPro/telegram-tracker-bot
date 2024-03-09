const pino = require('pino');

module.exports.pinoLogger = pino(
    {
        formatters: {
            level: (label) => {
                return { level: label.toUpperCase() };
            }
        },
        timestamp: pino.stdTimeFunctions.isoTime,
    },
    pino.destination(`${__dirname}/logs/app.log`)
);
