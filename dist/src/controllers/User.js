"use strict";
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../services/User"));
const auth_1 = __importDefault(require("../services/auth"));
const env_1 = require("../../config/env");
class UserController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const hashedPassword = yield auth_1.default.hash(password);
            try {
                let user = yield User_1.default.getByEmail(email);
                if (user) {
                    return res.status(400).json({ message: "User already exists" });
                }
                const userFields = {
                    email,
                    password: hashedPassword
                };
                user = yield User_1.default.create(userFields);
                const token = jsonwebtoken_1.default.sign({ email, id: user._id }, env_1.tokenKey, {
                    expiresIn: '1h'
                });
                user.token = token;
                return res
                    .status(201)
                    .json({ message: 'User created successfully', data: user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield User_1.default.getByEmail(email);
                if (!user) {
                    return res
                        .status(400)
                        .json({ message: 'Invalid Credentials' });
                }
                const isVerified = yield auth_1.default.verify(password, user.password);
                if (!isVerified) {
                    return res
                        .status(403)
                        .json({ message: 'enter a valid password' });
                }
                const token = jsonwebtoken_1.default.sign({ email, id: user._id }, env_1.tokenKey, {
                    expiresIn: '1h'
                });
                user.token = token;
                return res
                    .status(200)
                    .json({ status: "Login successful", data: user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.getAll();
            if (!users.length)
                return res
                    .status(404)
                    .json({ message: 'no user found' });
            return res
                .status(200)
                .json({ message: 'Success', data: users });
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=User.js.map