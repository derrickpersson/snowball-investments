import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { AppDataSource } from '../data-source';
import { User } from '../auth/user.entity';
import { authMiddleware } from '../auth/middleware';

export class ContactController extends BaseController {
    static list = async (req: Request, res: Response) => {
        const user = await AppDataSource.manager.getRepository(User).findOne(
            {
                where: {
                    id: req.authorizedUser.id,
                },
                relations: ["contacts"],
            }
        );
        return res.status(200).send({ contacts: user.contacts });
    }

    static get = async (req: Request, res: Response) => {
        const user = await AppDataSource.manager.getRepository(User).findOne(
            {
                where: {
                    id: req.authorizedUser.id,
                    contacts: {
                        id: req.params.contactId,
                    }
                },
                relations: ["contacts"],
            }
        );

        if(user.contacts.length === 0) {
            return res.status(404).send({ error: "Contact not found" });
        }

        return res.status(200).send({ contact: user.contacts[0] });
    }

    routes() {
        this.router.use(authMiddleware);
        this.router.get('/', ContactController.list);
        this.router.get('/:contactId', ContactController.get);
    }
}
