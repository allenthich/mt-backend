"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationRouter = void 0;
// Entry endpoints
const express_1 = __importDefault(require("express"));
const validator_1 = require("../../_utils/validator");
const handlers_1 = require("../../_api/registration/handlers");
const loadSchema_1 = require("../../_utils/loadSchema");
const schema_1 = require("../../_api/registration/schema");
const registrationRouter = express_1.default.Router();
exports.registrationRouter = registrationRouter;
registrationRouter
    .post('/', (0, validator_1.validate)({
    body: (0, loadSchema_1.loadSchema)(schema_1.registrationSchema, ['email', 'password']),
}), handlers_1.registrationHandler.registerNewUser);
//# sourceMappingURL=routes.js.map