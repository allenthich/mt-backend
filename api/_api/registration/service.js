"use strict";
// Strictly handles database interaction
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
exports.registrationService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../_utils/appError");
const jwtHandler_1 = require("../../_utils/jwtHandler");
const prisma_1 = require("../../_utils/prisma");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userData)
        throw new appError_1.AppError('Error: createUser', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid user creation payload', true);
    const existingUser = yield prisma_1.prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    });
    if (existingUser)
        throw new appError_1.AppError('Error: createUser', http_status_codes_1.StatusCodes.BAD_REQUEST, 'User already exists!', true);
    const passwordSalt = yield bcrypt_1.default.genSalt();
    const passwordHash = yield bcrypt_1.default.hash(userData.password, passwordSalt);
    // Pass 'user' object into query
    const user = yield prisma_1.prisma.user.create({
        data: Object.assign(Object.assign({}, userData), { password: passwordHash })
    });
    // Generate JWT Token
    const token = (0, jwtHandler_1.generateJWTToken)(user.id, user.email);
    const { id, email, name } = user;
    return { id, email, name, token };
});
exports.registrationService = {
    createUser,
};
//# sourceMappingURL=service.js.map