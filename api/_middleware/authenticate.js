"use strict";
// TODO: Revisit global type declaration unrecognized
/// <reference path="../_types/express/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../_utils/appError");
const jwtHandler_1 = require("../_utils/jwtHandler");
// Define a middleware function to authenticate users
const authenticateUser = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization');
    // Check if a token is provided
    if (!token) {
        throw new appError_1.AppError('Error: authenticateUser', http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Authentication failed. Token not provided.', true);
    }
    try {
        // Verify the token using your secret key
        const decoded = (0, jwtHandler_1.verifyJWTToken)(token);
        //　Validate decoded payload against JWT Schema
        (0, jwtHandler_1.validateJWTToken)(decoded);
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Continue processing the request
        next();
    }
    catch (error) {
        // TODO: Handle expired signature error 
        // error.name === 'TokenExpiredError'
        // Handle token verification errors
        throw new appError_1.AppError('Error: authenticateUser', http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Authentication failed. Invalid token.', true);
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authenticate.js.map