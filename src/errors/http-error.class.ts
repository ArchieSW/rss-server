export default class HttpError extends Error {
    private _statusCode: number;
    private _message: string;
    private _context?: string;

    public get statusCode() {
        return this._statusCode;
    }
    public get message() {
        return this._message;
    }
    public get context() {
        return this._context;
    }

    constructor(statusCode: number, message: string, context?: string) {
        super(message);
        this._statusCode = statusCode;
        this._message = message;
        this._context = context;
    }
}
