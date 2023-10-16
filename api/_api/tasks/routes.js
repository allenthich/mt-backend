"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
// Entry endpoints
const express_1 = __importDefault(require("express"));
const validator_1 = require("../../_utils/validator");
const handlers_1 = require("../../_api/tasks/handlers");
const loadSchema_1 = require("../../_utils/loadSchema");
const schema_1 = require("../../_api/tasks/schema");
const tasksRouter = express_1.default.Router();
exports.tasksRouter = tasksRouter;
// TOOD: Investigate prev API call retaining schema validation middleware unless explicitly overwritten
tasksRouter
    .get('/', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.tasksSchema, []),
    params: (0, loadSchema_1.loadSchema)(schema_1.tasksSchema, [])
}), handlers_1.tasksHandler.getTasksByUserId)
    .post('/', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.tasksSchema, ['body']),
    params: (0, loadSchema_1.loadSchema)(schema_1.tasksSchema, [])
}), handlers_1.tasksHandler.createNewTask)
    .get('/:id', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.tasksSchema, []),
    params: (0, loadSchema_1.loadSchema)(schema_1.tasksSchema, ['id '])
}), handlers_1.tasksHandler.getTaskByTaskId)
    .put('/:id', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.tasksSchema, []),
    params: (0, loadSchema_1.loadSchema)(schema_1.tasksSchema, ['id'])
}), handlers_1.tasksHandler.updateTaskByTaskId)
    .delete('/:id', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.tasksSchema, []),
    params: (0, loadSchema_1.loadSchema)(schema_1.tasksSchema, ['id '])
}), handlers_1.tasksHandler.deleteTaskByTaskId);
//# sourceMappingURL=routes.js.map