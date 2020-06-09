import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../shared/entities/users.entity';
import { CustomBaseEntity } from '../../library/model/custom-base.entity';
@Entity('user_credentials')
export class UserCredentials extends CustomBaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'auth_provider', type: 'varchar' })
    authProvider: string;

    @Column({ name: 'auth_id', type: 'varchar' })
    authId?: string;

    @Column({ name: 'auth_token', type: 'varchar', length: 100 })
    authToken: string;

    @Column({ type: 'varchar' })
    password: string;

    @ManyToOne(type => User)
    user: User;
}
