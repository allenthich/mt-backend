import express from 'express'
import cors from 'cors'
import compression from 'compression'
import {
    pinoHttpLogger,
    handleErrors,
    authenticateUser
} from '@middleware'
import { authRouter } from '@auth/routes'
import { registrationRouter } from '@registration/routes'
import { usersRouter } from '@users/routes'
import { tasksRouter } from '@tasks/routes'

const expressApp = express()

// Pre-router middleware
expressApp.use([
    cors(),
    express.json(),
    compression(),
    pinoHttpLogger
])

// Routers
expressApp
    .use('/api/auth', authRouter)
    .use('/api/registration', registrationRouter)
    .use('/api/users', authenticateUser, usersRouter)
    .use('/api/tasks', authenticateUser, tasksRouter)

// Application middleware
expressApp.use([ handleErrors ])

export {
    expressApp
}