"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../config/env");
const database_1 = __importDefault(require("../config/database"));
const express_1 = __importDefault(require("../config/express"));
const routes_1 = __importDefault(require("./routes"));
const port = parseInt(env_1.port || '4000');
const connectionString = env_1.mongo.host || '';
const db = new database_1.default(connectionString);
exports.default = new express_1.default().database(db).router(routes_1.default).listen(port);
//# sourceMappingURL=server.js.map