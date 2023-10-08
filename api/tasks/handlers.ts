// Services as the interface for route to service while converting cleaning req/res
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { tasksService } from '@tasks/service'

const getTasksByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        const task = await tasksService.createNewTask(req.body)
        return res
            .status(StatusCodes.OK)
            .json(task)
    } catch (e) {
        next(e)
    }
}

const getTaskByTaskId = async (req: Request, res: Response, next: NextFunction) => {
    try {
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