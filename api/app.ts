import express from 'express'
import middlewares from '@middleware'
import usersRouter from '@users/routes'

const expressApp = express()

// Routers
expressApp.use('/api/users', usersRouter)
// expressApp.use('/api/tasks', taskRouter)

// Application middleware
expressApp.use(middlewares)

export default expressApp