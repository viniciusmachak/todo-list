import { TaskPriority, TaskStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskEntity {
  @ApiProperty({
    example: 'c8a3e4b9-1d88-4a20-9df6-1fb328d917f8',
    description: 'Unique identifier of the task',
  })
  id: string;

  @ApiProperty({
    example: 'Fix login bug',
    description: 'Short title describing the task',
  })
  title: string;

  @ApiPropertyOptional({
    example: 'The login button does not respond on click.',
    description: 'Detailed description of the task',
  })
  description?: string | null;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.MEDIUM,
    description: 'Priority level of the task',
  })
  priority: TaskPriority;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    description: 'Current status of the task',
  })
  status: TaskStatus;

  @ApiPropertyOptional({
    example: '2025-04-01T10:00:00.000Z',
    description: 'Optional deadline for the task',
  })
  dueDate?: Date | null;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the task has been completed',
  })
  isCompleted: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the task is soft deleted',
  })
  isDeleted: boolean;

  @ApiProperty({
    example: '2025-03-16T12:34:56.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-03-17T08:15:20.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    example: null,
    description: 'Timestamp when the task was soft deleted',
  })
  deletedAt?: Date | null;

  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }
}
