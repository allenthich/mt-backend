import { AllowedSchema } from 'express-json-validator-middleware'
import { JwtPayload } from 'jsonwebtoken'

export {}

declare global {
  namespace Express {
    export interface Request {
      schema?: AllowedSchema
      user?: string | JwtPayload
    }
  }
}