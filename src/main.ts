import { Container, ContainerModule, interfaces } from "inversify";
import App from "./app";
import ILoggerService from "./logger/logger.interface";
import LoggerService from "./logger/logger.service";
import { TYPES } from "./types"


const bindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<App>(TYPES.Application).to(App);
    bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);
});

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(bindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return { appContainer, app };
}

export const { appContainer, app } = bootstrap();
