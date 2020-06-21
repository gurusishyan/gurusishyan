import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';
const { combine, timestamp, label, prettyPrint } = winston.format;
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const logFormat = winston.format.printf((info) => {
  return `${info.timeStamp} ${info.level} [${info.labels}]: ${info.message}`;
});
const labels = 'GurusishyanLogger';
const timeStamp = () => {
  const dateObj = new Date();

  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  const hh = dateObj.getHours();
  const mm = dateObj.getMinutes();
  const ss = dateObj.getSeconds();

  return `${dateObj.getFullYear()}-${month <= 9 ? '0':''}${month}-${
    date <= 9 ? '0':''
  }${date} ${hh <= 9 ? '0':''}${hh}:${mm <= 9 ? '0':''}${mm}:${
    ss <= 9 ? '0':''
  }${ss}`;
};
const now = new Date();
var logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: './logs/gs.log',
      level: 'silly',
    }),
  ],
  format: combine(logFormat),
  exitOnError: false,
});
export const loggerInstance = {
  log: function (
    message,
    level?: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'
  ) {
    if (level) {
      logger.log(level, message, { timeStamp: timeStamp(), level, labels });
    } else {
      logger.log('info', message, { timeStamp: timeStamp(), level, labels });
    }
    return
  },
};
