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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../_utils/appError");
const jwtHandler_1 = require("../../_utils/jwtHandler");
const prisma_1 = require("../../_utils/prisma");
const compareUserCredentials = (existingUser, unauthorizedUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(unauthorizedUser.password, existingUser.password);
});
const loginUser = (unauthorizedUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!unauthorizedUser)
        throw new appError_1.AppError('Error: loginUser', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid login payload', true);
    const existingUser = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: unauthorizedUser.email,
        },
    });
    if (!existingUser)
        throw new appError_1.AppError('Error: loginUser', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid login credentials', true);
    // Compare password hashs
    const match = yield compareUserCredentials(existingUser, unauthorizedUser);
    if (!match)
        throw new appError_1.AppError('Error: loginUser', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid login credentials', true);
    // Generate JWT Token
    const token = (0, jwtHandler_1.generateJWTToken)(existingUser.id, existingUser.email);
    const { id, email, name } = existingUser;
    return { id, email, name, token };
});
exports.loginService = {
    loginUser,
};
//# sourceMappingURL=service.js.map