import { Module } from '@nestjs/common';
import { LoggingInterceptor } from './logger.interceptor';
import { AuditLogService } from './audit-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './audit-log.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuditLog])],
    providers: [LoggingInterceptor, AuditLogService],
    exports: [LoggingInterceptor, AuditLogService],
})
export class LoggerModule {}
