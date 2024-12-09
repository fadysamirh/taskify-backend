import {MONGO_DUPLICATE_ERROR_CODE} from '@/common/constants';
import {BaseResponseDto} from '@/common/dtos/base.response-dto';
import {LoggerHandler} from '@/common/logger/logger.handler';
import {LOG_SEVERITY, TARGET_AUDIENCE} from '@/common/types/logger.type';
import {camelToNormal} from '@/common/utilities';
import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';
import {MongoServerError} from 'mongodb';
import {MongoError} from 'mongoose/node_modules/mongodb';

@Catch(MongoError)
export class MongoServerErrorFilter implements ExceptionFilter {
	public catch(error: MongoServerError, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		let duplicateField: string;

		if (error.code === MONGO_DUPLICATE_ERROR_CODE && error.keyValue) {
			duplicateField = Object.keys(error.keyValue)[0];
		}

		if (duplicateField) {
			LoggerHandler.error({
				identifier: request.identifier,
				severity: LOG_SEVERITY.low,
				audience: TARGET_AUDIENCE.developers,
				exception: `${camelToNormal(duplicateField)} already exists`,
			});

			response.status(HttpStatus.CONFLICT).json({
				statusCode: HttpStatus.CONFLICT,
				message: `${camelToNormal(duplicateField)} already exists`,
			});
			return;
		} else {
			LoggerHandler.error({
				identifier: request.identifier,
				severity: LOG_SEVERITY.low,
				audience: TARGET_AUDIENCE.developers,
				exception: error.message,
			});
			response
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.contentType('application/json')
				.json(new BaseResponseDto('Something went wrong!'));
			return;
		}
	}
}
