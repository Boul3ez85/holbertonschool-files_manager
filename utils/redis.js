const redis = require('redis');
const { promisify } = require('util');


class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getClient = promisify(this.getClient).bind(this.client);
    this.client.on('error', (error) => {
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
export default redisClient
