import { Application, Request, Response } from 'express';
import userRoutes from './api/user';
import authRoutes from './api/auth';
import productRoutes from './api/product';
import cartRoutes from './api/cart';
import paymentRoutes from './api/payment';

export default function routes(app:Application): void {
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);
    app.use('/product', productRoutes);
    app.use('/cart', cartRoutes);
    app.use('/payment', paymentRoutes);
    app.use('/', function(req:Request, res:Response){
        res.send('welcome to shopping cart web application')
    })
}