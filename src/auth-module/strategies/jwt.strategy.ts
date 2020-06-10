import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../shared/entities/users.entity';
import { CacheService } from '../../cache/cache.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly cacheService: CacheService, private readonly jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    /**
     * Verfiy callback for the JWT passport strategy
     * @param payload payload object containing the user
     */
    async validate(payload): Promise<User> {
        // code to validate JWT token
        return new User(); // just a dummy value - needs to be updated
    }
}
