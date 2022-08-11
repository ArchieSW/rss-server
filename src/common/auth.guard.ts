import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/http-error.class';
import IMiddleware from './middleware.interface';

export default class AuthGuard implements IMiddleware {
    execute(req: Request, res: Response, next: NextFunction): void {
        if (!req.user) {
            next(new HttpError(401, 'You are not authorized', 'AuthGuard'));
        }
        return next();
    }
}
