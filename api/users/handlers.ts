// Services as the interface for route to service while converting cleaning req/res
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { usersService } from '@users/service'

const getUserByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await usersService.getUser(req.params.id)
        return res
            .status(StatusCodes.OK)
            .json(user)
    } catch (e) {
        next(e)
    }
}

const updateUserByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await usersService.updateUser(req.params.id, req.body)
        return res
            .status(StatusCodes.OK)
            .json(user)
    } catch (e) {
        next(e)
    }
}

const deleteUserByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await usersService.deleteUser(req.params.id)
        return res
            .status(StatusCodes.OK)
            .json(user)
    } catch (e) {
        next(e)
    }
}

export const usersHandler = {
    getUserByUserId,
    updateUserByUserId,
    deleteUserByUserId,
}