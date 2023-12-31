// Services as the interface for route to service while converting cleaning req/res
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { registrationService } from '_api/registration/service'

const registerNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await registrationService.createUser(req.body)
        return res.status(StatusCodes.OK).json(user)
    } catch (e) {
        next(e)
    }
}

export const registrationHandler = {
    registerNewUser,
}