// Entry endpoints
import express from 'express';

import { validate } from '_utils/validator'
import { registrationHandler } from '_api/registration/handlers'
import { loadSchema } from '_utils/loadSchema'
import { registrationSchema } from '_api/registration/schema'

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