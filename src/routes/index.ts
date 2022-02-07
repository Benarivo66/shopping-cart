import { Application } from 'express';
import userRoutes from './api/user';
import authRoutes from './api/auth';
import productRoutes from './api/product';
import cartRoutes from './api/cart';

export default function routes(app:Application): void {
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);
    app.use('/product', productRoutes);
    app.use('/cart',cartRoutes )
}