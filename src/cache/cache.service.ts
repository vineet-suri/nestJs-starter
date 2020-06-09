import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import * as Redis from 'ioredis';
import { TokenKeys, AccessTokenKeys } from '../library/types';
@Injectable()
export class CacheService {
    private readonly redisClient: Redis.Redis;
    constructor(private readonly redisService: RedisService) {
        this.redisClient = redisService.getClient();
    }

    
}
