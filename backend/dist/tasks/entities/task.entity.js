"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEntity = void 0;
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class TaskEntity {
    id;
    title;
    description;
    priority;
    status;
    dueDate;
    isCompleted;
    isDeleted;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.TaskEntity = TaskEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'c8a3e4b9-1d88-4a20-9df6-1fb328d917f8',
        description: 'Unique identifier of the task',
    }),
    __metadata("design:type", String)
], TaskEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Fix login bug',
        description: 'Short title describing the task',
    }),
    __metadata("design:type", String)
], TaskEntity.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'The login button does not respond on click.',
        description: 'Detailed description of the task',
    }),
    __metadata("design:type", Object)
], TaskEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.TaskPriority,
        example: client_1.TaskPriority.MEDIUM,
        description: 'Priority level of the task',
    }),
    __metadata("design:type", String)
], TaskEntity.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.TaskStatus,
        example: client_1.TaskStatus.PENDING,
        description: 'Current status of the task',
    }),
    __metadata("design:type", String)
], TaskEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-04-01T10:00:00.000Z',
        description: 'Optional deadline for the task',
    }),
    __metadata("design:type", Object)
], TaskEntity.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Indicates whether the task has been completed',
    }),
    __metadata("design:type", Boolean)
], TaskEntity.prototype, "isCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Indicates whether the task is soft deleted',
    }),
    __metadata("design:type", Boolean)
], TaskEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-03-16T12:34:56.000Z',
        description: 'Creation timestamp',
    }),
    __metadata("design:type", Date)
], TaskEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-03-17T08:15:20.000Z',
        description: 'Last update timestamp',
    }),
    __metadata("design:type", Date)
], TaskEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: null,
        description: 'Timestamp when the task was soft deleted',
    }),
    __metadata("design:type", Object)
], TaskEntity.prototype, "deletedAt", void 0);
//# sourceMappingURL=task.entity.js.map