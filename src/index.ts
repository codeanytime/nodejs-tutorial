import dotenv from "dotenv";
import App from "./app";
import UserController from "./controllers/user-controller";

// dotenv.config();

// Load file .env tương ứng với NODE_ENV, ví dụ: development/production
dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});

const port = process.env.PORT || 3000;

const app = new App([new UserController()], port);

app.listen();