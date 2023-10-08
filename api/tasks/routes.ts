// Entry endpoints
import express from 'express'

import { validate } from '@utils/validator'
import { setReqSchemaProps } from '@utils/setReqSchemaProps'
import { tasksHandler } from '@api/tasks/handlers'

const tasksRouter = express.Router()

tasksRouter
    .get('/',       
        validate({ body: setReqSchemaProps([ 'id' ]) }),
        tasksHandler.getTasksByUserId
    )
    .post('/',      
        validate({
            body: setReqSchemaProps([ 'title', 'creatorId' ]),
            params: setReqSchemaProps([ 'id' ])
        }),
        tasksHandler.createNewTask
    )
    .get('/:id',    
        validate({ params: setReqSchemaProps([ 'id' ]) }),
        tasksHandler.getTaskByTaskId
    )
    .put('/:id',    
        validate({
            body: setReqSchemaProps([ 'id' ]),
            params: setReqSchemaProps([ 'id' ])
        }),
        tasksHandler.updateTaskByTaskId
    )
    .delete('/:id', 
        validate({ params: setReqSchemaProps([ 'id' ]) }),
        tasksHandler.deleteTaskByTaskId
    )

export {
    tasksRouter
}