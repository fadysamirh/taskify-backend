import {TaskPriorityEnum} from '@/apps/user/task-management/enums/task-priority.enum';
import {TaskStatusEnum} from '@/apps/user/task-management/enums/task-status.enum';
import {DESCRIPTION_STRING_MAX_LENGTH, NORMAL_STRING_FIELD_MAX_LENGTH} from '@/common/constants';
import {DateField, EnumField, StringField} from '@decorators/field.decorators';

export class UpdateTaskDto {
	@StringField({maxLength: NORMAL_STRING_FIELD_MAX_LENGTH, optional: true})
	public title: string;

	@StringField({optional: true, maxLength: DESCRIPTION_STRING_MAX_LENGTH})
	public description: string;

	@EnumField(() => TaskPriorityEnum, {optional: true})
	public priority: TaskPriorityEnum;

	@EnumField(() => TaskStatusEnum, {optional: true})
	public status: TaskStatusEnum;

	@DateField({optional: true})
	public dueDate: Date;
}
