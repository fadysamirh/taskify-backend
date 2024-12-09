import {TaskPriorityEnum} from '@/apps/user/task-management/enums/task-priority.enum';
import {TaskStatusEnum} from '@/apps/user/task-management/enums/task-status.enum';
import {Expose, Transform} from 'class-transformer';

export class TaskDto {
	@Expose()
	@Transform(value => value.obj._id.toString())
	public _id: string;
	@Expose() public title: string;
	@Expose() public description: string;
	@Expose() public priority: TaskPriorityEnum;
	@Expose() public status: TaskStatusEnum;
	@Expose() public dueDate: Date;
	@Expose() public userId: string;
	@Expose() public createdAt: Date;
	@Expose() public updatedAt: Date;
}
