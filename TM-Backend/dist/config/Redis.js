"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTaskCache = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default(process.env.REDIS_URL, {
    tls: {},
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
exports.default = redis;
//clear task cache
const clearTaskCache = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    if (taskId) {
        yield redis.del(`task:${taskId}`);
        yield redis.del(`comments:task:${taskId}`);
    }
    const keys = yield redis.keys('tasks:*');
    if (keys.length)
        yield redis.del(...keys);
});
exports.clearTaskCache = clearTaskCache;
