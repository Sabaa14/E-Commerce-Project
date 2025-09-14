import { QueryParams } from './query';
import { UserInterface } from "./User";
import {IProduct} from './Product'
import { Request } from "express";
// req.body, req.params, req.query, req.body
interface AuthenticatedRequest<T = any> extends Request{
    user: UserInterface;
    body: T;
    product: IProduct;
    params: Record<string, string>;
    // partial utility makes all the properties optional
    query: Request['query'] & Partial<QueryParams>;
}

export type { AuthenticatedRequest };