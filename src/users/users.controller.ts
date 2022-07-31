import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import ILoggerService from '../logger/logger.interface';
import IUsersController from './users.controller.interface';
import { Request, Response, NextFunction } from 'express';
import BaseController from '../common/base.controller';
import HttpError from '../errors/http-error.class';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import ValidateMiddleware from '../validator/validator.middleware';
import IUserService from './user.service.interface';

@injectable()
export default class UsersController extends BaseController implements IUsersController {
    constructor(
        @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
        @inject(TYPES.IUserService) private userService: IUserService,
    ) {
        super(loggerService);
        this.loggerService.log(`UsersController was instantiated`);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new ValidateMiddleware(UserRegisterDto)],
            },
            {
                path: '/login',
                method: 'post',
                func: this.login,
                middlewares: [new ValidateMiddleware(UserLoginDto)],
            },
        ]);
    }

    public login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
        next(new HttpError(501, 'This feature is not implemented yet', 'UsersController'));
    }

    public register(
        req: Request<{}, {}, UserRegisterDto>,
        res: Response,
        next: NextFunction,
    ): void {
        next(new HttpError(501, 'This feature is not implemented yet', 'UsersController'));
    }
}
