import {TaskPriorityEnum} from '@/apps/user/task-management/enums/task-priority.enum';
import {TaskStatusEnum} from '@/apps/user/task-management/enums/task-status.enum';
import {DESCRIPTION_STRING_MAX_LENGTH, NORMAL_STRING_FIELD_MAX_LENGTH} from '@/common/constants';
import {DateField, EnumField, StringField} from '@decorators/field.decorators';

export class CreateTaskDto {
	@StringField({maxLength: NORMAL_STRING_FIELD_MAX_LENGTH})
	public title: string;

	@StringField({maxLength: DESCRIPTION_STRING_MAX_LENGTH})
	public description: string;

	@EnumField(() => TaskPriorityEnum)
	public priority: TaskPriorityEnum;

	@EnumField(() => TaskStatusEnum)
	public status: TaskStatusEnum;

	@DateField()
	public dueDate: Date;

	public userId?: string;
}
