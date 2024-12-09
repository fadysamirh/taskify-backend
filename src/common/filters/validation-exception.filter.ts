import {Environments} from '@/Environments';
import {LoggerHandler} from '@/common/logger/logger.handler';
import {LOG_SEVERITY} from '@/common/types/logger.type';
import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import {Request} from 'express';
import {ValidationErrorMessages, ValidationException} from './validation.exception';

interface IError {
	statusCode: number;
	error: string;
	message: string;
	validationErrors?: ValidationErrorMessages;
}

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
	public catch(exception: ValidationException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse();
		const error: IError = {
			statusCode: HttpStatus.BAD_REQUEST,
			error: 'Bad Request',
			message: 'Some fields are missing or invalid',
		};
		if (!Environments.isProduction()) {
			error.validationErrors = exception.validationErrors;
		}
		LoggerHandler.error({
			identifier: request.identifier,
			severity: LOG_SEVERITY.low,
			message: `Some fields are missing or invalid`,
			exception: exception.validationErrors,
		});
		return response.status(HttpStatus.BAD_REQUEST).contentType('application/json').json(error);
	}
}
