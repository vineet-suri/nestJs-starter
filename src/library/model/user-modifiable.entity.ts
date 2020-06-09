import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column } from 'typeorm';

import { CustomBaseEntity } from './custom-base.entity';

@Exclude()
export abstract class UserModifiableEntity extends CustomBaseEntity {
    @ApiPropertyOptional({
        type: Number,
    })
    @Column({ name: 'created_by', type: 'integer' })
    createdBy: number;

    @ApiPropertyOptional({
        type: Number,
    })
    @Column({ name: 'modified_by', type: 'integer' })
    modifiedBy: number;
}
