import pino from 'pino-http'

let pinoOptions = {}

if (process.env.NODE_ENV === 'development') {
    pinoOptions = {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    }
}

const pinoHttpLogger = pino(pinoOptions)
const logger = pinoHttpLogger.logger

export {
    pinoHttpLogger,
    logger
}