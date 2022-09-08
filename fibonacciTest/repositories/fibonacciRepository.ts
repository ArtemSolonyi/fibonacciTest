import {inject, injectable} from "inversify";
import redis, {RedisClientType, RedisFunctions, RedisModules, RedisScripts} from "redis";
import {TYPES} from "../types";
import RedisClient from "@redis/client/dist/lib/client";


@injectable()
export class FibonacciRepository {
    redisClient: any


    public async connect() {
        this.redisClient = await redis.createClient({password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'})
        await this.redisClient.connect();
    }

    public async saveTicket(ticket:string,fibNumber:number,fibIndex:number):Promise<void>{
        await this.redisClient.set(`ticket:${ticket}`, fibNumber);
        await this.redisClient.set(`fibIndex:${fibIndex}`, fibNumber);
    }
    public async getFibonacciForNumber(fibIndex:number):Promise<number|null>{
       return await this.redisClient.get(`fibIndex:${fibIndex}`)
    }
    public async cachingFibNumber(fibIndex:number,number:number){
        await this.redisClient.set(`fibIndex:${fibIndex}`,number)
    }
    public async getNumberFibByTicket(ticket:string):Promise<string | null>{
        return await this.redisClient.get(`ticket:${ticket}`)
    }


}