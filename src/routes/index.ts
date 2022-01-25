import {Application, Request, Response, NextFunction} from 'express';
import userRoutes from './api/user';
import authRoutes from './api/auth';

export default function routes(app:Application): void {
    // app.use('/', (req:Request, res:Response, next: NextFunction) => {
    //     res.send('Welcome to our shopping cart');
    // } );
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);
}