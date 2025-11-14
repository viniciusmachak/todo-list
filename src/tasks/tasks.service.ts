import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly repository: TasksRepository) {}

  async create(dto: CreateTaskDto) {
    return this.repository.create(dto);
  }

  async findAll(query?: any) {
    return this.repository.findAll(query);
  }

  async findOne(id: string) {
    const task = await this.repository.findOne(id);

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    await this.findOne(id);

    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.repository.softDelete(id);
  }
}
