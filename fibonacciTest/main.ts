import {Container} from "inversify";
import {TYPES} from "./types";
import {App} from "./app"
import {FibonacciController} from "./controllers/fibonnacci.controller";
import {FibonacciService} from "./services/fibonacci.service";
import {FibonacciRepository} from "./repositories/fibonacciRepository";
const appContainer = new Container()
appContainer.bind<FibonacciRepository>(TYPES.FibonacciRepository).to(FibonacciRepository).inSingletonScope()
appContainer.bind<FibonacciController>(TYPES.FibonacciController).to(FibonacciController)
appContainer.bind<FibonacciService>(TYPES.FibonacciService).to(FibonacciService)
appContainer.bind<App>(TYPES.Application).to(App)
const app = appContainer.get<App>(TYPES.Application);
await app.init()


export {appContainer}
