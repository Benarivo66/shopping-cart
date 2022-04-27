"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cart_1 = __importDefault(require("../../controllers/Cart"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const Cart_2 = __importDefault(require("../../validations/Cart"));
const router = (0, express_1.Router)();
router.route('/')
    .get(auth_1.default, Cart_1.default.get)
    .delete(auth_1.default, Cart_1.default.emptyCart);
router.post('/:id', [Cart_2.default.create(), auth_1.default], Cart_1.default.create);
exports.default = router;
//# sourceMappingURL=cart.js.map