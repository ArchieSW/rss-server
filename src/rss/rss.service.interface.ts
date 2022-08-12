import { RssModel } from '@prisma/client';

export default interface IRssService {
    createNewRss: (userId: number, link: string) => Promise<RssModel | null>;
    getRss: (userId: number) => Promise<RssModel[]>;
}
