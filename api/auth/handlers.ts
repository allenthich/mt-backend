// Services as the interface for route to service while converting cleaning req/res
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { loginService } from '@auth/service'

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = await loginService.loginUser(req.body)
        return res
            .status(StatusCodes.OK)
            .json(credentials)
    } catch (e) {
        next(e)
    }
}

export const authHandler = {
    loginUser,
}