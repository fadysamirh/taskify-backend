import {AuthenticationController} from '@/apps/common/authentication/authentication.controller';
import {AuthenticationService} from '@/apps/common/authentication/authentication.service';
import {PasswordService} from '@/apps/common/authentication/password.service';
import {User, UserSchema} from '@/apps/common/authentication/schemas/user.schema';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
	providers: [AuthenticationService, PasswordService],
	controllers: [AuthenticationController],
})
export class AuthenticationModule {}
