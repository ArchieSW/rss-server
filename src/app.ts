import express, { Express } from 'express';
import { Server } from 'http';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import ILoggerService from './logger/logger.interface';
import { TYPES } from './types';
import UsersController from './users/users.controller';

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
    ) {
        this.logger.log('App was instantiated');
        this._app = express();
        this._port = 8000;
    }

    public useRoutes() {
        this._app.use('/users', this.userController.router)
    }

    public init() {
        this.useRoutes();
        this._server = this._app.listen(this.port);
        this.logger.log(`Server start at: http://localhost:${this.port}`);
    }
}
