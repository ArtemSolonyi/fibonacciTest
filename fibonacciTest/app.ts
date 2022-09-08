import express, {Express, NextFunction} from 'express';

import pkg from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from "cors";
import "reflect-metadata"
import {injectable, inject} from "inversify";
import {TYPES} from "./types";

import {FibonacciController} from "./controllers/fibonnacci.controller";
import {FibonacciRepository} from "./repositories/fibonacciRepository";

@injectable()
export class App {
    app: Express
    port: number | string

    constructor(@inject(TYPES.FibonacciRepository) private fibonacciRepository: FibonacciRepository,
                @inject(TYPES.FibonacciController) private fibonacciController: FibonacciController,
            ) {
        this.app = express()
        this.port = process.env.PORT || 3003
        this.app.use(pkg())
        this.app.use(express.json())
        this.app.use(cookieParser())
        this.app.use(pkg.urlencoded({extended: true}))

    }

    useRoutes() {
        this.app.use('/api/v1/fibonacci', this.fibonacciController.createRouter())
    }

    useCors() {
        this.app.use(cors({origin: '*'}));
        this.app.use(function (req, res, next) {
            next();
        });
    }

    async init(): Promise<void> {
        this.useCors()
        this.useRoutes()
        await this.fibonacciRepository.connect()
    }
}











