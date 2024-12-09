export interface BaseLoggerType {
	identifier?: string;
	audience?: TARGET_AUDIENCE;
	data?: any;
}

export interface LoggerInfoType extends BaseLoggerType {
	message: string;
}

export interface LoggerErrorType extends BaseLoggerType {
	severity: LOG_SEVERITY;
	exception?: any;
	message?: string;
}

export enum TARGET_AUDIENCE {
	all = 'All',
	developers = 'Developers',
	productOwners = 'ProductOwners',
}

export enum LOG_SEVERITY {
	critical = 'Critical',
	high = 'High',
	medium = 'Medium',
	low = 'Low',
}
