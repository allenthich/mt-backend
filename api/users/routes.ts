// Entry endpoints
import express from 'express';

import { usersHandler } from '@api/users/handlers'

export const usersRouter = express.Router()

usersRouter.get('/', usersHandler.getUsers)
usersRouter.get('/:id', usersHandler.getUser)
// usersRouter.post('/', usersHandler.createUser)