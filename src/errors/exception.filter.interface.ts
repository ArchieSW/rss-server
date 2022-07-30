import { NextFunction, Request, Response } from "express";

export default interface IExceptionFilter {
    catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
