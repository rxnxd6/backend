import { Router, Request, Response, NextFunction } from 'express'
import Category from '../models/category'
import ApiError from '../errors/ApiError'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory
} from '../controllers/categoryController'
const router=Router()
//get categories
router.get("/",getCategories)
// get Category by id
router.get("/:categoryId",getCategory)
//create category
router.post("/",createCategory)
// delete category
router.delete("/:categoryId",deleteCategory)
// update category
router.put("/:categoryId",updateCategory)
export default router
