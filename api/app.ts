import express from 'express'
import jsonParser from '@middleware/jsonParser'

const expressApp = express()

// Application middleware
expressApp.use(jsonParser)

export default expressApp