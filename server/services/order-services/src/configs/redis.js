const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL // || "redis://localhost:6379" // Default to localhost if REDIS_URL is not set
});

redisClient.on("error", (err) => console.error("Redis client error:", err));
redisClient.on("connect", () => console.log("Redis client connected"));

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error("Redis connection failed:", err);
    }
})();

module.exports = redisClient;