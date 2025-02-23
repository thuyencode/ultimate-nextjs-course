import pino from 'pino'

const {
  env: { LOG_LEVEL, NEXT_RUNTIME, NODE_ENV }
} = process

const isEdge = NEXT_RUNTIME === 'edge'
const isProd = NODE_ENV === 'production'

const logger = pino({
  level: LOG_LEVEL ?? 'info',
  transport:
    !isEdge && !isProd
      ? {
          target: 'pino-pretty',
          options: {
            colorized: true,
            ignore: 'pid,hostname',
            translateTime: 'SYS:standard'
          }
        }
      : undefined,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() })
  },
  timestamp: pino.stdTimeFunctions.isoTime
})

export default logger
