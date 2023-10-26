import mongoose from 'mongoose'
import app from './app'
import config from './Config/index'
import { logger , errorlogger } from './share/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database Connected Successfully')

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connect database ', err)
  }
}

bootstrap() ;
