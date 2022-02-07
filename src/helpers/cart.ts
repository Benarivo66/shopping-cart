import { ICart } from 'Cart';
import { IProduct } from 'Product';

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
    async addItemsToItemsArr(productId: any,  quantity: number, cart:ICart, productDetails: IProduct){
        cart.items.push({
            productId: productId,
            quantity: quantity,
            price: productDetails.price,
            name: productDetails.name,
            total: +productDetails.price * quantity
        })
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
    }
    async createNewCartAndAddItem(productId: any, quantity: number, productDetails: IProduct) {
        const cartData = {
            items: [{
                productId,
                quantity: quantity,
                total: +productDetails.price * quantity,
                price: productDetails.price,
                name: productDetails.name
            }],
            subTotal: +productDetails.price * quantity
        }
        return cartData;
    }
}

export default new CartHelpers();