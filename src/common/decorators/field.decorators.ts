import {ApiEnumProperty, ApiUUIDProperty} from '@decorators/property.decorators';
import {
	PhoneNumberSerializer,
	ToArray,
	ToBoolean,
	ToLowerCase,
	ToUpperCase,
	Trim,
} from '@decorators/transform.decorator';
import {applyDecorators} from '@nestjs/common';
import type {ApiPropertyOptions} from '@nestjs/swagger';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {
	ArrayNotEmpty,
	IsBoolean,
	IsDate,
	IsEmail,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsPhoneNumber,
	IsPositive,
	IsString,
	IsStrongPassword,
	IsUUID,
	IsUrl,
	Max,
	MaxLength,
	Min,
	MinLength,
} from 'class-validator';
import {IsStrongPasswordOptions} from 'class-validator/types/decorator/string/IsStrongPassword';
import {isNumber} from 'lodash';

interface IStringFieldOptions {
	allowEmpty?: boolean;
	minLength?: number;
	maxLength?: number;
	toLowerCase?: boolean;
	toUpperCase?: boolean;
	swagger?: boolean;
	optional?: boolean;
}

interface INumberFieldOptions {
	each?: boolean;
	minimum?: number;
	maximum?: number;
	int?: boolean;
	isPositive?: boolean;
	swagger?: boolean;
	optional?: boolean;
}

type BasePropertyOptions = Omit<ApiPropertyOptions, 'type' | 'maximum' | 'minimum' | 'required' | 'enum'>;
type UuidPropertyOptions = Omit<ApiPropertyOptions, 'type' | 'maximum' | 'minimum' | 'required' | 'format'>;
type EnumPropertyOptions = Omit<ApiPropertyOptions, 'type' | 'maximum' | 'minimum' | 'required' | 'enum' | 'enumName'>;

function isRequired(options?: {optional?: boolean}): boolean {
	return options?.optional !== true;
}

export function NumberField(options: BasePropertyOptions & INumberFieldOptions = {}): PropertyDecorator {
	const decorators = [Type(() => Number)];

	const {each, int, minimum, maximum, isPositive, swagger} = options;

	if (options?.optional) {
		decorators.push(IsOptional());
	}

	if (swagger !== false) {
		decorators.push(ApiProperty({type: Number, required: isRequired(options), example: int ? 1 : 1.2, ...options}));
	}

	if (each) {
		decorators.push(ToArray());
	}

	if (int) {
		decorators.push(IsInt({each}));
	} else {
		decorators.push(IsNumber({}, {each}));
	}

	if (isNumber(minimum)) {
		decorators.push(Min(minimum, {each}));
	}

	if (isNumber(maximum)) {
		decorators.push(Max(maximum, {each}));
	}

	if (isPositive) {
		decorators.push(IsPositive({each}));
	}

	return applyDecorators(...decorators);
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

export function NumberStringField(options: BasePropertyOptions & IStringFieldOptions = {}): PropertyDecorator {
	const decorators = [IsNumberString(), Trim()];

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

	return applyDecorators(...decorators);
}

export function BooleanField(
	options: BasePropertyOptions & Partial<{swagger: boolean; optional: boolean}> = {},
): PropertyDecorator {
	const decorators = [IsBoolean(), ToBoolean()];

	if (options?.optional) {
		decorators.push(IsOptional());
	}

	if (options?.swagger !== false) {
		decorators.push(ApiProperty({type: Boolean, required: isRequired(options), ...options}));
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

export function PhoneField(
	options: BasePropertyOptions & Partial<{swagger: boolean; optional: boolean}> = {},
): PropertyDecorator {
	const decorators = [IsPhoneNumber(), PhoneNumberSerializer()];

	if (options?.optional) {
		decorators.push(IsOptional());
	}

	if (options?.swagger !== false) {
		decorators.push(ApiProperty({type: String, required: isRequired(options), ...options}));
	}

	return applyDecorators(...decorators);
}

export function UUIDField(
	options: UuidPropertyOptions & Partial<{each: boolean; swagger: boolean; optional: boolean}> = {},
): PropertyDecorator {
	const decorators = [IsUUID('4', {each: options?.each})];

	if (options?.optional) {
		decorators.push(IsOptional());
	}

	if (options?.swagger !== false) {
		decorators.push(ApiUUIDProperty({required: isRequired(options), ...options}));
	}

	if (options?.each) {
		decorators.push(ArrayNotEmpty(), ToArray());
	}

	return applyDecorators(...decorators);
}

export function URLField(options: BasePropertyOptions & IStringFieldOptions = {}): PropertyDecorator {
	if (options?.allowEmpty) {
		return applyDecorators(StringField({...options, example: 'https://www.nawy.com'}));
	}
	return applyDecorators(StringField({...options, example: 'https://www.nawy.com'}), IsUrl());
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
