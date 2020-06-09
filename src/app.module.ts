import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';

import { configService } from './library/config/config.service';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { LoggingInterceptor } from './logger/logger.interceptor';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forRoot(configService.getTypeOrmSeedConfig()),
        RedisModule.register(configService.getRedisConfig()),
        AuthModuleModule,
        LoggerModule,
        LoggerModule,
        RedisModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CookieParserMiddleware).forRoutes('auth');
    }
}
