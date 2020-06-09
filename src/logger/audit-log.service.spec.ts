import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogService } from './/audit-log.service';
import { AuditLog } from './audit-log.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AuditLogService', () => {
    let service;
    let repo;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditLogService,
                {
                    provide: getRepositoryToken(AuditLog),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<AuditLogService>(AuditLogService);
        repo = await module.get<Repository<AuditLog>>(getRepositoryToken(AuditLog));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createLog', () => {
        it('should add a log to databse, and return added auditLog object', async () => {
            const mockLog = { title: 'log something' };
            jest.spyOn(repo, 'save').mockResolvedValue('a');

            expect(repo.save).not.toHaveBeenCalled();

            const result = await service.createLog(mockLog);
            expect(repo.save).toHaveBeenCalledWith(mockLog);

            expect(result).toBe('a');
        });
    });
});
