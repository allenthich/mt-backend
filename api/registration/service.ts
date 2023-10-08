// Strictly handles database interaction

import { StatusCodes } from 'http-status-codes'
import { Prisma, PrismaClient } from '@prisma/client'
import { AppError } from '@utils/appError'

const prisma = new PrismaClient()

const createUser = async (userData: Prisma.UserCreateInput) => {
    if (!userData) throw new AppError('Error: createUser', StatusCodes.BAD_REQUEST, 'Invalid user creation payload', true)

    const existingUser = await prisma.user
    .findUnique({
        where: {
            email: userData.email,
        },
    })
    if (existingUser) throw new AppError('Error: createUser', StatusCodes.BAD_REQUEST, 'User already exists!', true)

    // Pass 'user' object into query
    return await prisma.user.create({ data: userData })
}

export const registrationService = {
    createUser,
}
