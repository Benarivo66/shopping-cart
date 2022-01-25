import { Document } from 'mongoose';

export interface IUser extends Document {
    isAdmin: any,
    email: string,
    password: string,
}

export type newUserType = {email: string, password: unknown}