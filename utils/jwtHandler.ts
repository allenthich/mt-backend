import { StatusCodes } from 'http-status-codes'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { jwtPayloadSchema } from '@api/auth/schema'
import { AppError } from '@utils/appError'
import { validator } from '@utils/validator'

// Validate decoded payload against the expected JWT Schema
const validateJWTToken = (decodedToken: string | JwtPayload): Boolean => {
    const validate = validator.ajv.compile(jwtPayloadSchema)
    const isValid = validate(decodedToken)
  
    if (!isValid) {
      throw new AppError('Error: validateJWT', StatusCodes.UNAUTHORIZED, 'Authentication failed. Invalid payload schema.', true)
    }
    return isValid
  }

const generateJWTToken = (userId: string, email: string) => {
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET_KEY as Secret, {
        expiresIn: '14d',
        subject: "AccessToken",
        issuer: process.env.JWT_ISSUER
    })
    return token
}

const verifyJWTToken = (token: string | undefined) => {
    if (!token) throw new AppError('Error: verifyJWTToken', StatusCodes.UNAUTHORIZED, 'Authentication failed. Invalid token.', true) 
    return jwt.verify(token, process.env.JWT_SECRET_KEY as Secret)
}

const decodeJWTTokenUserId = (token: string | undefined) => {
    if (!token) throw new AppError('Error: verifyJWTToken', StatusCodes.UNAUTHORIZED, 'Authentication failed. Invalid token.', true) 
    const decoded = verifyJWTToken(token)
    if (typeof decoded === 'string') return decoded
    return decoded.userId
}

export {
    validateJWTToken,
    generateJWTToken,
    verifyJWTToken,
    decodeJWTTokenUserId
}