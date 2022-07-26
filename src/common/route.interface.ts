import { NextFunction, Request, Response, Router } from "express";

export default interface IControllerRoute {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'delete' | 'put'>;
}
