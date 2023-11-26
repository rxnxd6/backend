import { NextFunction ,Request,Response} from 'express'
import { z, ZodError } from 'zod'
import ApiError from '../errors/ApiError'
//-----done---
export const validateCreateOrder=(req: Request, res: Response, next: NextFunction) =>{
  const productSchema = z.object({
    product: z.string(),
    quantity:  z.number().default(1),
    _id: z.string(),
  });
  const postSchema = z.object({
    userId: z.string(),
    products: z.array(productSchema),
  });
  try {
    postSchema.parse(req.body)
    next()
  } catch (error) {
    const err = error
    if (err instanceof ZodError) {
      next(ApiError.badRequestValidation(err.errors))
      return
    }
    next(ApiError.internal('Something went wrong'))
  }
}
//-----done---
export const validateOrderId=(req: Request, res: Response, next: NextFunction)=>{
  const getSchema  =z.object({
   orderId : z.string().length(24)
  })
  try {
    getSchema.parse(req.params)
    next()
  } catch (error) {
    const err = error
    if (err instanceof ZodError) {
      next(ApiError.badRequestValidation(err.errors))
      return
    }
    next(ApiError.internal('Something went wrong'))
  }
}