"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI;
class Database {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }
    init() {
        try {
            mongoose_1.default.connect(MONGO_URI);
        }
        catch (error) {
            throw Error(error);
        }
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map