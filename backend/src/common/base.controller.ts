import { Router } from "express";

export abstract class BaseController {
    public router: Router;

    constructor() {
        this.router = Router({ mergeParams: true });
        this.routes();
    }

    abstract routes(): void;
}