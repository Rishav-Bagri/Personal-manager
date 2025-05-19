"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDeleteSchema = exports.TaskUpdateSchema = exports.TaskCreateSchema = void 0;
const zod_1 = require("zod");
exports.TaskCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    dueDate: zod_1.z.coerce.date().optional(),
    priority: zod_1.z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
});
exports.TaskUpdateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    priority: zod_1.z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
    done: zod_1.z.boolean().optional(),
});
exports.TaskDeleteSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
