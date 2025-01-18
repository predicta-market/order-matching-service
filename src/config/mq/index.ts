import { Queue, Worker } from 'bullmq';
import { config } from '../server-config';

export class BullMQConfig {
    private readonly redisUrl: string;
    
    constructor() {
        this.redisUrl = config.redis.url;
    }

 
    public createQueue(queueName: string): Queue {
        return new Queue(queueName, {
        connection: {
            url: this.redisUrl,
        },
        });
    }

    public createWorker(
        queueName: string,
        processor: (job: any) => Promise<void>,
        concurrency = 1 // Default concurrency is 1
    ): Worker {
        return new Worker(queueName, processor, {
            connection: {
                url: this.redisUrl,
            },
            concurrency,
        });
    }
}