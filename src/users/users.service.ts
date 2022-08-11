import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import IConfigService from '../config/config.service.interface';
import ILoggerService from '../logger/logger.interface';
import { TYPES } from '../types';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import User from './user.entity';
import UsersRepository from './users.repository';
import IUserService from './users.service.interface';

@injectable()
export default class UserService implements IUserService {
    constructor(
        @inject(TYPES.ILoggerService) private logger: ILoggerService,
        @inject(TYPES.IConfigService) private config: IConfigService,
        @inject(TYPES.IUsersRepository) private usersRepository: UsersRepository,
    ) {
        this.logger.log('UserService was instantiated');
    }

    public async createUser({ name, email, password }: UserRegisterDto): Promise<UserModel | null> {
        const user: User = new User(name, email);
        const salt = this.config.get('SALT');
        await user.setPassword(password, salt);
        const isExist = await this.usersRepository.find(email);
        if (isExist) {
            return null;
        }
        this.logger.log('[UserService] new user created');
        return this.usersRepository.create(user);
    }

    public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
        const userExists = await this.usersRepository.find(email);
        if (!userExists) {
            return false;
        }
        const user = new User(userExists.name, userExists.email, userExists.password);
        return user.comparePassword(password);
    }
}
