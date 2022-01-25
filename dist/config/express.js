"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./env");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
class ExpressServer {
    constructor() {
        app.use((0, cors_1.default)());
        app.use((0, morgan_1.default)('dev'));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use((0, cookie_parser_1.default)());
    }
    router(routes) {
        (0, routes_1.default)(app, routes);
        return this;
    }
    database(db) {
        db.init();
        return this;
    }
    listen(p = env_1.port) {
        const welcome = () => console.log('app is running');
        http_1.default.createServer(app).listen(p, welcome);
        return app;
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=express.js.map