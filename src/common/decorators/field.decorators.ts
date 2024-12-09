import {ApiEnumProperty} from '@decorators/property.decorators';
import {ToArray, ToLowerCase, ToUpperCase, Trim} from '@decorators/transform.decorator';
import {applyDecorators} from '@nestjs/common';
import type {ApiPropertyOptions} from '@nestjs/swagger';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {
	IsDate,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsStrongPassword,
	MaxLength,
	MinLength,
} from 'class-validator';
import {IsStrongPasswordOptions} from 'class-validator/types/decorator/string/IsStrongPassword';

interface IStringFieldOptions {
	allowEmpty?: boolean;
	minLength?: number;
	maxLength?: number;
	toLowerCase?: boolean;
	toUpperCase?: boolean;
	swagger?: boolean;
	optional?: boolean;
}

type BasePropertyOptions = Omit<ApiPropertyOptions, 'type' | 'maximum' | 'minimum' | 'required' | 'enum'>;
type EnumPropertyOptions = Omit<ApiPropertyOptions, 'type' | 'maximum' | 'minimum' | 'required' | 'enum' | 'enumName'>;

function isRequired(options?: {optional?: boolean}): boolean {
	return options?.optional !== true;
}
export function StringField(options: BasePropertyOptions & IStringFieldOptions = {}): PropertyDecorator {
	const decorators = [IsString(), Trim()];

	if (!options?.allowEmpty) {
		decorators.push(IsNotEmpty());
	}

	if (options?.optional) {
		decorators.push(IsOptional());
	}

	if (options?.swagger !== false) {
		decorators.push(ApiProperty({type: String, required: isRequired(options), ...options}));
	}

	if (options?.minLength) {
		decorators.push(MinLength(options.minLength));
	}

	if (options?.maxLength) {
		decorators.push(MaxLength(options.maxLength));
	}

	if (options?.toLowerCase) {
		decorators.push(ToLowerCase());
	}

	if (options?.toUpperCase) {
		decorators.push(ToUpperCase());
	}

	return applyDecorators(...decorators);
}

export function EnumField<TEnum>(
	getEnum: () => TEnum,
	options: EnumPropertyOptions &
		Partial<{
			each: boolean;
			swagger: boolean;
			optional: boolean;
		}> = {},
): PropertyDecorator {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const enumValue = getEnum() as any;
	const decorators = [IsEnum(enumValue as object, {each: options.each})];

	if (options?.optional) {
		decorators.push(IsOptional());
	}

	if (options?.swagger !== false) {
		decorators.push(ApiEnumProperty(getEnum, {required: isRequired(options), ...options}));
	}

	if (options.each) {
		decorators.push(ToArray());
	}

	return applyDecorators(...decorators);
}

export function EmailField(options: BasePropertyOptions & IStringFieldOptions = {}): PropertyDecorator {
	const decorators: PropertyDecorator[] = [StringField({toLowerCase: true, ...options})];
	if (!options?.allowEmpty) {
		decorators.push(IsEmail());
	}

	if (options?.optional) {
		decorators.push(IsOptional());
	}

	if (options?.swagger !== false) {
		decorators.push(ApiProperty({type: String, required: isRequired(options), ...options}));
	}

	return applyDecorators(...decorators);
}

export function DateField(
	options: BasePropertyOptions & Partial<{swagger: false; optional: boolean}> = {},
): PropertyDecorator {
	const decorators = [Type(() => Date), IsDate()];

	if (options?.optional) {
		decorators.push(IsOptional());
	}

	if (options?.swagger !== false) {
		decorators.push(ApiProperty({required: isRequired(options), ...options}));
	}

	return applyDecorators(...decorators);
}

export function PasswordField(options: IsStrongPasswordOptions = {}): PropertyDecorator {
	return applyDecorators(IsStrongPassword({...options}));
}
