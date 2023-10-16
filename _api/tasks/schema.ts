import { AllowedSchema } from 'express-json-validator-middleware'

export const tasksSchema: AllowedSchema = {
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
}