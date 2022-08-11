import { UserModel } from '@prisma/client';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';

export default interface IUserService {
    createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
    validateUser: (dto: UserLoginDto) => Promise<boolean>;
    signJWT: (email: string) => Promise<string>;
    getUserInfo: (email: string) => Promise<UserModel | null>;
}
