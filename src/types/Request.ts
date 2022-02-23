import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type RequestUser = Request & { user: string|JwtPayload };