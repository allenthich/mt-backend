// Entry endpoints
import express from 'express';

import { validate } from '@utils/validator'
import { setReqSchemaProps } from '@utils/setReqSchemaProps'
import { registrationHandler } from '@registration/handlers'

const registrationRouter = express.Router()

registrationRouter
    .post('/',      
        validate({
            body: setReqSchemaProps([ 'id', 'email' ]),
            params: setReqSchemaProps([ 'id' ])
        }),
        registrationHandler.registerNewUser
    )

export {
    registrationRouter
}