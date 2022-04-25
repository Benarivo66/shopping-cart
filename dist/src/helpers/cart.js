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
Object.defineProperty(exports, "__esModule", { value: true });
class CartHelpers {
    removeItemFromCart(indexFound, quantity, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            cart.items.splice(indexFound, 1);
            if (cart.items.length == 0) {
                cart.subTotal = 0;
            }
            else {
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
        });
    }
    addNewItemToPrev(indexFound, quantity, cart, productDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
            cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
            cart.items[indexFound].price = productDetails.price;
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
        });
    }
    addItemsToItemsArr(productId, quantity, cart, productDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            cart.items.push({
                productId: productId,
                quantity: quantity,
                price: productDetails.price,
                name: productDetails.name,
                total: +productDetails.price * quantity
            });
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
        });
    }
    createNewCartAndAddItem(productId, quantity, productDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartData = {
                items: [{
                        productId,
                        quantity: quantity,
                        total: +productDetails.price * quantity,
                        price: productDetails.price,
                        name: productDetails.name
                    }],
                subTotal: +productDetails.price * quantity
            };
            return cartData;
        });
    }
}
exports.default = new CartHelpers();
//# sourceMappingURL=cart.js.map