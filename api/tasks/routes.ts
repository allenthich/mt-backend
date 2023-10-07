// Entry endpoints
import express from 'express'

import { validate } from '@utils/validator'
import { tasksHandler } from '@api/tasks/handlers'
import {
    taskIdSchema,
    createNewTaskSchema,
    updateTaskByTaskIdSchema
} from '@api/tasks/schema'

const tasksRouter = express.Router()

tasksRouter
    .get('/',       validate({ body: taskIdSchema }), tasksHandler.getTasksByUserId)
    .post('/',      validate({ body: createNewTaskSchema, params: taskIdSchema }), tasksHandler.createNewTask)
    .get('/:id',    validate({ params: taskIdSchema }), tasksHandler.getTaskByTaskId)
    .put('/:id',    validate({ body: updateTaskByTaskIdSchema, params: taskIdSchema }), tasksHandler.updateTaskByTaskId)
    .delete('/:id', validate({ params: taskIdSchema }), tasksHandler.deleteTaskByTaskId)

export {
    tasksRouter
}