import {Expose} from 'class-transformer';

export class BaseResponseDto<T> {
	@Expose() public message: string;
	@Expose() public data?: T;

	constructor(message: string, data?: T) {
		this.message = message;
		this.data = data;
	}
}
