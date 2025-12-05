import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/common/providers/prisma.service';
import { TaskPriority, TaskStatus } from '@prisma/client';

describe('Tasks E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);

    await prisma.task.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.task.deleteMany();
  });

  let taskId: string;

  it('/tasks (POST) - should create a task', async () => {
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: 'New Task',
        description: 'Desc',
        priority: TaskPriority.LOW,
      })
      .expect(201);

    taskId = res.body.id;

    expect(res.body.title).toBe('New Task');
  });

  it('/tasks (GET) - should return all tasks', async () => {
    await prisma.task.create({
      data: {
        title: 'Task 1',
        priority: TaskPriority.LOW,
        status: TaskStatus.IN_PROGRESS,
      },
    });

    const res = await request(app.getHttpServer()).get('/tasks').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it('/tasks (GET) - should filter by status', async () => {
    await prisma.task.create({
      data: {
        title: 'T1',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
      },
    });

    await prisma.task.create({
      data: {
        title: 'T2',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.HIGH,
      },
    });

    const res = await request(app.getHttpServer())
      .get('/tasks')
      .query({ status: TaskStatus.IN_PROGRESS })
      .expect(200);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].status).toBe(TaskStatus.IN_PROGRESS);
  });

  it('/tasks (GET) - should filter by priority', async () => {
    await prisma.task.create({
      data: {
        title: 'High Task',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
      },
    });

    const res = await request(app.getHttpServer())
      .get('/tasks')
      .query({ priority: TaskPriority.HIGH })
      .expect(200);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].priority).toBe(TaskPriority.HIGH);
  });

  it('/tasks (GET) - should filter by BOTH status and priority', async () => {
    await prisma.task.create({
      data: {
        title: 'MatchBoth',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
      },
    });

    await prisma.task.create({
      data: {
        title: 'Other',
        status: TaskStatus.COMPLETED,
        priority: TaskPriority.MEDIUM,
      },
    });

    const res = await request(app.getHttpServer())
      .get('/tasks')
      .query({
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
      })
      .expect(200);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].priority).toBe(TaskPriority.MEDIUM);
    expect(res.body[0].status).toBe(TaskStatus.IN_PROGRESS);
  });

  it('/tasks/:id (GET) - should return 404 for non-existing task', async () => {
    await request(app.getHttpServer()).get('/tasks/nonexistent-id').expect(404);
  });

  it('/tasks/:id (PUT) - should update a task', async () => {
    const task = await prisma.task.create({
      data: {
        title: 'Update Me',
        priority: TaskPriority.LOW,
        status: TaskStatus.IN_PROGRESS,
      },
    });

    const res = await request(app.getHttpServer())
      .put(`/tasks/${task.id}`)
      .send({ title: 'Updated Task' })
      .expect(200);

    expect(res.body.title).toBe('Updated Task');
  });

  it('/tasks/:id (PUT) - should return 404 when updating non-existing task', async () => {
    await request(app.getHttpServer())
      .put('/tasks/nonexistent-id')
      .send({ title: 'Anything' })
      .expect(404);
  });

  it('/tasks/:id (DELETE) - should soft-delete a task', async () => {
    const task = await prisma.task.create({
      data: {
        title: 'Delete Me',
        priority: TaskPriority.HIGH,
        status: TaskStatus.IN_PROGRESS,
      },
    });

    const res = await request(app.getHttpServer())
      .delete(`/tasks/${task.id}`)
      .expect(200);

    expect(res.body.isDeleted).toBe(true);
  });

  it('/tasks/:id (DELETE) - should return 404 for non-existing task', async () => {
    await request(app.getHttpServer())
      .delete('/tasks/nonexistent-id')
      .expect(404);
  });
});
