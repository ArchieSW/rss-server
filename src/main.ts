import { Container, ContainerModule, interfaces } from "inversify";
import App from "./app";
import { TYPES } from "./types"


const bindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(bindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return { appContainer, app };
}

export const { appContainer, app } = bootstrap();
