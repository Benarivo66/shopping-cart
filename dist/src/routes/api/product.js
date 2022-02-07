"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = __importDefault(require("../../controllers/Product"));
const Product_2 = __importDefault(require("../../validations/Product"));
const router = express_1.Router();
router.route('/')
    .post([Product_2.default.create()], Product_1.default.create)
    .get(Product_1.default.getAll)
    .delete(Product_1.default.deleteMany);
router.route('/:id')
    .get(Product_1.default.getById)
    .put(Product_1.default.update)
    .delete(Product_1.default.deleteOne);
exports.default = router;
//# sourceMappingURL=product.js.map