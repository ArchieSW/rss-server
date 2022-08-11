import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import IMiddleware from './middleware.interface';

export default class AuthMiddleware implements IMiddleware {
    constructor(private secret: string) {}

    public execute(req: Request, res: Response, next: NextFunction): void {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            verify(token, this.secret, (err, payload) => {
                let info: any;
                if (err) {
                    return next();
                } else if (typeof payload === 'string') {
                    info = JSON.parse(payload);
                } else if (payload) {
                    info = payload;
                }
                req.user = info.email;
                next();
            });
        } else {
            next();
        }
    }
}
