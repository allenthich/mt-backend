// TODO: Revisit global type declaration unrecognized
/// <reference path="../types/express/index.d.ts" />

import jwt, { Secret } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '@utils/appError'

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

    // Attach the decoded user information to the request object
    req.user = decoded

    // Continue processing the request
    next()
  } catch (error) {
    // Handle token verification errors
    throw new AppError('Error: authenticateUser', StatusCodes.UNAUTHORIZED, 'Authentication failed. Invalid token.', true)
  }
}
