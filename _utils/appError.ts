import { StatusCodes } from 'http-status-codes'

// Centralized error object that derives from Node’s Error
export class AppError extends Error {
    public readonly name: string
    public readonly httpCode: StatusCodes
    public readonly isOperational: boolean
  
    constructor(name: string, httpCode: StatusCodes, description: string, isOperational: boolean) {
      super(description)
  
      Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
  
      this.name = name
      this.httpCode = httpCode
      this.isOperational = isOperational
  
      Error.captureStackTrace(this)
    }
  }
  
  // client throwing an exception
//   if(user == null)
//       throw new AppError(commonErrors.resourceNotFound, commonHTTPErrors.notFound, 'further explanation', true)
// throw new AppError(errorManagement.commonErrors.InvalidInput, 'Describe here what happened', true);