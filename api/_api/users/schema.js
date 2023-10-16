"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSchema = void 0;
exports.usersSchema = {
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
};
//# sourceMappingURL=schema.js.map