import { StatusCodes } from 'http-status-codes'
import { Prisma, PrismaClient } from '@prisma/client'
import { AppError } from '@utils/appError'

const prisma = new PrismaClient()

const loginUser = async (credentials: Prisma.UserCreateInput) => {
    if (!credentials) throw new AppError('Error: loginUser', StatusCodes.BAD_REQUEST, 'Invalid login payload', true)
    const existingUser = await prisma.user
        .findUnique({
            where: {
                email: credentials.email,
            },
        })
    if (!existingUser) throw new AppError('Error: loginUser', StatusCodes.BAD_REQUEST, 'Invalid login credentials', true)
    return existingUser
}

export const loginService = {
    loginUser,
}
