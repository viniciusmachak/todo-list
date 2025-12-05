import { PrismaService } from '../common/providers/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateTaskDto): import("@prisma/client").Prisma.Prisma__TaskClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(query: {
        status?: string;
        priority?: string;
    }): import("@prisma/client").Prisma.PrismaPromise<{
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__TaskClient<{
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
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: UpdateTaskDto): import("@prisma/client").Prisma.Prisma__TaskClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    softDelete(id: string): import("@prisma/client").Prisma.Prisma__TaskClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
