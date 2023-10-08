// Services as the interface for route to service while converting cleaning req/res
import usersService from '@users/service'

import { Request, Response } from 'express'

const getUsers = async (req: Request, res: Response) => {
    const users = await usersService.getUsers()
    return res.json(users)
}

const getUser = async (req: Request, res: Response) => {
    const users = usersService.getUsers()
    return res.json(users)
}

export const usersHandler = {
    getUser,
    getUsers
}