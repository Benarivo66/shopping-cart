import { Document } from 'mongoose';

export interface IProduct extends Document {
    name: string,
    image: any,
    description: string,
    category: string,
    quantity: number,
    price: number
    deleted: boolean
}

export type newProductType = {
    name: string,
    image: any,
    description: string,
    category: string,
    quantity: number,
    price: number
    deleted: boolean
}

export type selectorObjectType = {
    category?: string
}

export type productByIdType = {
    _id: string
}

export type deleteAllProductType = {
    deleted: boolean,
}

 