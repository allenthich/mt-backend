// Entry endpoints
import express from 'express';

import { validate } from '@utils/validator'
import { setReqSchemaProps } from '@utils/setReqSchemaProps'
import { usersHandler } from '@api/users/handlers'

const usersRouter = express.Router()

usersRouter
    .get('/:id',       
        validate({ body: setReqSchemaProps([ 'id' ]) }),
        usersHandler.getUserByUserId
    )
    .put('/:id',    
        validate({
            body: setReqSchemaProps([ 'id' ]),
            params: setReqSchemaProps([ 'id' ])
        }),
        usersHandler.updateUserByUserId
    )
    .delete('/:id', 
        validate({ params: setReqSchemaProps([ 'id' ]) }),
        usersHandler.deleteUserByUserId
    )

export {
    usersRouter
}