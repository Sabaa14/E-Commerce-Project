import { UserInterface } from "./User";
import {IProduct} from './Product'
import { ICart } from "./CartInterface";
// req.body, req.params, req.query
interface AuthenticatedRequest extends Request {
    user: UserInterface;
    product: IProduct;
    params: Record<string, any>;
    query: any;

}

export type { AuthenticatedRequest };