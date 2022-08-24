import { ICart } from 'Cart';
import { FilterQuery } from 'mongoose';
import { IProduct } from 'Product';
import CartService from '../services/cart';

class CartHelpers {
    async removeItemFromCart(indexFound:number, quantity: number, cart:ICart){
            cart.items.splice(indexFound, 1);
            if (cart.items.length == 0) {
                cart.subTotal = 0;
            } else {
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
        }
    }
    async addNewItemToPrev(indexFound:number, quantity: number, cart:ICart, productDetails: IProduct){
        cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
    }
    async addItemsToItemsArr(productId: any, ownerId: any,  quantity: number, cart:ICart, productDetails: IProduct){
        cart.items.push({
            productId: productId,
            ownerId: ownerId,
            quantity: quantity,
            price: productDetails.price,
            name: productDetails.name,
            total: +productDetails.price * quantity
        })
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
    }
    async createNewCartAndAddItem(productId: any, ownerId: any, quantity: number, productDetails: IProduct) {
        const cartData = {
            items: [{
                productId,
                ownerId,
                quantity: quantity,
                total: +productDetails.price * quantity,
                price: productDetails.price,
                name: productDetails.name
            }],
            subTotal: +productDetails.price * quantity
        }
        return cartData;
    }
    async resetCart(ownerId:FilterQuery<ICart>){
        const cart = await CartService.cart(ownerId);
        cart.items = [];
        cart.subTotal = 0;

        return await CartService.create(cart);
    }
}

export default new CartHelpers();