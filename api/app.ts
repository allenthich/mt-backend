import express from 'express'
import {
    parseJSON,
    pinoHttpLogger,
    handleErrors,
    loadSchema
} from '@middleware'
// import { registrationRouter } from '@registration/routes'
// import { loginRouter } from '@login/routes'
import { usersRouter } from '@users/routes'
import { tasksRouter } from '@tasks/routes'

const expressApp = express()

// Pre-router middleware
expressApp.use([ parseJSON, pinoHttpLogger, loadSchema ])

// Routers
expressApp
    // .use('/api/registration', registrationRouter)
    // .use('/api/login', loginRouter)
    .use('/api/users', usersRouter)
    .use('/api/tasks', tasksRouter)

// Application middleware
expressApp.use([ handleErrors ])

export {
    expressApp
}