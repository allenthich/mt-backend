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
exports.authHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const service_1 = require("../../_api/auth/service");
const jwtHandler_1 = require("../../_utils/jwtHandler");
const validateUserJWTToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = {
            validToken: false
        };
        const userId = (0, jwtHandler_1.decodeJWTTokenUserId)(req.headers.authorization);
        const decoded = (0, jwtHandler_1.verifyJWTToken)(req.headers.authorization);
        // Compare server side decoded JWT token with request user id
        if (typeof decoded === "string") {
            response.validToken = userId === decoded;
        }
        else {
            response.validToken = userId === decoded.userId;
        }
        const responseStatus = response.validToken
            ? http_status_codes_1.StatusCodes.OK
            : http_status_codes_1.StatusCodes.UNAUTHORIZED;
        return res.status(responseStatus).json(response);
    }
    catch (e) {
        next(e);
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = yield service_1.loginService.loginUser(req.body);
        return res.status(http_status_codes_1.StatusCodes.OK).json(credentials);
    }
    catch (e) {
        next(e);
    }
});
exports.authHandler = {
    validateUserJWTToken,
    loginUser,
};
//# sourceMappingURL=handlers.js.map