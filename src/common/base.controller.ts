import { Response, Router } from 'express';
import 'reflect-metadata';
import { injectable } from 'inversify';
import ILoggerService from '../logger/logger.interface';
import IControllerRoute, { ExpressReturnType } from './route.interface';

@injectable()
export default abstract class BaseController {
    private readonly _router: Router;

    public get router(): Router {
        return this._router;
    }

    public send<T>(res: Response, code: number, message: T): ExpressReturnType {
        res.type('application/json');
        return res.status(code).json(message);
    }

    public ok<T>(res: Response, message: T): ExpressReturnType {
        return this.send<T>(res, 200, message);
    }

    public created(res: Response): ExpressReturnType {
        return res.sendStatus(201);
    }

    constructor(private logger: ILoggerService) {
        this._router = Router();
    }

    protected bindRoutes(routes: IControllerRoute[]): void {
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const middlewares = route.middlewares?.map((x) => x.execute.bind(x));
            const handler = route.func.bind(this);
            const pipeline = middlewares ? [...middlewares, handler] : handler;
            this.router[route.method](route.path, pipeline);
        }
    }
}
