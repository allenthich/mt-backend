import { parseJSON } from '@middleware/parseJSON'
import { pinoHttpLogger } from '@utils/logger'
import { handleErrors } from '@middleware/handleErrors'

export const middlewares = [
    parseJSON,
    pinoHttpLogger,
    handleErrors
]