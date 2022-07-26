
export default interface ILoggerService {
    logger: unknown;
    log: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
}
