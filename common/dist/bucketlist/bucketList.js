"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BKT_UpdateSchema = exports.BKT_GetSchema = exports.BKT_CreateSchema = void 0;
const zod_1 = require("zod");
exports.BKT_CreateSchema = zod_1.z.object({
    userName: zod_1.z.string(),
    title: zod_1.z.string(),
    plan: zod_1.z.string(),
    doneBy: zod_1.z.string().datetime().optional()
});
exports.BKT_GetSchema = zod_1.z.object({
    userName: zod_1.z.string()
});
exports.BKT_UpdateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().optional(),
    plan: zod_1.z.string().optional(),
    doneBy: zod_1.z.string().datetime().optional(),
    isDone: zod_1.z.boolean().optional()
});
