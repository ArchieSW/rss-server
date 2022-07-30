import { Container, ContainerModule, interfaces } from "inversify";
import App from "./app";
import ExceptionFilter from "./errors/exception.filter";
import IExceptionFilter from "./errors/exception.filter.interface";
import ILoggerService from "./logger/logger.interface";
import LoggerService from "./logger/logger.service";
import { TYPES } from "./types"
import UsersController from "./users/users.controller";


const bindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<App>(TYPES.Application).to(App).inSingletonScope();
    bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
    bind<UsersController>(TYPES.UsersController).to(UsersController).inSingletonScope();
    bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
});

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(bindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return { appContainer, app };
}

export const { appContainer, app } = bootstrap();
