import ILoggerService from './logger.interface';
import { Logger } from 'tslog';
import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export default class LoggerService implements ILoggerService {
    private logger: Logger;

    constructor() {
        this.logger = new Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false,
        });
        this.log('LoggerService was instantiated');
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
