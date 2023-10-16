"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksSchema = void 0;
exports.tasksSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": [
                "string",
                "null"
            ]
        },
        "status": {
            "type": "string",
            "default": "TODO",
            "enum": [
                "TODO",
                "IN_PROGRESS",
                "COMPLETED"
            ]
        },
        "priority": {
            "type": "string",
            "default": "LOW",
            "enum": [
                "LOW",
                "MEDIUM",
                "HIGH"
            ]
        },
        "dueDate": {
            "type": [
                "string",
                "null"
            ],
            "format": "date-time"
        },
        "assigneeId": {
            "type": [
                "string",
                "null"
            ]
        },
        "creationDate": {
            "type": [
                "string",
                "null"
            ],
            "format": "date-time"
        },
        "lastModifiedDate": {
            "type": [
                "string",
                "null"
            ],
            "format": "date-time"
        },
        "completionDate": {
            "type": [
                "string",
                "null"
            ],
            "format": "date-time"
        },
        "archived": {
            "type": "boolean",
            "default": false
        }
    },
    "additionalProperties": false
};
//# sourceMappingURL=schema.js.map