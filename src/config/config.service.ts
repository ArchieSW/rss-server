import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import ILoggerService from '../logger/logger.interface';
import { TYPES } from '../types';
import IConfigService from './config.service.interface';

@injectable()
export default class ConfigService implements IConfigService {
    private config: DotenvParseOutput;

    constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
        this.logger.log('ConfigService was instantiated');
        const result: DotenvConfigOutput = config();

        if (result.error) {
            this.logger.error('[ConfigService] .env file parse error');
        } else if (result.parsed) {
            this.logger.log('[ConfigService] .env file parsed succesfully');
            this.config = result.parsed;
        }
    }

    get(key: string): string {
        let out = process.env[key];
        if (!out) {
            out = this.config[key];
        }
        return out;
    }
}
