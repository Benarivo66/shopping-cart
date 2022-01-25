"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./api/user"));
const auth_1 = __importDefault(require("./api/auth"));
function routes(app) {
    // app.use('/', (req:Request, res:Response, next: NextFunction) => {
    //     res.send('Welcome to our shopping cart');
    // } );
    app.use('/users', user_1.default);
    app.use('/auth', auth_1.default);
}
exports.default = routes;
//# sourceMappingURL=index.js.map