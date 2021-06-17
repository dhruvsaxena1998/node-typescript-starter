import Redis from 'ioredis';

// For connection details check-out https://github.com/luin/ioredis#connect-to-redis
const client = new Redis(); // Connect to 127.0.0.1:6379

export const set = client.set;
export const get = client.get;

export { client };
