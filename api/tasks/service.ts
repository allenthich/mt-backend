// Strictly handles database interaction
// TODO: Handle case for incoming prisma errors 
// https://www.google.com/search?q=prisma+throw+error+express+js&sca_esv=571399955&sxsrf=AM9HkKlTJQrGoZ0kMVb0Uzl-qdw6mrgNbA%3A1696634344895&ei=6JUgZcGrNsXK1e8P-Nm-gAI&ved=0ahUKEwjBv8O7x-KBAxVFZfUHHfisDyAQ4dUDCBA&uact=5&oq=prisma+throw+error+express+js&gs_lp=Egxnd3Mtd2l6LXNlcnAiHXByaXNtYSB0aHJvdyBlcnJvciBleHByZXNzIGpzMgUQIRigATIFECEYoAEyBRAhGKABMgUQIRigAUiJFFC1BFiYE3ACeAGQAQCYAYIBoAH2CaoBBDIuMTC4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIGEAAYFhgewgIIEAAYigUYhgPCAggQIRgWGB4YHcICBxAhGKABGAriAwQYACBBiAYBkAYI&sclient=gws-wiz-serp

import { StatusCodes } from 'http-status-codes'
import { Prisma, PrismaClient, Task } from '@prisma/client'
import { AppError } from '@utils/appError'

const prisma = new PrismaClient()

const getTasks = async (userId: string): Promise<Array<Task>> => {
    if (!userId) throw new AppError('Error: getTasks', StatusCodes.BAD_REQUEST, 'Invalid userId', true)

    return await prisma.task
        .findMany({
            where: {
                creatorId: userId,
            },
        })
}

const createNewTask = async (newTaskData: Prisma.TaskCreateInput, creatorId: string) => {
    if (!newTaskData) throw new AppError('Error: createNewTask', StatusCodes.BAD_REQUEST, 'Invalid task creation payload', true)

    return await prisma.task.create({
        data: {
            ...newTaskData,
            creator: {
                connect: {
                    id: creatorId
                }
            }
        },
    })
}

const getTask = async (taskId: string) => {
    if (!taskId) throw new AppError('Error: getTask', StatusCodes.BAD_REQUEST, 'Invalid taskId', true)
    return await prisma.task
        .findUniqueOrThrow({
            where: {
                id: taskId,
            },
        })
}

const updateTask = async (taskId: string, newTaskData: Prisma.TaskUpdateInput) => {
    if (!taskId) throw new AppError('Error: updateTask', StatusCodes.BAD_REQUEST, 'Invalid taskId', true)
    if (!newTaskData) throw new AppError('Error: updateTask', StatusCodes.BAD_REQUEST, 'Invalid task update payload', true)

    return await prisma.task.update({
        where: {
            id: taskId,
        },
        data: newTaskData,
    })
}

const deleteTask = async (taskId: string) => {
    if (!taskId) throw new AppError('Error: deleteTask', StatusCodes.BAD_REQUEST, 'Invalid taskId', true)
    // TODO: Check if authorized for deletion: creator/assignee/access
    const task = await prisma.task.findUniqueOrThrow({
        where: {
            id: taskId,
        }
    })
    if (task) {
        return await prisma.task.delete({
            where: {
                id: taskId,
            }
        })
    }
    return task
}

export const tasksService = {
    getTasks,
    createNewTask,
    getTask,
    updateTask,
    deleteTask,
}
