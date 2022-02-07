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
const product_1 = __importDefault(require("../services/product"));
class ProductController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, category, quantity, price } = req.body;
                const image = req.file.path;
                const productFields = {
                    name, description, category, quantity, price, image, deleted: false
                };
                const errors = [];
                Object.entries(productFields).forEach(([key, value]) => {
                    if (value === undefined)
                        errors.push(`${key} is required`);
                });
                if (errors.length)
                    return res.status(400).json({ errors });
                const product = yield product_1.default.create(productFields);
                return res
                    .status(200)
                    .json({ message: 'product created successfully', data: product });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.query;
                let selector = {};
                if (category)
                    selector = { category };
                const products = yield product_1.default.get(selector);
                if (!products.length)
                    return res
                        .status(404)
                        .json({ message: 'no product found' });
                return res
                    .status(200)
                    .json({ message: 'Success', data: products });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield product_1.default.getById({ _id: id });
                if (!product)
                    return res
                        .status(404)
                        .json({ message: 'product not found' });
                return res
                    .status(200)
                    .json({ message: 'Success', data: product });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, description, category, quantity, price } = req.body;
                let product = yield product_1.default.getById({ _id: id });
                if (!product)
                    return res
                        .status(400)
                        .json({ message: 'product not found' });
                product.name = name || product.name;
                product.description = description || product.description;
                product.category = category || product.category;
                product.quantity = quantity + product.quantity;
                product.price = price || product.price;
                product = yield product_1.default.update(id, Object.assign({}, product));
                return res
                    .status(200)
                    .json({ message: 'Success', data: product });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield product_1.default.update(id, { deleted: true });
                if (!product)
                    return res
                        .status(400)
                        .json({ message: 'product not found' });
                return res
                    .status(200)
                    .json({ message: 'Success', data: product });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteMany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_1.default.deleteAll({ deleted: true });
                if (!products)
                    return res
                        .status(404)
                        .json({ message: 'no product found' });
                return res
                    .status(200)
                    .json({ message: 'Success', data: products });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=Product.js.map