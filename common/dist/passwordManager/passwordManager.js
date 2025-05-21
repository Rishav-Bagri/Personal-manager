"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordManagerBulkSchema = exports.passwordManagerDeleteSchema = exports.passwordManagerUpdateSchema = exports.passwordManagerGetPasswordByIdSchema = exports.passwordManagerCreateSchema = void 0;
const zod_1 = require("zod");
// Schemas
exports.passwordManagerCreateSchema = zod_1.z.object({
    domain: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    notes: zod_1.z.string().optional(),
});
exports.passwordManagerGetPasswordByIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.passwordManagerUpdateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    password: zod_1.z.string().min(1),
    notes: zod_1.z.string().optional(),
});
exports.passwordManagerDeleteSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.passwordManagerBulkSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userName: zod_1.z.string(),
    domain: zod_1.z.string(),
    notes: zod_1.z.string().optional(),
});
