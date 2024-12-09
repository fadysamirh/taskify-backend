import type {ValidationOptions} from 'class-validator';
import {IsPhoneNumber as isPhoneNumber} from 'class-validator';

export function IsPhoneNumber(
	validationOptions?: ValidationOptions & {
		region?: Parameters<typeof isPhoneNumber>[0];
	},
): PropertyDecorator {
	return isPhoneNumber(validationOptions?.region, {
		message: 'error.phoneNumber',
		...validationOptions,
	});
}
