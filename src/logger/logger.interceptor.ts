import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
    UnprocessableEntityException,
} from '@nestjs/common';
import { stringify } from 'flatted';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { STATUS_CODE } from '../library/enums/status-codes.enum';
import { AuditLog } from './audit-log.entity';
import { AuditLogService } from './audit-log.service';

/**
 * Logging Interceptor intercepts every request, and logs the request data, and response/error data in the database
 * @param   context context object containing request and response objects
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly auditLogService: AuditLogService) {}

    auditLog = new AuditLog();

    intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
        const now = Date.now();
        const request = context.switchToHttp().getRequest();

        this.auditLog.request = stringify(request);

        this.auditLog.methodName = request.method;
        this.auditLog.url = request.originalUrl || '';
        this.auditLog.ip =
            (request.headers['x-forwarded-for'] || '').split(',').pop() ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            request.connection.socket.remoteAddress;

        this.auditLog.userAgent = request.headers['user-agent'];
        this.auditLog.reqBody = request.body;
        if (request.user && request.user.id) {
            this.auditLog.userId = request.user.id;
        }

        return next.handle().pipe(
            tap(async () => {
                const response = context.switchToHttp().getResponse();
                const delay = Date.now() - now;

                this.auditLog.response = stringify(response);
                this.auditLog.responseTime = `${delay}ms`;
                this.auditLog.statusCode = response.statusCode || '';

                this.auditLogService.createLog(this.auditLog);
            }),
            catchError(async error => {
                const response = context.switchToHttp().getResponse();
                const delay = Date.now() - now;

                this.auditLog.response = stringify(response);
                this.auditLog.responseTime = `${delay}ms`;

                this.auditLog.errMsg = error.message;
                this.auditLog.errTrace = error.stack;
                if (!error.statusCode) {
                    this.auditLog.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR.toString();
                } else {
                    this.auditLog.statusCode = error.status;
                }

                this.auditLogService.createLog(this.auditLog);
                // Since DB errors are overriden by nest exception filter, we need to specify the db error schemes.
                if (error.name === 'QueryFailedError') {
                    throw new UnprocessableEntityException({
                        message: error.message,
                        operation: error.query.split(' ')[0],
                        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    });
                }
                throw error;
            }),
        );
    }
}
