export interface OrderBookEntity {
    orderId: string;
    eventId: string;
    price: number;
    size: number;
    side: 'BUY' | 'SELL';
    isActive: boolean;
    time: Date;
}

export interface Transaction {
    orderId: string;
    price: number;
    size: number;
    time: Date;
}  