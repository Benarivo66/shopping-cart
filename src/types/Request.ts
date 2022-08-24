import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type RequestTest = Request & { user: string | JwtPayload};
export type RequestUser = Request & {_body: {data: {quantity: string}}, user: {email:string, id: any} };