import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import ILoggerService from '../logger/logger.interface';
import IUsersController from './users.controller.interface';
import { Request, Response, NextFunction } from 'express';
import BaseController from '../common/base.controller';
import HttpError from '../errors/http-error.class';

@injectable()
export default class UsersController extends BaseController implements IUsersController {
    constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService) {
        super(loggerService);
        this.loggerService.log(`UsersController was instantiated`);
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.register },
            { path: '/login', method: 'post', func: this.login },
        ]);
    }

    public login(req: Request, res: Response, next: NextFunction): void {
        next(new HttpError(501, 'This feature is not implemented yet', 'UsersController'));
    }

    public register(req: Request, res: Response, next: NextFunction): void {
        next(new HttpError(501, 'This feature is not implemented yet', 'UsersController'));
    }
}
