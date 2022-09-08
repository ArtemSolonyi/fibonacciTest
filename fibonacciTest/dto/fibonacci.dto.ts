import {IsNotEmpty, IsNumber, IsUUID} from "class-validator";

export class FibonacciDto  {
    @IsNumber()
    @IsNotEmpty()
    fibIndex:number
}
export class TicketDto {
    @IsUUID()
    @IsNotEmpty()
    ticket:string

}