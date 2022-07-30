import express, { Express } from 'express';
import { Server } from 'http';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import ILoggerService from './logger/logger.interface';
import { TYPES } from './types';
import UsersController from './users/users.controller';
import ExceptionFilter from './errors/exception.filter';

@injectable()
export default class App {
    private _app: Express;
    private _server: Server;
    private readonly _port: number;

    public get port() : number {
        return this._port;
    }

    constructor(
        @inject(TYPES.ILoggerService) private logger: ILoggerService,
        @inject(TYPES.UsersController) private userController: UsersController,
        @inject(TYPES.IExceptionFilter) private exceptionFilter: ExceptionFilter,
    ) {
        this.logger.log('App was instantiated');
        this._app = express();
        this._port = 8000;
    }

    public useRoutes() {
        this._app.use('/users', this.userController.router)
    }

    public useExceptionFilter() {
        this._app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public init() {
        this.useRoutes();
        this.useExceptionFilter();
        this._server = this._app.listen(this.port);
        this.logger.log(`Server start at: http://localhost:${this.port}`);
    }
}
