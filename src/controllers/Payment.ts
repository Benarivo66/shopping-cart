import {Request, Response, NextFunction} from 'express';
import CartServices from '../services/cart';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_KEY;

const stripe = new Stripe( stripeKey, {apiVersion: "2020-08-27"});

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

class PaymentController {
    static async sendSessionId(req:Request, res:Response, next: NextFunction){
        try {
            const cart = await CartServices.cart();
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
                cancel_url: `${YOUR_DOMAIN}/success.html`,
                success_url: `${YOUR_DOMAIN}/cancel.html`,
            });
            return res.json({url: session.url});
        } catch (error) {
            next(error);
        } 
    }
}

export default PaymentController;