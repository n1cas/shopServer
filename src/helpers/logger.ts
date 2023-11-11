import * as fs from 'fs';
import winston from 'winston';

const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'shopServer' },
    transports: [
        new winston.transports.File({ filename: '../error.log', level: 'error' }),
        new winston.transports.File({ filename: '../combined.log' }),
    ],
});
if (process.env.NODE_ENV !== 'prod') {
    winstonLogger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export function log(...messages: any[]) {

    const logEntry = `${new Date().toISOString()} - ${JSON.stringify(messages)}\n`;
    // winstonLogger.info(logEntry);
    if (process.env.NODE_ENV === 'prod') {
        writeToFile(logEntry);
        return;
    }

    // Also log the message to the console
    console.log(logEntry);

    // Append the log entry to the log file
    writeToFile(logEntry);
}

function writeToFile(logEntry: string) {
    fs.appendFile(`../${process.env.NODE_ENV}.online-shop.log`, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}