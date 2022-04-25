"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../../controllers/User"));
const User_2 = __importDefault(require("../../validations/User"));
const router = express_1.Router();
router.post('/', [User_2.default.login()], User_1.default.login);
exports.default = router;
//# sourceMappingURL=auth.js.map