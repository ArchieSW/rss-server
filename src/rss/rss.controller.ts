import { RssModel } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import AuthGuard from '../common/auth.guard';
import BaseController from '../common/base.controller';
import HttpError from '../errors/http-error.class';
import ILoggerService from '../logger/logger.interface';
import { TYPES } from '../types';
import IUserService from '../users/users.service.interface';
import RssCreateDto from './dto/rss-create.dto';
import IRssController from './rss.controller.interface';
import IRssService from './rss.service.interface';

@injectable()
export default class RssController extends BaseController implements IRssController {
    constructor(
        @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
        @inject(TYPES.IRssService) private rssService: IRssService,
        @inject(TYPES.IUserService) private userService: IUserService,
    ) {
        super(loggerService);
        this.loggerService.log('RssController was instantiated');
        this.bindRoutes([
            {
                path: '/get',
                func: this.get,
                method: 'get',
                middlewares: [new AuthGuard()],
            },
            {
                path: '/create',
                func: this.create,
                method: 'post',
                middlewares: [new AuthGuard()],
            },
        ]);
    }

    public async create(
        req: Request<{}, {}, RssCreateDto>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const existedUser = await this.userService.getUserInfo(req.user);
        if (!existedUser) {
            next(new HttpError(404, 'User not found', 'RssController'));
            return;
        }
        const rssCreated = await this.rssService.createNewRss(existedUser.id, req.body.link);
        if (!rssCreated) {
            next(new HttpError(503, 'RssService unavailable', 'RssController'));
            return;
        }
        res.status(201).send({ link: rssCreated.link });
    }

    public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        const existedUser = await this.userService.getUserInfo(req.user);
        if (!existedUser) {
            next(new HttpError(404, 'User not found', 'RssController'));
            return;
        }
        const rssModels: RssModel[] = await this.rssService.getRss(existedUser.id);
        if (rssModels.length === 0) {
            res.status(204).send({ message: 'No content' });
            return;
        }
        const links = rssModels.map((model) => model.link);
        res.status(200).send({ links });
    }
}
