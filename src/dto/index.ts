import { Transaction } from '../model';

export interface IAddOrderRequest{
    orderId: string;
    eventId: string;
    side: 'BUY' | 'SELL';
    price: number;
    size: number;
    time: Date;
}

export interface IProcessedOrderResponse{
    completedOrder: any;
    transactions: Transaction[];
    isMatched: boolean;
}