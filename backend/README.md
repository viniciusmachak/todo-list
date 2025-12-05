# 📘 Tasks API – Official Documentation

A RESTful API for managing tasks, built with **NestJS**, **Fastify**, **Prisma**

---

## 🧱 Technologies Used

- **Node.js**
- **NestJS (Fastify adapter)**
- **Prisma ORM**
- **Swagger (OpenAPI 3)**
- **Class-Validator / Class-Transformer**
- **PostgreSQL**
- **TypeScript**

---

## 🚀 Running the Project

### 1️⃣ Install dependencies

```bash
npm install
```

2️⃣ Setup Prisma

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

3️⃣ Start the server

```bash
npm run start
```

Development mode:

```bash
npm run start:dev
```

📄 Swagger Documentation

Once the server is running, access:

```bash
http://localhost:3000/docs
```

Swagger provides:

    Organized endpoints

    Automatic examples

    DTO schemas

🗂️ Task Model

```ts
id: string;
title: string;
description?: string | null;
priority: TaskPriority; // LOW, MEDIUM, HIGH
status: TaskStatus; // PENDING, IN_PROGRESS, COMPLETED, CANCELED
dueDate?: Date | null;
isCompleted: boolean;
isDeleted: boolean;
createdAt: Date;
updatedAt: Date;
deletedAt?: Date | null;
```

🧾 API Endpoints

➤ POST /tasks

Create a new task.

Request Body:

```json
{
  "title": "Fix login bug",
  "description": "Detailed explanation",
  "priority": "MEDIUM",
  "status": "PENDING",
  "dueDate": "2025-04-01T10:00:00Z"
}
```

➤ GET /tasks

Returns all tasks with optional filtering.

Query parameters:

Param Description

status: PENDING, IN_PROGRESS, COMPLETED, CANCELED

priority: LOW, MEDIUM, HIGH

Example:

```bash
/tasks?status=PENDING&priority=HIGH
```

➤ GET /tasks/:id

Get a task by ID.

➤ PUT /tasks/:id

Update a task by ID.

Body can contain any partial fields from UpdateTaskDto.

➤ DELETE /tasks/:id

Performs a soft delete (marks the task as deleted).
