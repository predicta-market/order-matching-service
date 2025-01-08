import bcrypt from 'bcrypt';
import {config} from '../config';

class PasswordUtility{
    private readonly saltRounds: number;

    constructor(){
        this.saltRounds = config.password.saltRounds;
    }

    public async hash(plain: string): Promise<string> {
        try{
            return await bcrypt.hash(plain, this.saltRounds);
        }catch(error){
            console.error('Error hashing password:', error);
            throw new Error('Failed to hash password.');
        }
    }

    public async matches(plain: string, hash: string): Promise<boolean> {
        try{
            return await bcrypt.compare(plain, hash);
        }catch(error){
            console.error('Error comparing passwords:', error);
            throw new Error('Failed to compare passwords.');
        }
    }
}
const passwordUtility = new PasswordUtility();
export {passwordUtility};