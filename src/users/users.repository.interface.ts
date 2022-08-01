import { UserModel } from '@prisma/client';
import User from './user.entity';

export default interface IUsersRepository {
    create: (user: User) => Promise<UserModel>;
    find: (email: string) => Promise<UserModel | null>;
}
