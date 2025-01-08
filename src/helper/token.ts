import { config,redis } from '../config';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

class TokenUtility{
    private readonly accessKey: string;
    private readonly refreshKey: string;
    private readonly accessKeyExpiry: string;
    private readonly redisClient = redis;

    constructor(){
        this.accessKey = config.tokens.accessKey;
        this.refreshKey = config.tokens.refreshKey;
        this.accessKeyExpiry = config.tokens.accessKeyExpiry;

        if(!this.accessKey || !this.refreshKey){
            throw new Error(
                'Access or refresh token secret key is missing.'
            );
        }
    }

    public generateTokens(username: string){
        const payload = { username };

        const accessToken = jwt.sign(payload, this.accessKey, {
            expiresIn: this.accessKeyExpiry,
        });

        const refreshToken = crypto
            .createHash('sha256')
            .update(`${this.refreshKey}@${username}:${Date.now()}`)
            .digest('base64url');

        return [accessToken, refreshToken];
    }

    public verifyToken(accessToken: string): any | null {
        try{
            return jwt.verify(accessToken, this.accessKey);
        }catch(err){
            return null;
        }
    }

    public async retrieveRefreshToken(username: string): Promise<string | null> {
        try{
            return await this.redisClient.getKey(username);
        }catch(err){
            console.error('Error retrieving refresh token from Redis:', err);
            return null;
        }
    }

    public async saveRefreshToken(username: string, token: string): Promise<void> {
        try{
            await this.redisClient.setKeyWithExpiration(username, token);
        }catch(err){
            console.error('Error saving refresh token to Redis:', err);
            throw new Error('Failed to save refresh token.');
        }
    }
}

const tokenUtility = new TokenUtility();
export {tokenUtility};