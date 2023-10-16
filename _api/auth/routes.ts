// Entry endpoints
import express from 'express'

import { validate } from '_utils/validator'
import { authHandler } from '_api/auth/handlers'
import { loadSchema } from '_utils/loadSchema'
import { authSchema } from '_api/auth/schema'

const authRouter = express.Router()

authRouter
    .post('/',      
        validate({
            body: loadSchema(authSchema, [])
        }),
        authHandler.validateUserJWTToken
    )
    .post('/login',      
        validate({
            body: loadSchema(authSchema, [ 'email', 'password' ])
        }),
        authHandler.loginUser
    )

export {
    authRouter
}