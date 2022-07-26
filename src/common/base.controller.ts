import { Router } from "express";
import 'reflect-metadata'
import { injectable } from "inversify";
import ILoggerService from "../logger/logger.interface";
import IControllerRoute from "./route.interface";

@injectable()
export default abstract class BaseController {
    private readonly _router: Router;

    public get router() {
        return this._router;
    }

    constructor(private logger: ILoggerService) {
        this._router = Router();
    }

    protected bindRoutes(routes: IControllerRoute[]) {
        for(const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }

}
