import {UserDto} from '@/apps/common/authentication/responses-dtos/user.dto';
import {LoggerHandler} from '@/common/logger/logger.handler';
import {LOG_SEVERITY} from '@/common/types/logger.type';
import {Mapper} from '@mappers/index';
import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	@Inject() private jwtService: JwtService;
	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException('Not authorized');
		} else {
			try {
				request['user'] = Mapper(UserDto, await this.jwtService.verifyAsync(token));
				return true;
			} catch (e) {
				LoggerHandler.error({
					identifier: request.identifier,
					severity: LOG_SEVERITY.low,
					message: e.message,
					exception: e,
				});
				throw new UnauthorizedException('Not authorized');
			}
		}
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
