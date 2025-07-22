import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>, 
  ) {}

  createTask(dto: CreateTaskDto) {
    const task = this.taskRepository.create({ ...dto, is_completed: false });
    return this.taskRepository.save(task);
  }

  getAllTasks() {
    return this.taskRepository.find({ relations: ['user'] });
  }

  getTaskById(id: number) {
    return this.taskRepository.findOne({ where: { id }, relations: ['user'] });
  }

  getActiveTasks() {
    return this.taskRepository.find({ where: { is_completed: false }, relations: ['user'] });
  }

  getTasksByUserId(userId: number) {
    return this.taskRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  getPendingTasksByUserId(userId: number) {
    return this.taskRepository.find({
      where: { user: { id: userId }, is_completed: false },
      relations: ['user'],
    });
  }

  getPendingTaskById(id: number) {
    return this.taskRepository.findOne({
      where: { id, is_completed: false },
      relations: ['user'],
    });
  }

  async deleteTask(id: number) {
    await this.taskRepository.update(id, { is_completed: true });
    return { message: 'Task marked as completed' };
  }

  async updateTask(id: number, dto: Partial<CreateTaskDto>) {
    await this.taskRepository.update(id, dto);
    return this.getTaskById(id);
  }
}
