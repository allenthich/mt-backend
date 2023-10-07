import { errorHandler } from '@utils/errorHandler'

import { Request, Response, NextFunction } from 'express'
import { AppError } from '@utils/appError'

export const handleErrors = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res, next) // Delegate to centralized error handler
}