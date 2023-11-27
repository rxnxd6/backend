import express from 'express'
const router = express.Router()
import Product from '../models/product'
import ApiError from '../errors/ApiError'
import product from '../models/product'
import { createProduct, deleteProduct, getProducts, getProductbyId, updateProduct } from '../controllers/productController'

//Get product 
router.get('/', getProducts)
//Get product By id
router.get('/:productId', getProductbyId)
//Create new product 
router.post('/', createProduct)
//Update new product 
router.put('/productId', updateProduct)
//Delte product 
router.delete('/:productId', deleteProduct)
export default router
