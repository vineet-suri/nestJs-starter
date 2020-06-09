import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../../library/model/custom-base.entity';
@Entity('auth_clients')
export class AuthClient extends CustomBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'client_id', type: 'varchar' })
    clientId: string;

    @Column({ name: 'client_secret', type: 'varchar' })
    clientSceret?: string;

    @Column({ name: 'redirect_url', type: 'varchar', nullable: true })
    redirectUrl?: string;

    @Column({ name: 'access_token_expiration', type: 'varchar' })
    accessTokenExpiration: string;

    @Column({ name: 'refresh_token_expiration', type: 'varchar' })
    refreshTokenExpiration: string;

    @Column({ name: 'auth_token_expiration', type: 'varchar' })
    authCodeExpiration: string;

    @Column({ type: 'varchar' })
    secret: string;

    @Column('simple-array')
    userIds?: string[];
}
