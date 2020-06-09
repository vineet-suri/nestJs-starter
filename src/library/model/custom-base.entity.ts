import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SoftDeleteEntity } from './soft-delete.entity';
import { Exclude } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export abstract class CustomBaseEntity extends SoftDeleteEntity {
    @ApiPropertyOptional({
        type: Date,
    })
    @CreateDateColumn({ name: 'created_on', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdOn: Date;

    @ApiPropertyOptional({
        type: Date,
    })
    @UpdateDateColumn({ name: 'modified_on', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    modifiedOn: Date;
}
