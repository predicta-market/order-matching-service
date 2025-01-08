import winston from 'winston';
import path from 'path';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Set the log level based on environment
const getLogLevel = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development' ? 'debug' : 'warn';
};

// Define colors for each log level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Apply colors to the log levels for console output
winston.addColors(colors);

// Define the log format for console and file
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Configure log file paths
const logDir = process.env.LOG_DIR || 'logs';
const errorLogPath = path.join(logDir, 'error.log');
const allLogPath = path.join(logDir, 'all.log');

// Configure transports for console and file
const transports = [
  // Console transport with colorization
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      logFormat
    ),
  }),
  // File transport without colorization
  new winston.transports.File({
    filename: errorLogPath,
    level: 'error',
    format: logFormat,
  }),
  new winston.transports.File({
    filename: allLogPath,
    format: logFormat,
  }),
];

// Create the logger instance
const Logger = winston.createLogger({
  level: getLogLevel(),
  levels,
  format: logFormat,
  transports,
  silent: process.env.NODE_ENV === 'test', // Optionally silence logging in test environment
});

export default Logger;