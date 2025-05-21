"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskBulkSchema = exports.TaskDeleteSchema = exports.TaskUpdateSchema = exports.TaskCreateSchema = void 0;
const zod_1 = require("zod");
// Create Schema
exports.TaskCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    dueDate: zod_1.z.coerce.date().optional(),
    priority: zod_1.z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
});
// Update Schema
exports.TaskUpdateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    priority: zod_1.z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
    done: zod_1.z.boolean().optional(),
});
// Delete Schema
exports.TaskDeleteSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
// Bulk Read Schema (single item)
exports.TaskBulkSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userName: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    done: zod_1.z.boolean(),
    dueDate: zod_1.z.string().datetime().nullable(),
    priority: zod_1.z.enum(["HIGH", "MEDIUM", "LOW"]).nullable(),
});
