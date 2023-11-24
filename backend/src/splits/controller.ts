import { Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { AppDataSource } from "../data-source";
import { Split } from "./split.entity";
import { authMiddleware } from "../auth/middleware";
import { SplitShare } from "./split.share.entity";

export class SplitController extends BaseController {
    static get = async (req: Request, res: Response) => {
        const split = await AppDataSource.manager.getRepository(Split).findOne({
            where: {
                transactionId: req.params.transactionId,
            },
            relations: ["splitShares"],
         });
        return res.status(200).send({ split });
    }


    static create = async (req: Request, res: Response) => {
        try {
            AppDataSource.manager.transaction(async transactionalEntityManager => {
                const splitsRepo = transactionalEntityManager.getRepository(Split);
                const existingSplit = await splitsRepo.findBy({ transactionId: req.body.transactionId });
                if(existingSplit) {
                    await splitsRepo.remove(existingSplit);
                }
                const split = await splitsRepo.save({
                    transactionId: req.body.transactionId,
                    type: req.body.type,
                });
                await transactionalEntityManager.getRepository(SplitShare).save(
                    req.body.splitShares.map(splitShare => {
                        return {
                            splitId: split.id,
                            contactId: splitShare.contactId,
                            amount: splitShare.amount,
                        }
                    })
                );
                return res.status(200).send({ success: true });
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).send({ error: error.message });
        }
    }

    routes() {
        this.router.use(authMiddleware)
        this.router.get('/', SplitController.get);
        this.router.post('/', SplitController.create);
    }
}