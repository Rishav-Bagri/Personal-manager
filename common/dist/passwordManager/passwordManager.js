"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PM_DeleteSchema = exports.PM_UpdateSchema = exports.PM_GetPasswordById = exports.PM_GetDomainsSchema = exports.PM_CreateSchema = void 0;
const zod_1 = require("zod");
exports.PM_CreateSchema = zod_1.z.object({
    userName: zod_1.z.string().min(1),
    domain: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    notes: zod_1.z.string().optional(),
});
exports.PM_GetDomainsSchema = zod_1.z.object({
    userName: zod_1.z.string().min(1),
});
exports.PM_GetPasswordById = zod_1.z.object({
    userName: zod_1.z.string().min(1),
    id: zod_1.z.string().uuid(),
});
exports.PM_UpdateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    password: zod_1.z.string().min(1),
    notes: zod_1.z.string().optional(),
});
exports.PM_DeleteSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
