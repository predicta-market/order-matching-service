import { Redis } from 'ioredis';

export class LockUtils {
    private redis: Redis;
    
    constructor(redis: Redis) {
        this.redis = redis;
    }

    async acquireLock(key: string, ttl: number): Promise<boolean> {
        const result = await this.redis.set(
            key, 
            'LOCKED', 
            'PX', 
            ttl,
            'NX'
        );
        return result === 'OK';
    }

    async releaseLock(key: string): Promise<void> {
        await this.redis.del(key);
    }
}