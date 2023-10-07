import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { logger } from '@utils/logger'
import { AppError } from '@utils/appError'

class ErrorHandler {
    public async handleError(err: AppError, res: Response): Promise<void> {
        logger.error(err)
        // TODO: Monitor metrics, graceful shutdown, clean up
        // await fireMonitoringMetric(error)
        // await crashIfUntrustedErrorOrSendResponse(error, res)

        if (err.isOperational) {
          res
            .status(err.httpCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .send(err.message)
        } else {
          // Graceful shutdown
        }

    }
  }
  
export const errorHandler = new ErrorHandler()