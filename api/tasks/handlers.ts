// Services as the interface for route to service while converting cleaning req/res
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { tasksService } from '@tasks/service'
import { AppError } from '@utils/appError'

const getTasksByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.id) throw new AppError('Error: getTasksByUserId', StatusCodes.BAD_REQUEST, 'Invalid userId', true)
        const tasks = await tasksService.getTasks(req.body.id)
        return res
            .status(StatusCodes.OK)
            .json(tasks)
    } catch (e) {
        next(e)
    }
}

const createNewTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.id) throw new AppError('Error: createNewTask', StatusCodes.BAD_REQUEST, 'Invalid id', true)
        const task = await tasksService.createNewTask(req.body.id)
        return res
            .status(StatusCodes.OK)
            .json(task)
    } catch (e) {
        next(e)
    }
}

const getTaskByTaskId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.params.id) throw new AppError('Error: getTaskByTaskId', StatusCodes.BAD_REQUEST, 'Invalid taskId', true)
        const task = await tasksService.getTask(req.params.id)
        return res
            .status(StatusCodes.OK)
            .json(task)
    } catch (e) {
        next(e)
    }
}

const updateTaskByTaskId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.params.id) throw new AppError('Error: updateTaskByTaskId', StatusCodes.BAD_REQUEST, 'Invalid taskId', true)
        const task = await tasksService.updateTask(req.params.id, req.body)
        return res
            .status(StatusCodes.OK)
            .json(task)
    } catch (e) {
        next(e)
    }
}

const deleteTaskByTaskId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.params.id) throw new AppError('Error: deleteTaskByTaskId', StatusCodes.BAD_REQUEST, 'Invalid taskId', true)
        const task = await tasksService.deleteTask(req.params.id)
        return res
            .status(StatusCodes.OK)
            .json(task)
    } catch (e) {
        next(e)
    }
}

export const tasksHandler = {
    getTasksByUserId,
    createNewTask,
    getTaskByTaskId,
    updateTaskByTaskId,
    deleteTaskByTaskId,
}