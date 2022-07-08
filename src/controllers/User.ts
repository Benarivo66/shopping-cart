import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from 'User';
import User  from '../services/User';
import AuthService from "../services/auth";
import { tokenKey } from '../../config/env';


class UserController {
    static async create (req:Request, res: Response, next: NextFunction): Promise<Response> {
        const {email, password} = req.body;
        const hashedPassword = await AuthService.hash(password);
        try {
            let user: IUser = await User.getByEmail(email);

            if(user) {
                return res.status(400).json({message: "User already exists"})
            }

        const userFields = {
            email,
            password: hashedPassword
        }
        user = await User.create(userFields);
        const token = jwt.sign({ email, id: user._id }, tokenKey, {
            expiresIn: '3h'
        });

        user.token = token;

        return res
            .status(201)
            .json({message: 'User created successfully', data: user});
        } catch (error) {
            next(error);
        }
    }

    static async login(req:Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;
        try {
            const user: IUser = await User.getByEmail(email);

            if(!user) {
                return res
                    .status(400)
                    .json({message: 'Invalid Credentials'});
            }
            const isVerified = await AuthService.verify(password, user.password);
            if(!isVerified) {
                return res
                    .status(403)
                    .json({message:'enter a valid password'});
            }

            const token = jwt.sign({ email, id: user._id }, tokenKey, {
                expiresIn: '1h'
            });
    
            user.token = token;

            return res
                .status(200)
                .json({status: "Login successful", data:user})
        } catch (error) {
            next(error);
        }
    }

    static async getAll (req:Request, res: Response) {
        const users = await User.getAll();
        
        if(!users.length) return res
                            .status(404)
                            .json({ message: 'no user found' })
        return res
            .status(200)
            .json({message: 'Success', data: users});
    }
}

export default UserController;