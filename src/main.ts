import { Container, ContainerModule, interfaces } from 'inversify';
import App from './app';
import ConfigService from './config/config.service';
import IConfigService from './config/config.service.interface';
import PrismaService from './database/prisma.service';
import ExceptionFilter from './errors/exception.filter';
import IExceptionFilter from './errors/exception.filter.interface';
import ILoggerService from './logger/logger.interface';
import LoggerService from './logger/logger.service';
import { TYPES } from './types';
import UserService from './users/users.service';
import IUserService from './users/users.service.interface';
import UsersController from './users/users.controller';
import IUsersRepository from './users/users.repository.interface';
import UsersRepository from './users/users.repository';
import IRssRepository from './rss/rss.repository.interface';
import RssRepository from './rss/rss.repository';
import IRssService from './rss/rss.service.interface';
import RssService from './rss/rss.service';

interface IBootstrapReturn {
    appContainer: Container;
    app: App;
}

const bindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<App>(TYPES.Application).to(App).inSingletonScope();
    bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
    bind<UsersController>(TYPES.UsersController).to(UsersController).inSingletonScope();
    bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
    bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
    bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository).inSingletonScope();
    bind<IRssRepository>(TYPES.IRssRepository).to(RssRepository).inSingletonScope();
    bind<IRssService>(TYPES.IRssService).to(RssService).inSingletonScope();
});

function bootstrap(): IBootstrapReturn {
    const appContainer = new Container();
    appContainer.load(bindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return { appContainer, app };
}

export const { appContainer, app } = bootstrap();
