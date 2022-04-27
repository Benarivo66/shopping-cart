"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1']
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true
    }
}, { timestamps: true });
const cartSchema = new mongoose_1.Schema({
    items: [itemSchema],
    subTotal: {
        default: 0,
        type: Number
    },
}, {
    timestamps: true
});
const Cart = (0, mongoose_1.model)('Cart', cartSchema);
exports.default = Cart;
//# sourceMappingURL=Cart.js.map