import {UserDto} from '@/apps/common/authentication/responses-dtos/user.dto';
import {Expose} from 'class-transformer';

export class LoggedInUserDto {
	@Expose() public accessToken: string;
	@Expose() public refreshToken: string;
	@Expose() public user: UserDto;
}
