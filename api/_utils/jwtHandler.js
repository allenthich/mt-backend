"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJWTTokenUserId = exports.verifyJWTToken = exports.generateJWTToken = exports.validateJWTToken = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_1 = require("../_api/auth/schema");
const appError_1 = require("../_utils/appError");
const validator_1 = require("../_utils/validator");
// Validate decoded payload against the expected JWT Schema
const validateJWTToken = (decodedToken) => {
    const validate = validator_1.validator.ajv.compile(schema_1.jwtPayloadSchema);
    const isValid = validate(decodedToken);
    if (!isValid) {
        throw new appError_1.AppError('Error: validateJWT', http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Authentication failed. Invalid payload schema.', true);
    }
    return isValid;
};
exports.validateJWTToken = validateJWTToken;
const generateJWTToken = (userId, email) => {
    const token = jsonwebtoken_1.default.sign({ userId, email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '14d',
        subject: "AccessToken",
        issuer: process.env.JWT_ISSUER
    });
    return token;
};
exports.generateJWTToken = generateJWTToken;
const verifyJWTToken = (token) => {
    if (!token)
        throw new appError_1.AppError('Error: verifyJWTToken', http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Authentication failed. Invalid token.', true);
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
};
exports.verifyJWTToken = verifyJWTToken;
const decodeJWTTokenUserId = (token) => {
    if (!token)
        throw new appError_1.AppError('Error: verifyJWTToken', http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Authentication failed. Invalid token.', true);
    const decoded = verifyJWTToken(token);
    if (typeof decoded === 'string')
        return decoded;
    return decoded.userId;
};
exports.decodeJWTTokenUserId = decodeJWTTokenUserId;
//# sourceMappingURL=jwtHandler.js.map