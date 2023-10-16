"use strict";
// Strictly handles database interaction
// TODO: Handle case for incoming prisma errors 
// https://www.google.com/search?q=prisma+throw+error+express+js&sca_esv=571399955&sxsrf=AM9HkKlTJQrGoZ0kMVb0Uzl-qdw6mrgNbA%3A1696634344895&ei=6JUgZcGrNsXK1e8P-Nm-gAI&ved=0ahUKEwjBv8O7x-KBAxVFZfUHHfisDyAQ4dUDCBA&uact=5&oq=prisma+throw+error+express+js&gs_lp=Egxnd3Mtd2l6LXNlcnAiHXByaXNtYSB0aHJvdyBlcnJvciBleHByZXNzIGpzMgUQIRigATIFECEYoAEyBRAhGKABMgUQIRigAUiJFFC1BFiYE3ACeAGQAQCYAYIBoAH2CaoBBDIuMTC4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIGEAAYFhgewgIIEAAYigUYhgPCAggQIRgWGB4YHcICBxAhGKABGAriAwQYACBBiAYBkAYI&sclient=gws-wiz-serp
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../_utils/appError");
const prisma_1 = require("../../_utils/prisma");
const getTasks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw new appError_1.AppError('Error: getTasks', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid userId', true);
    return yield prisma_1.prisma.task.findMany({
        where: {
            creatorId: userId,
        },
    });
});
const createNewTask = (newTaskData, creatorId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!newTaskData)
        throw new appError_1.AppError('Error: createNewTask', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid task creation payload', true);
    return yield prisma_1.prisma.task.create({
        data: Object.assign(Object.assign({}, newTaskData), { creator: {
                connect: {
                    id: creatorId
                }
            } }),
    });
});
const getTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!taskId)
        throw new appError_1.AppError('Error: getTask', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid taskId', true);
    return yield prisma_1.prisma.task.findUniqueOrThrow({
        where: {
            id: taskId,
        },
    });
});
const updateTask = (taskId, newTaskData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!taskId)
        throw new appError_1.AppError('Error: updateTask', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid taskId', true);
    if (!newTaskData)
        throw new appError_1.AppError('Error: updateTask', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid task update payload', true);
    return yield prisma_1.prisma.task.update({
        where: {
            id: taskId,
        },
        data: newTaskData,
    });
});
const deleteTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!taskId)
        throw new appError_1.AppError('Error: deleteTask', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid taskId', true);
    // TODO: Check if authorized for deletion: creator/assignee/access
    const task = yield prisma_1.prisma.task.findUniqueOrThrow({
        where: {
            id: taskId,
        }
    });
    if (task) {
        return yield prisma_1.prisma.task.delete({
            where: {
                id: taskId,
            }
        });
    }
    return task;
});
exports.tasksService = {
    getTasks,
    createNewTask,
    getTask,
    updateTask,
    deleteTask,
};
//# sourceMappingURL=service.js.map