import express from 'express'
import cors from 'cors'
import compression from 'compression'
import {
    pinoHttpLogger,
    handleErrors,
    authenticateUser
} from '_middleware'
import { authRouter } from '_api/auth/routes'
import { registrationRouter } from '_api/registration/routes'
import { usersRouter } from '_api/users/routes'
import { tasksRouter } from '_api/tasks/routes'

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

export default expressApp