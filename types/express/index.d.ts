import { AllowedSchema } from 'express-json-validator-middleware'

export {}

declare global {
  namespace Express {
    export interface Request {
      schema?: AllowedSchema
    }
  }
}