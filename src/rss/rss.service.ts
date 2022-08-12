import { RssModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogLevel } from 'tslog';
import ILoggerService from '../logger/logger.interface';
import { TYPES } from '../types';
import IRssRepository from './rss.repository.interface';
import IRssService from './rss.service.interface';

@injectable()
export default class RssService implements IRssService {
    constructor(
        @inject(TYPES.ILoggerService) private logger: ILoggerService,
        @inject(TYPES.IRssRepository) private rssRepository: IRssRepository,
    ) {
        this.logger.log('RssService was instantiated');
    }

    public async createNewRss(userId: number, link: string): Promise<RssModel | null> {
        return this.rssRepository.create(userId, link);
    }

    public getRss(userId: number): Promise<RssModel[]> {
        return this.rssRepository.find(userId);
    }
}
