// Entry endpoints
import express from 'express'

import { validate } from '@utils/validator'
import { setReqSchemaProps } from '@utils/setReqSchemaProps'
import { authHandler } from '@auth/handlers'

const authRouter = express.Router()

authRouter
    .post('/login',      
        validate({
            body: setReqSchemaProps([ 'id', 'email' ]),
            params: setReqSchemaProps([ 'id' ])
        }),
        authHandler.loginUser
    )

export {
    authRouter
}