import { IsUrl } from 'class-validator';

export default class RssCreateDto {
    @IsUrl({ message: 'Invalid link type' })
    link: string;
}
