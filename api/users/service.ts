// Strictly handles database interaction

import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getUsers = async () => {
    return await prisma.user.findMany()
}

const getUser = async (id: string) => {
    return await prisma.user
        .findUnique({
            where: {
                id: id,
            },
        })
        .tasks({
            where: { completed: false },
        })
}

export default {
    getUser,
    getUsers
}
