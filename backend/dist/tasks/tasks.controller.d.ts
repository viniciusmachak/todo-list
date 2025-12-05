import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskPriority, TaskStatus } from '@prisma/client';
export declare class TasksController {
    private readonly service;
    constructor(service: TasksService);
    create(dto: CreateTaskDto): Promise<{
        description: string | null;
        title: string;
        priority: import("@prisma/client").$Enums.TaskPriority;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        id: string;
        isCompleted: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    findAll(status?: TaskStatus, priority?: TaskPriority): Promise<{
        description: string | null;
        title: string;
        priority: import("@prisma/client").$Enums.TaskPriority;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        id: string;
        isCompleted: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        title: string;
        priority: import("@prisma/client").$Enums.TaskPriority;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        id: string;
        isCompleted: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    update(id: string, dto: UpdateTaskDto): Promise<{
        description: string | null;
        title: string;
        priority: import("@prisma/client").$Enums.TaskPriority;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        id: string;
        isCompleted: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        title: string;
        priority: import("@prisma/client").$Enums.TaskPriority;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueDate: Date | null;
        id: string;
        isCompleted: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
