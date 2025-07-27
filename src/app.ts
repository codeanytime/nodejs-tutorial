import express from "express";
import { BaseController } from "./controllers/base/base-controller";

class App {
    public app: express.Application;
    public port: number | string;

    constructor(controllers: BaseController[], port: number | string) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeControllers(controllers: BaseController[]) {
        var appname = process.env.APP_NAME;
        this.app.get("/", (request, response) => {
            response.send(`Application ${appname} deploy prod Version 2 is running`);
        });
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;