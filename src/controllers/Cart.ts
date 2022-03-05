import {Request, Response, NextFunction} from 'express';
import CartService from '../services/cart';
import ProductService from '../services/product';
import CartHelpers from '../helpers/cart';
import {RequestTest} from 'Request';

class CartController{
    static async create(req: RequestTest, res:Response, next: NextFunction): Promise<Response> {
        const { id } = req.params;
        const quantity = parseInt(req.body.quantity || req._body.data.quantity);
        try {
            let cart = await CartService.cart();
            let productDetails = await ProductService.getById({_id: id});

            if(!productDetails) {
                return res
                    .status(500)
                    .json({message: 'Not found'})
            }

            if(productDetails.quantity === 0) return res.json({ message: `${productDetails.name} is not available at the moment`});
            if(quantity > productDetails.quantity) return res.json({ message: `Available ${productDetails.name} is not up to ${quantity}`});
            let productDetailsToAdjust = JSON.parse(JSON.stringify(productDetails));
            productDetailsToAdjust.quantity = +productDetailsToAdjust.quantity - quantity;
            await ProductService.update(id, {...productDetailsToAdjust});

            if(cart) {
                const indexFound = cart.items.findIndex(item => item.productId.id == id);
                if (indexFound !== -1 && quantity <= 0) {
                    CartHelpers.removeItemFromCart(indexFound, quantity, cart);
                }
                else if(indexFound !== -1){
                    CartHelpers.addNewItemToPrev(indexFound, quantity, cart, productDetails)
                }
                else if(quantity > 0){
                    CartHelpers.addItemsToItemsArr(id,  quantity, cart, productDetails)
                }
                else {
                    return res
                        .status(400)
                        .json({
                        message: 'Invalid request'
                    });
                }
            }
            else{
                const cart = await CartHelpers.createNewCartAndAddItem(id, quantity, productDetails);
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

    static async get(req: Request, res:Response, next: NextFunction): Promise<Response> {
        try {
            const cart = await CartService.cart();
            if(!cart) return res
                            .status(400)
                            .json({message: 'Cart not found'});
            return res
                .status(200)
                .json({status: 'Success', data: cart});
        } catch (error) {
            next(error);
        }
    }

    static async emptyCart(req: Request, res:Response, next: NextFunction): Promise<Response> {
        try {
            const cart = await CartService.cart();
            cart.items = [];
            cart.subTotal = 0;

            const data = await CartService.create(cart);
            return res
                .status(200)
                .json({status: 'Success', data });
        } catch (error) {
            next(error);
        }
    }
}
export default CartController;
