import {AuthenticationModule} from '@/apps/common/authentication/authentication.module';
import {Module} from '@nestjs/common';

@Module({
	imports: [AuthenticationModule],
})
export class CommonModule {}
