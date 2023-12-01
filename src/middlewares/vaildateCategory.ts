import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'
import ApiError from '../errors/ApiError'
import {servicesGetCategory} from "../services/categories";

export const validateCategoryId =  async (req: Request, res: Response, next: NextFunction) => {
  const getSchema = z.object({
    categoryId: z.string().length(24)
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
export const validateCategory = (req: Request, res: Response, next: NextFunction) => {
  const categorySchema = z.object({
    name: z.string()
  })
  try {
    categorySchema.parse(req.body)
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