import { Schema, model }from 'mongoose';
import {IProduct} from 'Product';

const productSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
        },
        image: {
            type: Buffer,
            required: true
        },
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
        },
        quantity: {
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)

const Product = model<IProduct>('Product', productSchema);
export default Product;
