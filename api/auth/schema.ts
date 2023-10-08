import { AllowedSchema } from 'express-json-validator-middleware'

export const authSchema: AllowedSchema = {
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "password": {
      "type": "string",
      "minLength": 8
    }
  },
  "required": ["email", "password", "token"],
  "additionalProperties": false
}

export const jwtPayloadSchema: AllowedSchema = {
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
}