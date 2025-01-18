import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});


const PORT = parseInt(process.env.PORT || '3010', 10);
const ENVIRONMENT = (process.env.ENVIRONMENT === undefined) ? 'development' : process.env.ENVIRONMENT;
const HOST_NAME = (process.env.HOST_NAME === undefined) ? 'localhost' : process.env.HOST_NAME;
const REDIS_URI = (process.env.REDIS_URI === undefined) ? 'redis://localhost:6379' : process.env.REDIS_URI;
const REDIS_DEFAULT_TTL = parseInt(process.env.REDIS_DEFAULT_TTL || '172800', 10); // DEFAULT: 2 days (172800 seconds)
const FROM_QUEUE_NAME = (process.env.FROM_QUEUE_NAME === undefined) ? 'from_trade_engine' : process.env.FROM_QUEUE_NAME;
const TO_QUEUE_NAME = (process.env.TO_QUEUE_NAME === undefined) ? 'to_trade_engine' : process.env.TO_QUEUE_NAME;

export const config = Object.freeze({
    server:{
        port: PORT,
        hostname: HOST_NAME,
        isProduction: ENVIRONMENT === 'development',
       address:
            ENVIRONMENT === 'development'
                ? `http://${HOST_NAME}:${PORT}`
                : `https://${HOST_NAME}`
    },
    environment:ENVIRONMENT,
    redis:{
        url:REDIS_URI,
        ttl:REDIS_DEFAULT_TTL,
        from_trade_engine: FROM_QUEUE_NAME,
        to_trade_engine: TO_QUEUE_NAME,
    }
    }
);