import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import * as Redis from 'ioredis';
@Injectable()
export class CacheService {
    private readonly redisClient: Redis.Redis;
    constructor(private readonly redisService: RedisService) {
        this.redisClient = redisService.getClient();
    }
}
