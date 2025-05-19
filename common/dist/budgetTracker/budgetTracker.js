"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BGT_UpdateSchema = exports.BGT_GetSchema = exports.BGT_CreateSchema = void 0;
const zod_1 = require("zod");
exports.BGT_CreateSchema = zod_1.z.object({
    userName: zod_1.z.string(),
    thingsToSpend: zod_1.z.string(),
    money: zod_1.z.string(),
    category: zod_1.z.string().optional(),
    paidBy: zod_1.z.string().datetime(),
    paid: zod_1.z.boolean()
});
exports.BGT_GetSchema = zod_1.z.object({
    userName: zod_1.z.string()
});
exports.BGT_UpdateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    thingsToSpend: zod_1.z.string().optional(),
    money: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    paidBy: zod_1.z.string().datetime().optional(),
    paid: zod_1.z.boolean().optional()
});
