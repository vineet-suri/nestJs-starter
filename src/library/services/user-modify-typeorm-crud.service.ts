import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { User } from '../../shared/entities/users.entity';
import { UserCrudRequest } from '../interfaces/user-crud-request';
import { UserModifiableEntity } from '../model/user-modifiable.entity';

export abstract class UserModifyTypeOrmCrudService<T extends UserModifiableEntity> extends TypeOrmCrudService<T> {
    constructor(repo: Repository<T>) {
        super(repo);
    }

    // Method: POST
    createOne(req: UserCrudRequest, dto: DeepPartial<T>): Promise<T> {
        const user: User = req.user;
        ((dto as unknown) as UserModifiableEntity).createdBy = user.id;
        ((dto as unknown) as UserModifiableEntity).modifiedBy = user.id;
        return super.createOne(req, dto);
    }

    // Method: PUT
    replaceOne(req: UserCrudRequest, dto: DeepPartial<T>): Promise<T> {
        const user: User = req.user;
        ((dto as unknown) as UserModifiableEntity).modifiedBy = user.id;
        return super.replaceOne(req, dto);
    }

    // Method: PATCH
    updateOne(req: UserCrudRequest, dto: DeepPartial<T>): Promise<T> {
        const user: User = req.user;
        ((dto as unknown) as UserModifiableEntity).modifiedBy = user.id;
        return super.updateOne(req, dto);
    }
}
