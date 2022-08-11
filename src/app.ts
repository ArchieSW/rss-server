import express, { Express } from 'express';
import { Server } from 'http';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import ILoggerService from './logger/logger.interface';
import { TYPES } from './types';
import UsersController from './users/users.controller';
import ExceptionFilter from './errors/exception.filter';
import { json } from 'body-parser';
import PrismaService from './database/prisma.service';
import AuthMiddleware from './common/auth.middleware';
import ConfigService from './config/config.service';

@injectable()
export default class App {
    private _app: Express;
    private _server: Server;
    private readonly _port: number;

    public get port(): number {
        return this._port;
    }

    constructor(
        @inject(TYPES.ILoggerService) private logger: ILoggerService,
        @inject(TYPES.UsersController) private userController: UsersController,
        @inject(TYPES.IExceptionFilter) private exceptionFilter: ExceptionFilter,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
        @inject(TYPES.IConfigService) private configService: ConfigService,
    ) {
        this.logger.log('App was instantiated');
        this._app = express();
        this._port = 8000;
    }

    public useMiddlewares(): void {
        this._app.use(json());
        const secret = this.configService.get('SECRET');
        const authMiddleware = new AuthMiddleware(secret);
        this._app.use(authMiddleware.execute.bind(authMiddleware));
    }

    public useRoutes(): void {
        this._app.use('/users', this.userController.router);
    }

    public useExceptionFilter(): void {
        this._app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init(): Promise<void> {
        this.useMiddlewares();
        this.useRoutes();
        this.useExceptionFilter();
        await this.prismaService.connect();
        this._server = this._app.listen(this.port);
        this.logger.log(`Server start at: http://localhost:${this.port}`);
    }
}
