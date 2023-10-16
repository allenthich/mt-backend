// Entry endpoints
import express from 'express';

import { validate } from '_utils/validator'
import { usersHandler } from '_api/users/handlers'
import { usersSchema } from '_api/users/schema'
import { loadSchema } from '_utils/loadSchema'

const usersRouter = express.Router()

usersRouter
    .get('/:id',       
        validate({
            body: loadSchema(usersSchema, []),
            params: loadSchema(usersSchema, [ 'id' ])
        }),
        usersHandler.getUserByUserId
    )
    .put('/:id',    
        validate({
            body: loadSchema(usersSchema, []),
            params: loadSchema(usersSchema, [ 'id' ])
        }),
        usersHandler.updateUserByUserId
    )
    .delete('/:id', 
        validate({
            body: loadSchema(usersSchema, []),
            params: loadSchema(usersSchema, [ 'id' ])
        }),
        usersHandler.deleteUserByUserId
    )

export {
    usersRouter
}