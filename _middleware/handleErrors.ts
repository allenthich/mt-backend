import { errorHandler } from '_utils/errorHandler'

import { Request, Response, NextFunction } from 'express'
import { AppError } from '_utils/appError'

export const handleErrors = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res, next) // Delegate to centralized error handler
}