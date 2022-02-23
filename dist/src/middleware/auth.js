"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../../config/env/index");
function default_1(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token)
        return res
            .status(403)
            .send('A token is required for authentication');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, index_1.tokenKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map