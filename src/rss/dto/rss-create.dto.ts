import { IsString } from 'class-validator';

export default class RssCreateDto {
    @IsString({ message: 'Invalid link type' })
    link: string;
}
