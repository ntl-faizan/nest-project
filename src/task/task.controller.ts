import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(+id);
  }

  @Get('active/all')
  getActiveTasks() {
    return this.taskService.getActiveTasks();
  }

  @Get('user/:userId')
  getTasksByUserId(@Param('userId') userId: number) {
    return this.taskService.getTasksByUserId(+userId);
  }

  @Get('user/:userId/pending')
  getPendingTasksByUserId(@Param('userId') userId: number) {
    return this.taskService.getPendingTasksByUserId(+userId);
  }

  @Get('pending/:id')
  getPendingTaskById(@Param('id') id: number) {
    return this.taskService.getPendingTaskById(+id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() dto: Partial<CreateTaskDto>) {
    return this.taskService.updateTask(+id, dto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(+id);
  }
}
