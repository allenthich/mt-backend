// Strictly handles database interaction

import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { Prisma, PrismaClient } from '@prisma/client'
import { AppError } from '@utils/appError'
import { generateJWTToken } from '@utils/jwtHandler'

const prisma = new PrismaClient()

const createUser = async (userData: Prisma.UserCreateInput) => {
    if (!userData) throw new AppError('Error: createUser', StatusCodes.BAD_REQUEST, 'Invalid user creation payload', true)

    const existingUser = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    })
    if (existingUser) throw new AppError('Error: createUser', StatusCodes.BAD_REQUEST, 'User already exists!', true)

    const passwordSalt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(userData.password, passwordSalt)

    // Pass 'user' object into query
    const user = await prisma.user.create({
        data: {
            ...userData,
            password: passwordHash,
        }
    })
    
    // Generate JWT Token
    const token = generateJWTToken(user.id, user.email)

    return { user, token }
}

export const registrationService = {
    createUser,
}
