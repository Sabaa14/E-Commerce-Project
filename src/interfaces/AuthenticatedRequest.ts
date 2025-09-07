import { UserInterface } from "./User";

interface AuthenticatedRequest extends Request {
    user: UserInterface;
}

export type { AuthenticatedRequest };