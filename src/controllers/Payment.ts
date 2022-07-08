import {Request, Response, NextFunction} from 'express';
import CartServices from '../services/cart';
import CartController from '../controllers/Cart';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_KEY;

const stripe = new Stripe( stripeKey, {apiVersion: "2020-08-27"});

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

class PaymentController {
    static async sendSessionId(req:Request, res:Response, next: NextFunction){
        try {
            const cart = await CartServices.cart();
            if(!cart || !cart.items || !cart.items.length){
                res.status(200).send('You have not selected any product to pay for');
            }
            const session = await stripe.checkout.sessions.create({
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
                    }
                }),
                mode: 'payment',
                cancel_url: `${YOUR_DOMAIN}/cancel.html`,
                success_url: `${YOUR_DOMAIN}/success.html`,
            });
            return res.status(200).json({url: session.url});
        } catch (error) {
            next(error);
        } 
    }
    static async webhook (req: Request, res: Response, next: NextFunction){
        console.log({res});
        await CartController.emptyCart;
        return res.status(200).json({ message: 'completed checkout session' });
    }
}

/*
After payment, the cart should be emptied and payment information
sent somewhere so it can be tracked for dispatch.

Create a new model for paid products

Create a webhook end point confirm payment and do something and add it in stripe dashboard
**/ 

export default PaymentController;