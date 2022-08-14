import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import IMiddleware from '../common/middleware.interface';
import HttpError from '../errors/http-error.class';

export default class ValidateMiddleware implements IMiddleware {
    constructor(private classToValidate: ClassConstructor<object>) {}

    public execute({ body }: Request, _: Response, next: NextFunction): void {
        const instance = plainToClass(this.classToValidate, body);
        validate(instance).then((errors) => {
            if (errors.length > 0) {
                next(new HttpError(400, errors.join(), 'ValidateMiddleware'));
            } else {
                next();
            }
        });
    }
}
