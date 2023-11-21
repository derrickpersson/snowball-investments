import { AuthController } from "./auth/controller";
import { AppDataSource } from "./data-source";
import * as express from 'express';
import "./global";

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

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
}).catch(error => console.log(error));