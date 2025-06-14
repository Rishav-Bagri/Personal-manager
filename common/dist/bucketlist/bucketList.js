"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucketListBulkSchema = exports.bucketListDeleteSchema = exports.bucketListUpdateSchema = exports.bucketListCreateSchema = void 0;
const zod_1 = require("zod");
// Create Schema
exports.bucketListCreateSchema = zod_1.z.object({
    title: zod_1.z.string(),
    plan: zod_1.z.string(),
    doneBy: zod_1.z.string().datetime().optional(),
});
// Update Schema
exports.bucketListUpdateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().optional(),
    plan: zod_1.z.string().optional(),
    doneBy: zod_1.z.string().datetime().optional(),
    isDone: zod_1.z.boolean().optional(),
});
// Delete Schema
exports.bucketListDeleteSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
// Bulk Read Schema (for list of items)
exports.bucketListBulkSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userName: zod_1.z.string(),
    title: zod_1.z.string(),
    plan: zod_1.z.string(),
    createdAt: zod_1.z.string().datetime(),
    doneBy: zod_1.z.string().datetime().nullable(),
    isDone: zod_1.z.boolean(),
});
