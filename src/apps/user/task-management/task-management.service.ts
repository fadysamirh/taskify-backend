import {CreateTaskDto} from '@/apps/user/task-management/params-dtos/create-task.dto';
import {UpdateTaskDto} from '@/apps/user/task-management/params-dtos/update-task.dto';
import {TaskDto} from '@/apps/user/task-management/responses-dtos/task.dto';
import {Task, TaskDocument} from '@/apps/user/task-management/schemas/task.schema';
import {BaseResponseDto} from '@/common/dtos/base.response-dto';
import {ListMapper, Mapper} from '@mappers/index';
import {Inject, Injectable, NotFoundException, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable({scope: Scope.REQUEST})
export class TaskManagementService {
	constructor(
		@InjectModel(Task.name) private taskModel: Model<Task>,
		@Inject(REQUEST) private readonly request: Request,
	) {}

	public async createTask(createTaskDto: CreateTaskDto): Promise<BaseResponseDto<TaskDto>> {
		createTaskDto.userId = this.request['user']._id;
		const savedTask: TaskDocument = await new this.taskModel(createTaskDto).save();
		return new BaseResponseDto('Created task successfully', Mapper(TaskDto, savedTask));
	}

	public async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<BaseResponseDto<void>> {
		await this.taskModel.findOneAndUpdate({_id: id, userId: this.request['user']._id}, updateTaskDto);
		return new BaseResponseDto('Updated task successfully');
	}

	public async deleteTask(id: string): Promise<BaseResponseDto<void>> {
		await this.taskModel.findOneAndDelete({_id: id, userId: this.request['user']._id});
		return new BaseResponseDto('Deleted task successfully');
	}

	public async getTask(id: string): Promise<BaseResponseDto<TaskDto>> {
		const userTaskFound: TaskDocument = await this.taskModel.findOne({
			_id: id,
			userId: this.request['user']._id,
		});
		if (!userTaskFound) {
			throw new NotFoundException('Task not found');
		}
		return new BaseResponseDto('Task fetched successfully', Mapper(TaskDto, userTaskFound.toJSON()));
	}

	public async getTasks(status: string): Promise<BaseResponseDto<TaskDto[]>> {
		const filter: any = {userId: this.request['user']._id};
		if (status) {
			filter.status = status;
		}
		const userTasksFound: TaskDocument[] = await this.taskModel.find(filter);
		return new BaseResponseDto('Tasks fetched successfully', ListMapper(TaskDto, userTasksFound));
	}
}
