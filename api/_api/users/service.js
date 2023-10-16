"use strict";
// TODO: Check API requester is related to acting userId
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = require("../../_utils/appError");
const prisma_1 = require("../../_utils/prisma");
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw new appError_1.AppError('Error: getUser', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid userId', true);
    return yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        select: {
            email: true,
            name: true,
        },
    });
});
const updateUser = (userId, newUserData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw new appError_1.AppError('Error: updateUser', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid userId', true);
    if (!newUserData)
        throw new appError_1.AppError('Error: updateUser', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid user update payload', true);
    return yield prisma_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: newUserData,
        select: {
            email: true,
            name: true,
        },
    });
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw new appError_1.AppError('Error: deleteUser', http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid userId', true);
    // TODO: Check if authorized for deletion
    return yield prisma_1.prisma.user.delete({
        where: {
            id: userId,
        },
        select: {
            email: true,
            name: true,
        },
    });
});
exports.usersService = {
    getUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=service.js.map