import {Request, Response, NextFunction} from 'express';
import CartService from '../services/cart';
import ProductService from '../services/product';
import CartHelpers from '../helpers/cart';
import {RequestUser} from 'Request';

class CartController{
    static async create(req: RequestUser, res:Response, next: NextFunction): Promise<Response> {
        const { id } = req.params;
        const quantity = parseInt(req.body.quantity || req._body.data.quantity);
        const ownerId = req.user.id;
        
        try {
            let cart = await CartService.cart(req.user.id);
            let productDetails = await ProductService.getById({_id: id});

            if(!productDetails) {
                return res
                    .status(404)
                    .json({message: 'Not found'})
            }

            if(productDetails.quantity === 0) return res.json({ message: `${productDetails.name} is not available at the moment`});
            if(quantity > productDetails.quantity) return res.json({ message: `Available ${productDetails.name} is not up to ${quantity}`});
            let productDetailsToAdjust = JSON.parse(JSON.stringify(productDetails));
            productDetailsToAdjust.quantity = +productDetailsToAdjust.quantity - quantity;
            await ProductService.update(id, {...productDetailsToAdjust});

            if(cart) {
                //if product is in cart but no longer available, remove it
                const indexFound = cart.items.findIndex(item => item.productId.id == id);
                if (indexFound !== -1 && quantity <= 0) {
                    CartHelpers.removeItemFromCart(indexFound, quantity, cart);
                }
                //if the product is in cart before, just increase and update amount
                else if(indexFound !== -1){
                    CartHelpers.addNewItemToPrev(indexFound, quantity, cart, productDetails)
                }
                //if the item is not cart before, add it and update total
                else if(quantity > 0){
                    CartHelpers.addItemsToItemsArr(id, ownerId,  quantity, cart, productDetails)
                }
                else {
                    return res
                        .status(400)
                        .json({
                        message: 'Invalid request'
                    });
                }
            }
            //If no cart previously, create new one
            else{
                const cart = await CartHelpers.createNewCartAndAddItem(id, ownerId, quantity, productDetails);
                const data = await CartService.addItem(cart);
                return res
                    .status(200)
                    .json({message: 'Success', data});

            }
            const data = await CartService.create(cart);
            return res
                .status(200)
                .json({message: 'cart created successfully', data });
        } catch (error) {
            next(error);
        }
    }

    static async get(req:RequestUser, res:Response, next: NextFunction): Promise<Response> {
        try {
            const cart = await CartService.cart(req.user.id);
            if(!cart) return res
                            .status(404)
                            .json({message: 'Cart not found'});
            return res
                .status(200)
                .json({status: 'Success', data: cart});
        } catch (error) {
            next(error);
        }
    }

    static async emptyCart(req: RequestUser, res:Response, next: NextFunction): Promise<Response> {
        try {
            // const cart = await CartService.cart();
            // cart.items = [];
            // cart.subTotal = 0;

            // const data = await CartService.create(cart);
            const data = await CartHelpers.resetCart(req.user.id);

            return res
                .status(200)
                .json({status: 'Success', data });
        } catch (error) {
            next(error);
        }
    }
}
export default CartController;
