import { BaseEntity } from 'typeorm';

export class SuccessResponse extends BaseEntity {
    public success?: boolean;
    constructor(data?: Partial<SuccessResponse>) {
        super();
        data.success = this.success;
    }
}
