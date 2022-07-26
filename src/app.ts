import express, { Express } from 'express';
import { Server } from 'http';
import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export default class App {
    private _app: Express;
    private _server: Server;
    private readonly _port: number;

    public get port() : number {
        return this._port;
    }

    constructor() {
        this._app = express();
        this._port = 8000;
    }

    public init() {
        this._server = this._app.listen(this.port);
    }
}
