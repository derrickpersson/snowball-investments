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
            return res.status(401).send({ error: "User not found" });
        }

        /**
         * Omit password when returning the user
         */
        const userRepresentation = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        let token = issueJWT(user.id);
        return res
            .cookie('jwt', token, { 
                maxAge: 900000,
                path: "/",
                domain: "localhost",
            })
            .status(200)
            .send({ user: userRepresentation });
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

            /**
             * Omit password when returning the user
             */
            const userRepresentation = {
                id: registeredUser.id,
                email: registeredUser.email,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
            };

            return res
                .cookie('jwt', token, { 
                    maxAge: 900000,
                    path: "/",
                    domain: "localhost",
                })
                .status(200)
                .send({
                    user: userRepresentation,
                });
        } catch (e) {
            console.error(e);
            return res.status(409).send({ error: "email already in use" });
        }
    };

    static logout = (req, res) => {
        if (req.cookies['jwt']) {
            res
                .clearCookie('jwt')
                .sendStatus(200)
        } else {
            res.status(401).json({
                error: 'Invalid jwt'
            })
        }
    }

    static currentUser = async (req: Request, res: Response) => {
        if (req.authorizedUser) {
            return res.status(200).send({ user: req.authorizedUser });
        }

        res.status(401).send({ error: "Unauthorized" });
    };

    routes() {
        this.router.post('/login', AuthController.login);
        this.router.post('/register', AuthController.register);
        this.router.get('/current-user', authMiddleware, AuthController.currentUser);
        this.router.get('/logout', AuthController.logout);
    }
}
