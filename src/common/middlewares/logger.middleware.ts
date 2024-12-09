import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger(`HTTP`);

	public use(request: Request, response: Response, next: NextFunction): void {
		const {method, originalUrl, headers} = request;
		const userAgent = request.get('User-Agent') || '';
		this.logger.log(
			`[${request.identifier}] ${method} | ${originalUrl} | ip: ${headers['x-forwarded-for']} | ${userAgent} | ${
				method !== 'GET' ? 'BODY: ' + JSON.stringify(request.body) : ''
			}`,
		);
		response.on('finish', () => {
			const {statusCode, statusMessage} = response;
			const contentLength = response.get('content-length');
			const user = request.user;

			if (statusCode === 500) {
				this.logger.error(
					`[${request.identifier}] ${method} | ${originalUrl} | ${statusCode} | message: ${statusMessage} | ${
						contentLength ? '+' + contentLength + 'ms |' : ''
					} ip: ${headers['x-forwarded-for']} | ${userAgent} | ${user ? user._id : 'Public'} | ${
						method !== 'GET' ? 'BODY: ' + JSON.stringify(request.body) : ''
					}`,
				);
			} else {
				this.logger.log(
					`[${request.identifier}] ${method} | ${originalUrl} | ${statusCode} | message: ${statusMessage} | ${
						contentLength ? '+' + contentLength + 'ms' : ''
					} | ip: ${headers['x-forwarded-for']} | ${userAgent} | ${user ? user._id : 'Public'} | ${
						method !== 'GET' ? 'BODY: ' + JSON.stringify(request.body) : ''
					}`,
				);
			}
		});
		next();
	}
}
