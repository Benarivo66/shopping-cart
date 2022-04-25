"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../../controllers/User"));
const User_2 = __importDefault(require("../../validations/User"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.Router();
router.get('/', auth_1.default, User_1.default.getAll);
router.post('/', [User_2.default.create()], User_1.default.create);
exports.default = router;
//# sourceMappingURL=user.js.map