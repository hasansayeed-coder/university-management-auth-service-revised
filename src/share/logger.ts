/* eslint-disable no-undef */
import path from 'path'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf  , prettyPrint} = format;

// Custom Log Format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp) ;
  const hours = date.getHours() ; 
  const minutes = date.getMinutes() ;
  const seconds = date.getSeconds() ;
  return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});



const errorlogger = createLogger({
    level: 'error',
    format: combine(
      label({ label: 'PH' }),
      timestamp(),
      myFormat , 
      prettyPrint()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      
      new transports.Console(),

      new DailyRotateFile({
        filename: path.join(process.cwd() , 'logs' , 'winston' , 'errors' , 'phu-%DATE%-error.log'),
        datePattern: 'YYYY-DD-MM-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      }),
      
    ],
});

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'PH' }),
    timestamp(),
    myFormat , 
    prettyPrint()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(process.cwd() , 'logs' , 'winston' , 'successes' , 'phu-%DATE%-success.log'), 
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    }),
  ],
});

export {
  logger , 
  errorlogger
} ;
