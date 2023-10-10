// Load the Express app file and listen on port
import 'dotenv/config'
import { expressApp } from '@api/app'
import { errorHandler } from '@utils/errorHandler'

// Global error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err: Error) => {
  errorHandler.handleUnknownError(err)
})

process.on('unhandledRejection', (err: Error) => {
  errorHandler.handleUnknownError(err)
})

// Server startup
const port = process.env.APP_PORT || 8080;
expressApp.listen(port, () =>
  console.log(`
    🚀 Server ready at: http://localhost:${port}
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)