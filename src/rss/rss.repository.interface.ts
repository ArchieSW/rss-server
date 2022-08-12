import { RssModel } from '@prisma/client';

export default interface IRssRepository {
    create: (userId: number, link: string) => Promise<RssModel>;
    find: (userId: number) => Promise<RssModel[]>;
}
