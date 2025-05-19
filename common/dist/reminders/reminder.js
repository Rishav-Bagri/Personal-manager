"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderListSchema = exports.ReminderDeleteSchema = exports.ReminderCreateSchema = void 0;
const zod_1 = require("zod");
exports.ReminderCreateSchema = zod_1.z.object({
    userName: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    time: zod_1.z.string().datetime()
});
exports.ReminderDeleteSchema = zod_1.z.object({
    id: zod_1.z.string().uuid()
});
exports.ReminderListSchema = zod_1.z.object({
    userName: zod_1.z.string().min(1),
});
