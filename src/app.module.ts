import {AuthenticationModule} from '@/apps/common/authentication/authentication.module';
import {UserModule} from '@/apps/user/user.module';
import {JWT_SECRET} from '@/common/constants';
import {Environments} from '@/Environments';
import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forRoot(Environments.MONGO_URI),
		JwtModule.register({
			global: true,
			secret: JWT_SECRET,
		}),
		AuthenticationModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
