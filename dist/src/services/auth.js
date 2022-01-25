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
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const salt = crypto_1.default.randomBytes(8).toString("hex");
                crypto_1.default.scrypt(password, salt, 64, (err, derivedKey) => {
                    if (err)
                        reject(err);
                    resolve(salt + ":" + derivedKey.toString('hex'));
                });
            });
        });
    }
    verify(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const [salt, key] = hash.split(":");
                crypto_1.default.scrypt(password, salt, 64, (err, derivedKey) => {
                    if (err)
                        reject(err);
                    resolve(key == derivedKey.toString('hex'));
                });
            });
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.js.map