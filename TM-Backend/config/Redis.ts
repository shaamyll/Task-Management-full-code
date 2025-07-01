import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!,{
  tls : {},
}); 

//checking connection
redis.ping()
  .then((res) => {
    if (res === 'PONG') {
      console.log('Redis is connected');
    }
  })
  .catch((err) => {
    console.error(err);
  });


  //check error
redis.on('error', (err) => {
  console.error(err);
});


export default redis;

//clear task cache
export const clearTaskCache = async (taskId?: number) => {
    if (taskId) {
    await redis.del(`task:${taskId}`); 
    await redis.del(`comments:task:${taskId}`); 
  }

  const keys = await redis.keys('tasks:*');
  if (keys.length) await redis.del(...keys);
};