"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notepadDeleteSchema = exports.notepadUpdateSchema = exports.notepadCreateSchema = void 0;
const zod_1 = require("zod");
exports.notepadCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1)
});
exports.notepadUpdateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional()
});
exports.notepadDeleteSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
