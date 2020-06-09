import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../../library/model/custom-base.entity';
@Entity('roles')
export class Roles extends CustomBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ name: 'role_key', type: 'integer' })
    roleKey?: number;

    @Column('simple-array')
    permissions?: string[];
}
