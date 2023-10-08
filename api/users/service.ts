// Strictly handles database interaction

import { StatusCodes } from 'http-status-codes'
import { Prisma, PrismaClient } from '@prisma/client'
import { AppError } from '@utils/appError'

const prisma = new PrismaClient()

const getUser = async (userId: string) => {
    if (!userId) throw new AppError('Error: getUser', StatusCodes.BAD_REQUEST, 'Invalid userId', true)
    return await prisma.user
        .findUniqueOrThrow({
            where: {
                id: userId,
            },
        })
}

const updateUser = async (userId: string, newUserData: Prisma.UserUpdateInput) => {
    if (!userId) throw new AppError('Error: updateUser', StatusCodes.BAD_REQUEST, 'Invalid userId', true)
    if (!newUserData) throw new AppError('Error: updateUser', StatusCodes.BAD_REQUEST, 'Invalid user update payload', true)

    return await prisma.user.update({
        where: {
            id: userId,
        },
        data: newUserData,
    })
}

const deleteUser = async (userId: string) => {
    if (!userId) throw new AppError('Error: deleteUser', StatusCodes.BAD_REQUEST, 'Invalid userId', true)
    // TODO: Check if authorized for deletion
    return await prisma.user.delete({
        where: {
            id: userId,
        }
    })
}

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

export const usersService = {
    getUser,
    updateUser,
    deleteUser,
    createUser,
}
