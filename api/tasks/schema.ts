import { AllowedSchema } from 'express-json-validator-middleware'

export const taskIdSchema: AllowedSchema = {
  "type": "object",
  "properties": {
    "id": { "type": "string" },
  },
  "required": ["id"]
}

export const createNewTaskSchema: AllowedSchema = {
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "title": { "type": "string" },
    "description": { "type": "string" },
    "status": {
      "type": "string",
      "enum": ["To-Do", "In Progress", "Completed"]
    },
    "priority": { "type": "string", "enum": ["Low", "Medium", "High"] },
    "dueDate": { "type": "string", "format": "date-time" },
    "assigneeId": { "type": "string" },
    "creatorId": { "type": "string" },
    "creationDate": { "type": "string", "format": "date-time" },
    "lastModifiedDate": { "type": "string", "format": "date-time" },
    "completionDate": { "type": "string", "format": "date-time" },
    "archived": { "type": "boolean" }
  },
  "required": ["title", "creatorId"]
}

export const updateTaskByTaskIdSchema: AllowedSchema = {
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "title": { "type": "string" },
    "description": { "type": "string" },
    "status": {
      "type": "string",
      "enum": ["To-Do", "In Progress", "Completed"]
    },
    "priority": { "type": "string", "enum": ["Low", "Medium", "High"] },
    "dueDate": { "type": "string", "format": "date-time" },
    "assigneeId": { "type": "string" },
    "creatorId": { "type": "string" },
    "creationDate": { "type": "string", "format": "date-time" },
    "lastModifiedDate": { "type": "string", "format": "date-time" },
    "completionDate": { "type": "string", "format": "date-time" },
    "archived": { "type": "boolean" }
  },
  "required": ["id"]
}