import {CreateTaskDto} from '@/apps/user/task-management/params-dtos/create-task.dto';
import {UpdateTaskDto} from '@/apps/user/task-management/params-dtos/update-task.dto';
import {TaskManagementService} from '@/apps/user/task-management/task-management.service';
import {AuthenticationGuard} from '@/common/guards/authentication.guard';
import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@ApiTags('Task Management Module')
@Controller('task-management')
@UseGuards(AuthenticationGuard)
@ApiBearerAuth('access-token')
export class TaskManagementController {
	constructor(private taskManagementService: TaskManagementService) {}

	@Post()
	public async createTask(@Body() createTaskDto: CreateTaskDto) {
		return await this.taskManagementService.createTask(createTaskDto);
	}

	@Patch(':id')
	public async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
		return await this.taskManagementService.updateTask(id, updateTaskDto);
	}

	@Delete(':id')
	public async deleteTask(@Param('id') id: string) {
		return await this.taskManagementService.deleteTask(id);
	}

	@Get(':id')
	public async getTask(@Param('id') id: string) {
		return await this.taskManagementService.getTask(id);
	}

	@Get()
	public async getTasks(@Query('status') status: string) {
		return await this.taskManagementService.getTasks(status);
	}
}
