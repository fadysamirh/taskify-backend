import {AuthenticationService} from '@/apps/common/authentication/authentication.service';
import {LoginDto} from '@/apps/common/authentication/params-dtos/login.dto';
import {RegisterDto} from '@/apps/common/authentication/params-dtos/register.dto';
import {LoggedInUserDto} from '@/apps/common/authentication/responses-dtos/logged-in-user.dto';
import {UserDto} from '@/apps/common/authentication/responses-dtos/user.dto';
import {BaseResponseDto} from '@/common/dtos/base.response-dto';
import {Body, Controller, HttpCode, Inject, Post, Req} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';

@ApiTags('Authentication Module')
@Controller('authentication')
export class AuthenticationController {
	constructor(@Inject() public authenticationService: AuthenticationService) {}

	@Post('login')
	public async login(@Body() loginDto: LoginDto): Promise<BaseResponseDto<LoggedInUserDto>> {
		return await this.authenticationService.login(loginDto);
	}

	@Post('register')
	public async register(@Body() registerDto: RegisterDto): Promise<BaseResponseDto<void>> {
		return await this.authenticationService.register(registerDto);
	}

	@HttpCode(200)
	@Post('verify-token')
	public async verifyToken(@Req() request: Request): Promise<BaseResponseDto<UserDto>> {
		return await this.authenticationService.verifyToken(request);
	}
}
