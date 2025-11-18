import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { TasksRepository } from '../tasks.repository';
import { NotFoundException } from '@nestjs/common';
import { TaskPriority, TaskStatus } from '@prisma/client';

const makeTask = (overrides: Partial<any> = {}) => ({
  id: '1',
  title: 'Test',
  description: 'Desc',
  priority: TaskPriority.LOW,
  status: TaskStatus.IN_PROGRESS,
  dueDate: null,
  isCompleted: false,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('TasksService', () => {
  let service: TasksService;
  let repository: jest.Mocked<TasksRepository>;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get(TasksRepository) as jest.Mocked<TasksRepository>;
  });

  beforeEach(() => jest.clearAllMocks());

  it('should create a task', async () => {
    const dto = {
      title: 'Test',
      description: 'Desc',
      priority: TaskPriority.LOW,
    };

    const expected = makeTask(dto);
    repository.create.mockResolvedValue(expected as any);

    expect(await service.create(dto)).toEqual(expected);
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('should return all tasks with filters', async () => {
    const expected = [makeTask()];
    const status = TaskStatus.IN_PROGRESS;

    repository.findAll.mockResolvedValue(expected as any);

    expect(await service.findAll({ status })).toEqual(expected);
    expect(repository.findAll).toHaveBeenCalledWith({ status });
  });

  it('should return one task', async () => {
    const task = makeTask();

    repository.findOne.mockResolvedValue(task as any);

    expect(await service.findOne('1')).toEqual(task);
    expect(repository.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException when task does not exist', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    expect(repository.findOne).toHaveBeenCalledWith('999');
  });

  it('should update a task', async () => {
    const found = makeTask();
    const updated = makeTask({ title: 'Updated' });

    repository.findOne.mockResolvedValue(found as any);
    repository.update.mockResolvedValue(updated as any);

    expect(await service.update('1', { title: 'Updated' })).toEqual(updated);
    expect(repository.update).toHaveBeenCalledWith('1', { title: 'Updated' });
  });

  it('should soft delete a task', async () => {
    const found = makeTask();
    const deleted = makeTask({ isDeleted: true });

    repository.findOne.mockResolvedValue(found as any);
    repository.softDelete.mockResolvedValue(deleted as any);

    expect(await service.remove('1')).toEqual(deleted);
    expect(repository.softDelete).toHaveBeenCalledWith('1');
  });
});
