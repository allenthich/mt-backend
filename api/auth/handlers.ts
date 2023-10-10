// Services as the interface for route to service while converting cleaning req/res
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { loginService } from '@auth/service'
import { decodeJWTTokenUserId, verifyJWTToken } from '@utils/jwtHandler'

const validateUserJWTToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let response = {
            validToken: false
        }

        const userId = decodeJWTTokenUserId(req.headers.authorization)
        const decoded = verifyJWTToken(req.headers.authorization)
        // Compare server side decoded JWT token with request user id
        if (typeof decoded === "string") {
            response.validToken = userId === decoded
        } else {
            response.validToken = userId === decoded.userId
        }

        const responseStatus = response.validToken
            ? StatusCodes.OK
            : StatusCodes.UNAUTHORIZED
            
        return res.status(responseStatus).json(response)
    } catch (e) {
        next(e)
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = await loginService.loginUser(req.body)
        return res.status(StatusCodes.OK).json(credentials)
    } catch (e) {
        next(e)
    }
}

export const authHandler = {
    validateUserJWTToken,
    loginUser,
}