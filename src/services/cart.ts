import { ICart, cartItemData } from 'Cart';
import {IProduct} from 'Product';
import Cart from '../models/Cart';

class CartService {
    async cart(): Promise<ICart> {
        const carts = await Cart.find().populate({
            path: 'items.productId',
            select: 'name price total'
        });
        return carts[0];
    }
    async create(cart: ICart) {
        let newCart = await new Cart(cart);
        return newCart.save();
    }
    async addItem(payload: cartItemData): Promise<ICart> {
        const newItem = await Cart.create(payload);
        return newItem;
    }
    
}

export default new CartService();

// exports.addItem = async payload => {
//     const newItem = await Cart.create(payload);
//     return newItem
// }