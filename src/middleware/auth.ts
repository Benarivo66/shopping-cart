import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { tokenKey } from '../../config/env/index';
import { RequestTest } from 'Request';


export default function (req: RequestTest, res: Response, next: NextFunction){
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token) return res
                    .status(403)
                    .send('A token is required for authentication');

    try {
        const decoded = jwt.verify(token, tokenKey);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
}

