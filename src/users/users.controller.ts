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
import IUserService from './users.service.interface';
import AuthGuard from '../common/auth.guard';

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
            {
                path: '/info',
                method: 'get',
                func: this.info,
                middlewares: [new AuthGuard()],
            },
        ]);
    }

    public async login(
        req: Request<{}, {}, UserLoginDto>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const userExists = await this.userService.validateUser(req.body);
        if (!userExists) {
            return next(new HttpError(401, 'Authorization failed', 'UsersController'));
        }
        const userEmail = req.body.email;
        const jwt = await this.userService.signJWT(userEmail);
        this.ok(res, { jwt });
    }

    public async register(
        req: Request<{}, {}, UserRegisterDto>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const result = await this.userService.createUser(req.body);
        if (!result) {
            return next(new HttpError(422, 'User already exists', 'UsersController'));
        }
        this.ok(res, { email: result.email, id: result.id });
    }

    public async info(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userInfo = await this.userService.getUserInfo(req.user);
        if (!userInfo) {
            return next(new HttpError(404, 'Not found', 'UsersController'));
        }
        this.ok(res, { id: userInfo.id, email: userInfo.email, name: userInfo.name });
    }
}
