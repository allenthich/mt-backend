"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtPayloadSchema = exports.authSchema = void 0;
exports.authSchema = {
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
        }
    },
    "required": ["email", "password"],
    "additionalProperties": false
};
exports.jwtPayloadSchema = {
    "type": "object",
    "properties": {
        "sub": { "type": "string" },
        "iss": { "type": "string" },
        "exp": { "type": "integer" },
        "iat": { "type": "integer" },
        "userId": { "type": "string" },
        "email": { "type": "string" }
    },
    "required": ["sub", "iss", "exp"],
    "additionalProperties": false
};
//# sourceMappingURL=schema.js.map