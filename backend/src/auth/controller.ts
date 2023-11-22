import { Request, Response, Router } from 'express';
import { User } from './user.entity';
import { AppDataSource } from '../data-source';
import { configurePassportForJWT, issueJWT } from './jwt';
import { authMiddleware } from './middleware';
import { BaseController } from '../common/base.controller';

export class AuthController extends BaseController {
    constructor() {
        super();
        configurePassportForJWT();
    }

    static login = async (req: Request, res: Response) => {
        let { email, password } = req.body;
        let userRepository = AppDataSource.manager.getRepository(User);
        let user = await userRepository.findOneBy({ email, password });

        if (!user) {
            return res.status(401).send("User not found");
        }

        let token = issueJWT(user.id);
        return res.status(200).send({ token });
    };

    static register = async (req: Request, res: Response) => {
        let { email, password, firstName, lastName } = req.body;
        let user = new User();
        let userRepository = AppDataSource.manager.getRepository(User);

        user.email = email;
        user.password = password;
        user.firstName = firstName;
        user.lastName = lastName;

        try {
            const registeredUser = await userRepository.save(user);
            let token = issueJWT(registeredUser.id);
            return res.status(200).send({ token });
        } catch (e) {
            console.error(e);
            return res.status(409).send("email already in use");
        }
    };

    static currentUser = async (req: Request, res: Response) => {
        if (req.authorizedUser) {
            return res.status(200).send({ userId: req.authorizedUser.id });
        }

        res.status(401).send("Unauthorized");
    };

    routes() {
        this.router.post('/login', AuthController.login);
        this.router.post('/register', AuthController.register);
        this.router.get('/current-user', authMiddleware, AuthController.currentUser);
    }
}
