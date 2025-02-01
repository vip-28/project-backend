import redis from "redis";

const redisClient = redis.createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379
    }
});

redisClient.on("error", (err) => console.error("Redis Error:", err));
redisClient.on("connect", () => console.log("Redis connected!"));

await redisClient.connect(); 

export default redisClient;
