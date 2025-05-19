"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucketListUpdateSchema = exports.bucketListCreateSchema = void 0;
const zod_1 = require("zod");
// Schemas
exports.bucketListCreateSchema = zod_1.z.object({
    title: zod_1.z.string(),
    plan: zod_1.z.string(),
    doneBy: zod_1.z.string().datetime().optional(),
});
exports.bucketListUpdateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().optional(),
    plan: zod_1.z.string().optional(),
    doneBy: zod_1.z.string().datetime().optional(),
    isDone: zod_1.z.boolean().optional(),
});
