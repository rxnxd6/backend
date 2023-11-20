import express from 'express'
const router = express.Router()
import Product from '../models/product'
import ApiError from '../errors/ApiError'

router.get('/', async (_, res) => {
  const products = await Product.find()
  console.log('products:', products)
  res.json(products)
})

router.post('/', async (req, res, next) => {
  const { id,name, description, quantity,price,image,variants,size,categories} = req.body

  if (!name || !description||!price) {
    next(ApiError.badRequest('Name , Description and price are requried'))
    return
  }
  const product = new Product({
    name,
    description,
    quantity,
    price,
    image,
    variants,
    size,
    categories
    


  })

  await product.save()
  res.json(product)
})

export default router
