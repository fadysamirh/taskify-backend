import {EMAIL_FIELD_MAX_LENGTH, NORMAL_STRING_FIELD_MAX_LENGTH, PASSWORD_FIELD_MAX_LENGTH} from '@/common/constants';
import {EmailField, PasswordField, StringField} from '@decorators/field.decorators';

export class RegisterDto {
	@StringField({optional: false, maxLength: NORMAL_STRING_FIELD_MAX_LENGTH})
	public firstName: string;

	@StringField({optional: false, maxLength: NORMAL_STRING_FIELD_MAX_LENGTH})
	public lastName: string;

	@EmailField({optional: false, maxLength: EMAIL_FIELD_MAX_LENGTH, toLowerCase: true})
	public email: string;

	@PasswordField({minLength: 6, minUppercase: 1, minSymbols: 0, minNumbers: 0})
	@StringField({maxLength: PASSWORD_FIELD_MAX_LENGTH})
	public password: string;
}
