import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CustomBaseEntity } from '../../library/model/custom-base.entity';
import { UserDTO } from '../interfaces/user.dto';

@Entity('users')
export class User extends CustomBaseEntity implements UserDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    oid: string;

    @Column({ name: 'first_name', type: 'varchar', length: 50 })
    firstName: string;

    @Column({ name: 'middle_name', type: 'varchar', length: 50 })
    middleName?: string;

    @Column({ name: 'last_name', type: 'varchar', length: 50 })
    lastName?: string;

    @Column({ name: 'display_name', type: 'varchar', nullable: true })
    displayName?: string;

    @Column({ name: 'job_title', type: 'varchar', nullable: true })
    jobTitle?: string;

    @Column({ type: 'varchar', length: 100 })
    username: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    phone: string;

    @Column({ name: 'send_push', type: 'boolean', default: true })
    sendPush: boolean;

    @Column({ name: 'send_sms', type: 'boolean', default: false })
    sendSms: boolean;

    @Column({ name: 'send_email', type: 'boolean', default: false })
    sendEmail: boolean;
}
