// Entry endpoints
import express from 'express';

import { validate } from '@utils/validator'
import { usersHandler } from '@api/users/handlers'
import { usersSchema } from '@users/schema'
import { loadSchema } from '@utils/loadSchema'

const usersRouter = express.Router()

usersRouter
    .get('/:id',       
        validate({ params: loadSchema(usersSchema, [ 'id' ]) }),
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
        validate({ params: loadSchema(usersSchema, [ 'id' ]) }),
        usersHandler.deleteUserByUserId
    )

export {
    usersRouter
}