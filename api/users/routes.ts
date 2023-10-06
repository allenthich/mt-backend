// Entry endpoints
import express from 'express';

import usersHandler from '@api/users/handlers'

const usersRouter = express.Router()

usersRouter.get('/', usersHandler.getUsers)
usersRouter.get('/:id', usersHandler.getUser)
// usersRouter.post('/', usersHandler.createUser)

export default usersRouter