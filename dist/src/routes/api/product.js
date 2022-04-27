"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = __importDefault(require("../../controllers/Product"));
const multer_1 = require("../../../config/multer");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.route('/')
    .post(auth_1.default, multer_1.upload.single('image'), Product_1.default.create)
    .get(auth_1.default, Product_1.default.getAll)
    .delete(auth_1.default, Product_1.default.deleteMany);
router.route('/:id')
    .get(auth_1.default, Product_1.default.getById)
    .put(auth_1.default, Product_1.default.update)
    .delete(auth_1.default, Product_1.default.deleteOne);
exports.default = router;
//# sourceMappingURL=product.js.map