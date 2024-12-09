import {config} from 'dotenv';
import {Variable} from './common/decorators/env-variable.decorator';

config();

export class Environments {
	@Variable('NODE_ENV')
	public static NODE_ENV: string;
	@Variable('SERVER_PORT')
	public static SERVER_PORT: string;

	/** Mongo */
	@Variable('MONGO_URI')
	public static MONGO_URI: string;

	/** Swagger */
	@Variable('SWAGGER_TITLE', 'Taskify')
	public static SWAGGER_TITLE: string;
	@Variable('SWAGGER_DESCRIPTION', 'Taskify API description')
	public static SWAGGER_DESCRIPTION: string;

	/** JWT */

	@Variable('JWT_ACCESS_TOKEN_EXPIRY')
	public static JWT_ACCESS_TOKEN_EXPIRY: string;
	@Variable('JWT_REFRESH_TOKEN_EXPIRY')
	public static JWT_REFRESH_TOKEN_EXPIRY: string;

	public static isTesting = (): boolean => Environments.NODE_ENV === 'test';
	public static isDevelopment = (): boolean => Environments.NODE_ENV === 'development';
	public static isProduction = (): boolean => Environments.NODE_ENV === 'production';
	public static isStaging = (): boolean => Environments.NODE_ENV === 'staging';
}
