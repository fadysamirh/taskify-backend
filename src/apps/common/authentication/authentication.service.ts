import {LoginDto} from '@/apps/common/authentication/params-dtos/login.dto';
import {RegisterDto} from '@/apps/common/authentication/params-dtos/register.dto';
import {PasswordService} from '@/apps/common/authentication/password.service';
import {LoggedInUserDto} from '@/apps/common/authentication/responses-dtos/logged-in-user.dto';
import {UserDto} from '@/apps/common/authentication/responses-dtos/user.dto';
import {User} from '@/apps/common/authentication/schemas/user.schema';
import {BaseResponseDto} from '@/common/dtos/base.response-dto';
import {Environments} from '@/Environments';
import {Mapper} from '@mappers/index';
import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from '@nestjs/mongoose';
import {instanceToPlain} from 'class-transformer';
import {Request} from 'express';
import {Model} from 'mongoose';

@Injectable()
export class AuthenticationService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		@Inject() private passwordService: PasswordService,
		@Inject() private jwtService: JwtService,
	) {}

	public async login(loginDto: LoginDto): Promise<BaseResponseDto<LoggedInUserDto>> {
		const userFound = await this.userModel.findOne({email: loginDto.email});
		if (!userFound) {
			throw new UnauthorizedException('Wrong credentials');
		}

		const passwordMatch = await this.passwordService.comparePassword(loginDto.password, userFound.password);
		if (passwordMatch) {
			const userDto = instanceToPlain(Mapper(UserDto, userFound.toJSON()));
			const accessToken = await this.jwtService.signAsync(userDto, {expiresIn: Environments.JWT_ACCESS_TOKEN_EXPIRY});

			return new BaseResponseDto(
				'Logged in successfully',
				Mapper(LoggedInUserDto, {
					accessToken,
					user: userDto,
				}),
			);
		} else {
			throw new UnauthorizedException('Wrong credentials');
		}
	}

	public async register(registerDto: RegisterDto): Promise<BaseResponseDto<void>> {
		registerDto.password = await this.passwordService.hashPassword(registerDto.password);
		const createdUser = new this.userModel(registerDto);
		await createdUser.save();
		return new BaseResponseDto('Registered successfully');
	}

	public async verifyToken(request: Request): Promise<BaseResponseDto<UserDto>> {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		if (type !== 'Bearer') {
			throw new UnauthorizedException('Not authorized');
		}
		if (!token) {
			throw new UnauthorizedException('Not authorized');
		} else {
			try {
				const user = Mapper(UserDto, await this.jwtService.verifyAsync(token));
				return new BaseResponseDto('Token verified', user);
			} catch (e) {
				throw new UnauthorizedException('Not authorized');
			}
		}
	}
}
