"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const _middleware_1 = require("../_middleware");
const routes_1 = require("../_api/auth/routes");
const routes_2 = require("../_api/registration/routes");
const routes_3 = require("../_api/users/routes");
const routes_4 = require("../_api/tasks/routes");
const expressApp = (0, express_1.default)();
// Pre-router middleware
expressApp.use([
    (0, cors_1.default)(),
    express_1.default.json(),
    (0, compression_1.default)(),
    _middleware_1.pinoHttpLogger
]);
// Routers
expressApp
    .use('/api/auth', routes_1.authRouter)
    .use('/api/registration', routes_2.registrationRouter)
    .use('/api/users', _middleware_1.authenticateUser, routes_3.usersRouter)
    .use('/api/tasks', _middleware_1.authenticateUser, routes_4.tasksRouter);
// Application middleware
expressApp.use([_middleware_1.handleErrors]);
exports.default = expressApp;
//# sourceMappingURL=app.js.map