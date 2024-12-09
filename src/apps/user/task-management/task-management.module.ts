import {Task, TaskSchema} from '@/apps/user/task-management/schemas/task.schema';
import {TaskManagementController} from '@/apps/user/task-management/task-management.controller';
import {TaskManagementService} from '@/apps/user/task-management/task-management.service';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}])],
	controllers: [TaskManagementController],
	providers: [TaskManagementService],
})
export class TaskManagementModule {}
