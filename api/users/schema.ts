import { AllowedSchema } from 'express-json-validator-middleware'

export const usersSchema: AllowedSchema = {
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
}