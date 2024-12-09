import {LoggerHandler} from '@/common/logger/logger.handler';
import {LOG_SEVERITY, TARGET_AUDIENCE} from '@/common/types/logger.type';
import {ArgumentsHost, Catch, HttpException, HttpStatus} from '@nestjs/common';
import {BaseExceptionFilter} from '@nestjs/core';
import {Request, Response} from 'express';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
	public override catch(exception: any, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		LoggerHandler.error({
			identifier: request.identifier,
			severity: LOG_SEVERITY.critical,
			audience: TARGET_AUDIENCE.developers,
			exception: exception,
		});

		response.status(status).contentType('application/json').json({
			statusCode: status,
			message: 'Something went wrong!',
		});
	}
}
