import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskPriority, TaskStatus } from '@prisma/client';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'The task has been created.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  create(@Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks with optional filters' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
    description: 'Filter tasks by status',
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: TaskPriority,
    description: 'Filter tasks by priority',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks returned successfully.',
  })
  findAll(
    @Query('status') status?: TaskStatus,
    @Query('priority') priority?: TaskPriority,
  ) {
    return this.service.findAll({ status, priority });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task found.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task soft deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
