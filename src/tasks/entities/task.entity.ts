import { TaskPriority, TaskStatus } from '@prisma/client';

export class TaskEntity {
  id: string;
  title: string;
  description?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date | null;
  isCompleted: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }
}
