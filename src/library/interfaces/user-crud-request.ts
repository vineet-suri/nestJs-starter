import { CrudRequest } from '@nestjsx/crud';

import { User } from '../../shared/entities/users.entity';

export interface UserCrudRequest extends CrudRequest {
    user: User;
}
