import Product from '../models/product'
import ApiError from '../errors/ApiError'
import { Request, Response, NextFunction } from 'express'
import product from '../models/product'

//Get ALL Products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.find().populate('categories')
  res.status(200).json(
    {
      msg: "products is returned ",
      products: products
    })
}
//Get product by id
export const getProductbyId = async (req: Request, res: Response) => {
  const { productId } = req.params
  try {
    const productbyId = await Product.findById({ _id: productId, })

    res.status(200).json({
      msg: "Product by Id",
      productbyId: productbyId
    })
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

//create  a product 
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, quantity, price, image, variants, size, categories } = req.body
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
  if (!name || !description || !price) {
    next(ApiError.badRequest('Name , Description and price are requried'))
    return
  }

  await product.save()
  res.status(201).json({
    msg: 'product is created',
    product: product,
    category: categories
  })
}
//Update new product 
export const updateProduct = async (req: Request, res: Response,) => {
  const { productId } = req.params;
  const { name, description, quantity, price, image, variants, size, categories } = req.body;

  const product = await Product.findByIdAndUpdate(
    productId,
    {
      name: name, description: description, quantity: quantity, price: price, image: image, variants: variants, size: size, categories: categories
    },
    {
      new: true,
    }
  )
  res.status(201).json({
    msg: 'product is updated',
    product: product
  })
}
//Delete a product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params
  const isDelete = await Product.deleteOne({ _id: productId }).exec()
  if (isDelete['deletedCount'] === 1) {
    res.status(201).json({
      msg: 'product is deleted'
    })
  } else {
    res.status(404).json('error')
  }
}
