import { createClient } from 'redis';
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.status = true;
    this.client = createClient();
    this.client.get = promisify(this.client.get).bind(this.client);
    this.client.on('error', (error) => {
      this.status = false;
      console.log(error);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) { 
    return this.client.get(key);
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
