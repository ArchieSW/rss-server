import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import PrismaService from '../database/prisma.service';
import ILoggerService from '../logger/logger.interface';
import { TYPES } from '../types';
import User from './user.entity';
import IUsersRepository from './users.repository.interface';

@injectable()
export default class UsersRepository implements IUsersRepository {
    constructor(
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
        @inject(TYPES.ILoggerService) private logger: ILoggerService,
    ) {
        this.logger.log('UsersRepository was instantiated');
    }

    create({ email, password, name }: User): Promise<UserModel> {
        return this.prismaService.client.userModel.create({
            data: {
                email,
                password,
                name,
            },
        });
    }

    find(email: string): Promise<UserModel | null> {
        return this.prismaService.client.userModel.findFirst({
            where: {
                email,
            },
        });
    }
}
