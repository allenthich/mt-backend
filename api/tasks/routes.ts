// Entry endpoints
import express from 'express'

import { validate } from '@utils/validator'
import { tasksHandler } from '@api/tasks/handlers'
import { loadSchema } from '@utils/loadSchema'
import { tasksSchema } from '@tasks/schema'

const tasksRouter = express.Router()

// TOOD: Investigate prev API call retaining schema validation middleware unless explicitly overwritten

tasksRouter
    .get('/',       
        validate({
            body: loadSchema(tasksSchema, []),
            params: loadSchema(tasksSchema, [])
        }),
        tasksHandler.getTasksByUserId
    )
    .post('/',      
        validate({
            body: loadSchema(tasksSchema, [ 'body' ]),
            params: loadSchema(tasksSchema, [])
        }),
        tasksHandler.createNewTask
    )
    .get('/:id',    
        validate({
            body: loadSchema(tasksSchema, []),
            params: loadSchema(tasksSchema, [ 'id '])
        }),
        tasksHandler.getTaskByTaskId
    )
    .put('/:id',    
        validate({
            body: loadSchema(tasksSchema, []),
            params: loadSchema(tasksSchema, [ 'id' ])
        }),
        tasksHandler.updateTaskByTaskId
    )
    .delete('/:id', 
        validate({
            body: loadSchema(tasksSchema, []),
            params: loadSchema(tasksSchema, [ 'id '])
        }),
        tasksHandler.deleteTaskByTaskId
    )

export {
    tasksRouter
}