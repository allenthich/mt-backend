import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { Prisma, PrismaClient } from '@prisma/client'
import { AppError } from '_utils/appError'
import { generateJWTToken } from '_utils/jwtHandler'
import { prisma } from '_utils/prisma'

const compareUserCredentials = async (existingUser: Prisma.UserCreateInput, unauthorizedUser: Prisma.UserCreateInput) => {
    return await bcrypt.compare(unauthorizedUser.password, existingUser.password)
}

const loginUser = async (unauthorizedUser: Prisma.UserCreateInput) => {
    if (!unauthorizedUser) throw new AppError('Error: loginUser', StatusCodes.BAD_REQUEST, 'Invalid login payload', true)
    
    const existingUser = await prisma.user.findUniqueOrThrow({
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

    const { id, email, name } = existingUser
    return { id, email, name, token }
}

export const loginService = {
    loginUser,
}
