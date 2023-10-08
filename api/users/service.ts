// TODO: Check API requester is related to acting userId
// Strictly handles database interaction

import { StatusCodes } from 'http-status-codes'
import { Prisma } from '@prisma/client'
import { AppError } from '@utils/appError'
import { prisma } from '@utils/prisma'

const getUser = async (userId: string) => {
    if (!userId) throw new AppError('Error: getUser', StatusCodes.BAD_REQUEST, 'Invalid userId', true)
    
    return await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        select: {
            email: true,
            name: true,
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
        select: {
            email: true,
            name: true,
        },
    })
}

const deleteUser = async (userId: string) => {
    if (!userId) throw new AppError('Error: deleteUser', StatusCodes.BAD_REQUEST, 'Invalid userId', true)
    // TODO: Check if authorized for deletion
    return await prisma.user.delete({
        where: {
            id: userId,
        },
        select: {
            email: true,
            name: true,
        },
    })
}

export const usersService = {
    getUser,
    updateUser,
    deleteUser,
}
