import { UserInterface } from "./User";
// req.body, req.params, req.query
interface AuthenticatedRequest extends Request {
    user: UserInterface;
    params: Record<string, any>;
}

export type { AuthenticatedRequest };