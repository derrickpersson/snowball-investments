import { Request, Response } from "express";
import { BaseController } from "../../common/base.controller";
import { AppDataSource } from "../../data-source";
import { TransactionRepository } from "./transaction.repository";
import { authMiddleware } from "../../auth/middleware";
import { accountPermissionMiddleware } from "../middleware";

export class TransactionController extends BaseController{
    static list = async (req: Request, res: Response) => {
        const transactions = await AppDataSource.manager.withRepository(TransactionRepository).findBy(
            { 
                bankAccountId: req.params.accountId,
                bankAccount: { accountHolderId: req.authorizedUser.id }
            }
        );
        return res.status(200).send({ transactions });
    }

    static get = async (req: Request, res: Response) => {
        const transaction = await AppDataSource.manager.withRepository(TransactionRepository).findOneBy(
            { 
                id: req.params.transactionId,
                bankAccountId: req.params.accountId,
                bankAccount: { accountHolderId: req.authorizedUser.id }
            }
        );
        return res.status(200).send({ transaction });
    }

    routes() {
        this.router.use(authMiddleware, accountPermissionMiddleware);
        this.router.get('/', TransactionController.list);
        this.router.get('/:transactionId', TransactionController.get);
    }
}