"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("./base/base-controller");
class UserController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.path = "/users";
        this.getAllUsers = async (request, response) => {
            const userList = await this.prisma.users.findMany();
            response.json(userList);
        };
        this.addUser = async (request, response) => {
            const resBody = request.body;
            const user = await this.prisma.users.create({
                data: {
                    username: resBody.username,
                    password: resBody.password
                }
            });
            response.json(user);
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path + "/add", this.addUser);
    }
}
exports.default = UserController;
//# sourceMappingURL=user-controller.js.map