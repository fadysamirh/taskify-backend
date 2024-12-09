import {UserDto} from '@/apps/common/authentication/responses-dtos/user.dto';
import {LANGUAGE, PLATFORM} from '@constants/common';

declare global {
	namespace Express {
		interface Request {
			identifier: string;
			language: LANGUAGE;
			user?: UserDto;
		}
	}
}

export interface RequestOptions {
	language: LANGUAGE;
	platform: PLATFORM;
	appVersion?: string | string[];
	timeZone?: string | string[];
}
