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
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_json_validator_middleware_1 = require("express-json-validator-middleware");
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = require("../_utils/logger");
const appError_1 = require("../_utils/appError");
const library_1 = require("@prisma/client/runtime/library");
class ErrorHandler {
    handleUnknownError(err) {
        logger_1.logger.error(err);
        process.exit(1); // Terminate the application (1 indicates an error)
    }
    handleError(err, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logger.error(err);
            // TODO: Monitor metrics, graceful shutdown, clean up
            // await fireMonitoringMetric(error)
            // await crashIfUntrustedErrorOrSendResponse(error, res)
            if (this.isTrustedError(err)) {
                let httpErrorCode = err.httpCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
                const isValidationError = err instanceof express_json_validator_middleware_1.ValidationError;
                const isPrismaError = err instanceof library_1.PrismaClientKnownRequestError;
                let errorDetails = err.message;
                if (isValidationError) {
                    errorDetails = err.validationErrors;
                    httpErrorCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
                }
                else if (isPrismaError) {
                    httpErrorCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
                }
                res
                    .status(httpErrorCode)
                    .json(errorDetails);
                next();
            }
            else {
                // Graceful shutdown, do we need next here?
                process.exit(1); // Terminate the application (1 indicates an error)
            }
        });
    }
    isTrustedError(error) {
        if (error instanceof appError_1.AppError) {
            return error.isOperational;
        }
        else if (error instanceof express_json_validator_middleware_1.ValidationError) {
            return true;
        }
        else if (error instanceof library_1.PrismaClientKnownRequestError) {
            return true;
        }
        else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return true;
        }
        return false;
    }
}
exports.errorHandler = new ErrorHandler();
//# sourceMappingURL=errorHandler.js.map