import { IsEmail, IsString } from 'class-validator';

export default class UserRegisterDto {
    @IsEmail({}, { message: 'Неверно указан email' })
    email: string;

    @IsString({ message: 'Неверно указан пароль' })
    password: string;

    @IsString({ message: 'Неверно указано имя' })
    name: string;
}
