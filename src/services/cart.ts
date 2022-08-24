import { ICart, cartItemData } from 'Cart';
import { FilterQuery } from 'mongoose';
import Cart from '../models/Cart';

class CartService {
    async cart(userId: FilterQuery<ICart>): Promise<ICart> {
        const carts = await Cart.findOne({'items.ownerId': userId}).populate({
            path: 'items.productId',
            select: 'name price total'
        });
        return carts;
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
