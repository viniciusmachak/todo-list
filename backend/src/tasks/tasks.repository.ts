import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/providers/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTaskDto) {
    return this.prisma.task.create({ data });
  }

  findAll(query: { status?: string; priority?: string }) {
    const where: any = { isDeleted: false };

    if (query.status) {
      where.status = query.status;
    }

    if (query.priority) {
      where.priority = query.priority;
    }

    return this.prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.task.findFirst({ where: { id, isDeleted: false } });
  }

  update(id: string, data: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id }, data });
  }

  softDelete(id: string) {
    return this.prisma.task.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }
}
