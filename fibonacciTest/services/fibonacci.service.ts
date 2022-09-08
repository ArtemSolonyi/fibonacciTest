import {FibonacciDto} from "../dto/fibonacci.dto";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {FibonacciRepository} from "../repositories/fibonacciRepository";

import {v4 as uuidv4} from 'uuid';

@injectable()
export class FibonacciService {
    constructor(@inject(TYPES.FibonacciRepository) private fibonacciRepository: FibonacciRepository) {
    }

    public async createTicketForNumber({fibIndex}: FibonacciDto): Promise<{ ticket: string}| {errormessage:string,statusCode:number}> {

            const ticket = await this.createTicket();
            const fibNumber = await this.getFibNumber(fibIndex);
            if(!isFinite(fibNumber)){
                return {errormessage:"Number is too big",statusCode:400}
            }
            this.fibonacciRepository.saveTicket(ticket, fibNumber, fibIndex);

            return {ticket: ticket}


    }

    public async getNumberFibForTicket(ticket: string) {
        const ticks = await this.fibonacciRepository.getNumberFibByTicket(ticket)
        console.log(ticks,'ticks')
        return ticks;
    }

    public async getFibNumber(number: number) {
        const existsNumber = await this.fibonacciRepository.getFibonacciForNumber(number);
        if (existsNumber) {
            return existsNumber;
        }
        return await this.genFibNumber(number);

    }

    public async genFibNumber(number: number): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {


                let n1 = 0, n2 = 1, nextTerm;
                let numberFib = 0;
                for (let i = 1; i <= number; i++) {
                    this.fibonacciRepository.cachingFibNumber(i, n1);
                    if (i === number) {
                        numberFib = n1
                    }
                    nextTerm = n1 + n2;
                    n1 = n2;
                    n2 = nextTerm;
                }
                resolve(numberFib);
            }catch(e){
                console.log(e)
                reject(e);
            }
        })
    }

    public async createTicket(): Promise<string> {
        return uuidv4();
    }
}