import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import ILoggerService from '../logger/logger.interface';
import { TYPES } from '../types';
import IExceptionFilter from './exception.filter.interface';
import HttpError from './http-error.class';

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
    constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
        this.logger.log('ExceptionFilter was instantiated');
    }

    public catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
        if (err instanceof HttpError) {
            this.logger.error(`[${err.context}] ${err.message}`);
            res.status(err.statusCode).send({ err: err.message });
        } else if (err instanceof Error) {
            this.logger.error(err.message);
            res.status(500).send({ err: err.message });
        }
    }
}
