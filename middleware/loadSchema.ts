// TODO: Revisit global type declaration unrecognized
/// <reference path="../types/express/index.d.ts" />

import { NextFunction, Request, Response } from 'express'
import { AllowedSchema } from 'express-json-validator-middleware'

// TODO: Distinguish multiple different schema loading
import { authSchema } from '@auth/schema'
import { usersSchema } from '@users/schema'
import { tasksSchema } from '@tasks/schema'

const getSchemaBy = (apiRequestPath: string): AllowedSchema => {
    switch (apiRequestPath) {
        case '/api/auth':
            return authSchema
        case '/api/users':
            return usersSchema
        case '/api/tasks':
            return tasksSchema
        default:
            return {}
    }
}

// TODO: Make generic for retrieving specific Schemas
/**
 * Middleware to set schema on the `request` object based on API route path.
 */
export const loadSchema = (request: Request, response: Response, next: NextFunction) => {
    try {
      request.schema = getSchemaBy(request.path)
      next()
    } catch (error) {
      next(error)
    }
}