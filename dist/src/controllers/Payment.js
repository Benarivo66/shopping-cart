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
const stripe_1 = __importDefault(require("stripe"));
const stripeKey = process.env.STRIPE_KEY;
const stripe = new stripe_1.default(stripeKey, { apiVersion: "2020-08-27" });
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;
class PaymentController {
    static sendSessionId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_1.default.cart();
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: cart.items.map(item => {
                        return {
                            price_data: {
                                currency: 'NGN',
                                product_data: {
                                    name: item.name
                                },
                                unit_amount: item.price * 100
                            },
                            quantity: item.quantity
                        };
                    }),
                    mode: 'payment',
                    cancel_url: `${YOUR_DOMAIN}/success.html`,
                    success_url: `${YOUR_DOMAIN}/cancel.html`,
                });
                return res.status(200).json({ url: session.url });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = PaymentController;
//# sourceMappingURL=Payment.js.map