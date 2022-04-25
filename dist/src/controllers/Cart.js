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
const cart_1 = __importDefault(require("../services/cart"));
const product_1 = __importDefault(require("../services/product"));
const cart_2 = __importDefault(require("../helpers/cart"));
class CartController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const quantity = parseInt(req.body.quantity || req._body.data.quantity);
            try {
                let cart = yield cart_1.default.cart();
                let productDetails = yield product_1.default.getById({ _id: id });
                if (!productDetails) {
                    return res
                        .status(404)
                        .json({ message: 'Not found' });
                }
                if (productDetails.quantity === 0)
                    return res.json({ message: `${productDetails.name} is not available at the moment` });
                if (quantity > productDetails.quantity)
                    return res.json({ message: `Available ${productDetails.name} is not up to ${quantity}` });
                let productDetailsToAdjust = JSON.parse(JSON.stringify(productDetails));
                productDetailsToAdjust.quantity = +productDetailsToAdjust.quantity - quantity;
                yield product_1.default.update(id, Object.assign({}, productDetailsToAdjust));
                if (cart) {
                    const indexFound = cart.items.findIndex(item => item.productId.id == id);
                    if (indexFound !== -1 && quantity <= 0) {
                        cart_2.default.removeItemFromCart(indexFound, quantity, cart);
                    }
                    else if (indexFound !== -1) {
                        cart_2.default.addNewItemToPrev(indexFound, quantity, cart, productDetails);
                    }
                    else if (quantity > 0) {
                        cart_2.default.addItemsToItemsArr(id, quantity, cart, productDetails);
                    }
                    else {
                        return res
                            .status(400)
                            .json({
                            message: 'Invalid request'
                        });
                    }
                }
                else {
                    const cart = yield cart_2.default.createNewCartAndAddItem(id, quantity, productDetails);
                    const data = yield cart_1.default.addItem(cart);
                    return res
                        .status(200)
                        .json({ message: 'Success', data });
                }
                const data = yield cart_1.default.create(cart);
                return res
                    .status(200)
                    .json({ message: 'cart created successfully', data });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_1.default.cart();
                if (!cart)
                    return res
                        .status(404)
                        .json({ message: 'Cart not found' });
                return res
                    .status(200)
                    .json({ status: 'Success', data: cart });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static emptyCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_1.default.cart();
                cart.items = [];
                cart.subTotal = 0;
                const data = yield cart_1.default.create(cart);
                return res
                    .status(200)
                    .json({ status: 'Success', data });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CartController;
//# sourceMappingURL=Cart.js.map