import { RssModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import PrismaService from '../database/prisma.service';
import ILoggerService from '../logger/logger.interface';
import { TYPES } from '../types';
import IRssRepository from './rss.repository.interface';

@injectable()
export default class RssRepository implements IRssRepository {
    constructor(
        @inject(TYPES.ILoggerService) private logger: ILoggerService,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
    ) {
        this.logger.log('RssRepository was instantiated');
    }

    public async create(userId: number, link: string): Promise<RssModel> {
        return this.prismaService.client.rssModel.create({
            data: {
                link,
                userId,
            },
        });
    }

    public async find(userId: number): Promise<RssModel[]> {
        return this.prismaService.client.rssModel.findMany({
            where: { userId },
        });
    }
}
