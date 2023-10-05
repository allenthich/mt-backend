// Entry endpoints
import express from 'express';

import UserController from '@users/controller'

const usersRouter = express.Router()

usersRouter.get('/', UserController.getUsers)
usersRouter.get('/:id', UserController.getUser)
// usersRouter.post('/', UserController.createUser)

export default usersRouter