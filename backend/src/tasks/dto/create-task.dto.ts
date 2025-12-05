import { IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Fix login bug' })
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Description of task...' })
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: TaskPriority, example: TaskPriority.MEDIUM })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.PENDING })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ example: '2025-04-01T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
