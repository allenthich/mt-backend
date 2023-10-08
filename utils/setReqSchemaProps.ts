import { Request } from "express"

/**
 * Get schema set by the `loadSchema` middleware and
 * adds list of required JSON Schema properties to request object.
 */
export const setReqSchemaProps = (requiredProperties: Array<string>): Function => {
    const getSchema = (request: Request) => {
        // Check if schema exists
        if(request.schema !== undefined) {
            request.schema.required = requiredProperties
        }
        return request.schema
    }
    return getSchema
}