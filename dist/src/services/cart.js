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
const Cart_1 = __importDefault(require("../models/Cart"));
class CartService {
    cart() {
        return __awaiter(this, void 0, void 0, function* () {
            const carts = yield Cart_1.default.find().populate({
                path: 'items.productId',
                select: 'name price total'
            });
            return carts[0];
        });
    }
    create(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            let newCart = yield new Cart_1.default(cart);
            return newCart.save();
        });
    }
    addItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = yield Cart_1.default.create(payload);
            return newItem;
        });
    }
}
exports.default = new CartService();
// exports.addItem = async payload => {
//     const newItem = await Cart.create(payload);
//     return newItem
// }
//# sourceMappingURL=cart.js.map