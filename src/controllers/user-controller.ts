import express from "express";
import { BaseController } from "./base/base-controller";

export default class UserController extends BaseController {
    public path = "/users";

    constructor() {
        super();
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path + "/add", this.addUser);
    }
    getAllUsers = async (request: express.Request, response: express.Response) => {
        const userList = await this.prisma.users.findMany();
        response.json(userList);
    };
    addUser = async (request: express.Request, response: express.Response) => {
        const resBody = request.body;
        const user = await this.prisma.users.create({
                data: {
                    username: resBody.username,
                    password: resBody.password
                }
            })
        response.json(user);
    };
}