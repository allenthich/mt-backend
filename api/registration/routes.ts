// Entry endpoints
import express from 'express';

import { validate } from '@utils/validator'
import { registrationHandler } from '@registration/handlers'
import { loadSchema } from '@utils/loadSchema'
import { registrationSchema } from '@registration/schema'

const registrationRouter = express.Router()

registrationRouter
    .post('/',      
        validate({
            body: loadSchema(registrationSchema, [ 'email', 'password' ]),
        }),
        registrationHandler.registerNewUser
    )

export {
    registrationRouter
}