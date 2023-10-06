// Load the Express app file and listen on port
import '@routes'
import expressApp from '@api/app'

const port = process.env.PORT || 3000;
expressApp.listen(port, () =>
  console.log(`
    🚀 Server ready at: http://localhost:3000
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)