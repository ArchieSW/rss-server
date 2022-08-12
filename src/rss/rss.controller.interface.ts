import { NextFunction, Request, Response } from 'express';

export default interface IRssController {
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    get: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
