import { AuthController } from "./auth/controller";
import { AppDataSource } from "./data-source";
import * as express from 'express';
import "./global";
import { accountPermissionMiddleware } from "./account/middleware";
import { AccountController } from "./account/controller";
import { TransactionController } from "./account/transactions/controller";

AppDataSource.initialize().then(async () => {
    const app: express.Application = express()
    const port = 3000

    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Register routes:
    app.use('/auth', new AuthController().router);
    app.use('/account', new AccountController().router);
    
    // Register account specific routes:
    app.use('/account/:accountId/transactions', new TransactionController().router);

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
}).catch(error => console.log(error));