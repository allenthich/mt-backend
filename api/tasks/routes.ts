// Entry endpoints
import express from 'express'

import { validate } from '@utils/validator'
import { tasksHandler } from '@api/tasks/handlers'
import { loadSchema } from '@utils/loadSchema'
import { tasksSchema } from '@tasks/schema'

const tasksRouter = express.Router()

tasksRouter
    .get('/',       
        validate({ body: loadSchema(tasksSchema, [ 'id' ]) }),
        tasksHandler.getTasksByUserId
    )
    .post('/',      
        validate({
            body: loadSchema(tasksSchema, [ 'title', 'creatorId' ]),
        }),
        tasksHandler.createNewTask
    )
    .get('/:id',    
        validate({ params: loadSchema(tasksSchema, [ 'id' ]) }),
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
        validate({ params: loadSchema(tasksSchema, [ 'id' ]) }),
        tasksHandler.deleteTaskByTaskId
    )

export {
    tasksRouter
}