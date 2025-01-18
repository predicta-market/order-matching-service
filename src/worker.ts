import { BullMQConfig,config } from './config';
import { OrderBookService } from './service';
import { IAddOrderRequest } from './dto';
import Redis from 'ioredis';

const redis = new Redis();
const bullConfig = new BullMQConfig();
const fromQueue = bullConfig.createQueue(config.redis.from_trade_engine);
const toQueue = bullConfig.createQueue(config.redis.to_trade_engine);

const worker = bullConfig.createWorker(config.redis.from_trade_engine, async (job) => {
    const order: IAddOrderRequest = job.data;
    const orderService = new OrderBookService(redis);

    try {
        const data = await orderService.processOrder(order);
        await toQueue.add('order-response', data);
    } 
    catch(error){
        console.error('Error processing order:', error);
        throw error;
    }
});

worker.on('completed', (job) => {
    console.log(`Job completed: ${job.id}`);
});

worker.on('failed', (job, err) => {
    console.error(`Job failed: ${job?.id}, error: ${err.message}`);
});