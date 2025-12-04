const redis = require("../config/redis");


const get = async (key) => {

    const cached = await redis.get(key);
    if (!cached) return null;
    try {
        return JSON.parse(cached);
    } catch {
        return null;
    }
}

const set = async (key, value, ttl = 60) => {
    return redis.set(key, JSON.stringify(value), "EX", ttl);
}

const del = async (key) => {
    return redis.del(key);
}

module.exports = { get , set , del } ; 