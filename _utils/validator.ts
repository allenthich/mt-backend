import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { Validator } from 'express-json-validator-middleware'

const validator = new Validator({})

// Add JSON Schema formats for Ajv e.g. date-time
addFormats(validator.ajv)

const validate = validator.validate

export {
    validator,
    validate
}