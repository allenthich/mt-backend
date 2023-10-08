import { AllowedSchema } from 'express-json-validator-middleware'

export const loadSchema = (schema: AllowedSchema, requiredProperties: Array<string>) => {
    const getSchema = () => {
        if (schema !== undefined) {
            schema.required = requiredProperties
        }
        return schema
    }
    return getSchema
}