import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'express-json-validator-middleware'

import { logger } from '@utils/logger'
import { AppError } from '@utils/appError'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

class ErrorHandler {
    public handleUnknownError(err: Error): void {
      logger.error(err)
      process.exit(1) // Terminate the application (1 indicates an error)
    }

    public async handleError(err: AppError, res: Response, next: NextFunction): Promise<void> {
      logger.error(err)
      // TODO: Monitor metrics, graceful shutdown, clean up
      // await fireMonitoringMetric(error)
      // await crashIfUntrustedErrorOrSendResponse(error, res)

      if (this.isTrustedError(err)) {
        let httpErrorCode = err.httpCode || StatusCodes.INTERNAL_SERVER_ERROR
        const isValidationError = err instanceof ValidationError
        const isPrismaError = err instanceof PrismaClientKnownRequestError
        let errorDetails: any = err.message

        if (isValidationError) {
          errorDetails =  err.validationErrors
          httpErrorCode = StatusCodes.BAD_REQUEST
        } else if (isPrismaError) {
          httpErrorCode = StatusCodes.BAD_REQUEST
        }

          res
            .status(httpErrorCode)
            .json(errorDetails)
          next()
      } else {
        // Graceful shutdown, do we need next here?
        process.exit(1) // Terminate the application (1 indicates an error)
      }
    }

    public isTrustedError(error: Error) {
      if (error instanceof AppError) {
        return error.isOperational;
      } else if (error instanceof ValidationError) {
        return true
      } else if (error instanceof PrismaClientKnownRequestError) {
        return true
      }
      return false;
    }
  }
  
export const errorHandler = new ErrorHandler()