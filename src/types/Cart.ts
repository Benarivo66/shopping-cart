import { Document } from 'mongoose';

type item = {
    productId: any,
    quantity: number,
    price: number,
    total: number,
    name: string  
}

export interface ICart extends Document {
    items: item[],
    subTotal: number
}

export type cartSearchObjType = {
        path: string,
        select: string
}

export type cartItemData = {
    items: item[],
    subTotal: number
}


