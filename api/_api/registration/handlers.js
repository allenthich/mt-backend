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
exports.registrationHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const service_1 = require("../../_api/registration/service");
const registerNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service_1.registrationService.createUser(req.body);
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (e) {
        next(e);
    }
});
exports.registrationHandler = {
    registerNewUser,
};
//# sourceMappingURL=handlers.js.map