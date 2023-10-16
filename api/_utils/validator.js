"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validator = void 0;
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const express_json_validator_middleware_1 = require("express-json-validator-middleware");
const validator = new express_json_validator_middleware_1.Validator({});
exports.validator = validator;
// Add JSON Schema formats for Ajv e.g. date-time
(0, ajv_formats_1.default)(validator.ajv);
const validate = validator.validate;
exports.validate = validate;
//# sourceMappingURL=validator.js.map