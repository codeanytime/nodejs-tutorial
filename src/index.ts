import dotenv from "dotenv";
import App from "./app";
import UserController from "./controllers/user-controller";
import AuthController from "./controllers/auth-controller";

dotenv.config();

const port = process.env.PORT || 3000;

const app = new App([new UserController(), new AuthController()], port);

app.listen();