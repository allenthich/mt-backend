import expressApp from '@api/app'
import usersRouter from '@users/routes'

// Routers
expressApp.use('/api/users', usersRouter)
// expressApp.use('/api/tasks', taskRouter)
