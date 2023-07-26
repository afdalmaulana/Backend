const winston = require ("winston")

const errorLogger = winston.createLogger({
    level : "error",
    format : winston.format.json(),
    transports : [
        new winston.transports.File({
            filename : "logs/error.log"
        })
    ]
})

const infoLogger = winston.createLogger({
    level : "info",
    format : winston.format.json(),
    transports : [new winston.transports.Console()]
})

module.exports = {errorLogger, infoLogger}