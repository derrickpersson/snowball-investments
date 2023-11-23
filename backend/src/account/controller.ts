import { Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { BankAccount } from "./account.entity";
import { AppDataSource } from "../data-source";
import { DebitAccountService } from "./account.service";
import { authMiddleware } from "../auth/middleware";
import { accountPermissionMiddleware } from "./middleware";

export class AccountController extends BaseController {
    static list = async (req: Request, res: Response) => {
        const accounts = await AppDataSource.manager.getRepository(BankAccount).findBy({ accountHolderId: req.authorizedUser.id });
        const accountRepresentations = await Promise.all(accounts.map(async account => {
            const accountService = new DebitAccountService();
            return await accountService.getRepresentation(account.id);
        }));
        return res.status(200).send({ accounts: accountRepresentations });
    }

    static get = async (req: Request, res: Response) => {
        const accountService = new DebitAccountService(); // For now, we only offer debit accounts.
        const account = await accountService.getRepresentation(req.params.accountId);
        return res.status(200).send({ account });
    }

    routes() {
        this.router.use(authMiddleware);
        this.router.get('/', AccountController.list);
        this.router.get('/:accountId', accountPermissionMiddleware, AccountController.get);
    }
}