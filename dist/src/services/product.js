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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Products_1 = __importDefault(require("../models/Products"));
class ProductService {
    create(newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new Products_1.default(newProductData);
            return product.save();
        });
    }
    get(selectorObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield Products_1.default.find(Object.assign({ deleted: false }, selectorObject));
            return products;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Products_1.default.findById(Object.assign({ deleted: false }, id));
            return product;
        });
    }
    update(id, _a) {
        var data = __rest(_a, []);
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Products_1.default.findByIdAndUpdate(id, {
                $set: Object.assign({}, data),
            }, { new: true });
            return product;
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Products_1.default.findByIdAndDelete(id);
            return product;
        });
    }
    deleteAll(deleteAllObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield Products_1.default.deleteMany(deleteAllObj);
            return products;
        });
    }
}
exports.default = new ProductService();
//# sourceMappingURL=product.js.map