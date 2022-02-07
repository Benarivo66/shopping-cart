import { Schema, model }from 'mongoose';
import { ICart } from 'Cart';

const itemSchema: Schema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
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
    },
    {timestamps: true}
)

const cartSchema = new Schema ({
    items: [itemSchema],
    subTotal: {
        default: 0,
        type: Number
    },
}, 
{
    timestamps: true
})

const Cart = model<ICart>('Cart', cartSchema);
export default Cart;
