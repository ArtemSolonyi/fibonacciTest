import {inject, injectable} from "inversify";
import express, {Request, Response} from "express";
import {validator} from "../validations/validate.middleware";
import {UserDto, UserLoginDto} from "../dto/user.dto";
import {TYPES} from "../types";
import {AuthService} from "../services/auth.service";
import {FibonacciService} from "../services/fibonacci.service";
import {FibonacciDto, TicketDto} from "../dto/fibonacci.dto";


@injectable()
export class FibonacciController {
    constructor(@inject(TYPES.FibonacciService) private fibonacciService: FibonacciService) {
    }
    private createTicketForNumber = async (req: Request<{}, {}, FibonacciDto>, res: Response): Promise<Response> => {
        const result = await this.fibonacciService.createTicketForNumber(req.body)
        return res.status(200).json(result)
    }
    private getFibNumberByTicket = async (req: Request<{}, {}, {},{ticket:string}>, res: Response): Promise<Response> => {
        const result = await this.fibonacciService.getNumberFibForTicket(req.query.ticket)
        return res.status(200).json(result)
    }

    public createRouter() {
        const router = express.Router()
        router.post('/input',  this.createTicketForNumber)
            .get('/output', this.getFibNumberByTicket)
        return router
    }
}
