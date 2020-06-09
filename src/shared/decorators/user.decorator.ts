import { createParamDecorator } from '@nestjs/common';
import { User } from '../entities/users.entity';

export const CurrentUser = createParamDecorator((data: keyof User | (keyof User)[], req) => {
    if (data) {
        if (Array.isArray(data)) {
            const userPayload: Record<string, string> = {};
            data.forEach(item => {
                userPayload[item] = req.user[item];
            });
            return userPayload;
        }
        return req.user[data];
    }
    return req.user;
});
