import {GlobalExceptionFilter} from '@/common/filters/global-exception.filter';
import {HttpExceptionFilter} from '@/common/filters/http-exception.filter';
import {MongoServerErrorFilter} from '@/common/filters/mongo-error.filter';
import {ValidationErrorMessages, ValidationException} from '@/common/filters/validation.exception';
import {Environments} from '@/Environments';
import {INestApplication, ValidationError, ValidationPipe, ValidationPipeOptions} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import {AppModule} from './app.module';
import {ValidationExceptionFilter} from './common/filters/validation-exception.filter';

function setupSwagger(app: INestApplication): void {
	const config = new DocumentBuilder()
		.setTitle(Environments.SWAGGER_TITLE)
		.setDescription(Environments.SWAGGER_DESCRIPTION)
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				in: 'header',
				description: 'Enter JWT token',
			},
			'access-token',
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});
}

const extractErrorMessages = (errors: ValidationError[]): ValidationErrorMessages => {
	const messages: ValidationErrorMessages = {};
	errors.forEach(error => {
		if (error?.constraints) {
			messages[error?.property] = Object.values(error.constraints)?.[0];
		} else if (error?.children?.length) {
			messages[error?.property] = extractErrorMessages(error.children);
		} else {
			messages[error?.property] = 'Fields are invalid';
		}
	});
	return messages;
};

const validationPipeOptions: ValidationPipeOptions = {
	transform: true,
	whitelist: true,
	forbidNonWhitelisted: true,
	exceptionFactory: (errors: ValidationError[]): ValidationException => {
		return new ValidationException(extractErrorMessages(errors));
	},
};

async function bootstrap() {
	dotenv.config();

	const app = await NestFactory.create(AppModule);
	/** PIPES */
	app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

	/** FILTERS */
	app.useGlobalFilters(
		new GlobalExceptionFilter(),
		new HttpExceptionFilter(),
		new ValidationExceptionFilter(),
		new MongoServerErrorFilter(),
	);

	/** SWAGGER */
	const enableSwagger = !Environments.isProduction();
	if (enableSwagger) {
		setupSwagger(app);
	}
	app.enableCors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	});
	const port = parseInt(Environments.SERVER_PORT, 10);
	await app.listen(port);
	console.info(`Server is running in ${Environments.NODE_ENV} mode on http://localhost:${Environments.SERVER_PORT}`);
	if (enableSwagger) {
		console.info(`Documentation: http://localhost:${Environments.SERVER_PORT}/api`);
	}
}

bootstrap();
