"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Payment_1 = __importDefault(require("../../controllers/Payment"));
const router = express_1.Router();
router.post('/', Payment_1.default.sendSessionId);
exports.default = router;
//# sourceMappingURL=payment.js.map