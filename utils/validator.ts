import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { Validator } from 'express-json-validator-middleware'

const validator = new Validator({})

// Add JSON Schema formats for Ajv e.g. date-time
addFormats(validator.ajv)

export const validate = validator.validate