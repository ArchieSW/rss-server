import { NextFunction, Request, Response } from 'express';

export default interface IMiddleware {
    execute: (req: Request, res: Response, next: NextFunction) => void;
}
