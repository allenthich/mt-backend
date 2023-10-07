// Load the Express app file and listen on port
import 'dotenv/config'
import expressApp from '@api/app'
import { logger } from '@utils/logger'

// Global error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', err)
  process.exit(1); // Terminate the application (1 indicates an error)
  throw err
})

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection', err)
  process.exit(1); // Terminate the application (1 indicates an error)
})

// Server startup
const port = process.env.PORT || 3000;
expressApp.listen(port, () =>
  console.log(`
    🚀 Server ready at: http://localhost:3000
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)