import ILoggerService from "./logger.interface";
import { Logger } from 'tslog';

export default class LoggerService implements ILoggerService {
    logger: Logger;

    constructor() {
        this.logger = new Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false
        })
    }

    public log(...args: unknown[]) {
        this.logger.info(...args);
    }

    public warn(...args: unknown[]) {
        this.logger.warn(...args);
    }

    public error(...args: unknown[]) {
        this.logger.error(...args);
    }
}
