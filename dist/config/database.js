"use strict";
// import mongoose from 'mongoose';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const MONGO_URI = process.env.MONGO_URI
// export interface IDatabase {
//     init(): void;
// }
// export default class Database implements IDatabase {
//     connectionString: string;
//     constructor(connectionString: string) {
//         this.connectionString = connectionString;
//     }
//     init(): void {
//         try {
//             mongoose.connect(MONGO_URI);
//         } catch (error) {
//             throw Error(error)
//         }
//     }
// }
const mongoose_1 = __importDefault(require("mongoose"));
const { MongoMemoryServer } = require('mongodb-memory-server');
let node_env = process.env.NODE_ENV;
const MONGO_URI = process.env.MONGO_URI;
class Database {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (node_env === 'test') {
                    const mongod = yield MongoMemoryServer.create();
                    const uri = yield mongod.getUri();
                    const mongooseOpts = {
                        useNewUrlParser: true,
                        autoReconnect: true,
                        reconnectTries: Number.MAX_VALUE,
                        reconnectInterval: 1000
                    };
                    yield mongoose_1.default.connect(uri, mongooseOpts);
                }
                mongoose_1.default.connect(MONGO_URI);
            }
            catch (error) {
                throw Error(error);
            }
        });
    }
    closeDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mongod = yield MongoMemoryServer.create();
                yield mongoose_1.default.connection.dropDatabase();
                yield mongoose_1.default.connection.close();
                yield mongod.stop();
            }
            catch (error) {
                throw Error(error);
            }
        });
    }
    clearDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collections = mongoose_1.default.connection.collections;
                for (const key in collections) {
                    const collection = collections[key];
                    yield collection.deleteMany({});
                }
            }
            catch (error) {
                throw Error(error);
            }
        });
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map