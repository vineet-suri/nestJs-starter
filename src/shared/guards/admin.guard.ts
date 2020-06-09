import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthenticateErrorKeys } from '../../auth-module/error-keys';
import { User } from '../entities/users.entity';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        return false;
    }
}
