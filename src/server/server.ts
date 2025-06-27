import dotenv from 'dotenv'

import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { routes } from '../application/application'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../infraestructure/logger/logger'
import cors from 'cors'
import BusinessError from '../infraestructure/errors/business-error'
import apiMetrics from 'prometheus-api-metrics'
import crypt from 'crypto'
import figlet from 'figlet'
import * as swaggerUi from 'swagger-ui-express'
import Metrics from '../infraestructure/metrics/metrics'
import DateUtil from '../infraestructure/util/date-util'
import YAML from 'yamljs'
dotenv.config({ encoding: 'utf8' })

// BANNER DA API
const banner = 'Workout API'
figlet(banner, (err, data) => {
  if (err) {
    console.error('Something went wrong...')
    console.dir(err)
    return
  }
  console.log(data)
})

// Carregando o Express
const app = express()
app.use(cors())
app.use(apiMetrics())

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.status(200).send({
    status: 'UP'
  })
})

// LOG DE AUTITORIA
app.use((req: any, res, next) => {
  const encryptData = crypt.randomBytes(16).toString('hex')
  req.encryptID = encryptData
  logger.info(`Req - ${req.encryptID} - ${req.socket.remoteAddress} - ${req.originalUrl}`)
  next()
})

app.use((req: any, res, next) => {
  const send = res.send
  res.send = c => {
    logger.info(`Res - ${req.encryptID}`)
    res.send = send
    return res.send(c)
  }
  next()
})

// Distributed tracing header X-Request-Id
app.use((req: any, res, next) => {
  req.id = uuidv4()
  next()
})

// METRICAS PROMETEUS
const metrics = new Metrics()
app.use((req: any, res, next) => {
  const startEpoch = Date.now()
  res.on('finish', () => {
    void metrics.allCustomMetrics(req, res.statusCode, startEpoch)
  })
  next()
})

app.use(helmet())
app.use(compression())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
app.use('/public', express.static('public'))

// SWAGGER
const swaggerDocument = YAML.load('src/server/swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// ROTAS
app.use('/', routes)

// TRATAMENTO DE ERROS.
app.use((err, req, res, next) => {
  const currentDateTime = new DateUtil().currentDateTime()
  const handledError: any = { date: currentDateTime }
  let statusCode = 500

  if (err instanceof BusinessError) {
    handledError.status = 'BUSINESS_ERROR'
    statusCode = err.statusCode
    logger.info(err.message)
    handledError.message = err.message
    handledError.details = err.details
  } else {
    logger.error(err.stack)
    handledError.status = 'UNKNOWN_ERROR'
    handledError.message = err.message
  }

  res.status(statusCode)
  res.json(handledError)
})

const runMigrationsAndInitApp = async (): Promise<void> => {
  try {
    await initApp()
  } catch (err: any) {
    logger.error('ERRO')
    logger.error(err.stack)
  }
}

const initApp = async (): Promise<void> => {
  const requireMainModule = require.main === module
  if (requireMainModule) {
    var server = app.listen(process.env.PORT ?? 3001, () => {
      logger.info(`Listening on port ${process.env.PORT ?? 3001} ${process.env.NODE_ENV ?? 'localhost'}`)
    })
    server.timeout = 1200000
  }

}

void runMigrationsAndInitApp()

module.exports = app
