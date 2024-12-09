import {EMAIL_FIELD_MAX_LENGTH, NORMAL_STRING_FIELD_MAX_LENGTH, PASSWORD_FIELD_MAX_LENGTH} from '@/common/constants';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {MaxLength} from 'class-validator';
import {HydratedDocument} from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
	@Prop({required: true})
	@MaxLength(NORMAL_STRING_FIELD_MAX_LENGTH)
	public firstName: string;

	@Prop({required: true})
	@MaxLength(NORMAL_STRING_FIELD_MAX_LENGTH)
	public lastName: string;

	@Prop({required: true, unique: true})
	@MaxLength(EMAIL_FIELD_MAX_LENGTH)
	public email: string;

	@Prop({required: true})
	@MaxLength(PASSWORD_FIELD_MAX_LENGTH)
	public password: string;

	@Prop()
	public createdAt?: Date;

	@Prop()
	public updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
