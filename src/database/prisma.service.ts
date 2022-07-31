import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import ILoggerService from '../logger/logger.interface';
import { TYPES } from '../types';
import IDbService from './db.service.interface';

@injectable()
export default class PrismaService implements IDbService {
    private prisma: PrismaClient;

    constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
        this.logger.log('PrismaService was instantiated');
        this.prisma = new PrismaClient();
    }

    public async connect(): Promise<void> {
        try {
            await this.prisma.$connect();
        } catch (err) {
            if (err instanceof Error) {
                this.logger.error('[PrismaService] failed to connect to db: ' + err.message);
            }
        }
        this.logger.log('[PrismaService] successfully connected to db');
    }

    public async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
        this.logger.log('[PrismaService] successfully disconnected from db');
    }
}
