"use strict";
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
exports.tasksHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const service_1 = require("../../_api/tasks/service");
const jwtHandler_1 = require("../../_utils/jwtHandler");
const getTasksByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, jwtHandler_1.decodeJWTTokenUserId)(req.headers.authorization);
        const tasks = yield service_1.tasksService.getTasks(userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(tasks);
    }
    catch (e) {
        next(e);
    }
});
const createNewTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, jwtHandler_1.decodeJWTTokenUserId)(req.headers.authorization);
        const task = yield service_1.tasksService.createNewTask(req.body, userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(task);
    }
    catch (e) {
        next(e);
    }
});
const getTaskByTaskId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield service_1.tasksService.getTask(req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).json(task);
    }
    catch (e) {
        next(e);
    }
});
const updateTaskByTaskId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield service_1.tasksService.updateTask(req.params.id, req.body);
        return res.status(http_status_codes_1.StatusCodes.OK).json(task);
    }
    catch (e) {
        next(e);
    }
});
const deleteTaskByTaskId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield service_1.tasksService.deleteTask(req.params.id);
        return res.status(http_status_codes_1.StatusCodes.OK).json(task);
    }
    catch (e) {
        next(e);
    }
});
exports.tasksHandler = {
    getTasksByUserId,
    createNewTask,
    getTaskByTaskId,
    updateTaskByTaskId,
    deleteTaskByTaskId,
};
//# sourceMappingURL=handlers.js.map