import Redis from 'ioredis';

abstract class Connector{
    private redis: Redis;
    constructor(url:string){
        this.redis = new Redis(url);
    }
    
    public getClient():Redis{
        return this.redis;
    }

    public disconnect():void{
        this.redis.disconnect();
    }
}
export {
    Connector,
    Redis
};