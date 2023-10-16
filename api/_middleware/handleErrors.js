"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const errorHandler_1 = require("../_utils/errorHandler");
const handleErrors = (err, req, res, next) => {
    errorHandler_1.errorHandler.handleError(err, res, next); // Delegate to centralized error handler
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=handleErrors.js.map