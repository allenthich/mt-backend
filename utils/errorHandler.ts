import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from 'express-json-validator-middleware'

import { logger } from '@utils/logger'
import { AppError } from '@utils/appError'

class ErrorHandler {
    public async handleError(err: AppError, res: Response, next: NextFunction): Promise<void> {
        logger.error(err)
        // TODO: Monitor metrics, graceful shutdown, clean up
        // await fireMonitoringMetric(error)
        // await crashIfUntrustedErrorOrSendResponse(error, res)

        if (err.isOperational) {
          const isValidationError = err instanceof ValidationError
          const errorDetails = isValidationError ? err.validationErrors : err.message
          res
            .status(err.httpCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorDetails)
          next()
        } else {
          // Graceful shutdown, do we need next here?
          process.exit(1)
        }

    }
  }
  
export const errorHandler = new ErrorHandler()