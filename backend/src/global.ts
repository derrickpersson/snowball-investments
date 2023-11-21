import { User as EntityUser } from "./auth/user.entity";

declare global {
    namespace Express {
        interface Request {
            authorizedUser?: EntityUser;
        }
    }
}