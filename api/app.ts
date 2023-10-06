import express from 'express'
import middlewares from '@middleware'

const expressApp = express()

// Application middleware
expressApp.use(middlewares)

export default expressApp