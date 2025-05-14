import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  exitOnError: false,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()]
})

export { logger }
