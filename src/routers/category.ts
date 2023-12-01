import { Router } from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory
} from '../controllers/categoryController'
import { validateCategory, validateCategoryId } from '../middlewares/vaildateCategory'

const router = Router()
//get categories
router.get('/', getCategories)
// get Category by id
router.get('/:categoryId', validateCategoryId, getCategory)
//create category
router.post('/', validateCategory, createCategory,)
// delete category
router.delete('/:categoryId', validateCategoryId, deleteCategory)
// update category
router.put('/:categoryId', validateCategoryId,validateCategory, updateCategory)
export default router
