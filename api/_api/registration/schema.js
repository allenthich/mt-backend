"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationSchema = void 0;
exports.registrationSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "password": {
            "type": "string"
        },
        "name": {
            "type": [
                "string",
                "null"
            ]
        },
    },
    "additionalProperties": false
};
//# sourceMappingURL=schema.js.map