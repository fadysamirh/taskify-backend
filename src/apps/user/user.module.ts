import {TaskManagementModule} from '@/apps/user/task-management/task-management.module';
import {Module} from '@nestjs/common';

@Module({
	imports: [TaskManagementModule],
})
export class UserModule {}
