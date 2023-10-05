// Services as the interface for route to service while converting cleaning req/res
import UserService from '@users/service'

import { Request, Response } from 'express'

const getUsers = async (req: Request, res: Response) => {
    const users = UserService.getUsers()
    return res.json(users)
}

const getUser = async (req: Request, res: Response) => {
    const users = UserService.getUsers()
    return res.json(users)
}

export default {
    getUser,
    getUsers
}