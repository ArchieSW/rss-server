import { NextFunction, Request, Response } from "express";

export default interface IUsersController {
    login: (req: Request, res: Response, next: NextFunction) => void;
    register: (req: Request, res: Response, next: NextFunction) => void;
}
