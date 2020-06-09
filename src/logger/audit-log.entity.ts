import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('audit_log')
export class AuditLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ip: string;

    @Column({ type: 'varchar' })
    url: string;

    @Column({ name: 'method_name', type: 'varchar', nullable: true })
    methodName?: string;

    @Column({ name: 'user_agent', type: 'varchar', nullable: true })
    userAgent?: string;

    @Column({ name: 'status_code', type: 'varchar', nullable: true })
    statusCode: string;

    @Column({ name: 'err_msg', type: 'varchar', nullable: true })
    errMsg?: string;

    @Column({ name: 'err_trace', type: 'varchar', nullable: true })
    errTrace?: string;

    @Column({ name: 'req_body', type: 'varchar', nullable: true })
    reqBody?: string;

    @Column({ type: 'varchar', nullable: true })
    request: string;

    @Column({ type: 'varchar', nullable: true })
    response: string;

    @Column({ name: 'response_time' })
    responseTime: string;

    @Column({ name: 'user_id', nullable: true })
    userId: string;
}
