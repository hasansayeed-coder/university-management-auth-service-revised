import mongoose from 'mongoose'
import app from './app'
import config from './Config/index'
import { logger , errorlogger } from './share/logger'
import {Server} from 'http' ;



// process.on('uncaughtException' , error => {
//   console.log('UncaughtException Occured! ',error); 

//   errorlogger.log(error);

//   process.exit(1) ; 

// })

let server : Server ;

async function bootstrap() {
  
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database Connected Successfully')

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connect database ', err)
  }

//   process.on('unhandledRejection' , error => {
//     console.log('Unhandled rejecteion is detected...we are closing our server')
//     if(server){
//       server.close(() => {
//         errorlogger.error(error) ; 
//         process.exit(1) ;
//       })
//     }
//     else{
//       process.exit(1);
//     }
//   }
     
//   )
}

bootstrap() ;


process.on('SIGTERM' , () => {
  logger.info('SIGTERM is received') ; 

  if(server){
    server.close() ;
  }
})
