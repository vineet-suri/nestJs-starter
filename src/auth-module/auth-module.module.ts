import { Module, HttpModule, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../shared/entities/users.entity';
import { Roles } from './model/roles.entity';
import { UserCredentials } from './model/user-credentials.entity';
import { AuthClient } from './model/auth-client.entity';
import { CacheModule } from '../cache/cache.module';
@Module({
    imports: [
        HttpModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
        TypeOrmModule.forFeature([User, AuthClient, UserCredentials, Roles]),
        CacheModule,
    ],
    providers: [ JwtStrategy],
})
export class AuthModuleModule {}
