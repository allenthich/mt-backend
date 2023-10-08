// Services as the interface for route to service while converting cleaning req/res
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { registrationService } from '@registration/service'

const registerNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await registrationService.createUser(req.body)
        return res
            .status(StatusCodes.OK)
            .json(task)
    } catch (e) {
        next(e)
    }
}

export const registrationHandler = {
    registerNewUser,
}