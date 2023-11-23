import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { BankAccount } from "./account.entity";

export const accountPermissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accountId = req.params.accountId;
    const authorizedUserId = req.authorizedUser.id;
    const accountRepository = AppDataSource.manager.getRepository(BankAccount);
    const count = await accountRepository.countBy({ id: accountId, accountHolderId: authorizedUserId });
    
    if(count === 0) {
        return res.status(403).send({ error: "Unauthorized access to the account" });
    }

    next();
}