import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from './audit-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuditLogService {
    constructor(
        @InjectRepository(AuditLog)
        private readonly auditLogRepo: Repository<AuditLog>,
    ) {}

    /**
     * Summary: Adds log to DB
     * @param log audit log to be added
     * @returns audit log added to DB
     */
    async createLog(log: AuditLog): Promise<AuditLog> {
        return this.auditLogRepo.save(log);
    }
}
