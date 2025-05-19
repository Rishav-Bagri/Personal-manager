"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetTrackerUpdateSchema = exports.budgetTrackerCreateSchema = void 0;
const zod_1 = require("zod");
// Schemas
exports.budgetTrackerCreateSchema = zod_1.z.object({
    thingsToSpend: zod_1.z.string(),
    money: zod_1.z.string(),
    category: zod_1.z.string().optional(),
    paidBy: zod_1.z.string().datetime(),
    paid: zod_1.z.boolean(),
});
exports.budgetTrackerUpdateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    thingsToSpend: zod_1.z.string().optional(),
    money: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    paidBy: zod_1.z.string().datetime().optional(),
    paid: zod_1.z.boolean().optional(),
});
