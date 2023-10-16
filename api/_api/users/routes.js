"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
// Entry endpoints
const express_1 = __importDefault(require("express"));
const validator_1 = require("../../_utils/validator");
const handlers_1 = require("../../_api/users/handlers");
const schema_1 = require("../../_api/users/schema");
const loadSchema_1 = require("../../_utils/loadSchema");
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
usersRouter
    .get('/:id', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.usersSchema, []),
    params: (0, loadSchema_1.loadSchema)(schema_1.usersSchema, ['id'])
}), handlers_1.usersHandler.getUserByUserId)
    .put('/:id', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.usersSchema, []),
    params: (0, loadSchema_1.loadSchema)(schema_1.usersSchema, ['id'])
}), handlers_1.usersHandler.updateUserByUserId)
    .delete('/:id', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.usersSchema, []),
    params: (0, loadSchema_1.loadSchema)(schema_1.usersSchema, ['id'])
}), handlers_1.usersHandler.deleteUserByUserId);
//# sourceMappingURL=routes.js.map