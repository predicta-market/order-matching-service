import {Connector} from './conn';
import {config} from '../server-config'

class Client extends Connector{
  constructor(){
    super(config.redis.url);
  }
  public async setKeyWithExpiration(key:string, value:string):Promise<void>{
    await this.getClient().setex(key, config.redis.ttl, value);
    console.log(`Key "${key}" set with value "${value}" and TTL ${config.redis.ttl} seconds.`);
  }
  
  public async getKey(key:string):Promise<string | null>{
    return await this.getClient().get(key);
  }
}

export default Client;