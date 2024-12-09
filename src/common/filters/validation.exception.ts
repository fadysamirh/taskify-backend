import {BadRequestException} from '@nestjs/common';

export interface ValidationErrorMessages {
	[key: string]: string | ValidationErrorMessages | any;
}

export class ValidationException extends BadRequestException {
	constructor(public validationErrors: ValidationErrorMessages) {
		super();
	}
}
