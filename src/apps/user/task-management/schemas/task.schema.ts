import {TaskPriorityEnum} from '@/apps/user/task-management/enums/task-priority.enum';
import {TaskStatusEnum} from '@/apps/user/task-management/enums/task-status.enum';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({timestamps: true})
export class Task {
	@Prop()
	public title: string;

	@Prop()
	public description: string;

	@Prop({enum: TaskPriorityEnum})
	public priority: TaskPriorityEnum;

	@Prop({enum: TaskStatusEnum})
	public status: TaskStatusEnum;

	@Prop()
	public dueDate: Date;

	@Prop()
	public userId: string;

	@Prop()
	public createdAt?: Date;

	@Prop()
	public updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({userId: 1, _id: 1});
