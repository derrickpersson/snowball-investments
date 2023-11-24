import { AuthController } from "./auth/controller";
import { AppDataSource } from "./data-source";
import * as express from 'express';
import "./global";
import { AccountController } from "./account/controller";
import { TransactionController } from "./account/transactions/controller";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import { ContactController } from "./contact/controller";
import { SplitController } from "./splits/controller";

AppDataSource.initialize().then(async () => {
    const app: express.Application = express()
    const port = 3000

    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    }));
    
    // Register routes:
    app.use('/auth', new AuthController().router);
    app.use('/account', new AccountController().router);
    app.use('/contact', new ContactController().router);
    app.use('/splits', new SplitController().router);
    
    // Register account specific routes:
    app.use('/account/:accountId/transaction', new TransactionController().router);

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
}).catch(error => console.log(error));