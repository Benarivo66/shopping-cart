"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./api/user"));
const auth_1 = __importDefault(require("./api/auth"));
const product_1 = __importDefault(require("./api/product"));
const cart_1 = __importDefault(require("./api/cart"));
function routes(app) {
    app.use('/users', user_1.default);
    app.use('/auth', auth_1.default);
    app.use('/product', product_1.default);
    app.use('/cart', cart_1.default);
}
exports.default = routes;
//# sourceMappingURL=index.js.map