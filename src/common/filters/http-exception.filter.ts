import {Environments} from '@/Environments';
import {LoggerHandler} from '@/common/logger/logger.handler';
import {LOG_SEVERITY, TARGET_AUDIENCE} from '@/common/types/logger.type';
import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';

/** Built-in HTTP exceptions
 * BadRequestException
 * UnauthorizedException
 * NotFoundException
 * ForbiddenException
 * NotAcceptableException
 * RequestTimeoutException
 * ConflictException
 * GoneException
 * HttpVersionNotSupportedException
 * PayloadTooLargeException
 * UnsupportedMediaTypeException
 * UnprocessableEntityException
 * InternalServerErrorException
 * NotImplementedException
 * ImATeapotException
 * MethodNotAllowedException
 * BadGatewayException
 * ServiceUnavailableException
 * GatewayTimeoutException
 * PreconditionFailedException
 * */

interface IError {
	statusCode: number;
	message?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	public catch(exception: HttpException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();

		const error: IError = {
			statusCode: status,
			message: 'Something went wrong!',
		};
		if (!Environments.isProduction()) {
			error.message = exception.message;
		}

		LoggerHandler.error({
			identifier: request.identifier,
			severity: LOG_SEVERITY.low,
			audience: TARGET_AUDIENCE.productOwners,
			message: exception.message,
		});

		response.status(status).contentType('application/json').json(error);
	}
}
