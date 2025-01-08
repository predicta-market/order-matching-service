import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});


const PORT = parseInt(process.env.PORT || '3010', 10);
const ENVIRONMENT = (process.env.ENVIRONMENT === undefined) ? 'development' : process.env.ENVIRONMENT;
const HOST_NAME = (process.env.HOST_NAME === undefined) ? 'localhost' : process.env.HOST_NAME;
const DATABASE_URL = (process.env.DATABASE_URL === undefined) ? '' : process.env.DATABASE_URL;
const DATABASE_USER = (process.env.DATABASE_USER === undefined) ? 'root' : process.env.DATABASE_USER;
const DATABASE_PASSWORD = (process.env.DATABASE_PASSWORD === undefined) ? 'root' : process.env.DATABASE_PASSWORD;
const DATABASE_NAME = (process.env.DATABASE_NAME === undefined) ? 'sample' : process.env.DATABASE_NAME;
const DATABASE_PORT = (process.env.DATABASE_PORT === undefined) ? 5432 : Number(process.env.DATABASE_PORT);
const DATABASE_HOST = (process.env.DATABASE_HOST === undefined) ? 'localhost' : process.env.DATABASE_HOST;
const REDIS_URI = (process.env.REDIS_URI === undefined) ? 'redis://localhost:6379' : process.env.REDIS_URI;
const REDIS_DEFAULT_TTL = parseInt(process.env.REDIS_DEFAULT_TTL || '172800', 10); // DEFAULT: 2 days (172800 seconds)
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);
const ACCESS_KEY = (process.env.ACCESS_KEY === undefined) ? 'snapdb_dev' : process.env.ACCESS_KEY;
const REFRESH_KEY = (process.env.REFRESH_KEY === undefined) ? 'snapdb_dev' : process.env.REFRESH_KEY;
const ACCESS_TOKEN_EXPIRY = (process.env.ACCESS_TOKEN_EXPIRY === undefined) ? '1h' : process.env.ACCESS_TOKEN_EXPIRY; // DEFAULT: 1 hour

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
    password:{
        saltRounds:SALT_ROUNDS
    },
    tokens:{
        accessKey:ACCESS_KEY,
        refreshKey:REFRESH_KEY,
        accessKeyExpiry:ACCESS_TOKEN_EXPIRY
    },
    environment:ENVIRONMENT,
    database:{
        url:DATABASE_URL,
        user:DATABASE_USER,
        password:DATABASE_PASSWORD,
        host:DATABASE_HOST,
        port:DATABASE_PORT,
        name:DATABASE_NAME
    },
    redis:{
        url:REDIS_URI,
        ttl:REDIS_DEFAULT_TTL
    }
});