import { IsEmail, IsString } from 'class-validator';

export default class UserLoginDto {
    @IsEmail({}, { message: 'Неправильно введен email' })
    email: string;

    @IsString({ message: 'Неправильно введен пароль' })
    password: string;
}
