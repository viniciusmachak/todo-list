import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../common/providers/prisma.service';
import { TasksRepository } from '../tasks.repository';
import { TaskPriority, TaskStatus } from '@prisma/client';

describe('TasksRepository (integration)', () => {
  let prisma: PrismaService;
  let repository: TasksRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, TasksRepository],
    }).compile();

    prisma = module.get(PrismaService);
    repository = module.get(TasksRepository);

    await prisma.task.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a task', async () => {
    const data = {
      title: 'Test Task',
      description: 'Desc',
      priority: TaskPriority.LOW,
    };

    const task = await repository.create(data);

    expect(task).toBeDefined();
    expect(task.id).toBeDefined();
    expect(task.title).toBe('Test Task');
  });

  it('should find all tasks', async () => {
    const tasks = await repository.findAll({});
    expect(Array.isArray(tasks)).toBe(true);
  });

  it('should update a task', async () => {
    const created = await repository.create({
      title: 'To Update',
      description: 'x',
      priority: TaskPriority.MEDIUM,
    });

    const updated = await repository.update(created.id, {
      title: 'Updated Name',
    });

    expect(updated.title).toBe('Updated Name');
  });

  it('should soft delete a task', async () => {
    const created = await repository.create({
      title: 'Delete Me',
      description: 'x',
      priority: TaskPriority.HIGH,
    });

    const deleted = await repository.softDelete(created.id);

    expect(deleted.isDeleted).toBe(true);
    expect(deleted.deletedAt).not.toBeNull();
  });
});
