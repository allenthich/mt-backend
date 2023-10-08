// TODO: Revisit global type declaration unrecognized
/// <reference path="../types/express/index.d.ts" />

import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '@utils/appError'
import { jwtPayloadSchema } from '@api/auth/schema'
import { validator } from '@utils/validator'

// Validate decoded payload against the expected JWT Schema
const validateJWT = (decodedToken: string | JwtPayload): Boolean => {
  const validate = validator.ajv.compile(jwtPayloadSchema)
  const isValid = validate(decodedToken)

  if (!isValid) {
    throw new AppError('Error: validateJWT', StatusCodes.UNAUTHORIZED, 'Authentication failed. Invalid payload schema.', true)
  }
  return isValid
}

// Define a middleware function to authenticate users
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request headers
  const token = req.header('Authorization')

  // Check if a token is provided
  if (!token) {
    throw new AppError('Error: authenticateUser', StatusCodes.UNAUTHORIZED, 'Authentication failed. Token not provided.', true)
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret)

    //　Validate decoded payload against JWT Schema
    validateJWT(decoded)

    // Attach the decoded user information to the request object
    req.user = decoded

    // Continue processing the request
    next()
  } catch (error) {
    // TODO: Handle expired signature error 
    // error.name === 'TokenExpiredError'

    // Handle token verification errors
    throw new AppError('Error: authenticateUser', StatusCodes.UNAUTHORIZED, 'Authentication failed. Invalid token.', true)
  }
}
