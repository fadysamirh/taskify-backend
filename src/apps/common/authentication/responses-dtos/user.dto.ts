import {Expose, Transform} from 'class-transformer';

export class UserDto {
	@Expose()
	@Transform(value => value.obj._id.toString())
	public _id: string;
	@Expose() public email: string;
	@Expose() public firstName: string;
	@Expose() public lastName: string;
}
