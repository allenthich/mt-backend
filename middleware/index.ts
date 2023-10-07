import jsonParser from '@middleware/jsonParser'
import { pinoHttpLogger } from '@utils/logger'
import { handleErrors } from '@middleware/handleErrors'

export default [
    jsonParser,
    pinoHttpLogger,
    handleErrors
]