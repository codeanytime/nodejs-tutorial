"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
// dotenv.config();
// Load file .env tương ứng với NODE_ENV, ví dụ: development/production
dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});
const port = process.env.PORT || 3000;
const app = new app_1.default([new user_controller_1.default()], port);
app.listen();
//# sourceMappingURL=index.js.map