import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import User from './user.entity';

export default interface IUserService {
    createUser: (dto: UserRegisterDto) => Promise<User | null>;
    validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
