import { inject, injectable } from 'inversify';
import ILoggerService from '../logger/logger.interface';
import { TYPES } from '../types';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import User from './user.entity';
import IUserService from './user.service.interface';

@injectable()
export default class UserService implements IUserService {
    constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
        this.logger.log('UserService was instantiated');
    }

    public async createUser({ name, email, password }: UserRegisterDto): Promise<User | null> {
        const user = new User(name, email);
        await user.setPassword(password);

        return null;
    }

    public async validateUser(dto: UserLoginDto): Promise<boolean> {
        return false;
    }
}
