import { BaseEntity, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export abstract class SoftDeleteEntity extends BaseEntity {
    @ApiPropertyOptional({
        type: Date,
    })
    @DeleteDateColumn({ name: 'deleted_at' })
    public deletedAt: Date;
}
