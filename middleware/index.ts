import { jsonParser } from '@middleware/jsonParser'
import { pinoHttpLogger } from '@utils/logger'
import { handleErrors } from '@middleware/handleErrors'

export const middlewares = [
    jsonParser,
    pinoHttpLogger,
    handleErrors
]