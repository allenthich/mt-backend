"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
// Entry endpoints
const express_1 = __importDefault(require("express"));
const validator_1 = require("../../_utils/validator");
const handlers_1 = require("../../_api/auth/handlers");
const loadSchema_1 = require("../../_utils/loadSchema");
const schema_1 = require("../../_api/auth/schema");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter
    .post('/', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.authSchema, [])
}), handlers_1.authHandler.validateUserJWTToken)
    .post('/login', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.authSchema, ['email', 'password'])
}), handlers_1.authHandler.loginUser);
//# sourceMappingURL=routes.js.map