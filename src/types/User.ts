import { Document } from 'mongoose';

export interface IUser extends Document {
    token: string,
    isAdmin: any,
    email: string,
    password: string,
    deleted: boolean
}

export type newUserType = {email: string, password: unknown}