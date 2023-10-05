import express from 'express'
import jsonParser from '@middleware/jsonParser'

import UserRouter from '@users/routes'

const expressApp = express()

// Application middleware
expressApp.use(jsonParser)

// Routers
expressApp.use('/api/users', UserRouter)
// expressApp.use('/api/tasks', TaskRouter)


export default expressApp