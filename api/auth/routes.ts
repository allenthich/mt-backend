// Entry endpoints
import express from 'express'

import { validate } from '@utils/validator'
import { authHandler } from '@auth/handlers'
import { loadSchema } from '@utils/loadSchema'
import { authSchema } from '@auth/schema'

const authRouter = express.Router()

authRouter
    .post('/login',      
        validate({
            body: loadSchema(authSchema, [ 'email', 'password' ])
        }),
        authHandler.loginUser
    )

export {
    authRouter
}