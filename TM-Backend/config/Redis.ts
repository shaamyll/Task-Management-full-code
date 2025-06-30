import Redis from 'ioredis';

const redis = new Redis(); 

export default redis;

//clear task cache
export const clearTaskCache = async (taskId?: number) => {
    if (taskId) {
    await redis.del(`task:${taskId}`); // for individual task
    await redis.del(`comments:task:${taskId}`); //  clear comments cache
  }

  const keys = await redis.keys('tasks:*');
  if (keys.length) await redis.del(...keys);
};