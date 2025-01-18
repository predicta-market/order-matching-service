import { IAddOrderRequest,IProcessedOrderResponse } from '../dto';
import { OrderBookEntity } from '../model';
import { LockUtils } from '../utils';
import { Redis } from 'ioredis';

export class OrderBookService {
    private redis: Redis;
    private lockUtils: LockUtils;

    constructor(redis: Redis) {
        this.redis = redis;
        this.lockUtils = new LockUtils(redis);
    }

    async processOrder(data: IAddOrderRequest): Promise<IProcessedOrderResponse> {
        const lockKey = `lock:order:${data.orderId}::side:${data.side}::event:${data.orderId}`;
        const lockAcquired = await this.lockUtils.acquireLock(lockKey, 40000);

        if(!lockAcquired){
            throw new Error('Failed to acquire lock for processing buy order.');
        }

        try {
            const sellOrders: OrderBookEntity[] = await this.getOrders('SELL', data.price,data.eventId);

            const transactions: any[] = [];
            let remainingSize = data.size;

            for(const order of sellOrders){
                if(remainingSize <= 0){
                    break;
                }
                const matchedSize = Math.min(order.size, remainingSize);
                transactions.push({
                orderId: order.orderId,
                price: order.price,
                size: matchedSize,
                time: new Date(),
                });

                remainingSize -= matchedSize;
                order.size -= matchedSize;

                if (order.size === 0) {
                    order.isActive = false;
                }
            }

            return {
                completedOrder: { ...data, size: remainingSize },
                transactions,
                isMatched: transactions.length > 0,
            };
        } 
        finally {
            await this.lockUtils.releaseLock(lockKey);
        }
    }

    private async getOrders(
        side: 'BUY' | 'SELL',
        price: number,
        eventId: string
    ): Promise<OrderBookEntity[]> {
        const key = `orderbook:${side}:${eventId}`;
        
        const range = side === 'BUY'
          ? ['-inf', price.toString()] // Fetch orders <= price for BUY
          : [price.toString(), '+inf']; // Fetch orders >= price for SELL
      

        // fetching orders from Redis sorted set within the price range
        const orderData = await this.redis.zrangebyscore(key, range[0], range[1], 'WITHSCORES');
      
        const orders: OrderBookEntity[] = [];
        for(let i=0; i<orderData.length; i+=2){
            const order = JSON.parse(orderData[i]) as OrderBookEntity;
            orders.push(order);
        }

        // sorting by price
        return orders.sort(
            (a, b) => (side === 'BUY' ? b.price - a.price : a.price - b.price)
        ); 
    }
}