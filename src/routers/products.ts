import express from 'express'
const router = express.Router()

import Product from '../models/product'
import Order from '../models/order'
import ApiError from '../errors/ApiError'
import product from '../models/product'

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

router.get('/:productsId', async (req, res) => {
  const productsId = req.params.productsId
  const products = await product.findById(productsId)

  res.status(200).json(product)
})

router.delete('/:productsId', async (req, res) => {
  const { productsId } = req.params

  await product.deleteOne({
    _id: productsId,
  })

  res.status(204).send()
})

export default router
