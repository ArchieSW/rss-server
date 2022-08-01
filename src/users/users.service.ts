import { inject, injectable } from 'inversify';
import IConfigService from '../config/config.service.interface';
import ILoggerService from '../logger/logger.interface';
import { TYPES } from '../types';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import User from './user.entity';
import IUserService from './users.service.interface';

@injectable()
export default class UserService implements IUserService {
    constructor(
        @inject(TYPES.ILoggerService) private logger: ILoggerService,
        @inject(TYPES.IConfigService) private config: IConfigService,
    ) {
        this.logger.log('UserService was instantiated');
    }

    public async createUser({ name, email, password }: UserRegisterDto): Promise<User | null> {
        const user = new User(name, email);
        await user.setPassword(password, this.config.get('SALT'));

        return null;
    }

    public async validateUser(dto: UserLoginDto): Promise<boolean> {
        return false;
    }
}
