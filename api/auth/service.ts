import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { Prisma, PrismaClient } from '@prisma/client'
import { AppError } from '@utils/appError'
import { generateJWTToken } from '@utils/jwtHandler'

const prisma = new PrismaClient()

const compareUserCredentials = async (existingUser: Prisma.UserCreateInput, unauthorizedUser: Prisma.UserCreateInput) => {
    return await bcrypt.compare(unauthorizedUser.password, existingUser.password)
}

const loginUser = async (unauthorizedUser: Prisma.UserCreateInput) => {
    if (!unauthorizedUser) throw new AppError('Error: loginUser', StatusCodes.BAD_REQUEST, 'Invalid login payload', true)
    const existingUser = await prisma.user
        .findUniqueOrThrow({
            where: {
                email: unauthorizedUser.email,
            },
        })
    if (!existingUser) throw new AppError('Error: loginUser', StatusCodes.BAD_REQUEST, 'Invalid login credentials', true)
    
    // Compare password hashs
    const match = await compareUserCredentials(existingUser, unauthorizedUser)
    if (!match) throw new AppError('Error: loginUser', StatusCodes.BAD_REQUEST, 'Invalid login credentials', true)
    
    // Generate JWT Token
    const token = generateJWTToken(existingUser.id, existingUser.email)

    return { existingUser, token }
}

export const loginService = {
    loginUser,
}
