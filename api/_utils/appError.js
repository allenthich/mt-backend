"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// Centralized error object that derives from Node’s Error
class AppError extends Error {
    constructor(name, httpCode, description, isOperational) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
// client throwing an exception
//   if(user == null)
//       throw new AppError(commonErrors.resourceNotFound, commonHTTPErrors.notFound, 'further explanation', true)
// throw new AppError(errorManagement.commonErrors.InvalidInput, 'Describe here what happened', true);
//# sourceMappingURL=appError.js.map