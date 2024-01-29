"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("./base/base-controller");
const jwt = __importStar(require("jsonwebtoken"));
class AuthController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.path = "/auth";
        this.login = async (req, res) => {
            const user = await this.prisma.users.findFirst({
                where: {
                    username: req.username,
                    password: req.password
                },
            });
            if (user) {
                //Sing JWT, valid for 1 hour
                const token = jwt.sign({ username: user.username }, "secret", { expiresIn: "1h" });
                //Send the jwt in the response
                res.send(token);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.path + "/login", this.login);
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth-controller.js.map