import {BaseController} from "./base/base-controller";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express"


export interface LoginRequest extends Request{
    username?: string;
    password?: string;
}

export interface LoginResponse extends Response {
    token?: string;
}
export default class AuthController extends BaseController {
    public path = "/auth"

    constructor() {
        super();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.post(this.path + "/login", this.login);
    }

    login = async (req: LoginRequest, res: LoginResponse) => {
        const user = await this.prisma.users.findFirst({
            where: {
                username: req.username,
                password: req.password
            },
        })
        if (user) {
            //Sing JWT, valid for 1 hour
            const token = jwt.sign(
                { username: user.username },
                "secret",
                { expiresIn: "1h" }
            );

            //Send the jwt in the response
            res.send(token);
        }
    }
}